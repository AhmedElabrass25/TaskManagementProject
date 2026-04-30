import { IEpicData } from '@/types/types';
import Image from 'next/image';
import React from 'react'

const HeaderSection = ({epicData, setIsOpen}:{epicData: IEpicData, setIsOpen: (val: boolean) => void}) => {
  return (
      <>
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
            <Image
              src={"/icons/close.svg"}
              alt="Close Button"
              width={14}
              height={14}
            />
          </button>
        </div>
      </>
  )
}

export default HeaderSection