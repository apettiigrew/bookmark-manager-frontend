import type { Bookmark } from "@/types/bookmark";

export const mockBookmarks: Bookmark[] = [
  {
    id: "1",
    title: "Next.js Documentation",
    url: "https://nextjs.org/docs",
    description:
      "The official Next.js documentation covering App Router, Server Components, data fetching, and deployment.",
    tags: ["nextjs", "react", "docs"],
    archived: true,
    archivedAt: new Date("2025-03-10T09:15:00Z"),
    createdAt: new Date("2024-11-01T14:00:00Z"),
  },
  {
    id: "2",
    title: "Tailwind CSS v4 Upgrade Guide",
    url: "https://tailwindcss.com/docs/upgrade-guide",
    description:
      "Complete guide to migrating from Tailwind CSS v3 to v4, including the new CSS-first configuration approach.",
    tags: ["tailwind", "css", "upgrade"],
    archived: true,
    archivedAt: new Date("2025-04-02T11:30:00Z"),
    createdAt: new Date("2025-01-15T08:45:00Z"),
  },
  {
    id: "3",
    title: "TypeScript Handbook",
    url: "https://www.typescriptlang.org/docs/handbook/intro.html",
    description:
      "The definitive guide to TypeScript — from basic types to advanced generics and utility types.",
    tags: ["typescript", "docs", "reference"],
    archived: true,
    archivedAt: new Date("2025-02-20T16:00:00Z"),
    createdAt: new Date("2024-08-05T10:20:00Z"),
  },
  {
    id: "4",
    title: "React 19 Release Notes",
    url: "https://react.dev/blog/2024/12/05/react-19",
    description:
      "What's new in React 19: Actions, useActionState, useFormStatus, improved hydration error handling, and more.",
    tags: ["react", "release", "blog"],
    archived: true,
    archivedAt: new Date("2025-01-08T13:45:00Z"),
    createdAt: new Date("2024-12-06T09:00:00Z"),
  },
  {
    id: "5",
    title: "Vercel Deployment Checklist",
    url: "https://vercel.com/docs/deployments/overview",
    description:
      "Step-by-step checklist for deploying Next.js applications to Vercel, including environment variables and preview deployments.",
    tags: ["vercel", "deployment", "nextjs"],
    archived: true,
    archivedAt: new Date("2025-03-28T08:00:00Z"),
    createdAt: new Date("2025-01-22T12:30:00Z"),
  },
  {
    id: "6",
    title: "MDN Web Docs — Fetch API",
    url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API",
    description:
      "Comprehensive reference for the browser Fetch API including Request, Response, and Headers interfaces.",
    tags: ["web", "api", "reference", "mdn"],
    archived: false,
    archivedAt: null,
    createdAt: new Date("2025-02-10T15:00:00Z"),
  },
  {
    id: "7",
    title: "CSS Grid Layout Guide",
    url: "https://css-tricks.com/snippets/css/complete-guide-grid/",
    description:
      "A comprehensive visual guide to CSS Grid Layout with interactive examples and browser compatibility notes.",
    tags: ["css", "grid", "layout", "reference"],
    archived: false,
    archivedAt: null,
    createdAt: new Date("2025-04-15T10:00:00Z"),
  },
];
