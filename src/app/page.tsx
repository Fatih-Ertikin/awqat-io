import { EventCard } from "@/components/molecules/event-card";

export default function Home() {
  // TODO: get dynamically based on user location + time
  const YEAR_HIJRI = "1446 AH";
  const YEAR_GREGORIAN = "2025";

  const MONTH_HIJRI = "Dhuʻl-Qiʻdah";
  const MONTH_GREGORIAN = "April";

  const DAY_GREGORIAN = "20";
  const DAY_HIJRI = "7";

  const DAY_OF_WEEK_HIJRI = "Jumuah";

  const DAY_OF_WEEK_GREGORIAN = "Friday";

  const TIME = "08:30";

  return (
    <div className="grid grid-rows-2 ">
      {/* Top half: split into two */}
      <div className="grid grid-cols-2">
        <div className="p-4">
          <time
            className="flex flex-col justify-center items-center text-9xl font-bold"
            dateTime={TIME}
            aria-label={TIME}
          >
            <span>{TIME.split(":")[0]}</span>
            <span>{TIME.split(":")[1]}</span>
          </time>
        </div>
        <div className="p-4">
          <p className="mt-2 text-4xl font-thin">
            {DAY_HIJRI} {MONTH_HIJRI} {YEAR_HIJRI}
          </p>
          <p className="mt-2 text-2xl font-thin opacity-50">
            {DAY_OF_WEEK_GREGORIAN} {DAY_GREGORIAN} {MONTH_GREGORIAN}{" "}
            {YEAR_GREGORIAN}
          </p>
        </div>
      </div>

      {/* Bottom half: full width */}

      <div className="p-4 flex justify-between gap-2 overflow-x-auto sm:justify-center">
        <EventCard title="Fajr" time="05:10" status="past" />
        <EventCard title="Dhuhr" time="13:05" status="upcoming" />
        <EventCard title="Asr" time="16:30" status="next" />
      </div>
    </div>
  );
}
