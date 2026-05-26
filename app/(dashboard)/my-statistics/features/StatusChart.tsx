"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
const COLORSMap: Record<string, string> = {
  IN_PROGRESS: "#0B57D0",
  DONE: "#117A4A",
  BLOCKED: "#C81E1E",
  TO_DO: "#64748B",
};

const StatusChart = () => {
  const { data } = useSelector((state: RootState) => state.calendar);

  const totals = data?.totals || {};
  const chartData = Object.entries(totals)
    .map(([key, value]) => ({
      name: key,
      value: value as number,
      color: COLORSMap[key] || "#CBD5E1",
    }))
    .filter((item) => item.value > 0);

  const totalTasksCount = data?.total_tasks || 0;

  return (
    <div className="bg-white p-6 rounded-xs shadow-md border border-slate-100 flex flex-col justify-between flex-1">
      <h3 className="text-xl font-bold text-[#051C3F] mb-4">Tasks by Status</h3>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-8 h-56">
        <div className="relative w-44 h-44">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={65}
                outerRadius={80}
                paddingAngle={3}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-3xl font-black text-[#051C3F]">
              {totalTasksCount}
            </span>
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-0.5">
              Total
            </span>
          </div>
        </div>

        <div className="flex-1 w-full space-y-4">
          {chartData.map((item) => {
            const percentage =
              totalTasksCount > 0 ? (item.value / totalTasksCount) * 100 : 0;
            const displayLabel = item.name.replace("_", " ").toLowerCase();

            return (
              <div key={item.name} className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3.5 h-3.5 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="font-semibold text-slate-600 capitalize">
                      {displayLabel}
                    </span>
                  </div>
                  <span className="font-bold text-[#051C3F]">{item.value}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percentage}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StatusChart;
