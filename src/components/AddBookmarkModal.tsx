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
import { useCreateBookmark } from "@/lib/api/bookmarks.mutations";
import { cn } from "@/lib/utils";

interface AddBookmarkModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const fieldClass =
  "w-full rounded-8 border border-neutral-400 px-150 py-100 " +
  "text-preset-4m text-neutral-900 bg-neutral-0 " +
  "placeholder:text-neutral-500 outline-none " +
  "focus:border-neutral-800 transition-colors " +
  "disabled:cursor-not-allowed disabled:opacity-50";

export function AddBookmarkModal({ open, onOpenChange }: AddBookmarkModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");

  const { mutate: createBookmark, isPending } = useCreateBookmark();

  function resetForm() {
    setTitle("");
    setDescription("");
    setUrl("");
    setTags("");
  }

  function handleOpenChange(nextOpen: boolean) {
    if (!nextOpen) resetForm();
    onOpenChange(nextOpen);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean);
    createBookmark(
      { title: title.trim(), url: url.trim(), description: description.trim() || undefined, tags: tagsArray },
      { onSuccess: () => { resetForm(); onOpenChange(false); } }
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a bookmark</DialogTitle>
          <DialogDescription>
            Save a link with details to keep your collection organized. We extract the
            favicon automatically from the URL.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-300 mt-300">
          <div className="flex flex-col gap-075">
            <label htmlFor="bm-title" className="text-preset-4 text-neutral-900">
              Title <span aria-hidden="true">*</span>
            </label>
            <input
              id="bm-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={fieldClass}
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-075">
            <label htmlFor="bm-desc" className="text-preset-4 text-neutral-900">
              Description <span aria-hidden="true">*</span>
            </label>
            <div className="relative">
              <textarea
                id="bm-desc"
                required
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
            <label htmlFor="bm-url" className="text-preset-4 text-neutral-900">
              Website URL <span aria-hidden="true">*</span>
            </label>
            <input
              id="bm-url"
              type="url"
              required
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={fieldClass}
              disabled={isPending}
            />
          </div>

          <div className="flex flex-col gap-075">
            <label htmlFor="bm-tags" className="text-preset-4 text-neutral-900">
              Tags <span aria-hidden="true">*</span>
            </label>
            <input
              id="bm-tags"
              type="text"
              required
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
              {isPending ? "Adding…" : "Add Bookmark"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
