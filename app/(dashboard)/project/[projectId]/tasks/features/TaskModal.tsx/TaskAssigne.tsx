"use client";
import { IMember, ITask, IUser } from "@/types/types";
import { useEffect, useMemo, useState } from "react";
import { getMembers } from "../../../members/action";
import Select from "react-select";
import { updateTask } from "../../action";
import { toast } from "sonner";
import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";

type MemberOption = {
  value: string;
  label: string;
};

type Props = {
  projectId: string;
  taskId: string;
  assign?: IUser | null;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};

const TaskAssigne = ({
  projectId,
  taskId,
  assign,
  updateTaskInColumn,
}: Props) => {
  console.log(assign);

  const [members, setMembers] = useState<IMember[]>([]);
  console.log(members);

  const dispatch = useAppDispatch();
  useEffect(() => {
    const fetchMembers = async () => {
      const data = await getMembers(projectId);
      setMembers(data);
    };
    fetchMembers();
  }, [projectId]);

  const options: MemberOption[] = [
    { value: "", label: "Unassigned" },
    ...members.map((m: any) => ({
      value: m.user_id,
      label: m.metadata?.name || "Unknown",
    })),
  ];
  const currentValue = options.find((o) => o.value === assign?.id) || null;
  const handleChange = async (option: MemberOption | null) => {
    if (!option) return;
    const previous = currentValue;
    const changes = {
      assignee_id: option.value || null,
    };
    dispatch(updateTaskLocally({ taskId, changes }));
    updateTaskInColumn?.(taskId, changes);
    try {
      await updateTask(taskId, {
        assignee_id: option.value || undefined,
      });
      toast.success("Assignee updated");
    } catch (err) {
      toast.error("Update failed", { style: { color: "red" } });
      dispatch(
        updateTaskLocally({
          taskId,
          changes: {
            assignee_id: previous ? previous.value : null,
          },
        }),
      );
      updateTaskInColumn?.(taskId, {
        assignee_id: previous ? previous.value : null,
      });
    }
  };

  return (
    <div className="space-y-2">
      <h3 className="text-[11px] font-bold text-slate-400 uppercase">
        Assignee
      </h3>

      <Select
        options={options}
        value={currentValue}
        onChange={handleChange}
        instanceId="assignee-select"
      />
    </div>
  );
};

export default TaskAssigne;
