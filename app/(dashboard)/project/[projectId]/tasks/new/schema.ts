import { z } from "zod";

export const taskSchema = z.object({
  project_id: z.string().min(1, "Project is required"),
  epic_id: z.string().optional(),

  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be less than 100 characters"),

  description: z
    .string()
    .max(500, "Description must be less than 500 characters")
    .optional()
    .or(z.literal("")),

  assignee_id: z.string().optional(),

  due_date: z.string().optional(),

  status: z
    .enum([
      "TO_DO",
      "IN_PROGRESS",
      "BLOCKED",
      "IN_REVIEW",
      "READY_FOR_QA",
      "REOPENED",
      "READY_FOR_PRODUCTION",
      "DONE",
    ])
});