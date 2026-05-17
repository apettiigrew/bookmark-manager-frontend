import { queryOptions, useQuery } from "@tanstack/react-query";
import { apiGet } from "./client";
import type { Bookmark, Tag } from "@/lib/mockData";

export interface BookmarkListParams {
  search?: string;
  tags?: string[];
  archived?: boolean;
  pinned?: boolean;
  sortBy?: "createdAt" | "lastVisited" | "viewCount";
  order?: "asc" | "desc";
  page?: number;
  limit?: number;
}

export interface BookmarkListResponse {
  data: Bookmark[];
  meta: { total: number; page: number; limit: number; totalPages: number };
}

export const bookmarkKeys = {
  all:    ()                              => ["bookmarks"]                    as const,
  list:   (params: BookmarkListParams)    => ["bookmarks", "list", params]    as const,
  detail: (id: string)                    => ["bookmarks", id]                as const,
  tags:   ()                              => ["bookmarks", "tags"]            as const,
};

function buildQueryString(params: BookmarkListParams): string {
  const p = new URLSearchParams();
  if (params.search)                   p.set("search",   params.search);
  if (params.tags?.length)             p.set("tags",     params.tags.join(","));
  if (params.archived !== undefined)   p.set("archived", String(params.archived));
  if (params.pinned   !== undefined)   p.set("pinned",   String(params.pinned));
  if (params.sortBy)                   p.set("sortBy",   params.sortBy);
  if (params.order)                    p.set("order",    params.order);
  if (params.page)                     p.set("page",     String(params.page));
  if (params.limit)                    p.set("limit",    String(params.limit));
  const qs = p.toString();
  return qs ? `?${qs}` : "";
}

export const bookmarkQueryOptions = {
  list: (params: BookmarkListParams = {}) => queryOptions({
    queryKey: bookmarkKeys.list(params),
    queryFn: () => apiGet<BookmarkListResponse>(`/bookmarks${buildQueryString(params)}`),
    staleTime: 30 * 1000,
  }),
  detail: (id: string) => queryOptions({
    queryKey: bookmarkKeys.detail(id),
    queryFn: () => apiGet<Bookmark>(`/bookmarks/${id}`),
    enabled: !!id,
  }),
  tags: () => queryOptions({
    queryKey: bookmarkKeys.tags(),
    queryFn: () => apiGet<Tag[]>("/bookmarks/tags"),
    staleTime: 5 * 60 * 1000,
  }),
};

export function useGetBookmarks(params: BookmarkListParams = {}) {
  return useQuery(bookmarkQueryOptions.list(params));
}

export function useGetBookmark(id: string) {
  return useQuery(bookmarkQueryOptions.detail(id));
}

export function useGetTags() {
  return useQuery(bookmarkQueryOptions.tags());
}
