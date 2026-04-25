
import { z } from "zod";
export const addEpicSchema = z.object({
  title: z.string().min(3,"Title must be at least 3 characters").max(200,"Title must be less than 200 characters"),
  description: z.string().max(500).optional(),
  assignee_id: z.string().optional(),
  project_id: z.string(),
  deadline: z.string().optional()
});

