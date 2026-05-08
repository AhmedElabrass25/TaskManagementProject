"use client";
import { IEpicData, IMember } from "@/types/types";
import EpicDeadline from "./EpicDeadline";
import { useEffect, useState } from "react";
import { getMembers } from "../../../members/action";
import Select from "react-select";
import { updateEpic } from "../../action";
import { useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
type Option = { value: string; label: string };
const EpicDetails = ({ epicData }: { epicData: IEpicData }) => {
  const [allMembers, setAllMembers] = useState<IMember[]>([]);
  const router = useRouter();
  const initialState = {
    value: epicData.assignee.id,
    label: epicData.assignee.name,
  };
  const initailsSelect = useRef(initialState);
  useEffect(() => {
    const getAllMmbers = async () => {
      const memebers = await getMembers(epicData.project_id);
      setAllMembers(memebers);
    };
    getAllMmbers();
  }, []);
  const options = allMembers.map((member: IMember) => ({
    value: member.user_id,
    label: member.metadata.name,
  }));
  const defaultValue = {
    value: epicData.assignee.id,
    label: epicData.assignee.name,
  };
  const handleChange = async (val: Option) => {
    if (val.value === initailsSelect.current.value) return;
    try {
      await updateEpic(epicData.id, { assignee_id: val.value });
      toast.success("Epic assignee updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update epic assignee", {
        style: { color: "red" },
      });
      defaultValue.value = initailsSelect.current.value;
    }
  };
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
            {/* <span className="font-semibold text-gray-800 text-sm">
              {epicData.assignee.name}
            </span> */}
            <Select
              options={options}
              defaultValue={defaultValue}
              onChange={() => handleChange}
            />
          </div>
        </div>
        {/* Created At */}
        <EpicDeadline deadline={epicData.deadline} epicId={epicData.id} />
      </div>
    </>
  );
};

export default EpicDetails;
