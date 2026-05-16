'use client';

import { useState } from 'react';
import type { Bookmark } from '@/types/bookmark';
import FavoriteButton from '@/components/FavoriteButton/FavoriteButton';

export interface BookmarkCardProps {
  bookmark: Bookmark;
  onUnfavorite: (id: string) => void;
}

const FALLBACK_FAVICON = `data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23d1d5db' stroke-width='2'><path stroke-linecap='round' stroke-linejoin='round' d='M12 21l-8.5-8.5a6 6 0 018.5-8.485A6 6 0 0120.5 12.5L12 21z'/></svg>`;
const MAX_VISIBLE_TAGS = 3;

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BookmarkCard({ bookmark, onUnfavorite }: BookmarkCardProps) {
  const { id, title, url, description, faviconUrl, tags } = bookmark;
  const [faviconSrc, setFaviconSrc] = useState(faviconUrl ?? FALLBACK_FAVICON);
  const visibleTags = tags.slice(0, MAX_VISIBLE_TAGS);
  const extraTagCount = tags.length - MAX_VISIBLE_TAGS;

  return (
    <article className="bg-white rounded-lg border border-gray-200 p-4 flex gap-3 hover:shadow-md transition-shadow">
      <img
        src={faviconSrc}
        alt=""
        width={32}
        height={32}
        className="rounded shrink-0 mt-1"
        onError={() => setFaviconSrc(FALLBACK_FAVICON)}
      />

      <div className="flex-1 min-w-0">
        <h2 className="font-medium text-gray-900 truncate">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-600"
          >
            {title}
          </a>
        </h2>

        <p className="text-sm text-gray-500 truncate">{getHostname(url)}</p>

        {description && (
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">{description}</p>
        )}

        {tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {visibleTags.map((tag) => (
              <span
                key={tag.id}
                className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700"
              >
                {tag.name}
              </span>
            ))}
            {extraTagCount > 0 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                +{extraTagCount} more
              </span>
            )}
          </div>
        )}
      </div>

      <FavoriteButton
        isFavorited={bookmark.isFavorited}
        onToggle={() => onUnfavorite(id)}
      />
    </article>
  );
}
