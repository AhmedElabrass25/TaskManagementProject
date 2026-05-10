"use client";

import { ITask } from "@/types/types";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";
import { updateTask } from "../../action";
import { toast } from "sonner";
import Select from "react-select";

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

type StatusOption = {
  value: string;
  label: string;
  color: string;
};

type Props = {
  taskId: string;
  status: string;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};

const TaskStatus = ({ taskId, status, updateTaskInColumn }: Props) => {
  const [currentStatus, setCurrentStatus] = useState(status);
  const dispatch = useAppDispatch();

  const statusOptions: StatusOption[] = ALL_STATUSES.map((stat) => ({
    value: stat,
    label: stat.replace("_", " "),
    color: getStatusColor(stat),
  }));

  const currentOption = statusOptions.find(
    (opt) => opt.value === currentStatus,
  );

  const handleStatusChange = async (option: StatusOption | null) => {
    if (!option) return;

    const previousStatus = currentStatus;
    const newStatus = option.value;
    setCurrentStatus(newStatus);

    try {
      const changes = { status: newStatus as any };

      dispatch(
        updateTaskLocally({
          taskId,
          changes,
        }),
      );

      updateTaskInColumn?.(taskId, changes);
      await updateTask(taskId, { status: newStatus as any });
      toast.success("Task status updated successfully");
    } catch (error) {
      toast.error("Failed to update task status", { style: { color: "red" } });
      setCurrentStatus(previousStatus);

      dispatch(
        updateTaskLocally({
          taskId,
          changes: { status: previousStatus as any },
        }),
      );
      updateTaskInColumn?.(taskId, { status: previousStatus as any });
    }
  };
  useEffect(() => {
    setCurrentStatus(status);
  }, [status]);

  return (
    <>
      <div className="space-y-3">
        <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          Status
        </h3>
        <div className="relative">
          <Select
            options={statusOptions}
            value={currentOption}
            onChange={handleStatusChange}
            isSearchable={false}
            isClearable={false}
            instanceId="task-status-select"
            formatOptionLabel={(option: StatusOption) => (
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: option.color }}
                />
                <span>{option.label}</span>
              </div>
            )}
          />
        </div>
      </div>
    </>
  );
};

function getStatusColor(stat: string): string {
  const colors: Record<string, string> = {
    TO_DO: "#64748b",
    IN_PROGRESS: "#3b82f6",
    BLOCKED: "#ef4444",
    IN_REVIEW: "#eab308",
    READY_FOR_QA: "#a855f7",
    REOPENED: "#f97316",
    READY_FOR_PRODUCTION: "#16a34a",
    DONE: "#10b981",
  };
  return colors[stat] || "#64748b";
}

export default TaskStatus;
