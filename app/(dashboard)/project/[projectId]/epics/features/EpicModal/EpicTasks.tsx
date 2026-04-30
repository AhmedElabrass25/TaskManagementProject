import { ITask } from "@/types/types";
import Image from "next/image";
import React from "react";

const EpicTasks = ({task}:{task:ITask}) => {
  return (
    <>
      <div
        className="flex items-center justify-between px-6 py-5 border-b last:border-b-0 border-gray-300"
      >
        {/* Left */}
        <div className="flex items-center gap-4">
          {/* Checkbox */}
          <Image
            src="/icons/checkicon.svg"
            alt="checkbox"
            width={20}
            height={20}
          />
          {/* Content */}
          <div>
            <h3 className="text-lg font-semibold text-gray-800">
              {task?.title}
            </h3>

            <div className="flex items-center gap-2 mt-1">
              <div className="w-7 h-7 rounded-full flex items-center justify-center bg-(--color-primary) text-white text-xs font-bold">
                {task?.assignee?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .toUpperCase()}
              </div>
              <span className="text-gray-500 text-sm">
                {task?.assignee?.name}
              </span>
            </div>
          </div>
        </div>
        {/* Right */}
        <div className="text-right">
          <p className="text-xs text-gray-400 uppercase">Due Date</p>
          <p className="text-gray-700 font-medium">
            {task?.due_date
              ? new Date(task.due_date).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })
              : "No date"}
          </p>
        </div>
      </div>
    </>
  );
};

export default EpicTasks;
