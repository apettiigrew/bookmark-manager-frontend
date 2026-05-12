"use client";

import { useState, useMemo } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BookmarkGrid } from "./BookmarkGrid";
import { useGetBookmarks } from "@/lib/api/bookmarks.queries";

export function HomeClient() {
  const { data: bookmarks = [], isLoading } = useGetBookmarks();
  const [search, setSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [sortAsc, setSortAsc] = useState(false);

  function handleTagChange(tag: string, checked: boolean) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      checked ? next.add(tag) : next.delete(tag);
      return next;
    });
  }

  const filtered = useMemo(() => {
    let list = bookmarks;

    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.description.toLowerCase().includes(q) ||
          b.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (selectedTags.size > 0) {
      list = list.filter((b) => b.tags.some((t) => selectedTags.has(t)));
    }

    return [...list].sort((a, b) => {
      const diff = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      return sortAsc ? diff : -diff;
    });
  }, [bookmarks, search, selectedTags, sortAsc]);

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Header searchValue={search} onSearchChange={setSearch} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar selectedTags={selectedTags} onTagChange={handleTagChange} />
        <main className="flex-1 overflow-y-auto p-400">
          {isLoading ? (
            <div className="flex items-center justify-center h-full text-neutral-500 text-preset-3m">
              Loading…
            </div>
          ) : (
            <BookmarkGrid
              bookmarks={filtered}
              sortAsc={sortAsc}
              onToggleSort={() => setSortAsc((v) => !v)}
            />
          )}
        </main>
      </div>
    </div>
  );
}
