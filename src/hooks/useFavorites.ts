import { useCallback, useEffect, useRef, useState } from 'react';
import { fetchFavorites, unfavoriteBookmark } from '@/lib/api/bookmarks';
import type { Bookmark } from '@/types/bookmark';

interface UseFavoritesReturn {
  bookmarks: Bookmark[];
  isLoading: boolean;
  error: string | null;
  unfavorite: (id: string) => Promise<void>;
  refetch: () => void;
}

export function useFavorites(): UseFavoritesReturn {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [fetchCount, setFetchCount] = useState(0);

  const refetch = useCallback(() => setFetchCount((c) => c + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setIsLoading(true);
    setError(null);

    fetchFavorites(controller.signal)
      .then((data) => {
        setBookmarks(data);
        setIsLoading(false);
      })
      .catch((err: unknown) => {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : 'Failed to load favorites');
        setIsLoading(false);
      });

    return () => controller.abort();
  }, [fetchCount]);

  const unfavorite = useCallback(async (id: string) => {
    const previous = bookmarks;
    setBookmarks((curr) => curr.filter((b) => b.id !== id));

    try {
      await unfavoriteBookmark(id);
    } catch (err: unknown) {
      setBookmarks(previous);
      setError(err instanceof Error ? err.message : 'Failed to remove favorite');
    }
  }, [bookmarks]);

  return { bookmarks, isLoading, error, unfavorite, refetch };
}
