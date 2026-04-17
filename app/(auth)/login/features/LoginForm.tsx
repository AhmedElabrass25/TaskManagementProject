"use client";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import { loginSchema } from "../schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { loginUser } from "../action";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
type FormData = z.infer<typeof loginSchema>;

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      await loginUser({
        email: data.email,
        password: data.password,
      });
      toast.success("Logged in successfully");
      router.push("/dashboard/projects");
    } catch (error: any) {
      toast.error(error.message || "Login failed");
      return;
    }
  };
  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* the email input */}
        <div className="w-full flex flex-col gap-2 pb-4">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <Input
            {...register("email")}
            error={errors.email?.message}
            type="email"
            id="email"
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full flex flex-col gap-2 pb-4">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <Input
            className="w-full"
            {...register("password")}
            error={errors.password?.message}
            type="password"
            id="password"
            placeholder="Enter your password"
          />
        </div>
          {/* make remeber check and forget password */}
        <div className="w-full flex items-center justify-between pb-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <Link href="/forgot-password" className="text-(--color-primary)">
            Forgot password?
          </Link>
        </div>
        {/* the submit button */}
        <div className="w-full flex justify-center">
          <Button
            disabled={isSubmitting}
            className="w-full"
            variant="primary"
            type="submit"
          >
            {isSubmitting ? "Login..." : "Login"}
          </Button>
        </div>
      
      </form>
      <p className="mt-8 flex items-center justify-center gap-2">
        Don't have an account?{" "}
        <Link href="/register" className="text-(--color-primary) font-medium">
          Register
        </Link>
      </p>
    </section>
  );
};
export default LoginForm;
