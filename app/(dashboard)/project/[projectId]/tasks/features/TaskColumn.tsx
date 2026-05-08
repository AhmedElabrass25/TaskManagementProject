"use client";
import Link from "next/link";
import TaskCard from "./TaskCard";
import { ITask } from "@/types/types";
import Image from "next/image";
import { useDroppable } from "@dnd-kit/react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useEffect, useRef } from "react";

export default function TaskColumn({
  status,
  projectId,
  tasks,
  totalCount,
  hasMore,
  loadingMore,
  onLoadMore,
}: {
  status: string;
  projectId: string;
  tasks: ITask[];
  totalCount: number;
  hasMore: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}) {
  const loadMoreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          onLoadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [hasMore, loadingMore, onLoadMore]);

  const { ref } = useDroppable({
    id: status,
    data: {
      status: status,
    },
  });

  const getStatusColor = (s: string) => {
    switch (s) {
      case "TO_DO":
        return "bg-slate-400";
      case "IN_PROGRESS":
        return "bg-blue-600";
      case "BLOCKED":
        return "bg-red-600";
      case "IN_REVIEW":
        return "bg-amber-500";
      case "READY_FOR_QA":
        return "bg-purple-500";
      case "REOPENED":
        return "bg-orange-500";
      case "READY_FOR_PRODUCTION":
        return "bg-cyan-500";
      case "DONE":
        return "bg-emerald-500";
      default:
        return "bg-indigo-500";
    }
  };

  return (
    <div ref={ref} className="shrink-0 w-75 flex flex-col">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-5 px-1 group">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)} shadow-sm`} />
          <h3 className="font-bold text-slate-600 text-[11px] uppercase tracking-widest flex items-center gap-2">
            {status}
            <span className="flex items-center justify-center min-w-5 h-5 bg-white shadow-sm border border-slate-100 text-slate-500 rounded text-[10px] font-bold px-1 transition-all group-hover:scale-110">
              {totalCount}
            </span>
          </h3>
        </div>
        <Link
          href={`/project/${projectId}/tasks/new?status=${status}`}
          className="text-slate-300 hover:text-indigo-600 transition-colors bg-white hover:bg-indigo-50 rounded-md p-1 shadow-sm opacity-0 group-hover:opacity-100"
        >
          <Image src="/icons/circleplus.svg" width={14} height={14} alt="Add" className="opacity-60" />
        </Link>
      </div>

      <div className="flex-1 flex flex-col gap-3 min-h-[150px] p-2 -mx-2 rounded-xl transition-colors custom-scrollbar overflow-y-auto max-h-[calc(100vh-320px)]">
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.map((task: ITask, index) => (
            <TaskCard key={task.id} task={task} index={index} />
          ))}
        </SortableContext>

        {/* Load More Trigger */}
        <div ref={loadMoreRef} className="h-4 w-full" />

        {loadingMore && (
          <div className="flex justify-center py-4">
            <div className="animate-spin w-5 h-5 border-2 border-indigo-500 border-t-transparent rounded-full" />
          </div>
        )}

        {tasks.length === 0 && !loadingMore && (
          <div className="h-24 rounded-xl border-2 border-dashed border-slate-200/60 bg-slate-50/50 flex items-center justify-center text-slate-400 text-[11px] font-medium tracking-wide">
            Drop tasks here
          </div>
        )}
      </div>

      <Link
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="mt-3 flex items-center justify-center gap-2 w-full py-3 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-bold tracking-widest hover:border-indigo-300 hover:bg-indigo-50/50 hover:text-indigo-500 transition-all opacity-60 hover:opacity-100"
      >
        <span>+</span> ADD TASK
      </Link>
    </div>
  );
}
