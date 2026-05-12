export interface Tag {
  id: string;
  name: string;
  count: number;
}

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  description: string;
  faviconUrl: string;
  tags: string[];
  createdAt: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon: string;
}

export const MOCK_TAGS: Tag[] = [
  { id: "t1",  name: "design",        count: 5  },
  { id: "t2",  name: "development",   count: 8  },
  { id: "t3",  name: "productivity",  count: 3  },
  { id: "t4",  name: "ai",            count: 6  },
  { id: "t5",  name: "typography",    count: 2  },
  { id: "t6",  name: "accessibility", count: 4  },
  { id: "t7",  name: "tooling",       count: 7  },
  { id: "t8",  name: "performance",   count: 3  },
  { id: "t9",  name: "css",           count: 5  },
  { id: "t10", name: "react",         count: 9  },
  { id: "t11", name: "testing",       count: 4  },
  { id: "t12", name: "security",      count: 2  },
  { id: "t13", name: "ux",            count: 6  },
  { id: "t14", name: "animation",     count: 3  },
  { id: "t15", name: "api",           count: 5  },
  { id: "t16", name: "database",      count: 4  },
  { id: "t17", name: "devops",        count: 3  },
];

export const MOCK_BOOKMARKS: Bookmark[] = [
  {
    id: "b1",
    title: "Tailwind CSS v4 Alpha",
    url: "https://tailwindcss.com",
    description: "A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=tailwindcss.com&sz=32",
    tags: ["css", "design", "tooling"],
    createdAt: "2025-11-03T09:00:00Z",
  },
  {
    id: "b2",
    title: "React 19 Release Notes",
    url: "https://react.dev",
    description: "The library for web and native user interfaces. New features include Actions, use() hook, and improved hydration.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=react.dev&sz=32",
    tags: ["react", "development"],
    createdAt: "2025-11-10T14:30:00Z",
  },
  {
    id: "b3",
    title: "Figma Auto Layout 5.0",
    url: "https://figma.com",
    description: "Auto layout lets you create designs that grow to fill or shrink to fit, and reflow as their contents change.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=figma.com&sz=32",
    tags: ["design", "ux"],
    createdAt: "2025-11-15T11:00:00Z",
  },
  {
    id: "b4",
    title: "Claude API Documentation",
    url: "https://docs.anthropic.com",
    description: "Build reliable, interpretable, and steerable AI systems with Anthropic's Claude API and developer platform.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=anthropic.com&sz=32",
    tags: ["ai", "api", "development"],
    createdAt: "2025-11-20T08:45:00Z",
  },
  {
    id: "b5",
    title: "Radix UI Primitives",
    url: "https://radix-ui.com",
    description: "An open source component library optimised for fast development, easy maintenance, and accessibility.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=radix-ui.com&sz=32",
    tags: ["react", "accessibility", "design"],
    createdAt: "2025-11-22T16:00:00Z",
  },
  {
    id: "b6",
    title: "Vitest — Next Gen Testing",
    url: "https://vitest.dev",
    description: "A Vite-native testing framework. It's fast, compatible with Jest's API, and built on top of Vite's transform pipeline.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=vitest.dev&sz=32",
    tags: ["testing", "tooling", "development"],
    createdAt: "2025-11-25T10:15:00Z",
  },
  {
    id: "b7",
    title: "Web Animations API Guide",
    url: "https://developer.mozilla.org",
    description: "The Web Animations API allows for synchronizing and timing changes to the presentation of a Web page.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=developer.mozilla.org&sz=32",
    tags: ["animation", "css", "performance"],
    createdAt: "2025-11-28T13:30:00Z",
  },
  {
    id: "b8",
    title: "TanStack Query v5",
    url: "https://tanstack.com/query",
    description: "Powerful asynchronous state management for TypeScript/JavaScript, React, Vue, Solid, Svelte and Angular.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=tanstack.com&sz=32",
    tags: ["react", "development", "api"],
    createdAt: "2025-12-01T09:00:00Z",
  },
  {
    id: "b9",
    title: "Manrope Variable Font",
    url: "https://fonts.google.com",
    description: "Manrope is a modern wide font family. It mixes the proportions of a modern grotesque with geometric elements.",
    faviconUrl: "https://www.google.com/s2/favicons?domain=fonts.google.com&sz=32",
    tags: ["typography", "design"],
    createdAt: "2025-12-05T15:00:00Z",
  },
];

export const MOCK_NAV_ITEMS: NavItem[] = [
  { id: "n1", label: "All Bookmarks", href: "/",           icon: "Bookmark" },
  { id: "n2", label: "Favourites",    href: "/favourites", icon: "Heart"    },
  { id: "n3", label: "Archive",       href: "/archive",    icon: "Archive"  },
  { id: "n4", label: "Trash",         href: "/trash",      icon: "Trash2"   },
];
