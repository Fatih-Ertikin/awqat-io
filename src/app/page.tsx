import {
  EventCard,
  EventCardData,
  MOCK_EVENTS,
} from "@/components/molecules/event-card";

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

  const events = MOCK_EVENTS;

  return (
    <div className="grid grid-rows-1 bg-blue-400">
      {/* Top half: split into two cols */}
      <div className="grid grid-cols-2 bg-red-400">
        <div>
          <time
            className="text-8xl font-bold"
            dateTime={TIME}
            aria-label={TIME}
          >
            <h1>{TIME.split(":")[0]}</h1>
            <h1>{TIME.split(":")[1]}</h1>
          </time>
        </div>
        <div>
          <h2 className="text-4xl font-thin">
            {DAY_HIJRI} {MONTH_HIJRI} {YEAR_HIJRI}
          </h2>
          <h2 className="text-2xl font-thin text-gray-400">
            {DAY_OF_WEEK_GREGORIAN} {DAY_GREGORIAN} {MONTH_GREGORIAN}{" "}
            {YEAR_GREGORIAN}
          </h2>
        </div>
      </div>
      {/* Bottom half: full width */}
      <div className="bg-green-400">
        <h3 className="mt-2 text-2xl mb-2">up next:</h3>
        <div className="flex justify-center"></div>
      </div>
    </div>
  );
}
