"use client";

import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { differenceInCalendarDays, format, parseISO } from "date-fns";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import ProjectsSelect from "./ProjectsSelect";
import StatusSelect from "./StatusSelect";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchCalendarStats, setDateRange } from "@/store/slices/calenderSlice";

const Toolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const dispatch: AppDispatch = useDispatch();
  const { dateRange, filters } = useSelector(
    (state: RootState) => state.calendar,
  );

  const currentRange: DateRange | undefined = {
    from: dateRange?.startDate ? parseISO(dateRange.startDate) : undefined,
    to: dateRange?.endDate ? parseISO(dateRange.endDate) : undefined,
  };

  const handleSelect = (selectedRange: DateRange | undefined) => {
    if (!selectedRange?.from || !selectedRange?.to) {
      if (selectedRange?.from) {
        dispatch(
          setDateRange({
            startDate: format(selectedRange.from, "yyyy-MM-dd"),
            endDate: format(selectedRange.from, "yyyy-MM-dd"),
          }),
        );
      }
      return;
    }

    const daysDifference = differenceInCalendarDays(
      selectedRange.to,
      selectedRange.from,
    );
    if (daysDifference > 6) {
      toast.error("Maximum range is 7 days", {
        style: { color: "red" },
      });
      return;
    }
    dispatch(
      setDateRange({
        startDate: format(selectedRange.from, "yyyy-MM-dd"),
        endDate: format(selectedRange.to, "yyyy-MM-dd"),
      }),
    );
    setIsOpen(false);
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchCalendarStats());
  }, [dateRange.startDate, dateRange.endDate, filters, dispatch]);

  const displayStart = currentRange.from
    ? format(currentRange.from, "MMM dd, yyyy")
    : "";
  const displayEnd = currentRange.to
    ? format(currentRange.to, "MMM dd, yyyy")
    : "";

  return (
    <section className="flex items-center justify-between p-4 bg-(--color-surface-low) mb-6">
      <div ref={calendarRef} className="relative w-fit">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex items-center gap-8 rounded-xs px-4 py-2 shadow-sm outline-0 bg-white border border-slate-100 hover:border-slate-200 transition-colors"
        >
          <Image
            src="/icons/leftarowpagination.svg"
            width={8}
            height={8}
            alt="left arrow"
          />
          <p className="text-base font-semibold text-[#051C3F]">
            {displayStart === displayEnd
              ? displayStart
              : `${displayStart} - ${displayEnd}`}
          </p>
          <Image
            src="/icons/rightarrowpagination.svg"
            width={8}
            height={8}
            alt="right arrow"
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 z-50 mt-2 rounded-xs bg-white p-4 shadow-lg border border-slate-100">
            <DayPicker
              mode="range"
              selected={currentRange}
              onSelect={handleSelect}
            />
          </div>
        )}
      </div>

      <div className="flex items-center gap-6">
        <ProjectsSelect />
        <StatusSelect />
      </div>
    </section>
  );
};

export default Toolbar;
