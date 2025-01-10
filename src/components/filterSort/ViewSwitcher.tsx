"use client";

import { FC } from "react";
import { LayoutGrid, LayoutList, Table } from "lucide-react";
import { Button } from "@/components/ui/button";

export type ViewType = "card" | "list" | "table";

interface ViewTypeSwitcherProps {
  viewType: ViewType;
  setViewType: (type: ViewType) => void;
}

const ViewSwitcher: FC<ViewTypeSwitcherProps> = ({
  viewType,
  setViewType,
}) => {
  return (
    <div className="flex space-x-2">
      <Button
        variant={viewType === "card" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewType("card")}
      >
        <LayoutGrid className="h-4 w-4" />
      </Button>
      <Button
        variant={viewType === "list" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewType("list")}
      >
        <LayoutList className="h-4 w-4" />
      </Button>
      <Button
        variant={viewType === "table" ? "default" : "outline"}
        size="sm"
        onClick={() => setViewType("table")}
      >
        <Table className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default ViewSwitcher;
