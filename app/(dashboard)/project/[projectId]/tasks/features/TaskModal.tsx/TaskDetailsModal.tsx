"use client";
import { ITask } from "@/types/types";
import { RootState } from "@/store/index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskModal } from "@/store/slices/taskModalSlice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleTask } from "../../action";
import MainContent from "./MainContent";
import Sidebar from "./Sidebar";
export default function TaskDetailsModal() {
  const { isOpen, selectedTaskId } = useSelector(
    (state: RootState) => state.taskModal,
  );
  const [task, setTask] = useState<ITask | null>(null);
  console.log(task);
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
      onClick={() => dispatch(closeTaskModal())}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4"
    >
      <div className="bg-white w-full max-w-4xl rounded-xs shadow-2xl overflow-auto flex flex-col max-h-[90vh]">
        <div className="flex flex-1 overflow-hidden">
          {/* main Content  */}
          <MainContent  task={task} />

          {/* sidebar */}
         <Sidebar task={task}/>
        </div>
      </div>
    </div>
  );
}
