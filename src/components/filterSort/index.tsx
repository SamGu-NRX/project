// components/filterSort/index.tsx
"use client";

import { FC } from "react";
import { SearchBar } from "./SearchBar";
import { FilterSelect, FilterOption } from "./FilterSelect";
import { Sorter, SortOption } from "./Sorter";
import { Button } from "@/components/ui/button";
import { SortAsc, SortDesc } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export type { FilterSelect, FilterOption } from "./FilterSelect";
export type { Sorter, SortOption } from "./Sorter";

// Example interface: adapt to your needs
interface FilterSortSectionProps {
  searchLabel?: string;
  searchPlaceholder?: string;
  searchTerm: string;
  setSearchTerm: (value: string) => void;

  filters?: {
    // you can define multiple filters if needed
    id?: string;
    label?: string;
    placeholder?: string;
    value: string;
    onValueChange: (val: string) => void;
    options: FilterOption[];
  }[];

  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: "asc" | "desc";
  setSortOrder: (value: "asc" | "desc") => void;
  sortOptions: SortOption[];
}

const FilterSortSection: FC<FilterSortSectionProps> = ({
  searchLabel = "Search",
  searchPlaceholder = "Search...",
  searchTerm,
  setSearchTerm,
  filters = [],
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  sortOptions,
}) => {
  return (
    <div className="space-y-4">
      {/* Top Row: Search + Filters */}
      <div className="flex space-x-4">
        {/* SearchBar */}
        <SearchBar
          label={searchLabel}
          placeholder={searchPlaceholder}
          value={searchTerm}
          onChange={setSearchTerm}
        />

        {/* Dynamically Render Each Filter */}
        {filters.map((filterProps, index) => (
          <FilterSelect key={index} {...filterProps} />
        ))}
      </div>

      {/* Bottom Row: Sorter (aligned right) */}
      <div className="flex justify-end">
        <Sorter
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          sortOptions={sortOptions}
        />
      </div>
    </div>
  );
};

export default FilterSortSection;
