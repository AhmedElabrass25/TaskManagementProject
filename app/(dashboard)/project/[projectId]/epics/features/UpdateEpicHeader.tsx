import Image from 'next/image';
import React from 'react'

const UpdateEpicHeader = ({setIsUpdateEpicOpen}:{setIsUpdateEpicOpen: (val: boolean) => void}) => {
  return (
    <>  <div className="w-full flex items-center justify-between mb-4">
            <h1>Update Epic</h1>
            <button
              onClick={() => {
                setIsUpdateEpicOpen(false);
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
          </div></>
  )
}

export default UpdateEpicHeader