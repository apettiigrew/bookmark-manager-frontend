"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface TagFilterItemProps {
  id: string;
  name: string;
  count: number;
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function TagFilterItem({ id, name, count, checked, onCheckedChange }: TagFilterItemProps) {
  return (
    <label
      htmlFor={id}
      className={cn(
        "flex items-center justify-between gap-100 px-150 py-100 rounded-8 cursor-pointer transition-colors select-none",
        checked ? "bg-neutral-100" : "hover:bg-neutral-100"
      )}
    >
      <div className="flex items-center gap-150 min-w-0">
        <Checkbox
          id={id}
          checked={checked}
          onCheckedChange={(v) => onCheckedChange(v === true)}
        />
        <span className="text-preset-4m text-neutral-900 truncate">{name}</span>
      </div>
      <Badge variant="count">{count}</Badge>
    </label>
  );
}
