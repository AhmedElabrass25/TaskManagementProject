"use client";
import { openTaskModal } from "@/store/slices/tasks/taskModalSlice";
import { ITask } from "@/types/types";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { getAvatarColor, StatusBadge } from "../helper";
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
