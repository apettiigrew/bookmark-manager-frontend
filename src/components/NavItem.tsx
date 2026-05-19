"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bookmark, Heart, Archive, Trash2, type LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

const ICONS: Record<string, React.ComponentType<LucideProps>> = {
  Bookmark,
  Heart,
  Archive,
  Trash2,
};

interface NavItemProps {
  href: string;
  label: string;
  icon: string;
}

export function NavItem({ href, label, icon }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const Icon = ICONS[icon] ?? Bookmark;

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-150 px-150 py-100 rounded-8 text-preset-4 transition-colors",
        isActive
          ? "bg-teal-700 text-white"
          : "text-neutral-800 hover:bg-neutral-100"
      )}
    >
      <Icon size={16} className="shrink-0" />
      {label}
    </Link>
  );
}
