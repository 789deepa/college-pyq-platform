const API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';

export function apiPath(path = '') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${API_PREFIX}${normalizedPath}`;
}

export async function parseResponseError(response) {
  const fallbackMessage = `Request failed with status ${response.status}`;

  try {
    const data = await response.json();
    if (typeof data?.error === 'string' && data.error.trim()) {
      return data.error;
    }
    if (typeof data?.message === 'string' && data.message.trim()) {
      return data.message;
    }
    return fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}
