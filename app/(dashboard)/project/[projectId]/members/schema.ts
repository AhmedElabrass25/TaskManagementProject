import { z } from "zod";
export const InviteMemberSchema = z.object({
  email: z.string().email("Invalid email address"),
});
export type InviteMemberType = z.infer<typeof InviteMemberSchema>;
