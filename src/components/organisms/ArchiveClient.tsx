"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BookmarkGrid } from "./BookmarkGrid";
import { useGetBookmarks } from "@/lib/api/bookmarks.queries";
import { AddBookmarkModal } from "@/components/AddBookmarkModal";

export function ArchiveClient() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());
  const [sortAsc, setSortAsc] = useState(false);
  const [addModalOpen, setAddModalOpen] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedSearch(search), 300);
    return () => clearTimeout(id);
  }, [search]);

  const { data: result, isLoading, isError } = useGetBookmarks({
    archived: true,
    search: debouncedSearch || undefined,
    tags: selectedTags.size > 0 ? [...selectedTags] : undefined,
    order: sortAsc ? "asc" : "desc",
    sortBy: "createdAt",
  });

  const bookmarks = result?.data ?? [];

  function handleTagChange(tag: string, checked: boolean) {
    setSelectedTags((prev) => {
      const next = new Set(prev);
      checked ? next.add(tag) : next.delete(tag);
      return next;
    });
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden">
        <Header searchValue={search} onSearchChange={setSearch} onOpenAddModal={() => setAddModalOpen(true)} />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar selectedTags={selectedTags} onTagChange={handleTagChange} />
          <main className="flex-1 overflow-y-auto p-400">
            {isLoading ? (
              <div className="flex items-center justify-center h-full text-neutral-500 text-preset-3m">
                Loading…
              </div>
            ) : isError ? (
              <div className="flex items-center justify-center h-full text-red-600 text-preset-3m">
                Failed to load bookmarks. Check that the backend is running.
              </div>
            ) : (
              <BookmarkGrid
                bookmarks={bookmarks}
                sortAsc={sortAsc}
                onToggleSort={() => setSortAsc((v) => !v)}
                title="Archive"
                emptyMessage="Archived bookmarks will appear here."
              />
            )}
          </main>
        </div>
      </div>
      <AddBookmarkModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </>
  );
}
