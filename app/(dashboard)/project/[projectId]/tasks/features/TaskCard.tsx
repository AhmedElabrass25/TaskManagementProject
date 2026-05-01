"use client";

import { openTaskModal } from "@/store/slices/taskModalSlice";
import { ITask } from "@/types/types";
import { useDispatch } from "react-redux";

export default function TaskCard({ task }: { task: ITask }) {
  const dispatch = useDispatch();
  const borderAccent =
    task.status === "IN_PROGRESS" ? "border-l-[3px] border-l-blue-600" : "";
  const isDelayed = task.status === "BLOCKED";

  return (
    <>
      <div
        onClick={() => dispatch(openTaskModal(task.id))}
        className={`bg-white p-5 rounded-xl shadow-sm border border-slate-100 transition-all hover:shadow-md cursor-pointer ${borderAccent} ${
          isDelayed ? "bg-red-50/40 border-red-100" : ""
        }`}
      >
        <h4 className="text-[13px] font-semibold text-slate-800 leading-snug mb-4">
          {task.title}
        </h4>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {isDelayed ? (
              <div className="flex items-center gap-1.2 text-[10px] font-bold text-red-500 uppercase tracking-tight">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 20 20">
                  <path d="M10 2l-8 16h16L10 2zm1 13H9v-2h2v2zm0-4H9V7h2v4z" />
                </svg>
                DELAYED
              </div>
            ) : (
              <div
                className={`flex items-center gap-1.5 ${
                  task.status === "IN_PROGRESS"
                    ? "text-blue-600"
                    : "text-slate-400"
                }`}
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                    ry="2"
                    strokeWidth="2"
                  />
                  <path d="M16 2v4M8 2v4M3 10h18" strokeWidth="2" />
                </svg>
                <span className="text-[10px] font-bold uppercase tracking-tight">
                  {task?.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "No date"}
                </span>
              </div>
            )}
          </div>
          <div className="w-6 h-6 rounded-full bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600 border border-white shadow-sm ring-1 ring-slate-200">
            {task?.assignee?.name
              ? task.assignee.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()
              : "MT"}
          </div>
        </div>
      </div>
    </>
  );
}
