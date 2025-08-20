import { useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { config } from './config';

/**
 * Protected Connect page
 * - Requires sealed `token` query parameter
 * - Supports provider selection via `provider` query (currently only "google")
 */
const Connect = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const provider = (params.get('provider') || 'google').toLowerCase();
  const sealedToken = params.get('token') || '';

  const validation = useMemo(() => {
    if (!sealedToken) return { ok: false, reason: 'missing_token' as const };
    if (provider !== 'google') return { ok: false, reason: 'unsupported_provider' as const };
    return { ok: true as const };
  }, [provider, sealedToken]);

  const startUrl = useMemo(() => {
    if (!validation.ok) return '';
    const base = `${config.backendBaseUrl}/auth/google/start`;
    const qs = new URLSearchParams({ sealed: '1', token: sealedToken, redirect: '1' });
    return `${base}?${qs.toString()}`;
  }, [sealedToken, validation.ok]);

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card className="p-6 space-y-4">
        <div>
          <div className="text-xl font-semibold">Account Connection</div>
          <div className="text-sm text-muted-foreground">
            Securely connect your account to enable calendar and email features.
          </div>
        </div>

        {!validation.ok && (
          <Alert variant="destructive">
            <AlertDescription>
              {validation.reason === 'missing_token' &&
                'Access denied: secure token is required for this link.'}
              {validation.reason === 'unsupported_provider' &&
                'Selected provider is not supported yet.'}
            </AlertDescription>
          </Alert>
        )}

        {validation.ok && provider === 'google' && (
          <div className="flex items-center justify-between">
            <div>
              <div className="font-medium">Connect Google</div>
              <div className="text-sm text-muted-foreground">
                Link Google to sync Calendar and Gmail.
              </div>
            </div>
            <Button onClick={() => window.location.assign(startUrl)}>Connect</Button>
          </div>
        )}

        <div className="flex gap-3">
          <Button variant="outline" onClick={() => navigate('/')}>
            Back
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Connect;
