const BASE_URL = 'http://localhost:5050/api';

function authHeaders() {
  const token = localStorage.getItem('mf_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function req<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: authHeaders(),
    ...options,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? 'Errore del server');
  return json;
}

export interface SubjectDto {
  id: number;
  name: string;
  code: string | null;
  color: string;
  difficulty: string;
  priority: string;
  academicStatus: string;
  cfu: number;
  year: number;
  examDate: string | null;
  isArchived: boolean;
  attachmentsCount: number;
  linksCount: number;
  createdAt: string;
}

export interface CreateSubjectPayload {
  name: string;
  code?: string;
  color: string;
  difficulty: number;
  priority: number;
  academicStatus: number;
  cfu: number;
  year: number;
  examDate?: string | null;
}

export interface UpdateSubjectPayload {
  name?: string;
  code?: string;
  color?: string;
  difficulty?: number;
  priority?: number;
  academicStatus?: number;
  cfu?: number;
  year?: number;
  examDate?: string | null;
  isArchived?: boolean;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export const subjectsApi = {
  getAll: (includeArchived = false) =>
    req<ApiResponse<SubjectDto[]>>(`/subjects?includeArchived=${includeArchived}`),

  getById: (id: number) =>
    req<ApiResponse<SubjectDto>>(`/subjects/${id}`),

  create: (payload: CreateSubjectPayload) =>
    req<ApiResponse<SubjectDto>>('/subjects', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  update: (id: number, payload: UpdateSubjectPayload) =>
    req<ApiResponse<SubjectDto>>(`/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
    }),

  delete: (id: number) =>
    req<ApiResponse<null>>(`/subjects/${id}`, { method: 'DELETE' }),

  archive: (id: number) =>
    req<ApiResponse<SubjectDto>>(`/subjects/${id}`, {
      method: 'PUT',
      body: JSON.stringify({ isArchived: true }),
    }),
};

// Enum mappings
export const DIFFICULTY_OPTIONS = [
  { label: 'Bassa', value: 0 },
  { label: 'Media', value: 1 },
  { label: 'Alta', value: 2 },
];

export const PRIORITY_OPTIONS = [
  { label: 'Bassa', value: 0 },
  { label: 'Media', value: 1 },
  { label: 'Alta', value: 2 },
];

export const ACADEMIC_STATUS_OPTIONS = [
  { label: 'Pianificata', value: 0 },
  { label: 'Frequentata', value: 1 },
  { label: 'Superata', value: 2 },
];

export const COLOR_PRESETS = [
  '#FFB7C5', '#D2B3FF', '#B5EAD7', '#FFDAC1',
  '#C7CEEA', '#AEC6CF', '#F7CAC9', '#B8D8BE',
  '#C9C0D3', '#FFD700', '#E8D5B7', '#A8D8EA',
];
