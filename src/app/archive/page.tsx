import type { Metadata } from "next";
import Link from "next/link";
import BookmarkCard from "@/components/BookmarkCard";
import { mockBookmarks } from "@/lib/mock-data";
import type { Bookmark } from "@/types/bookmark";

export const metadata: Metadata = {
  title: "Archived Bookmarks",
  description: "Your archived bookmarks.",
};

export default function ArchivePage() {
  const archivedBookmarks: Bookmark[] = mockBookmarks.filter((b) => b.archived);

  return (
    <div className="min-h-full bg-zinc-50 font-sans dark:bg-zinc-950">
      <header className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                Archived Bookmarks
              </h1>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                {archivedBookmarks.length}{" "}
                {archivedBookmarks.length === 1 ? "bookmark" : "bookmarks"} archived
              </p>
            </div>
            <Link
              href="/"
              className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← Home
            </Link>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-10">
        {archivedBookmarks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 text-4xl">📦</div>
            <h2 className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">
              No archived bookmarks
            </h2>
            <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
              Bookmarks you archive will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {archivedBookmarks.map((bookmark) => (
              <BookmarkCard key={bookmark.id} bookmark={bookmark} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
