import type { Metadata } from 'next';
import { Suspense } from 'react';
import FavoritesContent from './FavoritesContent';
import LoadingState from '@/components/LoadingState/LoadingState';

export const metadata: Metadata = {
  title: 'Favorites | Bookmark Manager',
  description: 'Your favorited bookmarks',
};

export default function FavoritesPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <FavoritesContent />
    </Suspense>
  );
}
