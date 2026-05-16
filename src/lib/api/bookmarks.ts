import type { Bookmark, UnfavoriteResult } from '@/types/bookmark';

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? '';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    throw new ApiError(`Request failed: ${res.statusText}`, res.status);
  }
  return res.json() as Promise<T>;
}

export async function fetchFavorites(signal?: AbortSignal): Promise<Bookmark[]> {
  const res = await fetch(`${BASE_URL}/api/bookmarks?favorited=true`, { signal });
  const body = await handleResponse<{ data: Bookmark[] }>(res);
  return body.data;
}

export async function unfavoriteBookmark(id: string): Promise<UnfavoriteResult> {
  const res = await fetch(`${BASE_URL}/api/bookmarks/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ isFavorited: false }),
  });
  return handleResponse<UnfavoriteResult>(res);
}
