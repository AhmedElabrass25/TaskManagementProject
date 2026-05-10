"use client";
import { closeTaskModal } from "@/store/slices/tasks/taskModalSlice";
import { ITask } from "@/types/types";
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import TaskTtile from "./TaskTtile";
import TaskDescription from "./TaskDescription";
import TaskEpic from "./TaskEpic";

const MainContent = ({
  task,
  updateTaskInColumn,
}: {
  task: ITask | null;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
}) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="relative flex-[1.8] overflow-y-auto border-r border-slate-100">
        <div className="p-4 shadow-md">
          <div className="flex items-center gap-3 justify-between md:justify-start mb-4">
            <span className="bg-indigo-50 text-indigo-600 text-[11px] font-bold px-2 py-1 rounded">
              {task?.task_id}
            </span>
            {task && (
              <TaskEpic
                projectId={task?.project_id!}
                taskId={task?.id!}
                taskEpic={task?.epic?.title!}
                updateTaskInColumn={updateTaskInColumn}
              />
            )}
            <button
              onClick={() => dispatch(closeTaskModal())}
              className="md:hidden cursor-pointer"
            >
              <Image
                src="/icons/close.svg"
                alt="close icon"
                width={12}
                height={12}
              />
            </button>
          </div>
          {task && (
            <TaskTtile
              taskId={task?.id!}
              taskTitle={task?.title!}
              updateTaskInColumn={updateTaskInColumn}
            />
          )}
        </div>
        {/* Description Section */}
        {task && (
          <TaskDescription
            taskId={task?.id!}
            taskDesc={task?.description!}
            updateTaskInColumn={updateTaskInColumn}
          />
        )}
        {/* Modal Footer */}
        <div className="hidden md:flex absolute bottom-0 w-full p-4 bg-[#F1F3FF] border-t border-slate-100 items-center justify-between">
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
