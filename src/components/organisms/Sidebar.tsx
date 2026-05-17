"use client";

import { NavItem } from "@/components/NavItem";
import { TagFilterItem } from "@/components/TagFilterItem";
import { MOCK_NAV_ITEMS } from "@/lib/mockData";
import { useGetTags } from "@/lib/api/bookmarks.queries";

interface SidebarProps {
  selectedTags: Set<string>;
  onTagChange: (tag: string, checked: boolean) => void;
}

export function Sidebar({ selectedTags, onTagChange }: SidebarProps) {
  const { data: tags = [], isLoading: tagsLoading } = useGetTags();

  return (
    <aside className="flex flex-col gap-300 w-56 shrink-0 py-300 px-200 bg-neutral-0 border-r border-neutral-300 overflow-y-auto">
      {/* Navigation */}
      <nav className="flex flex-col gap-025">
        {MOCK_NAV_ITEMS.map((item) => (
          <NavItem key={item.id} href={item.href} label={item.label} icon={item.icon} />
        ))}
      </nav>

      {/* Divider */}
      <div className="border-t border-neutral-300" />

      {/* Tags */}
      <div className="flex flex-col gap-100">
        <p className="text-preset-5 text-neutral-500 px-150">Tags</p>
        <div className="flex flex-col gap-025">
          {tagsLoading ? (
            <p className="text-preset-5 text-neutral-500 px-150">Loading…</p>
          ) : (
            tags.map((tag) => (
              <TagFilterItem
                key={tag.id}
                id={`tag-${tag.id}`}
                name={tag.name}
                count={tag.bookmarkCount}
                checked={selectedTags.has(tag.name)}
                onCheckedChange={(checked) => onTagChange(tag.name, checked)}
              />
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
