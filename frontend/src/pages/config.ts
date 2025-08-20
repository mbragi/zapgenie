const env = import.meta.env as unknown as Record<string, string | undefined>;

export const config = {
  // Use VITE_BASE_URL to stay aligned with backend BASE_URL usage
  backendBaseUrl: env.VITE_BASE_URL || 'http://localhost:3000',
};

export default config;
