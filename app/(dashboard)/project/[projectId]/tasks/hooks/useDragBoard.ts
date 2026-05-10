"use client";
import { DragEndEvent } from "@dnd-kit/react";
import { arrayMove } from "@dnd-kit/sortable";
import { apiFetch } from "@/lib/api";
import { ITask } from "@/types/types";
import { ColumnState } from "./useBoardColumns";

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

export function useDragBoard(
  columns: Record<string, ColumnState>,
  setColumns: (value: Record<string, ColumnState>) => void,
) {
  const handleDragEnd = async (event: DragEndEvent) => {
    if (event.canceled) return;
    const { source, target } = event.operation;
    const taskId = source?.id;
    const oldStatus = source?.data?.current?.status || source?.data?.status;
    let targetStatus = target?.data?.current?.status || target?.data?.status;

    if (
      !targetStatus &&
      typeof target?.id === "string" &&
      ALL_STATUSES.includes(target.id)
    ) {
      targetStatus = target.id;
    }

    if (!taskId || !targetStatus) return;

    try {
      if (oldStatus !== targetStatus) {
        // Find the task
        const sourceCol = columns[oldStatus];
        if (!sourceCol) return;

        const movedTask = sourceCol.tasks.find((t) => t.id === taskId);
        if (!movedTask) return;

        setColumns({
          ...columns,
          [oldStatus]: {
            ...columns[oldStatus],
            tasks: columns[oldStatus].tasks.filter(
              (t: ITask) => t.id !== taskId,
            ),
            count: Math.max(0, columns[oldStatus].count - 1),
            offset: Math.max(0, columns[oldStatus].offset - 1),
          },
          [targetStatus]: {
            ...columns[targetStatus],
            tasks: [
              { ...movedTask, status: targetStatus },
              ...columns[targetStatus].tasks,
            ],
            count: columns[targetStatus].count + 1,
            offset: columns[targetStatus].offset + 1,
          },
        });

        await apiFetch(`/rest/v1/tasks?id=eq.${taskId}`, {
          method: "PATCH",
          body: { status: targetStatus },
        });
      } else if (
        target?.id &&
        target.id !== source.id &&
        !ALL_STATUSES.includes(target.id as string)
      ) {
        const col = columns[oldStatus];
        const oldIndex = col.tasks.findIndex((t: ITask) => t.id === source.id);
        const newIndex = col.tasks.findIndex((t: ITask) => t.id === target.id);

        if (oldIndex !== -1 && newIndex !== -1) {
          const newTasks = arrayMove(col.tasks, oldIndex, newIndex);
          setColumns({
            ...columns,
            [oldStatus]: { ...col, tasks: newTasks },
          });
        }
      }
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  return { handleDragEnd };
}
