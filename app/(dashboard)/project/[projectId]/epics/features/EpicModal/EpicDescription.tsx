"use client";
import { useRef, useState } from "react";
import { updateEpic } from "../../action";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EpicDescription = ({
  description,
  epicId,
}: {
  description: string;
  epicId: string;
}) => {
  const [desc, setDesc] = useState(description);
  const initialDesc = useRef(description);
  const router = useRouter();

  const handleBlur = async () => {
    const trimmedDesc = desc.trim();
    if (!trimmedDesc) {
      toast.error("Description is required", { style: { color: "red" } });
      setDesc(initialDesc.current);
      return;
    }
    if (trimmedDesc === initialDesc.current) return;
    const previousDesc = initialDesc.current;
    try {
      initialDesc.current = trimmedDesc;
      await updateEpic(epicId, { description: trimmedDesc });
      toast.success("Epic description updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update epic description", {
        style: { color: "red" },
      });
      initialDesc.current = previousDesc;
      setDesc(previousDesc);
    }
  };
  return (
    <div className="px-10 mb-10">
      <textarea
        className="w-full bg-transparent text-gray-600 text-lg leading-relaxed resize-none overflow-hidden transition-all"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
        onBlur={handleBlur}
      />
    </div>
  );
};

export default EpicDescription;
