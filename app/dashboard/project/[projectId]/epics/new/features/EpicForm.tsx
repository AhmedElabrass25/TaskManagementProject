"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { addEpicSchema } from "../schema";
import { addEpic } from "../action";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import { z } from "zod";
import Button from "@/components/ui/Button";
import { IMember } from "@/types/types";
type FormData = z.infer<typeof addEpicSchema>;

const EpicForm = ({
  membersData,
  projectId,
}: {
  membersData: IMember[];
  projectId: string;
  }) => {
  console.log(membersData);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(addEpicSchema),
    mode: "onTouched",
  });
  console.log("Validation Errors:", errors);
  const descriptionLength = watch("description")?.length || 0;
  const onSubmit = async (data: FormData) => {
        console.log(data);

    try {
      await addEpic({
        title: data.title,
        description: data.description,
        project_id: data.project_id,
        assignee_id: data.assignee_id ,
        deadline: data.deadline,
      });
      toast.success("Epic created successfully");
      router.push("/dashboard/projects");
    } catch (error: any) {
      toast.error(error.message || "Project creation failed");
      return;
    }
  };
  return (
    <>
      {/* Form Card */}
      <section className="w-full flex items-center justify-center">
        <div className="w-full max-w-212 bg-white rounded-lg p-12 shadow-sm border border-gray-100">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* the email input */}
            <div className="w-full flex flex-col gap-2 pb-6">
              <label htmlFor="title" className="text-sm font-medium">
                Title
              </label>
              <Input
                {...register("title")}
                error={errors.title?.message}
                type="text"
                id="title"
                placeholder="Enter epic title"
              />
            </div>
            <input type="hidden" value={projectId} {...register("project_id")} />
            {/* Description Textarea  */}
            <div className="w-full flex flex-col gap-2 pb-4">
              <label
                htmlFor="description"
                className="text-sm flex items-center justify-between font-medium"
              >
                <span>Description</span>
                <small className="text-xs text-slate-400">Optional</small>
              </label>
              {/* use teaxtarea */}
              <textarea
                {...register("description")}
                id="description"
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
            {/* Assignee Dropdown + Deadline Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assignee Dropdown */}
              <div className="space-y-4">
                <label className="text-[13px] font-bold text-gray-500 uppercase tracking-wider block">
                  Assignee
                </label>
                <div className="relative">
                  <select
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
                    <p className="text-red-500 mt-1">{errors.assignee_id.message}</p>
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
                  Deadline
                </label>
                <Input
                  type="date"
                  {...register("deadline")}
                  className="w-full bg-[#D7E2FF] border-none rounded-xl p-5 text-gray-700 outline-none focus:ring-2 focus:ring-blue-400 transition-all cursor-pointer"
                  placeholder="mm/dd/yyyy"
                  error={errors.deadline?.message}

                />
              </div>
            </div>
            <div className="flex justify-end items-center gap-8 pt-6">
              <button
                onClick={() => router.push("/dashboard/projects")}
                type="button"
                className="text-gray-500 font-bold text-sm hover:text-gray-700 transition-colors"
              >
                Cancel
              </button>
              <Button
                disabled={isSubmitting}
                type="submit"
                className="rounded-xs"
                variant="primary"
              >
                {isSubmitting ? "Creating..." : "Create Epic"}
              </Button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default EpicForm;
