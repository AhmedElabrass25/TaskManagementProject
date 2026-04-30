import { IEpicData } from '@/types/types'
import React from 'react'

const EpicDetails = ({epicData}:{epicData: IEpicData}) => {
  return (
    <>
     <div className="px-10 flex items-center justify-between flex-wrap gap-8 mb-12">
          {/* Created By */}
          <div className="space-y-3">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
              Created By
            </span>
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#0052cc] text-white flex items-center justify-center font-bold text-xs">
                {epicData.assignee.name
                  .split("")
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
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
                {epicData.assignee.name
                  .split("")
                  .slice(0, 2)
                  .join("")
                  .toUpperCase()}
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
                {epicData.created_at &&
                  new Date(epicData.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </>
  )
}

export default EpicDetails