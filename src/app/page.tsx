export default function Home() {
  // TODO: get dynamically based on user location + time
  const TODAY_HIJRI = "Dhuʻl-Qiʻdah 7, 1446 AH";
  const TODAY_GREGORIAN = "Fri, April 20 2025";
  const TIME = "08:30";

  return (
    <div className="grid grid-rows-2 min-h-screen">
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
          <p className="mt-2 text-4xl">{TODAY_HIJRI}</p>
          <p className="mt-2 text-2xl">{TODAY_GREGORIAN}</p>
        </div>
      </div>

      {/* Bottom half: full width */}
      <div className="bg-yellow-100 p-4">Bottom Full Width</div>
    </div>
  );
}
