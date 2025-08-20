import { useMemo, useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import InlineError from '@/components/InlineError';
import { toast } from '@/components/ui/sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { config } from './config';

const Onboarding = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token') || '';
  const assistant = (params.get('assistant') || '').toLowerCase();
  const [phone, setPhone] = useState('');

  const [step, setStep] = useState<'consent' | 'timezone' | 'preferences' | 'done'>('consent');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timezone, setTimezone] = useState('');
  const [prefs, setPrefs] = useState<string[]>([]);

  const valid = useMemo(() => !!token, [token]);

  // If no token (coming cold from web), collect phone and initialize server-side onboarding
  useEffect(() => {
    if (token || !phone) return;
  }, [token, phone]);

  const post = async (path: string, body: Record<string, unknown>) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${config.backendBaseUrl}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, ...body }),
      });
      const json = await res.json();
      if (!json.success) throw new Error((json as { error?: string }).error || 'Failed');
      return json;
    } catch (e) {
      const msg = e instanceof Error ? e.message : 'Failed';
      setError(msg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const doConsent = async () => {
    const ok = await post('/auth/web/consent', {});
    if (ok) setStep('timezone');
  };
  const doTimezone = async () => {
    const ok = await post('/auth/web/timezone', { timezone });
    if (ok) setStep('preferences');
  };
  const doPrefs = async () => {
    const ok = await post('/auth/web/preferences', { assistants: prefs });
    if (ok) setStep('done');
  };

  return (
    <div className="min-h-[80vh] bg-gradient-to-b from-background via-background to-secondary/20 py-12">
      <div className="max-w-2xl mx-auto px-4">
        <Card className="p-6 md:p-8 space-y-5 bg-card/70 backdrop-blur border-border/50">
          <div className="space-y-1">
            <div className="text-2xl md:text-3xl font-bold text-foreground">Quick Setup</div>
            <p className="text-sm text-muted-foreground">
              Finish these short steps so we can tailor your experience. You can always continue in
              WhatsApp.
            </p>
          </div>
          {!valid && (
            <Alert variant="destructive">
              <AlertDescription>
                Enter your phone number to begin. We will text you on WhatsApp to continue.
              </AlertDescription>
            </Alert>
          )}
          {error && <InlineError message={error} />}

          {!valid && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone" className="text-sm text-foreground">
                  Phone number
                </Label>
                <Input
                  id="phone"
                  className="w-full bg-background text-foreground placeholder:text-muted-foreground"
                  placeholder="+2348012345678"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  We’ll send you a WhatsApp message so you can switch anytime.
                </p>
              </div>
              <Button
                className="transition-transform hover:-translate-y-0.5"
                disabled={loading || phone.length < 6}
                onClick={async () => {
                  const res = await fetch(`${config.backendBaseUrl}/auth/web/web-init`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ phone, assistant }),
                  });
                  const data = await res.json();
                  if (!res.ok) {
                    setError(String(data?.error || 'Service Unavailable'));
                    toast('Service Unavailable');
                    return;
                  }
                  if (data?.success) {
                    if (data.redirectToWhatsApp && data.whatsappUrl) {
                      toast('Continue in WhatsApp');
                      window.location.assign(String(data.whatsappUrl));
                      return;
                    }
                    if (data.redirectToAuth && data.connectUrl) {
                      toast('Connecting to provider…');
                      window.location.assign(String(data.connectUrl));
                      return;
                    }
                    const t = data.token as string;
                    const qs = new URLSearchParams({ token: t, assistant });
                    toast('Great! Just a couple more steps…');
                    navigate(`/onboarding?${qs.toString()}`);
                  }
                }}
              >
                Continue
              </Button>
            </div>
          )}

          {valid && step === 'consent' && (
            <div className="space-y-3">
              <div className="text-sm text-muted-foreground">
                I process your data (messages, profile, and selected integrations) to assist you.
              </div>
              <Button disabled={loading} onClick={doConsent}>
                I consent
              </Button>
            </div>
          )}

          {valid && step === 'timezone' && (
            <div className="space-y-3">
              <Input
                className="w-full bg-background text-foreground placeholder:text-muted-foreground"
                placeholder="Your timezone (e.g., Europe/London)"
                value={timezone}
                onChange={(e) => setTimezone(e.target.value)}
              />
              <Button disabled={loading || !timezone} onClick={doTimezone}>
                Continue
              </Button>
            </div>
          )}

          {valid && step === 'preferences' && (
            <div className="space-y-3">
              <div className="text-sm">Select assistants (optional):</div>
              <div className="flex gap-2 flex-wrap">
                {['personal', 'social', 'blockchain', 'dietitian'].map((k) => (
                  <button
                    key={k}
                    className={`px-3 py-1 rounded border transition-colors ${
                      prefs.includes(k)
                        ? 'bg-primary text-primary-foreground border-primary'
                        : 'bg-background text-foreground hover:bg-muted'
                    }`}
                    onClick={() =>
                      setPrefs((p) => (p.includes(k) ? p.filter((x) => x !== k) : [...p, k]))
                    }
                  >
                    {k}
                  </button>
                ))}
              </div>
              <Button disabled={loading} onClick={doPrefs}>
                Finish
              </Button>
            </div>
          )}

          {valid && step === 'done' && (
            <div className="space-y-3">
              <div>All set! You can return to WhatsApp.</div>
              <Button variant="outline" onClick={() => navigate('/')}>
                Home
              </Button>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;
