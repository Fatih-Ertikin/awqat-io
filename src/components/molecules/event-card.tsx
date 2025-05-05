// components/EventCard.tsx

interface EventCardProps {
  title: string;
  time: string;
  status: "past" | "upcoming" | "next";
}

export function EventCard({ title, time, status }: EventCardProps) {
  const statusStyles = {
    past: "bg-gray-100 text-gray-500 border border-gray-300",
    upcoming: "bg-blue-100 text-blue-900 border border-blue-300",
    next: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  };

  return (
    <div
      className={`rounded-xl p-4 w-28 flex-shrink-0 text-center ${statusStyles[status]}`}
    >
      <div className="text-sm font-semibold">{title}</div>
      <div className="text-lg font-bold">{time}</div>
    </div>
  );
}
