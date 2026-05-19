export interface BookmarkTag {
  id: string;
  name: string;
}

export interface Bookmark {
  id: string;
  title: string;
  description: string | null;
  url: string;
  favicon: string | null;
  viewCount: number;
  lastVisited: string | null;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  tags: BookmarkTag[];
}

export interface Tag {
  id: string;
  name: string;
  bookmarkCount: number;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const MOCK_NAV_ITEMS: NavItem[] = [
  { id: "n1", label: "All Bookmarks", href: "/",           icon: "Bookmark" },
  { id: "n2", label: "Favourites",    href: "/favourites", icon: "Heart"    },
  { id: "n3", label: "Archive",       href: "/archive",    icon: "Archive"  },
  { id: "n4", label: "Trash",         href: "/trash",      icon: "Trash2"   },
];
