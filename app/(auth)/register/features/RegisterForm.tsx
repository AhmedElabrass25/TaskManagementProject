"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema } from "../schema";
import {z} from "zod";
import { registerUser } from "../action";
import Link from "next/link";
import { useRouter } from "next/navigation";
import FormInputs from "./FormInputs";
import { toast } from "sonner";
type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    mode: "onTouched",
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await registerUser({
        name: data.name,
        email: data.email,  
        password: data.password,
        department: data.department,
      });
      toast.success("Account created successfully");
      router.push("/projects");

    } catch (error: any) {
      toast.error(error.message || "Signup failed");
      return;
    }
  };
  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputs register={register} errors={errors} isSubmitting={isSubmitting} />
     {/* the submit button */}
        <div className="w-full flex justify-center">
          <Button
            disabled={isSubmitting}
            className="w-full"
            variant="primary"
            type="submit"
          >
            {isSubmitting ? "Creating..." : "Create Account"}
          </Button>
        </div>
      </form>
      <p className="mt-8 flex items-center justify-center gap-2">
        Already have an account?
        <Link href="/login" className="text-(--color-primary) font-medium">
          Login
        </Link>
      </p>
    </section>
  );
};

export default RegisterForm;
