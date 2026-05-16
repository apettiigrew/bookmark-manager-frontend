export interface Tag {
  id: string;
  name: string;
  color?: string;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description?: string;
  faviconUrl?: string;
  isFavorited: boolean;
  tags: Tag[];
  createdAt: string;
  updatedAt: string;
}

export interface BookmarksApiResponse {
  data: Bookmark[];
  total: number;
  page: number;
  pageSize: number;
}

export type UnfavoriteResult = Pick<Bookmark, 'id' | 'isFavorited'>;
