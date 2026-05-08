"use client";
import { IEpicData } from "@/types/types";
import Image from "next/image";
import { useRef, useState } from "react";
import { updateEpic } from "../../action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const HeaderSection = ({
  epicData,
  setIsOpen,
}: {
  epicData: IEpicData;
  setIsOpen: (val: boolean) => void;
}) => {
  const [title, setTitle] = useState<string>(epicData.title);
  const currentTitleRef = useRef(epicData.title);
  const router = useRouter();
  const handleBlur = async () => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      toast.error("Title is required", { style: { color: "red" } });
      setTitle(currentTitleRef.current);
      return;
    }
    if (trimmedTitle === currentTitleRef.current) return;
    const previousTitle = currentTitleRef.current;
    try {
      currentTitleRef.current = trimmedTitle;
      await updateEpic(epicData.id, { title: trimmedTitle });
      toast.success("Epic title updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update epic title", {
        style: { color: "red" },
      });
      currentTitleRef.current = previousTitle;
      setTitle(previousTitle);
    }
  };
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
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleBlur}
            className="text-[32px] font-bold text-[#00214d] leading-tight"
            value={title}
          />
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
  );
};

export default HeaderSection;
