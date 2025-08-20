import LogoShowcase from '@/components/LogoShowcase';
import Footer from '@/components/Footer';

const Index = () => {
  // Homepage no longer shows any connect actions

  return (
    <div className="space-y-12">
      <LogoShowcase />
      <Footer />
    </div>
  );
};

export default Index;
