"use client";

import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { resetPasswordSchema } from "../schema";
import { updatePassword } from "../action";
import Link from "next/link";

type FormData = z.infer<typeof resetPasswordSchema>;

export default function ResetForm({
  accessToken,
}: {
  accessToken: string;
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: FormData) => {
    const res = await updatePassword(
      data.password,
      accessToken
    );

    if (!res.success) {
      toast.error(res.message || "Failed");
      return;
    }

    toast.success(
      "Your password has been updated successfully. You can now log in"
    );

    setTimeout(() => {
      router.push("/login");
    }, 3000);
  };

  return (
    <section className="max-w-md mx-auto mt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Password */}
      <div className="w-full flex flex-col gap-2">
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

        {/* Confirm */}
        <div className="w-full flex flex-col gap-2">
          <label htmlFor="confirm-password" className="text-sm font-medium">
            Confirm Password
          </label>
          <Input
            className="w-full"
            {...register("confirmPassword")}
            error={errors.confirmPassword?.message}
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
          />
        </div>

        <Button disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Updating..." : "Update Password"}
        </Button>
          </form>
          <Link href="/login" className="text-(--color-primary) font-medium">Back to Login</Link>
    </section>
  );
}