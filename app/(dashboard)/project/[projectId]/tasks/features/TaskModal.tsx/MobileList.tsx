"use client";
import { openTaskModal } from "@/store/slices/taskModalSlice";
import { ITask } from "@/types/types";
import React from "react";
import { useDispatch } from "react-redux";
import { StatusBadge } from "../../helper";
import Image from "next/image";

const MobileList = ({ task }: { task: ITask }) => {
  const dispatch = useDispatch();

  return (
    <>
      <div
        onClick={() => dispatch(openTaskModal(task.id))}
        key={task.id}
        className="bg-white rounded-xs p-4 cursor-pointer"
      >
        <div className="flex items-center justify-between pb-1">
          {/* taskid + status*/}
          <p>{task?.task_id}</p>
          <p>
            <StatusBadge status={task.status} />
          </p>
        </div>
        {/* title */}
        <h2 className="text-lg line-clamp-1">{task.title}</h2>
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-3">
            <p
              className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold bg-[#DAE2FF] border-2 border-white shadow-sm `}
            >
              {" "}
              {task?.assignee?.name
                ?.split(" ")
                .map((word: string) => word[0])
                .join("")
                .toUpperCase()}
            </p>
            <div>
              <p>DUE DATE</p>
              <p className="text-sm text-slate-500 font-medium">
                {task.due_date
                  ? new Date(task.due_date).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })
                  : "No Date"}
              </p>
            </div>
          </div>
          <button>
            <Image
              src="/icons/editbtn.svg"
              alt="edit icon"
              width={4}
              height={4}
            />
          </button>
        </div>
      </div>
    </>
  );
};

export default MobileList;
