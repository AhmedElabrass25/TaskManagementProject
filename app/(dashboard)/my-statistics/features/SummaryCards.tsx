"use client";
import { RootState } from "@/store";
import Image from "next/image";
import { useSelector } from "react-redux";

const SummaryCards = () => {
  const { data, loading } = useSelector((state: RootState) => state.calendar);
  const stats = [
    {
      label: "Total Tasks",
      value: data?.total_tasks,
      valueColorClass: "text-[#051C3F]",
      icon: "/icons/alltasks.svg",
      iconBgClass: "bg-[#EBF5FF]",
    },
    {
      label: "Completed Tasks",
      value: data?.done_tasks,
      valueColorClass: "text-[#051C3F]",
      icon: "/icons/completed.svg",
      iconBgClass: "bg-[#DEF7EC]",
    },
    {
      label: "Overdue Tasks",
      value: data?.overdue_tasks,
      valueColorClass: "text-[#C81E1E]",
      icon: "/icons/warning.svg",
      iconBgClass: "bg-[#FDE8E8]",
    },
  ];
  console.log(data);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="h-26 flex items-start justify-between space-x-4 bg-white p-4 rounded-xs shadow-md"
        >
          <div key={index} className="">
            <h3 className="text-lg font-semibold text-slate-900">
              {stat.label}
            </h3>
            <p className={`text-2xl font-bold ${stat.valueColorClass}`}>
              {stat.value}
            </p>
          </div>
          <div
            className={
              stat.iconBgClass +
              " w-12 h-12 rounded-xs flex items-center justify-center mb-2"
            }
          >
            <Image src={stat.icon} alt={stat.label} width={25} height={25} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
