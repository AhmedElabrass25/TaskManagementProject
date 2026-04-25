"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getMembers } from "../action";
import { TableSkeleton } from "./MemberSkeleton";
import MobileMember from "./MobileMember";
import RoleBadge from "./RoleBadge";
import { IMember } from "@/types/types";
import MemberSkeleton from "../loading";


const AllMembers = () => {
  const params: { projectId?: string } = useParams();
    const [members, setMembers] = useState<IMember[]>([]);
    const [loading, setLoading] = useState(true);
    console.log(members);
  useEffect(() => {
    async function fetchMembers() {
      setLoading(true);
      const membersData = await getMembers(params.projectId as string);
      setMembers(membersData);
      setLoading(false);
    }
    fetchMembers();
  }, [params.projectId]);
  if (loading) {
    return (
      <MemberSkeleton/>
    )
  }
  return (
    <div className="py-4 min-h-screen">
      <div className="mx-auto rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Desktop*/}
        <div className="hidden md:block">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase text-gray-500 font-semibold">
                <th className="px-6 py-4">Member</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Joined At</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 bg-white">
              {members.map((member) => (
                <tr
                  key={member.member_id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-sm">
                        {member.metadata.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-gray-900">
                          {member.metadata.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {member.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <RoleBadge role={member.role} />
                  </td>
                  <td className="px-6 py-4 text-gray-600 text-sm">
                    {member.metadata.email_verified
                      ? "Verified"
                      : "Not Verified"}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {member.role !== "owner" && (
                      <button className="text-gray-400 hover:text-gray-600">
                        <Image
                          src={"/icons/editbtn.svg"}
                          width={3}
                          height={3}
                          alt="Actions"
                        />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile*/}
        <MobileMember members={members} />
      </div>
      {/* Mobile Floating Button */}
      <button className="md:hidden fixed bottom-6 right-6 w-12 h-12 bg-blue-700 text-white rounded-xl shadow-lg flex items-center justify-center">
        <Image
          src={"/icons/UserPlus.svg"}
          width={24}
          height={24}
          alt="Add Member"
        />
      </button>
    </div>
  );
};

export default AllMembers;
