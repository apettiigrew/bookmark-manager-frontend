"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  containerClassName?: string;
}

export function SearchBar({ containerClassName, className, ...props }: SearchBarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-100 px-150 py-100 rounded-8 border border-neutral-300 bg-neutral-0 w-full",
        "focus-within:border-neutral-500 transition-colors",
        containerClassName
      )}
    >
      <Search size={16} className="text-neutral-500 shrink-0" />
      <input
        type="search"
        placeholder="Search bookmarks…"
        className={cn(
          "flex-1 min-w-0 bg-transparent text-preset-4m text-neutral-900 placeholder:text-neutral-500 outline-none",
          className
        )}
        {...props}
      />
    </div>
  );
}
