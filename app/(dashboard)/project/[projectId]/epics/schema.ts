import { z } from "zod";

export const updateEpicSchema = z.object({
  epic_id:z.string(),
   title: z.string().min(3,"Title must be at least 3 characters").max(200,"Title must be less than 200 characters"),
  description: z.string().max(500).optional(),
  assignee_id: z.string().optional(),
   deadline: z
  .string()
  .optional()
  .refine(
    (date) => {
      if (!date) return true;
      return new Date(date) > new Date();
    },
    {
      message: "Deadline must be in the future",
    }
  ),
});

export type UpdateEpicFormData = z.infer<typeof updateEpicSchema>;