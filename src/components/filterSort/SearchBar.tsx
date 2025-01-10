// shared/components/filter/SearchBar.tsx
"use client";

import { FC } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface SearchBarProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onChange: (newValue: string) => void;
}

export const SearchBar: FC<SearchBarProps> = ({
  id = "search",
  label = "Search",
  placeholder = "Search...",
  value,
  onChange,
}) => {
  return (
    <div className="flex-1">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          placeholder={placeholder}
          className="pl-8"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};
