"use client";
import { openTaskModal } from "@/store/slices/tasks/taskModalSlice";
import { ITask } from "@/types/types";
import { useDispatch } from "react-redux";
import { useSortable } from "@dnd-kit/react/sortable";
import Image from "next/image";

interface TaskCardProps {
  task: ITask;
  index: number;
}
export default function TaskCard({ task, index }: TaskCardProps) {
  const dispatch = useDispatch();

  const { ref, isDragging } = useSortable({
    id: task.id,
    index,
    data: {
      status: task.status,
      title: task.title,
      position: task.position,
      task: task,
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : "auto",
    cursor: isDragging ? "grabbing" : "grab",
    touchAction: "none",
    transition: isDragging ? "none" : "opacity 200ms ease",
  };

  const borderAccent =
    task.status === "IN_PROGRESS" ? "border-l-[3px] border-l-blue-600" : "";
  const isDelayed = task.status === "BLOCKED";

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(openTaskModal(task.id));
  };

  return (
    <div
      ref={ref}
      style={style}
      className={`relative bg-white p-5 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md active:cursor-grabbing ${borderAccent} ${
        isDelayed ? "bg-red-50/40 border-red-100" : ""
      } ${isDragging ? "shadow-lg ring-2 ring-blue-400" : ""}`}
    >
      <button
        onClick={handleEditClick}
        className="absolute top-5 right-3 p-1 opacity-60 hover:opacity-100 transition-opacity cursor-pointer"
        type="button"
      >
        <Image
          src="/icons/editbtn.svg"
          width={5}
          height={5}
          alt="Edit task"
          draggable={false}
        />
      </button>
      <h4 className="text-[13px] font-semibold text-slate-800 leading-snug mb-4 pointer-events-none select-none">
        {task.title}
      </h4>

      <div className="flex items-center justify-between pointer-events-none select-none">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400">
            {task?.due_date
              ? new Date(task.due_date).toLocaleDateString("en-GB")
              : "No date"}
          </span>
        </div>
      </div>
    </div>
  );
}
