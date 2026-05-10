"use client";

import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";
import { ITask } from "@/types/types";
import { use, useEffect, useRef, useState } from "react";
import { updateTask } from "../../action";
import { toast } from "sonner";

type Props = {
  taskId: string;
  taskDesc: string | null;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};
const TaskDescription = ({ taskId, taskDesc, updateTaskInColumn }: Props) => {
  const [desc, setDesc] = useState(taskDesc || "");
  const initialDesc = useRef(taskDesc || "");
  const dispatch = useAppDispatch();
  const handleBlur = async () => {
    const trimmedDesc = desc.trim();

    if (trimmedDesc === initialDesc.current) return;
    const changes = { description: desc.trim() };
    if (trimmedDesc === "") {
      changes.description = "No description provided";
    }
    const previousDesc = initialDesc.current;

    try {
      dispatch(
        updateTaskLocally({
          taskId,
          changes,
        }),
      );
      updateTaskInColumn?.(taskId, changes);
      await updateTask(taskId, { description: trimmedDesc });
      initialDesc.current = trimmedDesc;
      toast.success("Task description updated successfully");
    } catch (error) {
      toast.error("Failed to update task description", {
        style: { color: "red" },
      });
      const previousChanges = { description: previousDesc };
      dispatch(
        updateTaskLocally({
          taskId,
          changes: previousChanges,
        }),
      );
      updateTaskInColumn?.(taskId, previousChanges);
      setDesc(previousDesc);
    }
  };
  useEffect(() => {
    setDesc(taskDesc || "");
    initialDesc.current = taskDesc || "";
  }, [taskDesc]);
  return (
    <>
      <div className="space-y-4 p-4">
        <h3 className="text-[11px] font-bold text-[#434654] uppercase tracking-wider">
          Description
        </h3>
        <textarea
          value={desc}
          onBlur={handleBlur}
          onChange={(e) => setDesc(e.target.value)}
          placeholder="No description provided"
          className="text-lg text-slate-700 leading-relaxed focus:outline outline-slate-200 px-3 py-2 w-full min-h-25 rounded"
        />
      </div>
    </>
  );
};

export default TaskDescription;
