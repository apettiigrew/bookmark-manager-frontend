"use client";

import { useState } from "react";
import Image from "next/image";
import { ExternalLink, Pencil, Pin, Trash2 } from "lucide-react";
import { Badge } from "@/ui/badge";
import { formatDate } from "@/lib/formatDate";
import { useDeleteBookmark, useTogglePin } from "@/lib/api/bookmarks.mutations";
import type { Bookmark } from "@/lib/mockData";
import { EditBookmarkModal } from "@/components/EditBookmarkModal";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { id, title, url, description, favicon, tags, createdAt, isPinned } = bookmark;
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: deleteBookmark } = useDeleteBookmark();
  const { mutate: togglePin } = useTogglePin();

  const hostname = (() => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  })();

  return (
    <>
      <article className="flex flex-col gap-150 p-200 rounded-12 bg-neutral-0 border border-neutral-300 h-full">
        {/* Header */}
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
          <div className="flex items-center gap-050 shrink-0">
            <button
              onClick={() => togglePin(id)}
              aria-label={isPinned ? "Unpin bookmark" : "Pin bookmark"}
              className="text-neutral-500 hover:text-teal-700 transition-colors"
            >
              <Pin size={14} className={isPinned ? "fill-teal-700 text-teal-700" : ""} />
            </button>
            <button
              onClick={() => setEditOpen(true)}
              aria-label="Edit bookmark"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => deleteBookmark(id)}
              aria-label="Delete bookmark"
              className="text-neutral-500 hover:text-red-600 transition-colors"
            >
              <Trash2 size={14} />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-500 hover:text-neutral-900 transition-colors"
              aria-label={`Open ${title}`}
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Description */}
        {description && (
          <p className="text-preset-4m text-neutral-800 line-clamp-3 flex-1">{description}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-050">
            {tags.map((tag) => (
              <Badge key={tag.id} variant="tag">{tag.name}</Badge>
            ))}
          </div>
        )}

        {/* Footer */}
        <p className="text-preset-5 text-neutral-500 border-t border-neutral-100 pt-150 mt-auto">
          {formatDate(createdAt)}
        </p>
      </article>

      <EditBookmarkModal open={editOpen} onOpenChange={setEditOpen} bookmark={bookmark} />
    </>
  );
}
