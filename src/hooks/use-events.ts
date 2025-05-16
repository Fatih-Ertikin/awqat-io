import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export enum EventType {
  SALAH,
  MORNING_DHIKR,
  EVENING_DHIKR,
  JUMMAH_SALAH,
  LAST_THIRD_OF_THE_NIGHT,
}

export type Event = {
  title: string;
  type: EventType;
  description: string;
  time: {
    start: Date;
    durationMs: number;
  };
};

export const MOCK_EVENTS: Event[] = [
  {
    title: "Fajr",
    type: EventType.SALAH,
    description: "Fajr Salah at the mosque",
    time: {
      start: new Date("2025-05-16T04:50:00Z"),
      durationMs: 3600000, // 1 hour
    },
  },
  {
    title: "Morning Dhikr",
    type: EventType.MORNING_DHIKR,
    description: "Morning Dhikr session",
    time: {
      start: new Date("2025-05-16T04:50:00Z"),
      durationMs: 1800000, // 30 minutes
    },
  },
];
