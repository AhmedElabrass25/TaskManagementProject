"use client";
import InviteHeader from "./invite/InviteHeader";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { InviteMemberSchema, InviteMemberType } from "../schema";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { inviteMember, InviteType } from "../action";
import { useParams } from "next/navigation";
type InviteProps = {
  openInviteModal: boolean;
  closeInviteModal: () => void;
};
const InviteFormModal = ({
  openInviteModal,
  closeInviteModal,
}: InviteProps) => {
  const { projectId } = useParams();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InviteMemberType>({
    mode: "onTouched",
    resolver: zodResolver(InviteMemberSchema),
  });

  const onSubmit = async ({ email }: { email: string }) => {
    try {
      inviteMember({
        p_email: email,
        p_project_id: projectId as string,
        // p_app_url: "https://task-management-project-nine.vercel.app",
        p_app_url: "http://localhost:3000",
        p_base_url: "https://crnapcshldcscqpqrqme.supabase.co",
      });
      toast.success("Member invited successfully");
      reset();
      closeInviteModal();
    } catch (error: any) {
      toast.error(error.message || "Invite failed");
      return;
    }
  };

  if (!openInviteModal) return null;
  return (
    <div className="fixed inset-0 bg-gray-900/60 z-50 flex items-center justify-center p-4">
      <div className="relative p-8 w-md h-96.25 bg-white rounded-xs shadow-2xl overflow-hidden flex flex-col border border-gray-100">
        {/*  */}
        <InviteHeader closeInviteModal={closeInviteModal} />
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
          <div className="mb-6">
            <label className="block text-[13px] font-medium text-gray-500 uppercase tracking-wide mb-1">
              EMAIL ADDRESS
            </label>
            <div className="relative">
              <Input
                type="email"
                placeholder="Enter email address"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center justify-end gap-3 mt-auto">
            <button
              onClick={closeInviteModal}
              className="h-12 px-8 text-base font-semibold text-gray-700 bg-white rounded-xs"
            >
              Cancel
            </button>
            <button
              disabled={isSubmitting}
              className="h-12 px-8 text-base font-semibold text-white bg-(--color-primary) rounded-xs cursor-pointer"
            >
              {isSubmitting ? "Sending..." : "Send Invitation"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteFormModal;
