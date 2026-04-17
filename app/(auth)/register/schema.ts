import { z } from "zod";

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be less than 50 characters")
    .regex(
      /^[\p{L}]+(?:\s[\p{L}]+)*$/u,
      "Only letters and single spaces allowed (no numbers or symbols)"
    )
    .refine((val) => !/\s{2,}/.test(val), {
      message: "No multiple consecutive spaces",
    }),

  email: z.string().email("Invalid email address"),

  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .max(64, "Maximum 64 characters")
    .regex(/[A-Z]/, "Must include uppercase letter")
    .regex(/[a-z]/, "Must include lowercase letter")
    .regex(/[0-9]/, "Must include a number")
    .regex(/[^A-Za-z0-9]/, "Must include special character")
    .refine((val) => !/\s/.test(val), {
      message: "No spaces allowed",
    }),

  confirmPassword: z.string(),

  department: z.string().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});