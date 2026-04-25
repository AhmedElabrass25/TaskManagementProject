import React from "react";
import { TableSkeleton } from "./features/MemberSkeleton";

const MemberSkeleton = () => {
  return (
    <div className="p-4 min-h-screen">
      <div className="mx-auto rounded-xl shadow-sm border border-gray-100 overflow-hidden">
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
            {[1, 2, 3, 4].map((item) => (
              <TableSkeleton key={item} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default MemberSkeleton;
