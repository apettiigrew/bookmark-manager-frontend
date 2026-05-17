import type { Bookmark } from "@/types/bookmark";

interface BookmarkCardProps {
  bookmark: Bookmark;
}

function formatArchivedAt(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function getHostname(url: string): string {
  try {
    return new URL(url).hostname;
  } catch {
    return url;
  }
}

export default function BookmarkCard({ bookmark }: BookmarkCardProps) {
  const hostname = getHostname(bookmark.url);

  return (
    <article className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-col gap-1">
        <a
          href={bookmark.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-base font-semibold leading-snug text-zinc-900 hover:underline dark:text-zinc-50"
        >
          {bookmark.title}
        </a>
        <span className="text-xs text-zinc-400 dark:text-zinc-500">
          {hostname}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {bookmark.description}
      </p>

      {bookmark.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {bookmark.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs font-medium text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {bookmark.archived && bookmark.archivedAt !== null && (
        <p className="mt-auto text-xs text-zinc-400 dark:text-zinc-500">
          Archived {formatArchivedAt(bookmark.archivedAt)}
        </p>
      )}
    </article>
  );
}
