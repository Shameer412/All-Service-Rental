export const getStorageNamespace = () => {
  if (typeof window === 'undefined') return 'main';
  const host = window.location.hostname.toLowerCase();
  const subdomain = host.split('.')[0] || 'main';
  return subdomain === 'www' ? 'main' : subdomain.replace(/[^a-z0-9]/g, '_');
};

export const nsKey = (key: string) => `${getStorageNamespace()}_${key}`;

