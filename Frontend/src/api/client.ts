const USE_MOCK = import.meta.env.VITE_USE_MOCK_API !== 'false'
const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'

export class ApiClientError extends Error {
  status: number
  code?: string

  constructor(message: string, status: number, code?: string) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
  }
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown,
  init?: RequestInit,
): Promise<T> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(body ? { 'Content-Type': 'application/json' } : {}),
    ...(init?.headers as Record<string, string> | undefined),
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
    ...init,
  })

  if (!res.ok) {
    let detail = res.statusText
    try {
      const data = (await res.json()) as { detail?: string; code?: string }
      detail = data.detail || detail
      throw new ApiClientError(detail, res.status, data.code)
    } catch (err) {
      if (err instanceof ApiClientError) throw err
      throw new ApiClientError(detail, res.status)
    }
  }

  if (res.status === 204) return undefined as T
  return (await res.json()) as T
}

export const apiClient = {
  useMock: USE_MOCK,
  baseUrl: BASE_URL,
  get: <T>(path: string, init?: RequestInit) => request<T>('GET', path, undefined, init),
  post: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>('POST', path, body, init),
  patch: <T>(path: string, body?: unknown, init?: RequestInit) =>
    request<T>('PATCH', path, body, init),
  delete: <T>(path: string, init?: RequestInit) => request<T>('DELETE', path, undefined, init),
}
