"use client";

import { useState } from "react";
import { ArrowUpDown, Trash2 } from "lucide-react";
import { Button } from "@/ui/button";
import { TrashCard } from "@/components/TrashCard";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/ui/dialog";
import { useEmptyTrash } from "@/lib/api/bookmarks.mutations";
import type { Bookmark } from "@/lib/mockData";

interface TrashGridProps {
  bookmarks: Bookmark[];
  sortAsc: boolean;
  onToggleSort: () => void;
}

export function TrashGrid({ bookmarks, sortAsc, onToggleSort }: TrashGridProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutate: emptyTrash, isPending } = useEmptyTrash();

  function handleEmptyTrash() {
    emptyTrash(undefined, { onSuccess: () => setConfirmOpen(false) });
  }

  return (
    <section className="flex flex-col gap-300 flex-1 min-w-0">
      <div className="flex items-center justify-between">
        <h1 className="text-preset-1 text-neutral-900">
          Trash
          <span className="text-preset-3m text-neutral-500 ml-150">
            {bookmarks.length}
          </span>
        </h1>
        <div className="flex items-center gap-150">
          <Button variant="outline" size="sm" onClick={onToggleSort} className="gap-100">
            <ArrowUpDown size={12} />
            {sortAsc ? "Oldest first" : "Newest first"}
          </Button>
          {bookmarks.length > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setConfirmOpen(true)}
              className="gap-100 text-red-600 border-red-600/30 hover:bg-red-600/10 hover:text-red-600"
            >
              <Trash2 size={12} />
              Empty Trash
            </Button>
          )}
        </div>
      </div>

      {bookmarks.length === 0 ? (
        <div className="flex flex-col items-center justify-center flex-1 gap-150 text-neutral-500 py-1000">
          <p className="text-preset-3m">Trash is empty</p>
          <p className="text-preset-4m">Deleted bookmarks will appear here.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-200 items-start">
          {bookmarks.map((bm) => (
            <TrashCard key={bm.id} bookmark={bm} />
          ))}
        </div>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Empty Trash?</DialogTitle>
            <DialogDescription>
              This will permanently delete all {bookmarks.length} bookmark
              {bookmarks.length !== 1 ? "s" : ""} in the trash. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-150 mt-300">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              onClick={handleEmptyTrash}
              disabled={isPending}
              className="bg-red-600 hover:bg-red-800 text-white"
            >
              {isPending ? "Deleting…" : "Empty Trash"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
