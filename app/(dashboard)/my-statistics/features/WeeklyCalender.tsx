"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { parseISO, format, isToday } from "date-fns";
import Image from "next/image";

const statusStyleMap: Record<
  string,
  { label: string; text: string; bg: string }
> = {
  TO_DO: { label: "TO DO", text: "text-slate-700", bg: "bg-slate-100" },
  IN_PROGRESS: {
    label: "IN PROGRESS",
    text: "text-blue-700",
    bg: "bg-blue-50 border-l-4 border-blue-600",
  },
  ACTIVE: { label: "ACTIVE", text: "text-blue-700", bg: "bg-blue-50" },
  BLOCKED: { label: "BLOCKED", text: "text-red-700", bg: "bg-red-50" },
  DONE: { label: "DONE", text: "text-green-700", bg: "bg-green-50" },
};

const WeeklyCalender = () => {
  const { data, loading } = useSelector((state: RootState) => state.calendar);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-4 min-h-100">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="bg-white rounded-xs border border-slate-100 p-4 animate-pulse h-full"
          />
        ))}
      </div>
    );
  }

  const dailyData = data?.daily || [];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-7 gap-3 items-stretch min-h-112.5">
      {dailyData.map((dayStat) => {
        const dateObj = parseISO(dayStat.day);
        const dayName = format(dateObj, "EEE").toUpperCase();
        const dayNumber = format(dateObj, "d MMM");
        const isCurrentDay = isToday(dateObj);
        const activeStatuses = Object.entries(dayStat.statuses || {}).filter(
          ([_, count]) => count > 0,
        );

        return (
          <div
            key={dayStat.day}
            className={`relative flex flex-col justify-between bg-white p-4 rounded-xs border transition-all h-full ${
              isCurrentDay
                ? "border-blue-600 ring-1 ring-blue-600 shadow-md"
                : "border-slate-100 shadow-sm"
            }`}
          >
            {" "}
            {isCurrentDay && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white font-bold text-[10px] px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Today
              </span>
            )}
            <div className="mb-4 text-center md:text-left">
              <p
                className={`text-xs font-semibold ${isCurrentDay ? "text-blue-600" : "text-slate-400"}`}
              >
                {dayName}
              </p>
              <p className="text-xl font-bold text-[#041B3C99] mt-0.5">
                {dayNumber}
              </p>
            </div> 
            <div className="flex-1 flex flex-col gap-2">
              {activeStatuses.length > 0 ? (
                activeStatuses.map(([statusKey, count]) => {
                  const style = statusStyleMap[statusKey] || {
                    label: statusKey.replace("_", " "),
                    text: "text-slate-700",
                    bg: "bg-slate-50",
                  };

                  return (
                    <div
                      key={statusKey}
                      className={`flex items-center justify-between px-3 py-2 rounded-xs ${style.bg}`}
                    >
                      <span
                        className={`text-[11px] font-bold tracking-wide ${style.text}`}
                      >
                        {style.label}
                      </span>
                      <span className={`text-xs font-bold ${style.text}`}>
                        {count}
                      </span>
                    </div>
                  );
                })
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center py-8 opacity-40">
                  <Image
                    src="/icons/noTaskIcon.svg"
                    alt="No tasks"
                    width={27}
                    height={30}
                    className="mb-2 grayscale"
                  />
                  <span className="text-[10px] font-bold text-slate-400 tracking-wider uppercase">
                    No Tasks
                  </span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default WeeklyCalender;
