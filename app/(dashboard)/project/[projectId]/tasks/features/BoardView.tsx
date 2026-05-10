"use client";

import { DragDropProvider, DragOverlay, PointerSensor } from "@dnd-kit/react";
import TaskColumn from "./TaskColumn";
import TaskDetailsModal from "./TaskModal.tsx/TaskDetailsModal";
import { DragOverlayContent } from "./DragOverlayContent";
import { useBoardColumns, useDragBoard } from "../hooks";

export default function BoardView({
  projectId,
  search,
}: {
  projectId: string;
  search?: string;
}) {
  const {
    columns,
    isInitialLoad,
    handleLoadMore,
    ALL_STATUSES,
    updateTaskInColumn,
    setColumns,
  } = useBoardColumns(projectId, search);

  const { handleDragEnd } = useDragBoard(columns, setColumns);

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
      <TaskDetailsModal updateTaskInColumn={updateTaskInColumn} />
    </>
  );
}
