"use client";
import { ITask } from "@/types/types";
import { RootState } from "@/store/index";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskModal } from "@/store/slices/tasks/taskModalSlice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleTask } from "../../action";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";

export default function TaskDetailsModal({
  updateTaskInColumn,
}: {
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
}) {
  const { isOpen, selectedTaskId } = useSelector(
    (state: RootState) => state.taskModal,
  );
  const [task, setTask] = useState<ITask | null>(null);
  const dispatch = useDispatch();
  const { projectId } = useParams();

  useEffect(() => {
    if (!selectedTaskId || !projectId) return;
    const getTask = async () => {
      const res = await getSingleTask(projectId as string, selectedTaskId);
      setTask(res);
    };
    getTask();
  }, [selectedTaskId, projectId]);

  if (!isOpen) return null;

  return (
    <div
      onClick={() => {
        dispatch(closeTaskModal());
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-0 md:p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-[#F8F9FB] w-full max-w-4xl rounded-xs shadow-2xl overflow-hidden flex flex-col md:flex-row md:h-auto md:max-h-[90vh]"
      >
        {/* On mobile, we use a single scroll container */}
        <div className="flex flex-col md:flex-row flex-1 overflow-y-auto md:overflow-hidden">
          <MainContent task={task} updateTaskInColumn={updateTaskInColumn} />
          <Sidebar task={task} updateTaskInColumn={updateTaskInColumn} />
        </div>
      </div>
    </div>
  );
}
