import { Zap } from 'lucide-react';
import clsx from 'clsx';

type LoadingScreenProps = {
  visible: boolean;
};

/**
 * Fullscreen animated loading overlay with subtle Web3-styled neon/glass aesthetics.
 * Designed to be shown briefly on app boot and during route transitions.
 */
const LoadingScreen = ({ visible }: LoadingScreenProps) => {
  return (
    <div
      aria-hidden={!visible}
      aria-busy={visible}
      className={clsx(
        'fixed inset-0 z-[100] flex items-center justify-center transition-opacity duration-300',
        visible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
      )}
    >
      <div className="absolute inset-0 bg-background/70 backdrop-blur-md" />

      <div className="relative flex flex-col items-center gap-4">
        <div className="relative">
          <div className="absolute -inset-8 rounded-full bg-gradient-to-tr from-electric/30 via-magic/20 to-lightning/30 blur-3xl animate-[pulse_3s_ease-in-out_infinite]" />
          <div className="relative w-24 h-24 rounded-3xl bg-card/70 border border-electric/30 shadow-2xl grid place-items-center">
            <Zap className="w-10 h-10 text-electric drop-shadow-[0_0_12px_rgba(93,93,255,0.45)] animate-[pulse_1.6s_ease-in-out_infinite]" />
          </div>
        </div>
        <div className="h-1.5 w-40 rounded-full bg-muted overflow-hidden">
          <div className="h-full w-1/2 rounded-full bg-gradient-to-r from-electric via-magic to-lightning animate-[shimmer_1.4s_linear_infinite]" />
        </div>
        <p className="text-sm text-muted-foreground">Loading ZapGenie…</p>
      </div>

      <style>{`
        @keyframes shimmer { 0% { transform: translateX(-100%); } 100% { transform: translateX(200%); } }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
