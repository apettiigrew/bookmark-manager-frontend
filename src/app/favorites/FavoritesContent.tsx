'use client';

import { useFavorites } from '@/hooks/useFavorites';
import BookmarkCard from '@/components/BookmarkCard/BookmarkCard';
import LoadingState from '@/components/LoadingState/LoadingState';
import EmptyState from '@/components/EmptyState/EmptyState';

export default function FavoritesContent() {
  const { bookmarks, isLoading, error, unfavorite, refetch } = useFavorites();

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 w-full">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Favorites</h1>

      {isLoading && <LoadingState />}

      {!isLoading && error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center justify-between"
        >
          <p className="text-red-700 text-sm">{error}</p>
          <button
            type="button"
            onClick={refetch}
            className="text-sm font-medium text-red-700 hover:text-red-900 underline ml-4"
          >
            Retry
          </button>
        </div>
      )}

      {!isLoading && !error && bookmarks.length === 0 && <EmptyState />}

      {!isLoading && !error && bookmarks.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {bookmarks.map((bookmark) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              onUnfavorite={unfavorite}
            />
          ))}
        </div>
      )}
    </main>
  );
}
