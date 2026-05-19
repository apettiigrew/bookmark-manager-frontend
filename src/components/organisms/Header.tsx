import { Button } from "@/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/ui/avatar";
import { SearchBar } from "@/components/SearchBar";
import { Plus } from "lucide-react";

interface HeaderProps {
  searchValue: string;
  onSearchChange: (value: string) => void;
  onOpenAddModal: () => void;
}

export function Header({ searchValue, onSearchChange, onOpenAddModal }: HeaderProps) {
  return (
    <header className="flex items-center gap-300 px-400 py-200 bg-neutral-0 border-b border-neutral-300 h-16 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-100 shrink-0">
        <div className="size-8 rounded-8 bg-teal-700 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 2h10a1 1 0 0 1 1 1v1H2V3a1 1 0 0 1 1-1Z" fill="white" />
            <path d="M2 5h12v8a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5Z" fill="white" fillOpacity=".6" />
            <path d="M6 9l2 2 4-4" stroke="#014745" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <span className="text-preset-3 text-neutral-900 hidden sm:block">Bookmarks</span>
      </div>

      {/* Search */}
      <div className="flex-1 max-w-xl">
        <SearchBar
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-200 shrink-0">
        <Button variant="default" className="gap-100 text-white" onClick={onOpenAddModal}>
          <Plus size={14} className="text-white" />
          <span className="hidden sm:inline">Add Bookmark</span>
        </Button>
        <Avatar>
          <AvatarImage src="" alt="User avatar" />
          <AvatarFallback>AP</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
