import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiPost, apiPatch, apiDelete } from "./client";
import { bookmarkKeys } from "./bookmarks.queries";
import type { Bookmark } from "@/lib/mockData";

type CreatePayload = {
  title: string;
  url: string;
  description?: string;
  tags?: string[];
};

type UpdatePayload = Partial<{
  title: string;
  url: string;
  description: string;
  tags: string[];
}>;

export function useCreateBookmark() {
  const qc = useQueryClient();
  return useMutation({
    mutationKey: ['createBookmark'],
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

export function useTogglePin() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPatch<Bookmark>(`/bookmarks/${id}/pin`, {}),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: bookmarkKeys.all() });
      qc.invalidateQueries({ queryKey: bookmarkKeys.detail(id) });
    },
  });
}

export function useToggleArchive() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPatch<Bookmark>(`/bookmarks/${id}/archive`, {}),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: bookmarkKeys.all() });
      qc.invalidateQueries({ queryKey: bookmarkKeys.detail(id) });
    },
  });
}

export function useRecordVisit() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => apiPost<void>(`/bookmarks/${id}/visit`, {}),
    onSuccess: (_, id) => {
      qc.invalidateQueries({ queryKey: bookmarkKeys.detail(id) });
    },
  });
}
