export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  tags: string[];
  archived: boolean;
  archivedAt: Date | null;
  createdAt: Date;
}
