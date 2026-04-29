"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import FormHeader from "./FormHeader";
// import { addprojectformSchema } from "@/app/dashboard/projects/add/schema";
import { getSingleProject, updateProject } from "../action";
import { use, useEffect, useState } from "react";
import { addprojectformSchema } from "@/app/(dashboard)/projects/add/schema";
import { toast } from "sonner";
type FormData = z.infer<typeof addprojectformSchema>;

const UpdateProjectForm = () => {
  const router = useRouter();
  const params = useParams();
  const {
    register,
      handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({

    resolver: zodResolver(addprojectformSchema),
    mode: "onTouched",
  });
  const descriptionLength = watch("description")?.length || 0;
  useEffect(() => {
    if (!params.projectId) return;
    const fetchProjectDetails = async () => {
      try {
        const project = await getSingleProject(params?.projectId as string);
                reset({
          name: project.name,
          description: project.description,
        });

      } catch (error) {
        console.error("Failed to fetch project details:", error);
      }
  };
  fetchProjectDetails();
}, [params.projectId, reset]);
    const onSubmit = async (data: FormData) => {
    try {
      await updateProject({
        id: params.projectId as string,
        name: data.name,
        description: data.description,
      });
      toast.success("Project updated successfully");
      router.push(`/project/${params.projectId}/edit`);
    } catch (error: any) {
      toast.error(error.message || "Project update failed");
      return;
    }
  };
  return (
    <section className="w-full">
      <FormHeader />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* the email input */}
        <div className="w-full flex flex-col gap-2 pb-6">
          <label htmlFor="name" className="text-sm font-medium">
            Name
          </label>
          <Input
            {...register("name")}
            error={errors.name?.message}
            disabled={isSubmitting}
            type="text"
            id="name"
            placeholder="Enter your name"
          />
        </div>
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
            disabled={isSubmitting}
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
        {/* make remeber check and forget password */}

        {/* the submit button */}
        <div className="w-full flex justify-between items-center">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button
            disabled={isSubmitting}
            className="w-fit"
            variant="primary"
            type="submit"
          >
            {isSubmitting ? "Updating..." : "Update Project"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default UpdateProjectForm;
