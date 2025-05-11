import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import duration, { Duration } from "dayjs/plugin/duration";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(duration);

export type EventCardData = {
  title: string;
  time: {
    start: Dayjs;
    duration: Duration;
    timezone: string;
  };
  status: "upcoming" | "ongoing" | "completed";
};

type EventCardProps = {
  event: EventCardData;
};

export const MOCK_EVENTS: EventCardData[] = [
  {
    title: "Event 1",
    time: {
      start: dayjs.tz("2023-10-01T10:00:00", "America/New_York"),
      duration: dayjs.duration({ hours: 2, minutes: 30 }),
      timezone: "America/New_York",
    },
    status: "upcoming",
  },
  {
    title: "Event 2",
    time: {
      start: dayjs.tz("2023-10-01T12:00:00", "America/New_York"),
      duration: dayjs.duration({ hours: 1, minutes: 15 }),
      timezone: "America/New_York",
    },
    status: "ongoing",
  },
  {
    title: "Event 3",
    time: {
      start: dayjs.tz("2023-10-01T14:00:00", "America/New_York"),
      duration: dayjs.duration({ hours: 0, minutes: 45 }),
      timezone: "America/New_York",
    },
    status: "completed",
  },
];

export function EventCard(props: EventCardProps) {
  const { event } = props;

  const { title, time, status } = event;

  const { start, duration, timezone } = time;

  const startTime = start.tz(timezone).format("HH:mm");
  const endTime = start.add(duration).tz(timezone).format("HH:mm");

  const durationString = `${duration.hours()}h ${duration.minutes()}m`;

  return (
    <div className="flex flex-col gap-2 p-4 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">
        {status === "upcoming" && (
          <span className="text-green-500">Upcoming</span>
        )}
        {status === "ongoing" && (
          <span className="text-yellow-500">Ongoing</span>
        )}
        {status === "completed" && (
          <span className="text-gray-500">Completed</span>
        )}
      </p>
      <p className="text-sm text-gray-500">
        {startTime} - {endTime}
      </p>
      <p className="text-sm text-gray-500">Duration: {durationString}</p>
      <p className="text-sm text-gray-500">Timezone: {timezone}</p>
    </div>
  );
}
