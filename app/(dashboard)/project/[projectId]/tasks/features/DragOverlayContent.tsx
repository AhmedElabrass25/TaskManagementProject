"use client";
import { useDragOperation } from "@dnd-kit/react";

export function DragOverlayContent() {
  const operation = useDragOperation();

  if (!operation) return null;

  const taskTitle =
    operation.source?.data?.current?.title ||
    operation.source?.data?.title ||
    "Task";
  const status =
    operation.source?.data?.current?.status ||
    operation.source?.data?.status ||
    "";

  return (
    <div className="bg-white p-5 rounded-xl shadow-2xl border-2 border-indigo-400 ring-4 ring-indigo-400/20 w-80 pointer-events-none rotate-2 scale-105 transition-all">
      <h4 className="text-[14px] font-bold text-slate-800 mb-3 truncate">
        {taskTitle}
      </h4>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
          {status}
        </span>
        <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded-md">
          → Moving...
        </span>
      </div>
    </div>
  );
}
