import React from "react";
import RoleBadge from "./RoleBadge";
import { IMember } from "@/types/types";
import Link from "next/link";
import Image from "next/image";

const MobileMember = ({ members }: { members: IMember[] }) => {
  return (
    <div className="md:hidden divide-y bg-white py-4 space-y-4">
      {members.map((member) => (
        <div
          key={member.member_id}
          className="bg-white rounded-lg p-4 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold">
              {member.metadata.name.charAt(0)}
            </div>
            <div>
              <div className="font-bold text-gray-900">
                {member.metadata.name}
              </div>
              <div className="text-xs text-gray-500">{member.email}</div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-3">
            <RoleBadge role={member.role} />
            <Link href={"#"}>
              <Image
                src={"/icons/editbtn.svg"}
                alt="edit member"
                width={3}
                height={3}
              />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileMember;
