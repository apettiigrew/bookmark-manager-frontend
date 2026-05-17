import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Bookmark Manager",
  description: "Manage and archive your bookmarks.",
};

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-8 px-16 py-32 text-center sm:items-start sm:text-left">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Bookmark Manager
          </h1>
          <p className="text-base leading-7 text-zinc-600 dark:text-zinc-400">
            Save, organize, and review your bookmarks. Archived bookmarks are
            stored separately for reference.
          </p>
        </div>

        <Link
          href="/archive"
          className="inline-flex h-11 items-center justify-center rounded-full bg-zinc-900 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
        >
          View Archived Bookmarks →
        </Link>
      </main>
    </div>
  );
}
