import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost, apiPatch, apiDelete } from "./client";
import { bookmarkKeys } from "./bookmarks.queries";
import type { Bookmark } from "@/lib/mockData";

type CreatePayload = Omit<Bookmark, "id" | "createdAt">;
type UpdatePayload = Partial<CreatePayload>;

export function useCreateBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePayload) => apiPost<Bookmark>("/bookmarks", data),
    onSuccess: () => qc.invalidateQueries({ queryKey: bookmarkKeys.all() }),
  });
}

export function useUpdateBookmark(id: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: UpdatePayload) => apiPatch<Bookmark>(`/bookmarks/${id}`, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: bookmarkKeys.all() });
      qc.invalidateQueries({ queryKey: bookmarkKeys.detail(id) });
    },
  });
}

export function useDeleteBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiDelete<void>(`/bookmarks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: bookmarkKeys.all() }),
  });
}
