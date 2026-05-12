import { useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import { MOCK_BOOKMARKS, type Bookmark } from "@/lib/mockData";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const bookmarkKeys = {
  all:    () => ["bookmarks"]             as const,
  detail: (id: string) => ["bookmarks", id] as const,
};

export function useGetBookmarks() {
  return useQuery({
    queryKey: bookmarkKeys.all(),
    queryFn: () =>
      API_URL
        ? apiGet<Bookmark[]>("/bookmarks")
        : Promise.resolve(MOCK_BOOKMARKS),
  });
}

export function useGetBookmark(id: string) {
  return useQuery({
    queryKey: bookmarkKeys.detail(id),
    queryFn: () =>
      API_URL
        ? apiGet<Bookmark>(`/bookmarks/${id}`)
        : Promise.resolve(MOCK_BOOKMARKS.find((b) => b.id === id) ?? null),
    enabled: !!id,
  });
}
