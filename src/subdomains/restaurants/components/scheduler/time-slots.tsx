"use client";

import { Button } from "@/src/shared/_components/ui/button";
import React, { useState } from "react";

export type TimeSlot = {
  id: number;
  time: string;
  isReserved: boolean;
};

interface TimeSlotProps {
  times: TimeSlot[];
  // eslint-disable-next-line no-unused-vars
  onSelectTime: (time: string | null) => void;
}

const TimeSlots: React.FC<TimeSlotProps> = ({ times, onSelectTime }) => {
  const [selectedTimeId, setSelectedTimeId] = useState<number | null>(null);

  const handleSelectTime = (slot: TimeSlot) => {
    if (!slot.isReserved) {
      if (slot.id === selectedTimeId) {
        setSelectedTimeId(null);
        onSelectTime(null);
      } else {
        setSelectedTimeId(slot.id);
        onSelectTime(slot.time);
      }
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {times.map((slot) => (
        <Button
          variant={"outline"}
          key={slot.id}
          className={`px-8 py-2 ${selectedTimeId === slot.id ? "bg-yellow-500 text-white" : slot.isReserved ? "cursor-not-allowed bg-red-400 text-black" : "cursor-pointer bg-transparent text-black"}`}
          onClick={() => handleSelectTime(slot)}
          disabled={slot.isReserved}
        >
          {slot.time}
        </Button>
      ))}
    </div>
  );
};

export default TimeSlots;
