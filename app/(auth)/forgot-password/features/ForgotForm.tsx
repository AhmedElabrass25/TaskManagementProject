// "use client";
// import Button from "@/components/ui/Button";
// import Input from "@/components/ui/Input";
// import { zodResolver } from "@hookform/resolvers/zod";
// import Image from "next/image";
// import Link from "next/link";
// import { useForm } from "react-hook-form";
// import { forgotPasswordSchema } from "../schema";
// import { useRouter } from "next/navigation";
// import { recoverPassword } from "../action";
// import toast from "react-hot-toast";
// import { z } from "zod";
// import { useEffect, useState } from "react";
// type FormData = z.infer<typeof forgotPasswordSchema>;

// const ForgotForm = () => {
//   const [timer, setTimer] = useState(0);
//   const [tries, setTries] = useState(0);
//   const MAX_TRIES = 3;
//   const DELAY = 300;
//   const router = useRouter();
//   useEffect(() => {
//     if (timer <= 0) return;
//     const interval = setInterval(() => {
//       setTimer((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(interval);
//   }, [timer]);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting },
//   } = useForm<FormData>({
//     resolver: zodResolver(forgotPasswordSchema),
//   });

//   const onSubmit = async (data: FormData) => {
//     if (tries >= MAX_TRIES) {
//       toast.error("Too many attempts. Please try again later.");
//       return;
//     }
//     try {
//       await recoverPassword({
//         email: data.email,
//       });
//       toast.success(
//         "If an account exists with this email, we’ve sent a password reset link.",
//       );

//       setTries((prev) => prev + 1);
//       setTimer(DELAY);
//     } catch (error: any) {
//       toast.error(error.message || "Recovery failed");
//       return;
//     }
//   };
//   return (
//     <section className="w-full">
//       <form onSubmit={handleSubmit(onSubmit)}>
//         {/* the email input */}
//         <div className="w-full flex flex-col gap-2 pb-4">
//           <label htmlFor="email" className="text-sm font-medium">
//             Email
//           </label>
//           <Input
//             {...register("email")}
//             error={errors.email?.message}
//             type="email"
//             id="email"
//             placeholder="Enter your email"
//           />
//         </div>
//         <div className="w-full flex justify-center">
//           <Button
//             disabled={isSubmitting}
//             className="w-full"
//             variant="primary"
//             type="submit"
//           >
//             {isSubmitting ? "Sending..." : "Send Reset Link"}
//           </Button>
//         </div>
//       </form>
//       <Link
//         href="/login"
//         className="w-full flex items-center justify-center gap-3 mt-4 text-(--color-primary) font-medium"
//       >
//         <Image
//           src="/icons/leftarrow.svg"
//           alt="arrow-left"
//           width={12}
//           height={12}
//         />
//         Back to login
//       </Link>
//     </section>
//   );
// };

// export default ForgotForm;
"use client";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { forgotPasswordSchema } from "../schema";
import { recoverPassword } from "../action";
import toast from "react-hot-toast";
import { z } from "zod";
import { useEffect, useState } from "react";

type FormData = z.infer<typeof forgotPasswordSchema>;

const MAX_TRIES = 3;
const DELAY = 300; // 5 minutes

const ForgotForm = () => {
  const [timer, setTimer] = useState(0);
  const [tries, setTries] = useState(0);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  // ✅ تحميل البيانات من localStorage
  useEffect(() => {
    const savedTries = localStorage.getItem("forgot_tries");
    const savedExpiry = localStorage.getItem("forgot_expiry");

    if (savedTries) {
      setTries(Number(savedTries));
    }

    if (savedExpiry) {
      const remaining = Math.floor(
        (Number(savedExpiry) - Date.now()) / 1000
      );

      if (remaining > 0) {
        setTimer(remaining);
      } else {
        localStorage.removeItem("forgot_expiry");
      }
    }
  }, []);

  // ✅ countdown
  useEffect(() => {
    if (timer <= 0) {
      localStorage.removeItem("forgot_expiry");
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  const onSubmit = async (data: FormData) => {
    if (tries >= MAX_TRIES) {
      toast.error("Too many attempts. Please try again later.");
      return;
    }

    try {
      await recoverPassword({
        email: data.email,
      });

      toast.success(
        "If an account exists with this email, we’ve sent a password reset link."
      );

      // ✅ update tries + save
      const newTries = tries + 1;
      setTries(newTries);
      localStorage.setItem("forgot_tries", newTries.toString());

      // ✅ save expiry time
      const expiry = Date.now() + DELAY * 1000;
      localStorage.setItem("forgot_expiry", expiry.toString());

      setTimer(DELAY);
    } catch (error: any) {
      toast.error("Something went wrong");
    }
  };

  const canResend = timer === 0 && tries < MAX_TRIES;

  return (
    <section className="w-full">
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Email */}
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

        {/* Submit */}
        <div className="w-full flex justify-center">
          <Button
            disabled={isSubmitting}
            className="w-full"
            variant="primary"
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </Button>
        </div>
      </form>

      {/* Resend */}
      <div className="text-center mt-4">
        <button
          onClick={handleSubmit(onSubmit)}
          disabled={!canResend}
          className="text-blue-500 disabled:text-gray-400"
        >
          Don't Receive An Email? Resend
        </button>

        {/* Timer */}
        {timer > 0 && (
          <p className="text-sm text-gray-500 mt-2">
            Try again in {Math.floor(timer / 60)}:
            {(timer % 60).toString().padStart(2, "0")}
          </p>
        )}

        {/* Attempts */}
        <p className="text-xs text-gray-400 mt-2">
          Attempts: {tries}/{MAX_TRIES}
        </p>
      </div>

      {/* Back */}
      <Link
        href="/login"
        className="w-full flex items-center justify-center gap-3 mt-4 text-(--color-primary) font-medium"
      >
        <Image
          src="/icons/leftarrow.svg"
          alt="arrow-left"
          width={12}
          height={12}
        />
        Back to login
      </Link>
    </section>
  );
};

export default ForgotForm;