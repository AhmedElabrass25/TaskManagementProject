"use client";
import { IEpicData } from "@/types/types";
import Image from "next/image";
import { useState } from "react";
import EpicDetailsModal from "./EpicDetailsModal";

function EpicCard({ epic }: { epic: IEpicData }) {
  const [isOpen, setIsOpen] = useState(false);
  const isDone = false;

  return (
    <div
      onClick={() => setIsOpen(true)}
      className={`relative w-full md:w-117 min-h-52.75 mb-3 md:mb-0 rounded-lg p-4 flex flex-col justify-between shadow-sm ${
        isDone ? 'bg-[#E0E8FF] border-blue-100' : 'border-l-4 border-[#002113] bg-white'
      }`}
    >
      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1.5 rounded-xs text-sm font-semibold tracking-tight border ${
            isDone
              ? 'bg-white text-blue-800 border-blue-100'
              : 'bg-emerald-100 text-emerald-900 border-emerald-200'
          }`}
        >
          {epic.epic_id}
        </span>
              <Image src={'/icons/editbtn.svg'} alt="Edit Epic" width={3} height={3} />
      </div>
      <h3 className="text-[28px] leading-tight font-semibold text-gray-950 mt-4">
        {epic.description}
      </h3>
      <div className="flex justify-between items-end mt-5">
        <div className="flex items-center gap-3">
          <div
            className={`w-13 h-13 rounded-xl flex items-center justify-center text-lg font-bold ${
              isDone
                ? 'bg-[#003D9B] text-white' 
                : 'bg-[#65DCA4] text-[#002113]' 
            }`}
          >
            {/* get two character */}
            {epic.assignee.name.split('').slice(0, 2).join('').toUpperCase()}
          </div>
          <div>
            <div className="text-xs text-gray-500">Assignee</div>
            <div className="text-lg font-semibold text-gray-900 leading-tight">
              {epic.assignee.name}
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1.5 rounded-xs text-sm font-semibold tracking-tight ${
            isDone
              ? 'bg-(--color-surface-low) text-(--color-primary)' 
              : 'bg-(--color-surface-low) text-[#65DCA4]' 
          }`}
        >
          {'To Do'}
        </span>
      </div>
      <div className="mt-6">
        <div className="h-px bg-gray-100 mb-5"></div>        
        <div className="flex justify-between items-center text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Image src={'/icons/createdby.svg'} alt="Created by" width={14} height={11} />
            <span>
             <span className="hidden md:block"> Created by:</span> <span className="font-medium text-gray-700">{epic.created_by.name}</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Image src={'/icons/calender.svg'} alt="Created date" width={11} height={12} />
            <span>{epic.deadline}</span>
          </div>
        </div>
      </div>
      {isOpen && (
        <EpicDetailsModal 
          isOpen={isOpen} 
          setIsOpen={setIsOpen}
          epicData={epic} 
        />
      )}
    </div>
  );
}
export default EpicCard;