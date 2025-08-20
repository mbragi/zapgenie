import zapGenieLogo from '@/assets/zapgenie-logo.png';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/sonner';
import BackgroundOrbs from '@/components/BackgroundOrbs';
import { useInView } from '@/hooks/use-in-view';
import {
  Zap,
  MessageCircle,
  Brain,
  Sparkles,
  ShieldCheck,
  Calendar,
  Smartphone,
  Send,
} from 'lucide-react';

const LogoShowcase = () => {
  const navigate = useNavigate();
  const bounce =
    'transition-transform duration-300 will-change-transform group-hover:-translate-y-1';
  const { ref: gridRef, inView } = useInView<HTMLDivElement>({ threshold: 0.15 });
  return (
    <div className="relative min-h-[70vh] bg-gradient-to-b from-background via-background to-secondary/20 flex items-center justify-center px-4 py-10 sm:py-14">
      <BackgroundOrbs />
      <div className="relative w-full max-w-6xl mx-auto text-center space-y-10 sm:space-y-12">
        {/* Main Logo Display */}
        <div className="relative">
          <div className="absolute inset-0 bg-electric/20 blur-3xl rounded-full scale-150 animate-[pulse_3s_ease-in-out_infinite]"></div>
          <div className="relative bg-card/60 backdrop-blur rounded-3xl px-6 sm:px-10 md:px-14 py-10 md:py-14 border border-electric/20 shadow-2xl">
            <img
              src={zapGenieLogo}
              alt="ZapGenie Logo"
              className="w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-6 md:mb-8 opacity-90 hover:opacity-100 transition-all duration-500 ease-out hover:scale-105"
            />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-electric via-magic to-lightning bg-clip-text text-transparent mb-3 md:mb-4">
              ZapGenie
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Your WhatsApp companion for planning, content, crypto, and nutrition—private by
              design.
            </p>
          </div>
        </div>

        {/* How it works (scroll on mobile) */}
        <div className="text-center space-y-4 sm:space-y-6">
          <h2 className="text-xl sm:text-2xl font-semibold">How it works</h2>
          <div className="flex justify-center gap-4 overflow-x-auto lg:overflow-x-visible snap-x snap-mandatory pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden max-w-5xl mx-auto">
            {[
              {
                icon: <Smartphone className="w-5 h-5" />,
                title: 'Say hello on WhatsApp',
                text: 'Start a chat and tell us what you need.',
              },
              {
                icon: <Calendar className="w-5 h-5" />,
                title: 'Connect when needed',
                text: 'We’ll request Google only for calendar/email tasks.',
              },
              {
                icon: <Send className="w-5 h-5" />,
                title: 'Get it done',
                text: 'We confirm actions and notify you instantly.',
              },
            ].map((s, i) => (
              <Card
                key={i}
                className="min-w-[230px] sm:min-w-[280px] snap-start p-4 sm:p-5 bg-card/60 backdrop-blur border-border/50 text-left h-full"
              >
                <div className="flex items-center gap-2 text-electric mb-2">
                  {s.icon}
                  <span className="text-foreground font-medium">{s.title}</span>
                </div>
                <p className="text-sm text-muted-foreground">{s.text}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-stretch gap-4 sm:gap-6 transition-opacity duration-700 ${
            inView ? 'opacity-100' : 'opacity-0'
          }`}
        >
          {[
            {
              icon: <Brain className="w-8 h-8" />,
              title: 'Personal Productivity',
              color: 'electric',
              assistant: 'personal',
              blurb: 'Reminders, scheduling, and email',
            },
            {
              icon: <MessageCircle className="w-8 h-8" />,
              title: 'Social Media Management',
              color: 'magic',
              assistant: 'social',
              blurb: 'Draft, refine, and plan posts',
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: 'Blockchain Operations',
              color: 'lightning',
              assistant: 'blockchain',
              blurb: 'Wallets, alerts, and secure actions',
            },
            {
              icon: <Sparkles className="w-8 h-8" />,
              title: 'Nutrition Planning',
              color: 'whatsapp',
              assistant: 'dietitian',
              blurb: 'Meal plans tailored to goals',
            },
          ].map((feature, index) => (
            <Card
              key={index}
              className="p-5 sm:p-6 bg-card/60 backdrop-blur border-border/50 hover:border-electric/50 transition-all duration-300 group hover:shadow-xl hover:shadow-electric/20 rounded-2xl text-left h-full flex flex-col"
            >
              <div className={`text-${feature.color} mb-4 group-hover:scale-110 ${bounce}`}>
                {feature.icon}
              </div>
              <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{feature.blurb}</p>
              <div className="flex justify-center mt-auto">
                <Button
                  variant="secondary"
                  className={`hover:bg-${feature.color}/20 ${bounce}`}
                  onClick={() => {
                    toast(`Opening ${feature.title} setup…`);
                    navigate(`/onboarding?assistant=${feature.assistant}`);
                  }}
                >
                  Get started
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* Tag Line */}
        <div className="flex flex-wrap justify-center gap-4">
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm bg-electric/10 text-electric border-electric/20"
          >
            <Zap className="w-4 h-4 mr-2" />
            One WhatsApp Number
          </Badge>
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm bg-magic/10 text-magic border-magic/20"
          >
            <Brain className="w-4 h-4 mr-2" />
            Four Expert Assistants
          </Badge>
          <Badge
            variant="secondary"
            className="px-4 py-2 text-sm bg-lightning/10 text-lightning border-lightning/20"
          >
            <ShieldCheck className="w-4 h-4 mr-2" />
            Privacy‑first & consent‑driven
          </Badge>
        </div>

        {/* Description & CTA */}
        <div className="max-w-3xl mx-auto space-y-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            Transform your WhatsApp into a powerful productivity hub with natural language
            conversations that understand your needs across personal productivity, social media,
            blockchain, and nutrition.
          </p>

          {/* WhatsApp CTA */}
          <div className="flex justify-center">
            <Button
              onClick={() => {
                const whatsappNumber = '2349160335190';
                const message = "Hi ZapGenie! I'd like to start using your AI assistants! 🚀";
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
                window.open(whatsappUrl, '_blank');
              }}
              size="lg"
              className="bg-whatsapp hover:bg-whatsapp/90 text-white font-semibold px-8 py-4 text-lg"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Start on WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
