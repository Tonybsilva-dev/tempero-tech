"use client";

import { Button } from "@/app/_components/ui/button";
import { CalendarCheckIcon } from "lucide-react";
import React, { useState } from "react";

interface Table {
  id: number;
  isReserved: boolean;
}

interface TablesProps {
  tables: Table[];
  // eslint-disable-next-line no-unused-vars
  onChange: (table: number | null) => void;
}

const FloorPlan: React.FC<TablesProps> = ({ tables, onChange }) => {
  const [selectedTableId, setSelectedTableId] = useState<number | null>(null);

  const displayedTables = tables.slice(0, 20);

  const handleTableClick = (table: Table) => {
    if (table.isReserved) return;

    if (selectedTableId === table.id) {
      setSelectedTableId(null);
      onChange(null);
    } else {
      setSelectedTableId(table.id);
      onChange(table.id);
    }
  };

  return (
    <div className="w-90 h-full bg-zinc-100 p-4">
      <div className="grid grid-cols-4 gap-2">
        {displayedTables.map((table, index) => (
          <Button
            size={"icon"}
            variant={"outline"}
            key={index}
            onClick={() => handleTableClick(table)}
            disabled={table.isReserved}
            className={`aspect-square w-full border border-gray-300 ${
              table.isReserved
                ? "bg-red-300"
                : table.id === selectedTableId
                  ? "bg-yellow-500"
                  : "bg-white"
            } ${table.isReserved ? "cursor-not-allowed " : "cursor-pointer"}`}
          >
            <span
              className={`flex h-full items-center justify-center text-center`}
            >
              {table.isReserved ? (
                <CalendarCheckIcon className="h-5 w-5" />
              ) : (
                <p className="font-bold">{table.id}</p>
              )}
            </span>{" "}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default FloorPlan;
