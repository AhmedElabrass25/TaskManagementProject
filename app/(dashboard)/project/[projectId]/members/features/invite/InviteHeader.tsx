import Image from "next/image";
import React from "react";

const InviteHeader = ({
  closeInviteModal,
}: {
  closeInviteModal: () => void;
}) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100/50">
          <img
            src="/icons/usericon.svg"
            alt="User Invite Icon"
            className="w-7 h-7 text-blue-600"
          />
        </div>
        <button
          onClick={closeInviteModal}
          className="text-gray-400 hover:text-gray-600 transition"
        >
          <Image
            src="/icons/close.svg"
            alt="Close Icon"
            width={14}
            height={14}
          />
        </button>
      </div>
      <div className="">
        <div className="flex items-center gap-4 mb-2">
          <h2 className="text-3xl font-bold text-gray-950">
            Invite Team Member
          </h2>
        </div>
        <p className="text-gray-600 text-[15px] leading-relaxed max-w-sm">
          Send an invitation to join the Architectural Studio workspace.
        </p>
      </div>
    </>
  );
};

export default InviteHeader;
