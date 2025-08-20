import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, MessageCircle, Wallet } from 'lucide-react';
import zapGenieLogo from '@/assets/zapgenie-logo.png';

const Success = () => {
  const [searchParams] = useSearchParams();
  const accountType = searchParams.get('type') || 'wallet';

  useEffect(() => {
    // Track successful connection
    console.log(`Successfully connected ${accountType} account`);
  }, [accountType]);

  const handleWhatsAppRedirect = () => {
    const whatsappNumber = '2349160335190';
    const message = `Hi ZapGenie! I just connected my ${accountType} account and I'm ready to start using your AI assistants! 🚀`;
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20 flex items-center justify-center p-8">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Success Animation */}
        <div className="relative">
          <div className="absolute inset-0 bg-electric/20 blur-3xl rounded-full scale-150 animate-pulse"></div>
          <Card className="relative bg-card/50 backdrop-blur-sm border-electric/20 p-12 shadow-2xl">
            <div className="space-y-6">
              {/* Logo */}
              <img
                src={zapGenieLogo}
                alt="ZapGenie Logo"
                className="w-24 h-24 mx-auto mb-6"
                style={{ filter: 'drop-shadow(0 0 20px hsl(var(--electric) / 0.5))' }}
              />

              {/* Success Icon */}
              <div className="flex justify-center">
                <div className="bg-electric/20 p-4 rounded-full">
                  <CheckCircle className="w-16 h-16 text-electric" />
                </div>
              </div>

              {/* Success Message */}
              <div className="space-y-4">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-electric via-magic to-lightning bg-clip-text text-transparent">
                  Connection Successful!
                </h1>
                <p className="text-xl text-muted-foreground">
                  Your {accountType === 'wallet' ? 'Google Wallet' : accountType} account has been
                  successfully connected to ZapGenie.
                </p>
              </div>

              {/* Features Preview */}
              <div className="grid grid-cols-2 gap-4 my-8">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-electric/10 border border-electric/20">
                  <Wallet className="w-6 h-6 text-electric" />
                  <span className="text-sm font-medium">Secure Transactions</span>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-magic/10 border border-magic/20">
                  <MessageCircle className="w-6 h-6 text-magic" />
                  <span className="text-sm font-medium">AI Assistants</span>
                </div>
              </div>

              {/* CTA Button */}
              <Button
                onClick={handleWhatsAppRedirect}
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold px-8 py-4 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Start Chat on WhatsApp
              </Button>

              <p className="text-sm text-muted-foreground mt-4">
                Click above to continue your journey with ZapGenie's AI assistants on WhatsApp
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Success;
