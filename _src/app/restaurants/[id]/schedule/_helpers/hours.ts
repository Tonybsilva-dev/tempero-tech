import { addMinutes, format, setHours, setMinutes } from "date-fns";
import { TimeSlot } from "../_components/time-slots";

export function GenerateDayTimeList(date: Date, interval?: number): TimeSlot[] {
  const effectiveInterval = interval ?? 60;
  const startTime = setMinutes(setHours(date, 9), 0);
  const endTime = setMinutes(setHours(date, 21), 0);
  const timeList: TimeSlot[] = [];

  let currentTime = startTime;
  let id = 1;

  while (currentTime <= endTime) {
    timeList.push({
      id: id++,
      time: format(currentTime, "HH:mm"),
      isReserved: false,
    });
    currentTime = addMinutes(currentTime, effectiveInterval);
  }

  return timeList;
}
