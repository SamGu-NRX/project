// shared/components/filter/FilterSelect.tsx
"use client";

import { FC } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export interface FilterOption {
  label: string;
  value: string;
}

interface FilterSelectProps {
  id?: string;
  label?: string;
  placeholder?: string;
  value: string;
  onValueChange: (value: string) => void;
  options: FilterOption[];
}

export const FilterSelect: FC<FilterSelectProps> = ({
  id,
  label,
  placeholder = "Select an option",
  value,
  onValueChange,
  options,
}) => {
  return (
    <div>
      {label && <Label htmlFor={id}>{label}</Label>}
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map(({ label: optionLabel, value: optionValue }) => (
            <SelectItem key={optionValue} value={optionValue}>
              {optionLabel}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
