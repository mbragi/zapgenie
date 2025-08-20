import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Minimal route-change loading signal. Shows a spinner briefly when pathname changes.
 */
export function usePageLoading() {
  const location = useLocation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, [location.pathname]);

  return loading;
}
