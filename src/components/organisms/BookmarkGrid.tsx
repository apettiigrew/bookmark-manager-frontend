import { Button } from "@/ui/button";
import { BookmarkCard } from "@/components/BookmarkCard";
import { ArrowUpDown } from "lucide-react";
import type { Bookmark } from "@/lib/mockData";

interface BookmarkGridProps {
  bookmarks: Bookmark[];
  sortAsc: boolean;
  onToggleSort: () => void;
}

export function BookmarkGrid({ bookmarks, sortAsc, onToggleSort }: BookmarkGridProps) {
  return (
    <section className="flex flex-col gap-300 flex-1 min-w-0">
      {/* Heading row */}
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 text-neutral-900">
          All Bookmarks
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
          <p className="text-preset-4m">Try adjusting your search or tag filters.</p>
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
