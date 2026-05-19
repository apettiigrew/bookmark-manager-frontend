"use client";

import Image from "next/image";
import { ExternalLink, RotateCcw, Trash2 } from "lucide-react";
import { Badge } from "@/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { useDeleteBookmark, useToggleTrash } from "@/lib/api/bookmarks.mutations";
import type { Bookmark } from "@/lib/mockData";

interface TrashCardProps {
  bookmark: Bookmark;
}

export function TrashCard({ bookmark }: TrashCardProps) {
  const { id, title, url, description, favicon, tags, createdAt } = bookmark;

  const { mutate: toggleTrash } = useToggleTrash();
  const { mutate: deleteBookmark } = useDeleteBookmark();

  const hostname = (() => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  })();

  return (
    <article className="flex flex-col gap-150 p-200 rounded-12 bg-neutral-0 border border-neutral-300 h-full opacity-75">
      <div className="flex items-start gap-150">
        <div className="relative size-8 rounded-6 overflow-hidden bg-neutral-100 shrink-0">
          {favicon ? (
            <Image
              src={favicon}
              alt=""
              fill
              sizes="32px"
              className="object-contain"
              unoptimized
            />
          ) : (
            <div className="size-full bg-neutral-100 rounded-6" aria-hidden="true" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-preset-4 text-neutral-900 truncate">{title}</p>
          <p className="text-preset-5 text-neutral-500 truncate">{hostname}</p>
        </div>
        <div className="flex items-center gap-025 shrink-0">
          <button
            onClick={() => toggleTrash(id)}
            aria-label="Restore bookmark"
            className="flex items-center justify-center size-7 rounded-6 cursor-pointer text-neutral-500 hover:bg-neutral-100 hover:text-teal-700 transition-colors"
          >
            <RotateCcw size={14} />
          </button>
          <button
            onClick={() => deleteBookmark(id)}
            aria-label="Permanently delete bookmark"
            className="flex items-center justify-center size-7 rounded-6 cursor-pointer text-neutral-500 hover:bg-red-600/10 hover:text-red-600 transition-colors"
          >
            <Trash2 size={14} />
          </button>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center size-7 rounded-6 cursor-pointer text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            aria-label={`Open ${title}`}
          >
            <ExternalLink size={14} />
          </a>
        </div>
      </div>

      {description && (
        <p className="text-preset-4m text-neutral-800 line-clamp-3 flex-1">{description}</p>
      )}

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-050">
          {tags.map((tag) => (
            <Badge key={tag.id} variant="tag">{tag.name}</Badge>
          ))}
        </div>
      )}

      <p className="text-preset-5 text-neutral-500 border-t border-neutral-100 pt-150 mt-auto">
        {formatDate(createdAt)}
      </p>
    </article>
  );
}
