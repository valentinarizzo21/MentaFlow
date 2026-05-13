const BASE_URL = 'http://localhost:5050/api';

export interface AuthResponse {
  success: boolean;
  message?: string;
  data?: {
    token: string;
    username: string;
    email: string;
    role: string;
    expiresAt: string;
  };
}

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('mf_token');
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });

  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Errore del server');
  return json;
}

export const authApi = {
  login: (email: string, password: string) =>
    request<AuthResponse>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),

  register: (username: string, email: string, password: string, role: string) =>
    request<AuthResponse>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, role: role === 'Admin' ? 1 : 0 }),
    }),
};
