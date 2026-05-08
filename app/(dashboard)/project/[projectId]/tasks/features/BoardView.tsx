"use client";
import {
  DragDropProvider,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useDragOperation,
} from "@dnd-kit/react";
import { arrayMove } from "@dnd-kit/sortable";
import TaskColumn from "./TaskColumn";
import TaskDetailsModal from "./TaskModal.tsx/TaskDetailsModal";
import { apiFetch } from "@/lib/api";
import { useState, useEffect } from "react";
import { getTasksByStatusPaginated } from "../action";
import { ITask } from "@/types/types";

const ALL_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
];

const LIMIT = 6;

type ColumnState = {
  tasks: ITask[];
  count: number;
  offset: number;
  hasMore: boolean;
  loading: boolean;
};

const INITIAL_COLUMNS: Record<string, ColumnState> = Object.fromEntries(
  ALL_STATUSES.map((status) => [
    status,
    { tasks: [], count: 0, offset: 0, hasMore: true, loading: true },
  ])
);

function DragOverlayContent() {
  const operation = useDragOperation();

  if (!operation) return null;

  const taskTitle = operation.source?.data?.current?.title || operation.source?.data?.title || "Task";
  const status = operation.source?.data?.current?.status || operation.source?.data?.status || "";

  return (
    <div className="bg-white p-5 rounded-xl shadow-2xl border-2 border-indigo-400 ring-4 ring-indigo-400/20 w-80 pointer-events-none rotate-2 scale-105 transition-all">
      <h4 className="text-[14px] font-bold text-slate-800 mb-3 truncate">
        {taskTitle}
      </h4>
      <div className="flex items-center gap-2">
        <span className="text-[10px] font-bold uppercase tracking-tight text-slate-400 bg-slate-100 px-2 py-1 rounded-md">
          {status}
        </span>
        <span className="text-[10px] text-indigo-500 font-bold bg-indigo-50 px-2 py-1 rounded-md">→ Moving...</span>
      </div>
    </div>
  );
}

export default function BoardView({ projectId, search }: { projectId: string; search?:string }) {
  const [columns, setColumns] = useState<Record<string, ColumnState>>(INITIAL_COLUMNS);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const fetchColumn = async (status: string, offset: number, reset = false) => {
    try {
      if (!reset) {
        setColumns((prev: Record<string, ColumnState>) => ({
          ...prev,
          [status]: { ...prev[status], loading: true }
        }));
      }

      const result = await getTasksByStatusPaginated({
        projectId,
        status,
        limit: LIMIT,
        offset,
        search
      });

      setColumns((prev: Record<string, ColumnState>) => {
        const currentData = reset ? [] : prev[status].tasks;
        const newData = result.data || [];
        const combinedTasks = [...currentData, ...newData];
        
        // Remove duplicates if any
        const uniqueTasks = Array.from(new Map(combinedTasks.map((t: ITask) => [t.id, t])).values());

        return {
          ...prev,
          [status]: {
            tasks: uniqueTasks,
            count: result.count || 0,
            offset: offset + LIMIT,
            hasMore: uniqueTasks.length < (result.count || 0),
            loading: false
          }
        };
      });
    } catch (error) {
      console.error(`Failed to load tasks for ${status}`, error);
      setColumns(prev => ({
        ...prev,
        [status]: { ...prev[status], loading: false }
      }));
    }
  };

  useEffect(() => {
    setColumns(INITIAL_COLUMNS);
    const loadAll = async () => {
      await Promise.all(ALL_STATUSES.map(status => fetchColumn(status, 0, true)));
      setIsInitialLoad(false);
    };
    loadAll();
  }, [projectId, search]);

  const handleLoadMore = (status: string) => {
    const col = columns[status];
    if (col.hasMore && !col.loading) {
      fetchColumn(status, col.offset);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.canceled) return;
    const { source, target } = event.operation;
    const taskId = source?.id;
    const oldStatus = source?.data?.current?.status || source?.data?.status;
    let targetStatus = target?.data?.current?.status || target?.data?.status;
    
    if (!targetStatus && typeof target?.id === "string" && ALL_STATUSES.includes(target.id)) {
      targetStatus = target.id;
    }

    if (!taskId || !targetStatus) return;

    try {
      if (oldStatus !== targetStatus) {
        // Find the task
        const sourceCol = columns[oldStatus];
        if (!sourceCol) return;
        
        const movedTask = sourceCol.tasks.find(t => t.id === taskId);
        if (!movedTask) return;

        setColumns((prev: Record<string, ColumnState>) => {
          const newSourceTasks = prev[oldStatus].tasks.filter((t: ITask) => t.id !== taskId);
          const newTargetTasks = [{ ...movedTask, status: targetStatus }, ...prev[targetStatus].tasks];
          
          return {
            ...prev,
            [oldStatus]: {
              ...prev[oldStatus],
              tasks: newSourceTasks,
              count: Math.max(0, prev[oldStatus].count - 1),
              offset: Math.max(0, prev[oldStatus].offset - 1)
            },
            [targetStatus]: {
              ...prev[targetStatus],
              tasks: newTargetTasks,
              count: prev[targetStatus].count + 1,
              offset: prev[targetStatus].offset + 1
            }
          };
        });

        await apiFetch(`/rest/v1/tasks?id=eq.${taskId}`, {
          method: "PATCH",
          body: { status: targetStatus },
        });

      } else if (target?.id && target.id !== source.id && !ALL_STATUSES.includes(target.id as string)) {
        setColumns((prev: Record<string, ColumnState>) => {
          const col = prev[oldStatus];
          const oldIndex = col.tasks.findIndex((t: ITask) => t.id === source.id);
          const newIndex = col.tasks.findIndex((t: ITask) => t.id === target.id);
          
          if (oldIndex !== -1 && newIndex !== -1) {
             const newTasks = arrayMove(col.tasks, oldIndex, newIndex);
             return {
               ...prev,
               [oldStatus]: { ...col, tasks: newTasks }
             };
          }
          return prev;
        });
      }
    } catch (error) {
      console.error("Update failed:", error);
      // Optional: rollback state if needed
    }
  };

  if (isInitialLoad) {
    return (
      <div className="flex gap-6 overflow-x-auto pb-8 min-h-[calc(100vh-200px)] items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <>
      <DragDropProvider onDragEnd={handleDragEnd} sensors={[PointerSensor]}>
        <div className="flex gap-6 overflow-x-auto pb-8 custom-scrollbar min-h-[calc(100vh-200px)]">
          {ALL_STATUSES.map((status) => (
            <TaskColumn
              key={status}
              status={status}
              projectId={projectId}
              tasks={columns[status].tasks}
              totalCount={columns[status].count}
              hasMore={columns[status].hasMore}
              loadingMore={columns[status].loading}
              onLoadMore={() => handleLoadMore(status)}
            />
          ))}
        </div>
        <DragOverlay>
          <DragOverlayContent />
        </DragOverlay>
      </DragDropProvider>
      <TaskDetailsModal />
    </>
  );
}
