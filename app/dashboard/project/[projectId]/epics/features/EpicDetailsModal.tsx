"use client"
import Button from "@/components/ui/Button";
import { IEpicData } from "@/types/types";
import Image from "next/image";

interface EpicDetailsProps {
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
  epicData: IEpicData;
}

export default function EpicDetailsModal({
  isOpen,
  setIsOpen,
  epicData,
}: EpicDetailsProps) {
  if (!isOpen) return null;

  return (
      <div
            onClick={(e) => e.stopPropagation()}

          className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-2xl overflow-hidden border border-gray-100">
        {/* 1. Header Section */}
        <div className="px-10 pt-10 pb-6 flex justify-between items-start">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-[#0052cc] font-bold text-xs uppercase tracking-wider">
              {/* Epic Icon SVG */}
              <Image
                src={"/icons/epicpopup1.svg"}
                alt="Epic Icon"
                width={20}
                height={14}
              />
              {epicData.epic_id}
            </div>
            <h2 className="text-[32px] font-bold text-[#00214d] leading-tight">
              {epicData.title}
            </h2>
          </div>

          {/* Close Button */}
          <button
                      onClick={() => {
                           console.log("clicked");
    setIsOpen(false);
            }}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 cursor-pointer"
          >
           <Image src={'/icons/close.svg'} alt="Close Button" width={14} height={14} />
          </button>
        </div>

        {/* 2. Description */}
        <div className="px-10 mb-10">
          <p className="text-gray-500 text-lg leading-relaxed">
            {epicData.description}
          </p>
        </div>

        {/* 3. Metadata Grid (Created By, Assignee, Created At) */}
        <div className="px-10 flex items-center justify-between flex-wrap gap-8 mb-12">
          {/* Created By */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Created By
            </span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-xs">
                            {epicData.assignee.name.split('').slice(0, 2).join('').toUpperCase()}

              </div>
              <span className="font-semibold text-gray-800 text-sm">
                {epicData.assignee.name}
              </span>
            </div>
          </div>
          {/* Assignee */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Assignee
            </span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#d7e2ff] text-[#0052cc] flex items-center justify-center font-bold text-xs border border-blue-100">
                           {epicData.assignee.name.split('').slice(0, 2).join('').toUpperCase()}

              </div>
              <span className="font-semibold text-gray-800 text-sm">
                {epicData.assignee.name}
              </span>
            </div>
          </div>

          {/* Created At */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Created At
            </span>
            <div className="flex items-center gap-2">
              <svg
                className="text-gray-400"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
                          <span className="font-semibold text-gray-800 text-sm">
                              {/* i want format this date */}
                {epicData.created_at && new Date(epicData.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* 4. Tasks Section */}
        <div className="px-10 pb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#00214d]">Tasks</h3>
            <button className="text-(--color-primary) font-bold text-sm flex items-center gap-1 hover:underline transition-all">
              <span className="text-xl">+</span> Add Task
            </button>
          </div>

          {/* Empty State Box */}
          <div className="w-full border-2 border-dashed border-gray-100 rounded-[20px] bg-[#f9fbff] py-16 flex flex-col items-center justify-center">
            {/* Empty Icon */}
            <div className="w-14 h-14 bg-[#d7e2ff] rounded-2xl flex items-center justify-center mb-4 text-[#0052cc]">
              <Image
                src={"/icons/epicpopuplist.svg"}
                alt="task lists"
                width={18}
                height={16}
              />
            </div>
            <p className="text-gray-950 font-bold text-lg mb-6 px-3 text-center">
              No tasks have been added to this epic yet
            </p>
            <Button className="bg-(--color-primary) text-white px-8 py-3 rounded-xs font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#0041a3] transition-all">
              <span className="text-lg">+</span> Add Task
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
