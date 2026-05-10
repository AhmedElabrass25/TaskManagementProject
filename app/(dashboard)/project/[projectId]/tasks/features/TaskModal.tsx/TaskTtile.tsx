"use client";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { updateTask } from "../../action";
import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";
import { ITask } from "@/types/types";

const TaskTtile = ({
  taskTitle,
  taskId,
  updateTaskInColumn,
}: {
  taskTitle: string;
  taskId: string;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
}) => {
  const [title, setTitle] = useState<string>(taskTitle || "");
  const currentTitleRef = useRef(taskTitle || "");
  const dispatch = useAppDispatch();

  const handleBlur = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error("Title is required", { style: { color: "red" } });
      setTitle(currentTitleRef.current);
      return;
    }
    if (title.trim() === currentTitleRef.current) return;
    const previousTitle = currentTitleRef.current;
    try {
      const changes = { title: trimmedTitle };
      dispatch(
        updateTaskLocally({
          taskId,
          changes,
        }),
      );
      updateTaskInColumn?.(taskId, changes);
      await updateTask(taskId, { title: trimmedTitle });
      currentTitleRef.current = trimmedTitle;
      toast.success("Task title updated successfully");
    } catch (error) {
      toast.error("Failed to update task title", {
        style: { color: "red" },
      });
      const previousChanges = { title: previousTitle };
      dispatch(
        updateTaskLocally({
          taskId,
          changes: previousChanges,
        }),
      );
      updateTaskInColumn?.(taskId, previousChanges);
      setTitle(previousTitle);
    }
  };

  useEffect(() => {
    setTitle(taskTitle);
    currentTitleRef.current = taskTitle;
  }, [taskTitle]);

  return (
    <>
      <input
        value={title}
        onBlur={handleBlur}
        onChange={(e) => setTitle(e.target.value)}
        className="text-3xl font-bold text-slate-900 leading-tight focus:outline outline-slate-200 px-3 py-1 w-full"
      />
    </>
  );
};

export default TaskTtile;
