import Image from "next/image";
import Link from "next/link";
import { getAllTasks } from "../action";
import { ITask } from "@/types/types";

export default async function ListView({ projectId }: { projectId: string }) {
  const tasks: ITask[] = await getAllTasks(projectId);
  return (
    <div className="bg-white rounded-xs border border-slate-200 shadow-sm overflow-hidden">
      <table className="w-full text-left border-collapse">
        <thead className="bg-slate-50">
          <tr className="border-b border-slate-100">
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Task ID
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Due Date
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              Assignee
            </th>
            <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {tasks.map((task: any) => (
            <tr
              key={task.id}
              className="hover:bg-slate-50/50 transition-colors group"
            >
              {/* Task ID */}
              <td className="px-6 py-5">
                <Link
                  href={`#`}
                  className="text-sm font-medium text-indigo-600 hover:underline"
                >
                  {task.task_number || `TASK-${task.id.slice(0, 3)}`}
                </Link>
              </td>

              {/* Title */}
              <td className="px-6 py-5">
                <span className="text-sm font-semibold text-slate-700 leading-tight">
                  {task.title}
                </span>
              </td>

              {/* Status Badge */}
              <td className="px-6 py-5">
                <StatusBadge status={task.status} />
              </td>

              {/* Due Date */}
              <td className="px-6 py-5 text-sm text-slate-500 font-medium">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "No Date"}
              </td>

              {/* Assignee */}
              <td className="px-6 py-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm ${getAvatarColor(task.assignee_initials)}`}
                  >
                    {task?.assignee?.name
                      ?.split(" ")
                      .map((word: string) => word[0])
                      .join("")
                      .toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-600">
                    {task?.assignee?.name }
                  </span>
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-5">
                <button className="p-1 hover:bg-slate-200 rounded transition text-slate-400">
                  <Image
                    src="/icons/editbtn.svg"
                    alt="More Icon"
                    width={4}
                    height={4}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Footer */}
      {/* <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/30">
        <p className="text-xs font-medium text-slate-500">
          Showing <span className="text-slate-700">{tasks.length}</span> of <span className="text-slate-700">{tasks.length}</span> tasks
        </p>
        <div className="flex items-center gap-6">
           <div className="flex items-center gap-2">
              <button className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-xs font-semibold text-slate-600">Page 1 of 1</span>
              <button className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30" disabled>
                <ChevronRight className="w-4 h-4" />
              </button>
           </div>
        </div>
      </div> */}
    </div>
  );
}

// Helper for Status Badge Styles
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "IN PROGRESS": "bg-blue-100 text-blue-700",
    "TO DO": "bg-slate-100 text-slate-600",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    DONE: "bg-emerald-100 text-emerald-700",
    URGENT: "bg-red-100 text-red-700",
    BLOCKED: "bg-orange-100 text-orange-700",
  };

  return (
    <span
      className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${styles[status] || "bg-slate-100 text-slate-600"}`}
    >
      {status}
    </span>
  );
}

// Helper for dynamic avatar colors
function getAvatarColor(initials: string) {
  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
  ];
  const charCode = initials ? initials.charCodeAt(0) : 0;
  return colors[charCode % colors.length];
}
