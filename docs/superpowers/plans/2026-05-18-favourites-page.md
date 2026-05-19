# Favourites Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `/favourites` route that lists all bookmarks where `isPinned === true`, using the existing API filter `pinned=true`.

**Architecture:** Mirror the existing Home page pattern — a Next.js page shell delegates to a client component (`FavouritesClient`) that fetches pinned bookmarks and renders them inside the shared Header + Sidebar + BookmarkGrid layout. The only shared component that needs touching is `BookmarkGrid`, which gets a `title` prop so the heading can read "Favourites" instead of "All Bookmarks".

**Tech Stack:** Next.js 16 (App Router), React 19, TanStack Query v5, Tailwind CSS v4, TypeScript 5, Lucide React icons.

> **No test framework is installed** (no Jest/Vitest). Verification steps use TypeScript type-checking (`tsc --noEmit`) and ESLint (`npm run lint`) instead of unit tests.

---

## File Map

| Action | Path | Responsibility |
|--------|------|---------------|
| Modify | `src/components/organisms/BookmarkGrid.tsx` | Add optional `title` prop (default `"All Bookmarks"`) and `emptyMessage` prop |
| Create | `src/components/organisms/FavouritesClient.tsx` | Client component — fetches `pinned: true` bookmarks, renders layout |
| Create | `src/app/favourites/page.tsx` | Next.js route shell |

---

### Task 1: Add `title` and `emptyMessage` props to `BookmarkGrid`

**Files:**
- Modify: `src/components/organisms/BookmarkGrid.tsx`

- [ ] **Step 1: Update the `BookmarkGridProps` interface and component signature**

Replace the current file content with:

```tsx
import { Button } from "@/ui/button";
import { BookmarkCard } from "@/components/BookmarkCard";
import { ArrowUpDown } from "lucide-react";
import type { Bookmark } from "@/lib/mockData";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  sortAsc: boolean;
  onToggleSort: () => void;
  title?: string;
  emptyMessage?: string;
}

export function BookmarkGrid({
  bookmarks,
  sortAsc,
  onToggleSort,
  title = "All Bookmarks",
  emptyMessage = "Try adjusting your search or tag filters.",
}: BookmarkGridProps) {
  return (
    <section className="flex flex-col gap-300 flex-1 min-w-0">
      {/* Heading row */}
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 text-neutral-900">
          {title}
          <span className="text-preset-3m text-neutral-500 ml-150">
            {bookmarks.length}
          </span>
        </h1>
        <Button variant="outline" size="sm" onClick={onToggleSort} className="gap-100">
          <ArrowUpDown size={12} />
          {sortAsc ? "Oldest first" : "Newest first"}
        </Button>
      </div>

      {/* Grid */}
      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-150 text-neutral-500 py-1000">
          <p className="text-preset-3m">No bookmarks found</p>
          <p className="text-preset-4m">{emptyMessage}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-200 items-start">
          {bookmarks.map((bm) => (
            <BookmarkCard key={bm.id} bookmark={bm} />
          ))}
        </div>
      )}
    </section>
  );
}
```

- [ ] **Step 2: Verify TypeScript is happy (no new props required at existing call sites — both are optional with defaults)**

```bash
cd /Users/andrewpettigrew/Documents/Projects/Personal/Personal/bookmark-manager-frontend
npx tsc --noEmit
```

Expected: no errors (existing `HomeClient` call passes no `title` and gets the default).

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/BookmarkGrid.tsx
git commit -m "refactor: add optional title and emptyMessage props to BookmarkGrid"
```

---

### Task 2: Create `FavouritesClient`

**Files:**
- Create: `src/components/organisms/FavouritesClient.tsx`

- [ ] **Step 1: Create the file**

```tsx
"use client";

import { useState, useEffect } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { BookmarkGrid } from "./BookmarkGrid";
import { useGetBookmarks } from "@/lib/api/bookmarks.queries";
import { AddBookmarkModal } from "@/components/AddBookmarkModal";

export function FavouritesClient() {
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
    pinned: true,
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
                title="Favourites"
                emptyMessage="Pin a bookmark to see it here."
              />
            )}
          </main>
        </div>
      </div>
      <AddBookmarkModal open={addModalOpen} onOpenChange={setAddModalOpen} />
    </>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/organisms/FavouritesClient.tsx
git commit -m "feat: add FavouritesClient component for pinned bookmarks"
```

---

### Task 3: Create the `/favourites` Next.js page

**Files:**
- Create: `src/app/favourites/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
import { FavouritesClient } from "@/components/organisms/FavouritesClient";

export default function FavouritesPage() {
  return <FavouritesClient />;
}
```

- [ ] **Step 2: Type-check and lint**

```bash
npx tsc --noEmit && npm run lint
```

Expected: no errors or warnings.

- [ ] **Step 3: Commit**

```bash
git add src/app/favourites/page.tsx
git commit -m "feat: add /favourites route for pinned bookmarks"
```

---

### Task 4: Verify end-to-end

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Expected: server starts on `http://localhost:3000` with no build errors.

- [ ] **Step 2: Manual checks**

1. Open `http://localhost:3000` — "All Bookmarks" heading still appears. ✓
2. Click "Favourites" in the sidebar — navigates to `/favourites`. ✓
3. The "Favourites" heading appears with the pinned-bookmark count. ✓
4. The "Favourites" nav item is highlighted (active state). ✓
5. If no bookmarks are pinned: empty state reads "No bookmarks found" / "Pin a bookmark to see it here." ✓
6. If bookmarks are pinned: they render in the same card grid. ✓

- [ ] **Step 3: Production build check**

```bash
npm run build
```

Expected: build completes with no errors. Both `/` and `/favourites` listed in the route output.
