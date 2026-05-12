import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/formatDate";
import type { Bookmark } from "@/lib/mockData";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

export function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const { title, url, description, faviconUrl, tags, createdAt } = bookmark;
  const hostname = (() => {
    try { return new URL(url).hostname.replace("www.", ""); }
    catch { return url; }
  })();

  return (
    <article className="flex flex-col gap-150 p-200 rounded-12 bg-neutral-0 border border-neutral-300 h-full">
      {/* Header */}
      <div className="flex items-start gap-150">
        <div className="relative size-8 rounded-6 overflow-hidden bg-neutral-100 shrink-0">
          <Image
            src={faviconUrl}
            alt=""
            fill
            sizes="32px"
            className="object-contain"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-preset-4 text-neutral-900 truncate">{title}</p>
          <p className="text-preset-5 text-neutral-500 truncate">{hostname}</p>
        </div>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 text-neutral-500 hover:text-neutral-900 transition-colors"
          aria-label={`Open ${title}`}
        >
          <ExternalLink size={14} />
        </a>
      </div>

      {/* Description */}
      <p className="text-preset-4m text-neutral-800 line-clamp-3 flex-1">{description}</p>

      {/* Tags */}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-050">
          {tags.map((tag) => (
            <Badge key={tag} variant="tag">{tag}</Badge>
          ))}
        </div>
      )}

      {/* Footer */}
      <p className="text-preset-5 text-neutral-500 border-t border-neutral-100 pt-150 mt-auto">
        {formatDate(createdAt)}
      </p>
    </article>
  );
}
