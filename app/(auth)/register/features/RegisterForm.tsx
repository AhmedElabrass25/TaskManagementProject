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
import toast from "react-hot-toast";
import FormInputs from "./FormInputs";
type FormData = z.infer<typeof registerSchema>;

const RegisterForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
  console.log(data);

    try {
      await registerUser({
        name: data.name,
        email: data.email,  
        password: data.password,
        department: data.department,
      });
      toast.success("Account created successfully");
      router.push("/dashboard/projects");

    } catch (error: any) {
        console.log("SERVER ERROR:", error);

      toast.error(error.message || "Signup failed");
      return;
    }
    console.log(data);

  };
  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
            <FormInputs register={register} errors={errors} />
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
