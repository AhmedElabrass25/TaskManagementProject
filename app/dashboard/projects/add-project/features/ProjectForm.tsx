"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { addprojectformSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addProject } from "../action";
import FormHeader from "./FormHeader";
type FormData = z.infer<typeof addprojectformSchema>;

const ProjectForm = () => {
  const router = useRouter();
  const {
    register,
      handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(addprojectformSchema),
  });
  const descriptionLength = watch("description")?.length || 0;

    const onSubmit = async (data: FormData) => {
      console.log(data);
    try {
      await addProject({
        name: data.name,
        description: data.description,
      });
      toast.success("Project created successfully");
      router.push("/dashboard/projects");
    } catch (error: any) {
      toast.error(error.message || "Project creation failed");
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
            {isSubmitting ? "create..." : "Create Project"}
          </Button>
        </div>
      </form>
    </section>
  );
};

export default ProjectForm;
