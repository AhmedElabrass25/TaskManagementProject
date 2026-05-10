"use client";
import { IEpicData, ITask } from "@/types/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getAllEpics } from "../../../epics/action";
import { updateTask } from "../../action";
import { useAppDispatch } from "@/store/hooks";
import { updateTaskLocally } from "@/store/slices/tasks/taskSlice";
import { toast } from "sonner";
import Select from "react-select";

type EpicOption = {
  value: string;
  label: string;
};

type Props = {
  projectId: string;
  taskId: string;
  taskEpic: string;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};

const TaskEpic = ({
  taskId,
  taskEpic,
  updateTaskInColumn,
  projectId,
}: Props) => {
  const [epics, setEpics] = useState<IEpicData[]>([]);
  const [currentEpic, setCurrentEpic] = useState<EpicOption | null>(null);
  const dispatch = useAppDispatch();
  // fetch epics
  useEffect(() => {
    const fetchEpics = async () => {
      const data = await getAllEpics(projectId);
      setEpics(data);
    };
    fetchEpics();
  }, [projectId]);

  // options
  const epicOptions: EpicOption[] = epics.map((epic) => ({
    value: epic.id,
    label: epic.title,
  }));

  const allOptions: EpicOption[] = [
    {
      value: "",
      label: "No Epic Assigned",
    },
    ...epicOptions,
  ];

  useEffect(() => {
    const selected = allOptions.find((opt) => opt.label === taskEpic) || null;
    setCurrentEpic(selected);
  }, [taskEpic, epics]);

  const handleEpicChange = async (option: EpicOption | null) => {
    if (!option) return;
    const previousEpic = currentEpic;
    setCurrentEpic(option);
    try {
      const changes = {
        epic_id: option.value || undefined,
      };
      dispatch(
        updateTaskLocally({
          taskId,
          changes,
        }),
      );
      updateTaskInColumn?.(taskId, changes);
      await updateTask(taskId, {
        epic_id: option.value || undefined,
      });
      toast.success("Epic updated successfully");
    } catch (error) {
      toast.error("Failed to update epic", {
        style: { color: "red" },
      });
      setCurrentEpic(previousEpic);

      dispatch(
        updateTaskLocally({
          taskId,
          changes: {
            epic_id: previousEpic?.value || undefined,
          },
        }),
      );

      updateTaskInColumn?.(taskId, {
        epic_id: previousEpic?.value || undefined,
      });
    }
  };
  return (
    <div className="space-y-3">
      <div className="relative">
        <Select
          className="w-fit"
          options={allOptions}
          value={currentEpic}
          onChange={handleEpicChange}
          isSearchable
          isClearable={false}
          instanceId="task-epic-select"
          formatOptionLabel={(option: EpicOption) => (
            <div className="flex items-center gap-2">
              <Image
                src="/icons/layericon.svg"
                alt="epic icon"
                width={12}
                height={12.7}
              />
              <span>{option.label}</span>
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default TaskEpic;
