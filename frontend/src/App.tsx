import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingScreen from '@/components/LoadingScreen';
import { usePageLoading } from '@/hooks/use-page-loading';
import Index from './pages/Index';
import Connect from './pages/Connect';
import Onboarding from './pages/Onboarding';
import Success from './pages/Success';
import NotFound from './pages/NotFound';

const queryClient = new QueryClient();

function RoutedApp() {
  const loading = usePageLoading();
  return (
    <>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/success" element={<Success />} />
        <Route path="/connect" element={<Connect />} />
        <Route path="/onboarding" element={<Onboarding />} />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <LoadingScreen visible={loading} />
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RoutedApp />
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
