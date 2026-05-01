"use client";
import { openTaskModal } from "@/store/slices/taskModalSlice";
import { ITask } from "@/types/types";
import Image from "next/image";
import { useDispatch } from "react-redux";
const ListRow = ({ task }: { task: ITask }) => {
  const dispatch = useDispatch();
  return (
    <>
      <tr
        onClick={() => dispatch(openTaskModal(task.id))}
        key={task.id}
        className="hover:bg-slate-50/50 transition-colors group cursor-pointer"
      >
        <td className="px-6 py-5">{task?.task_id}</td>
        <td className="px-6 py-5">
          <span className="text-sm font-semibold text-slate-700 leading-tight">
            {task.title}
          </span>
        </td>
        <td className="px-6 py-5">
          <StatusBadge status={task.status} />
        </td>
        <td className="px-6 py-5 text-sm text-slate-500 font-medium">
          {task.due_date
            ? new Date(task.due_date).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })
            : "No Date"}
        </td>
        <td className="px-6 py-5">
          <div className="flex items-center gap-3">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2 border-white shadow-sm ${getAvatarColor(task?.assignee?.name || "")}`}
            >
              {task?.assignee?.name
                ?.split(" ")
                .map((word: string) => word[0])
                .join("")
                .toUpperCase()}
            </div>
            <span className="text-sm font-medium text-slate-600">
              {task?.assignee?.name}
            </span>
          </div>
        </td>
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
    </>
  );
};

export default ListRow;

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
