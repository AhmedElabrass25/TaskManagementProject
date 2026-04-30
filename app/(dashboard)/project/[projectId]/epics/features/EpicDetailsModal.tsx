"use client";
import Button from "@/components/ui/Button";
import { IEpicData, ITask } from "@/types/types";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { getAllTasks, getEpicTasks } from "../../tasks/action";
import HeaderSection from "./EpicModal/HeaderSection";
import EpicDetails from "./EpicModal/EpicDetails";
import EpicTasks from "./EpicModal/EpicTasks";
import Spinner from "@/components/Spinner";
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
  const { projectId } = useParams();
  const [loading, setLoading] = useState(false);
  const [epicTasks, setEpicTasks] = useState<ITask[]>([]);
  useEffect(() => {
    const getTasks = async () => {
      setLoading(true);
      const tasks = await getEpicTasks(epicData.id as string);
      setEpicTasks(tasks);
      setLoading(false);
    };
    getTasks();
  }, [projectId]);
  if (!isOpen) return null;
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
    >
      {/* Modal Container */}
      <div className="relative w-full h-137.5 md:h-fit overflow-auto max-w-2xl bg-white rounded-lg shadow-2xl border border-gray-100">
        <HeaderSection epicData={epicData} setIsOpen={setIsOpen} />
        {/* 2. Description */}
        <div className="px-10 mb-10">
          <p className="text-gray-500 text-lg leading-relaxed">
            {epicData.description}
          </p>
        </div>
        <EpicDetails epicData={epicData} />
        {/* 4. Tasks Section */}
        <div className="px-10 pb-12">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold text-[#00214d]">Tasks</h3>
            <Link href={`/project/${epicData.project_id}/tasks/new`}>
              <button className="text-(--color-primary) font-bold text-sm flex items-center gap-1 hover:underline transition-all">
                <span className="text-xl">+</span> Add Task
              </button>
            </Link>
          </div>

          {/* Empty State Box */}
          <div className="border-2 border-gray-300 rounded-md">
            {loading ? (
              <Spinner />
            ) : epicTasks.length > 0 ? (
              epicTasks.map((task: ITask) => (
                <EpicTasks task={task} key={task?.id} />
              ))
            ) : (
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
                <Link href={`/project/${epicData.project_id}/tasks/new`}>
                  <Button className="bg-(--color-primary) text-white px-8 py-3 rounded-xs font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-200 hover:bg-[#0041a3] transition-all">
                    <span className="text-lg">+</span> Add Task
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
