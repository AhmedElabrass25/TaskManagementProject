import { ITask } from "@/types/types";
const Sidebar = ({ task }: { task: ITask | null }) => {
  return (
    <>
      <div className="flex-1 bg-[#f1f3ff] p-8 space-y-8 overflow-y-auto">
        {/* Status Selector */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Status
          </h3>
          <div className="relative">
            <button className="w-full flex items-center justify-between px-4 py-2.5 bg-emerald-400 text-white rounded-xs font-bold text-[13px] hover:bg-emerald-500 transition-colors">
              {task?.status.replace("_", " ")}
            </button>
          </div>
        </div>

        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Assignee
          </h3>
          <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-white ring-1 ring-slate-100">
              {task?.assignee?.name
                .split(" ")
                .map((n) => n[0])
                .join("") || "UN"}
            </div>
            <div>
              <p className="text-[13px] font-bold text-slate-800">
                {task?.assignee?.name || "Unassigned"}
              </p>
              <p className="text-[11px] text-slate-400 font-medium">
                {task?.assignee?.department || "Member"}
              </p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Reporter
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
              {task?.created_by.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <p className="text-[13px] font-semibold text-slate-700">
              {task?.created_by.name}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Due Date</span>
            <span className="text-slate-700 font-bold">
              {task?.due_date
                ? new Date(task.due_date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                : "-"}
            </span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Created At</span>
            <span className="text-slate-700 font-bold">
              {task &&
                new Date(task.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
