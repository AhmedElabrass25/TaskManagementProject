"use client"
import { closeTaskModal } from "@/store/slices/taskModalSlice";
import { ITask } from "@/types/types";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";

const MainContent = ({ task }: { task: ITask| null }) => {
    const dispatch =useDispatch();
  return (
    <>
      <div className="relative flex-[1.8] overflow-y-auto border-r border-slate-100">
        <div className="p-4 shadow-md">
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
          <h1 className="text-3xl font-bold text-slate-900 leading-tight mb-8">
            {task?.title}
          </h1>
        </div>
        {/* Description Section */}
        <div className="space-y-4 p-4">
          <h3 className="text-[11px] font-bold text-[#434654] uppercase tracking-wider">
            Description
          </h3>
          <p className="text-sm text-[#434654] leading-relaxed">
            {task?.description || "No description provided for this task."}
          </p>
        </div>
        {/* Modal Footer */}
        <div className="absolute bottom-0 w-full p-4 bg-[#F1F3FF] border-t border-slate-100 flex items-center justify-between">
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
            className="bg-indigo-100 px-6 py-2 rounded-xs font-bold text-sm hover:bg-indigo-200 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
};

export default MainContent;
