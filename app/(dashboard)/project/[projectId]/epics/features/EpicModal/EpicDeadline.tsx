import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import { updateEpic } from "../../action";

const EpicDeadline = ({
  deadline,
  epicId,
}: {
  deadline: string;
  epicId: string;
}) => {
  const [date, setDate] = useState(deadline ? deadline.split("T")[0] : "");
  const initialDate = useRef(deadline);
  const router = useRouter();
  //   const formatDate = deadline
  //     ? new Date(deadline).toLocaleDateString("en-GB", {
  //         day: "2-digit",
  //         month: "short",
  //         year: "numeric",
  //       })
  //     : "No Date";
  const today = new Date().toISOString().split("T")[0];
  const handleBlur = async () => {
    if (date === initialDate.current) return;
    try {
      initialDate.current = date;
      await updateEpic(epicId, { deadline: date });
      toast.success("Epic deadline updated successfully");
      router.refresh();
    } catch (error) {
      toast.error("Failed to update deadline");
      setDate(initialDate.current);
    }
  };
  return (
    <div className="space-y-3">
      <span className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">
        Created At
      </span>
      <div className="flex items-center gap-2">
        {/* <svg
          className="text-gray-400"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="16" y1="2" x2="16" y2="6"></line>
          <line x1="8" y1="2" x2="8" y2="6"></line>
          <line x1="3" y1="10" x2="21" y2="10"></line>
        </svg> */}
        <input
          type="date"
          value={date}
          min={today}
          onChange={(e) => setDate(e.target.value)}
          onBlur={handleBlur}
        />
      </div>
    </div>
  );
};

export default EpicDeadline;
