"use client";
import { ITask } from "@/types/types";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { updateTask } from "../../action";
import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";

type Props = {
  taskId: string;
  date: string | null;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};

const TaskDate = ({ taskId, date, updateTaskInColumn }: Props) => {
  const dispatch = useAppDispatch();
  const formatDate = (value: string | null) => {
    if (!value) return "";
    return value.split("T")[0];
  };
  const [dueDate, setDueDate] = useState(formatDate(date));
  useEffect(() => {
    setDueDate(formatDate(date));
  }, [date]);
  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDate = e.target.value;
    if (newDate) {
      const selectedDate = new Date(newDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        toast.error("Past dates are not allowed", {
          style: { color: "red" },
        });
        return;
      }
    }
    const previousDate = dueDate;
    setDueDate(newDate);
    const changes = {
      due_date: newDate || null,
    };
    dispatch(
      updateTaskLocally({
        taskId,
        changes,
      }),
    );
    updateTaskInColumn?.(taskId, changes);
    try {
      await updateTask(taskId, {
        due_date: newDate || undefined,
      });
      toast.success("Due date updated");
    } catch (error) {
      toast.error("Failed to update due date", {
        style: { color: "red" },
      });
      setDueDate(previousDate);
      dispatch(
        updateTaskLocally({
          taskId,
          changes: {
            due_date: previousDate || null,
          },
        }),
      );
      updateTaskInColumn?.(taskId, {
        due_date: previousDate || null,
      });
    }
  };
  return (
    <div className="flex justify-between items-center text-sm">
      <span className="text-slate-400 font-medium">Due Date</span>
      <input
        type="date"
        value={dueDate}
        onChange={handleChange}
        min={new Date().toISOString().split("T")[0]}
        className="border border-slate-200 rounded-md px-2 py-1 text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
    </div>
  );
};

export default TaskDate;
