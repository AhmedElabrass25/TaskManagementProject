"use client";
import { useForm } from "react-hook-form";
import { UpdateEpicFormData, updateEpicSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { IEpicData, IMember } from "@/types/types";
import { updateEpic } from "../action";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getMembers } from "../../members/action";
import { toast } from "sonner";
import UpdateEpicHeader from "./UpdateEpicHeader";
import UpdateModalInputs from "./UpdateModalInputs";

interface IProps {
  epicData: IEpicData;
  isUpdateEpicOpen: boolean;
  setIsUpdateEpicOpen: (val: boolean) => void;
}
const UpdateEpicModal = ({
  epicData,
  isUpdateEpicOpen,
  setIsUpdateEpicOpen,
}: IProps) => {
  const router = useRouter();
  const { projectId } = useParams();
  const [allMembers, setAllMembers] = useState<IMember[]>([]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<UpdateEpicFormData>({
    mode: "onTouched",
    resolver: zodResolver(updateEpicSchema),
    defaultValues: {
      title: epicData.title || "",
      description: epicData.description || "",
      assignee_id: epicData.assignee.id || "",
      deadline: epicData.deadline || "",
    },
  });
  // get all members
  useEffect(() => {
    if (!projectId) return;
    const fetchMembers = async () => {
      const members = await getMembers(projectId as string);
      setAllMembers(members);
    };
    fetchMembers();
  }, [projectId]);

  const onSubmit = async (data: UpdateEpicFormData) => {
    console.log("data");
    try {
      await updateEpic({
        id: data.epic_id,
        title: data.title,
        description: data.description,
        assignee_id: data.assignee_id,
        deadline: data.deadline,
      });
      toast.success("Epic Updated successfully");
      router.push(`/project/${projectId}/epics`);
    } catch (error: any) {
      toast.error(error.message || "epic update failed");
      return;
    }
  };
  const descriptionLength = watch("description")?.length || 0;

  if (!isUpdateEpicOpen) return null;
  return (
    <>
      <div
        onClick={() => setIsUpdateEpicOpen(false)}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-[2px]"
      >
        <div className="w-full max-w-212 bg-white rounded-lg p-4 md:p-12 shadow-sm border border-gray-100">
          {/* header */}
          <UpdateEpicHeader setIsUpdateEpicOpen={setIsUpdateEpicOpen} />
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit(onSubmit)}
          >
            <UpdateModalInputs
              setIsUpdateEpicOpen={setIsUpdateEpicOpen}
              isSubmitting={isSubmitting}
              register={register}
              errors={errors}
              allMembers={allMembers}
              descriptionLength={descriptionLength}
            />
          </form>
        </div>
      </div>
    </>
  );
};

export default UpdateEpicModal;
