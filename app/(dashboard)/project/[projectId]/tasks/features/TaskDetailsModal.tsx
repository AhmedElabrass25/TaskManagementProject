"use client";
import { ITask } from "@/types/types";
import { RootState } from "@/store/index";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { closeTaskModal } from "@/store/slices/taskModalSlice";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getSingleTask } from "../action";
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
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex flex-1 overflow-hidden">
          {/* Main Content Area */}
          <div className="flex-[1.8] p-8 overflow-y-auto border-r border-slate-100">
            {/* Header Metadata */}
            <div className="flex items-center gap-3 mb-4">
              <span className="bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2 py-1 rounded">
                {task?.task_id}
              </span>
              <div className="flex items-center gap-1.5 text-slate-400 text-[12px] font-medium">
                <Image
                  src="/icons/layericon.svg"
                  alt="epic icon"
                  width={12}
                  height={12.7}
                />
                <span>{task?.epic?.title || "No Epic Assigned"}</span>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-8">
              {task?.title}
            </h1>

            {/* Description Section */}
            <div className="space-y-4">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Description
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {task?.description || "No description provided for this task."}
              </p>
            </div>
          </div>

          {/* Sidebar Area */}
          <div className="flex-1 bg-slate-50/50 p-8 space-y-8 overflow-y-auto">
            {/* Status Selector */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </h3>
              <div className="relative">
                <button className="w-full flex items-center justify-between px-4 py-2.5 bg-emerald-400 text-white rounded-lg font-bold text-[13px] hover:bg-emerald-500 transition-colors">
                  {task?.status.replace("_", " ")}
                  {/* <ChevronDown className="w-4 h-4" /> */}
                </button>
              </div>
            </div>

            {/* Assignee Card */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Assignee
              </h3>
              <div className="flex items-center gap-3 p-3 bg-white border border-slate-100 rounded-xl shadow-sm">
                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-white ring-1 ring-slate-100">
                  {task?.assignee?.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("") || "UN"}
                </div>
                <div>
                  <p className="text-[13px] font-bold text-slate-800">
                    {task?.assignee?.name || "Unassigned"}
                  </p>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {task?.assignee?.department || "Member"}
                  </p>
                </div>
              </div>
            </div>

            {/* Reporter */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Reporter
              </h3>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
                  {task?.created_by.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <p className="text-[13px] font-semibold text-slate-700">
                  {task?.created_by.name}
                </p>
              </div>
            </div>

            {/* Dates */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Due Date</span>
                <span className="text-slate-700 font-bold">
                  {task?.due_date
                    ? new Date(task.due_date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    : "-"}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Created At</span>
                <span className="text-slate-700 font-bold">
                  {task && new Date(task.created_at).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 text-sm font-semibold transition-colors px-4 py-2">
            <Image
              src="/icons/copyicon.svg"
              alt="link icon"
              width={15}
              height={7.5}
            />
            Copy link
          </button>
          <button
            onClick={() => dispatch(closeTaskModal())}
            className="bg-indigo-100 text-indigo-700 px-6 py-2 rounded-lg font-bold text-sm hover:bg-indigo-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
