# Bookmark Manager Homepage — Implementation Plan

## Overview

Building the complete homepage UI matching the design screenshot. Full-viewport layout with a top header bar, left sidebar for navigation and tag filtering, and a main content area showing a 3-column bookmark card grid.

**Stack:**
- shadcn/ui (manually installed — Radix UI primitives + CVA) for UI components
- lucide-react for icons
- TanStack Query (`@tanstack/react-query`) for server state
- Tailwind CSS v4 with custom design tokens
- Manrope font via `next/font/google`

---

## File Structure

```
src/
├── app/
│   ├── globals.css              ✅ Design tokens, typography presets
│   ├── layout.tsx               ✅ Manrope font + QueryProvider
│   └── page.tsx                 ⬜ Delegates to HomeClient
│
├── lib/
│   ├── utils.ts                 ✅ cn() helper (clsx + tailwind-merge)
│   ├── mockData.ts              ⬜ Typed Bookmark, Tag, NavItem + mock arrays
│   ├── formatDate.ts            ⬜ Intl.DateTimeFormat helper
│   └── api/
│       ├── client.ts            ⬜ Base fetch wrapper (NEXT_PUBLIC_API_URL)
│       ├── bookmarks.queries.ts ⬜ useGetBookmarks, useGetBookmark hooks
│       └── bookmarks.mutations.ts ⬜ useCreateBookmark, useUpdateBookmark, useDeleteBookmark
│
└── components/
    ├── QueryProvider.tsx         ✅ "use client" TanStack Query wrapper
    │
    ├── ui/                      (shadcn-style, manually written)
    │   ├── button.tsx            ✅ primary (default) + outlined (outline) variants
    │   ├── badge.tsx             ✅ tag + count variants
    │   ├── checkbox.tsx          ✅ Radix CheckboxPrimitive, teal when checked
    │   ├── avatar.tsx            ✅ Radix AvatarPrimitive, teal fallback
    │   └── input.tsx             ✅ Unstyled input for use inside SearchBar
    │
    ├── SearchBar.tsx             ⬜ Input + lucide Search icon
    ├── NavItem.tsx               ⬜ Next.js Link, active/inactive states
    ├── TagFilterItem.tsx         ⬜ Checkbox + label + Badge(count)
    ├── BookmarkCard.tsx          ⬜ Full card: favicon, description, Badge tags, footer
    │
    └── organisms/
        ├── Header.tsx            ⬜ Logo + SearchBar + Button + Avatar
        ├── Sidebar.tsx           ⬜ NavItem list + tags section + TagFilterItem list
        ├── BookmarkGrid.tsx      ⬜ Heading + sort Button + 3-col card grid
        └── HomeClient.tsx        ⬜ "use client" root, TanStack Query consumer, filter state
```

---

## Phases

### Phase 1 — Foundation ✅ Complete

- [x] Install dependencies: `@tanstack/react-query`, `class-variance-authority`, `clsx`, `tailwind-merge`, `lucide-react`, `@radix-ui/react-checkbox`, `@radix-ui/react-avatar`, `@radix-ui/react-slot`
- [x] `globals.css` — `@theme` design tokens (colors, spacing, radius), typography utility classes, Manrope font wiring
- [x] `layout.tsx` — Manrope from `next/font/google`, `QueryProvider` wrapper
- [x] `src/lib/utils.ts` — `cn()` helper
- [x] `src/components/ui/button.tsx` — `default` (teal fill) + `outline` variants
- [x] `src/components/ui/badge.tsx` — `tag` (neutral pill) + `count` (teal pill) variants
- [x] `src/components/ui/checkbox.tsx` — Radix primitive, teal checked state
- [x] `src/components/ui/avatar.tsx` — Radix primitive, teal fallback
- [x] `src/components/ui/input.tsx` — bare input for use inside SearchBar
- [x] `src/components/QueryProvider.tsx` — TanStack QueryClient wrapper

### Phase 2 — Data Layer ✅ Complete

- [x] `src/lib/mockData.ts` — types + 9 mock bookmarks + 17 tags + nav items
- [x] `src/lib/formatDate.ts` — `Intl.DateTimeFormat` short date helper
- [x] `src/lib/api/client.ts` — `apiGet`, `apiPost`, `apiPatch`, `apiDelete` using `NEXT_PUBLIC_API_URL`
- [x] `src/lib/api/bookmarks.queries.ts` — `useGetBookmarks`, `useGetBookmark` (falls back to mock data)
- [x] `src/lib/api/bookmarks.mutations.ts` — `useCreateBookmark`, `useUpdateBookmark`, `useDeleteBookmark`

### Phase 3 — Composite Components ✅ Complete

- [x] `src/components/SearchBar.tsx`
- [x] `src/components/NavItem.tsx`
- [x] `src/components/TagFilterItem.tsx`
- [x] `src/components/BookmarkCard.tsx`

### Phase 4 — Organisms ✅ Complete

- [x] `src/components/organisms/Header.tsx`
- [x] `src/components/organisms/Sidebar.tsx`
- [x] `src/components/organisms/BookmarkGrid.tsx`

### Phase 5 — Page Assembly ✅ Complete

- [x] `src/components/organisms/HomeClient.tsx`
- [x] `src/app/page.tsx`

---

## Design System Reference

### Typography Presets (utility classes in globals.css)

| Class | Weight | Size | Line Height |
|---|---|---|---|
| `.text-preset-1` | 700 | 24px | 140% |
| `.text-preset-2` | 700 | 20px | 120% |
| `.text-preset-2sb` | 600 | 20px | 120% |
| `.text-preset-3` | 600 | 16px | 140% |
| `.text-preset-3m` | 500 | 16px | 130% |
| `.text-preset-4` | 600 | 14px | 140% |
| `.text-preset-4m` | 500 | 14px | 150% |
| `.text-preset-5` | 500 | 12px | 140% |

### Color Tokens (Tailwind classes via `@theme`)

| Token | Hex | Tailwind class |
|---|---|---|
| neutral-0 | `#FFFFFF` | `bg-neutral-0` |
| neutral-100 | `#E8F0EF` | `bg-neutral-100` |
| neutral-300 | `#DDE9E7` | `bg-neutral-300` |
| neutral-400 | `#C0CFCC` | `bg-neutral-400` |
| neutral-500 | `#899492` | `text-neutral-500` |
| neutral-800 | `#4C5C59` | `text-neutral-800` |
| neutral-900 | `#051513` | `text-neutral-900` |
| teal-700 | `#014745` | `bg-teal-700` |
| teal-800 | `#013C3B` | `bg-teal-800` |
| red-600 | `#FD4740` | `text-red-600` |

### Spacing Tokens (`--spacing-*` → `p-*`, `gap-*`, `m-*` etc.)

`025`=2px · `050`=4px · `075`=6px · `100`=8px · `125`=10px · `150`=12px · `200`=16px · `250`=20px · `300`=24px · `400`=32px · `500`=40px

### Border Radius (`--radius-*` → `rounded-*`)

`rounded-4`=4px · `rounded-6`=6px · `rounded-8`=8px · `rounded-12`=12px · `rounded-16`=16px · `rounded-full`=999px

---

## API Layer Design

The API layer is structured so the frontend works with mock data now and can swap to a real backend by setting `NEXT_PUBLIC_API_URL` in `.env.local`.

```
NEXT_PUBLIC_API_URL=https://api.example.com
```

When the env var is unset, query hooks return `MOCK_BOOKMARKS` directly. When set, they call the real REST endpoints.

**Query keys:**
```ts
bookmarkKeys.all      → ["bookmarks"]
bookmarkKeys.detail   → ["bookmarks", id]
```

**Mutations invalidate** `bookmarkKeys.all` on success (and `bookmarkKeys.detail` for updates).
