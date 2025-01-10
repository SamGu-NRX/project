// shared/components/sort/Sorter.tsx
"use client";

import { FC } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortAsc, SortDesc } from "lucide-react";

export interface SortOption {
  label: string;
  value: string;
}

interface SorterProps {
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  sortOptions: SortOption[];
}

export const Sorter: FC<SorterProps> = ({
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  sortOptions,
}) => {
  return (
    <div className="flex space-x-2">
      {/* Asc/Desc Button */}
      <Button
        variant="outline"
        size="sm"
        onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
      >
        {sortOrder === "asc" ? (
          <SortAsc className="h-4 w-4" />
        ) : (
          <SortDesc className="h-4 w-4" />
        )}
      </Button>

      {/* Sort By Dropdown */}
      <Select value={sortBy} onValueChange={(value) => setSortBy(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          {sortOptions.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
