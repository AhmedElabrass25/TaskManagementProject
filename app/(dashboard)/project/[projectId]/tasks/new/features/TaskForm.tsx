"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { taskSchema } from "../schema";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { z } from "zod";
import Button from "@/components/ui/Button";
import { IEpicData, IMember } from "@/types/types";
import { toast } from "sonner";
import { addTask } from "../action";
type FormData = z.infer<typeof taskSchema>;

const TaskForm = ({
  membersData,
  projectId,
  allEpics,
}: {
  membersData: IMember[];
  projectId: string;
  allEpics: IEpicData[];
}) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(taskSchema),
      mode: "onTouched",
      defaultValues: {
          project_id: projectId,
          epic_id: "",
    
    status: "TO_DO",
  },
  });
  const descriptionLength = watch("description")?.length || 0;
const onSubmit = async (data: FormData) => {
  try {
    await addTask({
      project_id: data.project_id,
      title: data.title,
      description: data.description,
      epic_id: data.epic_id || undefined,
      assignee_id: data.assignee_id || undefined,
      due_date: data.due_date
        ? new Date(data.due_date).toISOString()
        : undefined,
      status: data.status || "TO_DO",
    });

    toast.success("Task created successfully");
    router.push("/projects");
  } catch (error: any) {
    toast.error(error.message || "Task creation failed");
  }
};
  return (
    <>
      {/* Form Card */}
      <section className="w-full flex items-center justify-center">
        <div className="w-full max-w-212 bg-white rounded-lg p-4 md:p-12 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* the title input */}
            <div className="w-full flex flex-col gap-2 pb-6">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                {...register("title")}
                error={errors.title?.message}
                disabled={isSubmitting}
                type="text"
                id="title"
                placeholder="Enter epic title"
              />
            </div>

            {/* Assignee Dropdown + Status*/}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assignee Dropdown */}
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider block">
                  Assignee
                </label>
                <div className="relative">
                  <select
                    disabled={isSubmitting}
                    {...register("assignee_id")}
                    className="w-full h-12 bg-[#D7E2FF] border-none rounded-xs px-5 text-gray-700 outline-0 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select Assignee</option>
                    {membersData.map((member) => (
                      <option key={member.user_id} value={member.user_id}>
                        {member.metadata.name}
                      </option>
                    ))}
                  </select>
                  {errors.assignee_id && (
                    <p className="text-red-500 mt-1">
                      {errors.assignee_id.message}
                    </p>
                  )}
                  <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="#6b7280"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Deadline Date */}
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider block">
                  Status
                </label>
                <select
                  {...register("status")}
                  disabled={isSubmitting}
                  className="w-full h-12 bg-[#D7E2FF] border-none rounded-xs px-5 outline-0 cursor-pointer"
                >
                  <option value="TO_DO">TO DO</option>
                  <option value="IN_PROGRESS">IN PROGRESS</option>
                  <option value="BLOCKED">BLOCKED</option>
                  <option value="IN_REVIEW">IN REVIEW</option>
                  <option value="READY_FOR_QA">READY FOR QA</option>
                  <option value="REOPENED">REOPENED</option>
                  <option value="READY_FOR_PRODUCTION">
                    READY FOR PRODUCTION
                  </option>
                  <option value="DONE">DONE</option>
                </select>
              </div>
            </div>
            {/* Epic ID   */}
            <div className="w-full flex flex-col gap-2 pb-4">
              <label
                htmlFor="due_date"
                className="text-sm flex items-center justify-between font-medium"
              >
                <span>Epic</span>
                <small className="text-xs text-slate-400">Optional</small>
              </label>
              <div className="relative">
                <select
                  disabled={isSubmitting}
                  {...register("epic_id")}
                  className="w-full h-12 bg-[#D7E2FF] border-none rounded-xs px-5 text-gray-700 outline-0 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Epic link</option>
                  {allEpics.map((epic) => (
                    <option key={epic.id} value={epic.id}>
                      {epic.title}
                    </option>
                  ))}
                </select>
                {errors.epic_id && (
                  <p className="text-red-500 mt-1">{errors.epic_id.message}</p>
                )}
                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none">
                  <svg
                    width="14"
                    height="8"
                    viewBox="0 0 14 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L7 7L13 1"
                      stroke="#6b7280"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>
            {/* due date   */}
            <div className="w-full flex flex-col gap-2 pb-4">
              <label
                htmlFor="due_date"
                className="text-sm flex items-center justify-between font-medium"
              >
                <span>Due Date</span>
                <small className="text-xs text-slate-400">Optional</small>
              </label>
              <Input
                {...register("due_date")}
                error={errors.due_date?.message}
                disabled={isSubmitting}
                type="datetime-local"
                id="due_date"
                placeholder="Enter due date"
              />
            </div>
            {/* Description Textarea  */}
            <div className="w-full flex flex-col gap-2 pb-4">
              <label
                htmlFor="description"
                className="text-sm flex items-center justify-between font-medium"
              >
                <span>Description</span>
                <small className="text-xs text-slate-400">Optional</small>
              </label>
              {/* Description */}
              <textarea
                {...register("description")}
                id="description"
                disabled={isSubmitting}
                placeholder="Enter your description"
                className={`resize-none outline-0 p-4 text-left font-semibold text-(--font-body-md) rounded-xs ${errors.description ? "bg-(--color-error-low)" : "bg-(--color-surface-high)"}`}
                rows={4}
                maxLength={500}
              />
              <small className="w-full text-right text-slate-400">
                {descriptionLength} / 500 characters
              </small>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>
            {/* buttons */}
            <div className="flex justify-end items-center gap-8 pt-6">
              <button
                onClick={() => router.push("/projects")}
                type="button"
                className="text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors"
              >
                Back
              </button>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="rounded-xs"
                variant="primary"
              >
                {isSubmitting ? "Creating..." : "Create Task"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default TaskForm;
