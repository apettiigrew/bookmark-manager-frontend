"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/ui/dialog";
import { Button } from "@/ui/button";
import { useUpdateBookmark } from "@/lib/api/bookmarks.mutations";
import { cn } from "@/lib/utils";
import type { Bookmark } from "@/lib/mockData";

interface EditBookmarkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookmark: Bookmark;
}

const fieldClass =
  "w-full rounded-8 border border-neutral-400 px-150 py-100 " +
  "text-preset-4m text-neutral-900 bg-neutral-0 " +
  "placeholder:text-neutral-500 outline-none " +
  "focus:border-neutral-800 transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export function EditBookmarkModal({ open, onOpenChange, bookmark }: EditBookmarkModalProps) {
  const [title, setTitle]             = useState(bookmark.title);
  const [description, setDescription] = useState(bookmark.description ?? "");
  const [url, setUrl]                 = useState(bookmark.url);
  const [tags, setTags]               = useState(bookmark.tags.map((t) => t.name).join(", "));

  const { mutate: updateBookmark, isPending } = useUpdateBookmark(bookmark.id);

  function resetForm() {
    setTitle(bookmark.title);
    setDescription(bookmark.description ?? "");
    setUrl(bookmark.url);
    setTags(bookmark.tags.map((t) => t.name).join(", "));
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    updateBookmark(
      { title: title.trim(), url: url.trim(), description: description.trim() || undefined, tags: tagsArray },
      { onSuccess: () => { onOpenChange(false); } }
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit bookmark</DialogTitle>
          <DialogDescription>
            Update the details for this bookmark.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-300 mt-300">
          <div className="flex flex-col gap-075">
            <label htmlFor="edit-bm-title" className="text-preset-4 text-neutral-900">
              Title <span aria-hidden="true">*</span>
            </label>
            <input
              id="edit-bm-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-075">
            <label htmlFor="edit-bm-desc" className="text-preset-4 text-neutral-900">
              Description
            </label>
            <div className="relative">
              <textarea
                id="edit-bm-desc"
                maxLength={280}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={cn(fieldClass, "resize-none pb-500")}
                disabled={isPending}
              />
              <span className="absolute bottom-100 right-150 text-preset-5 text-neutral-500 pointer-events-none">
                {description.length}/280
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-075">
            <label htmlFor="edit-bm-url" className="text-preset-4 text-neutral-900">
              Website URL <span aria-hidden="true">*</span>
            </label>
            <input
              id="edit-bm-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={fieldClass}
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-075">
            <label htmlFor="edit-bm-tags" className="text-preset-4 text-neutral-900">
              Tags
            </label>
            <input
              id="edit-bm-tags"
              type="text"
              placeholder="e.g. Design, Learning, Tools"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              className={fieldClass}
              disabled={isPending}
            />
          </div>

          <div className="flex justify-end gap-200 mt-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button type="submit" variant="default" disabled={isPending}>
              {isPending ? "Saving…" : "Save Changes"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
