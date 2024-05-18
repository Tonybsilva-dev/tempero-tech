"use client";

import { useEffect, useState } from "react";
import CustomDatePicker from "./date-picker";
import FloorPlan from "./floor-plan";
import TimeSlots, { TimeSlot } from "./time-slots";
import BookingSummary from "./booking-sumary";
import { tomorrow } from "@/app/_helpers/date";
import { Restaurant } from "@prisma/client";
import { GenerateDayTimeList } from "../_helpers/hours";
import { tables } from "@/app/_helpers/mocks";

interface SchedulerProps {
  restaurant: Restaurant;
}

// eslint-disable-next-line no-unused-vars
export default function Scheduler({ restaurant }: SchedulerProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(tomorrow);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedTable, setSelectedTable] = useState<number | null>(0);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const handleTimeSelect = (time: string | null) => {
    if (time) {
      setSelectedTime(time);
    }
  };

  useEffect(() => {
    const slots = GenerateDayTimeList(selectedDate);
    setTimeSlots(slots);
  }, []);

  return (
    <section className="h-screen px-6 py-16 md:px-8 lg:px-10">
      <div className="container mx-auto">
        <h1 className="mb-1 text-3xl font-bold">
          Selecione uma hora e uma data
        </h1>
        <p className="mb-8 flex items-center justify-between text-lg">
          <span>
            Verifique nossa disponibilidade e agende a data e hora que lhe
            convém.
          </span>
          <span className="text-sm text-gray-600">
            Timezone: Brasilia Standard Time (GMT-3)
          </span>
        </p>
        <div className="mb-6 h-[1px] w-full bg-zinc-200" />
        <div className="grid grid-cols-4 gap-8">
          <div>
            <h2 className="mb-2 text-xl font-semibold">Escolha a Data</h2>
            <CustomDatePicker
              selectedDate={selectedDate}
              onChange={handleDateChange}
            />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Escolha o Horário</h2>
            <TimeSlots times={timeSlots} onSelectTime={handleTimeSelect} />
          </div>

          <div>
            <h2 className="mb-2 text-xl font-semibold">Selecione Sua Mesa</h2>
            <FloorPlan tables={tables} onChange={setSelectedTable} />
          </div>

          {selectedTime && selectedTable && (
            <div>
              <h2 className="mb-2 text-xl font-semibold">Resumo da Reserva</h2>
              <BookingSummary
                date={selectedDate.toDateString()}
                time={selectedTime}
                table={selectedTable}
                price={100.0}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
