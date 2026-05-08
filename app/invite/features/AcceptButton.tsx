"use client";
import Button from "@/components/ui/Button";
import { acceptInvite } from "../action";
import { useState } from "react";
import { toast } from "sonner";

const AcceptButton = ({ token }: { token?: string }) => {
  const [loading, setLoading] = useState(false);
  const handleAccept = async () => {
    setLoading(true);
    try {
      await acceptInvite(token);
      setLoading(false);
      toast.success("You have accepted the invitation successfully");
    } catch (error) {
      setLoading(false);
      toast.error("Failed to accept the invitation");
    }
  };
  return (
    <>
      <Button
        type="submit"
        disabled={loading}
        onClick={handleAccept}
        className="w-full h-13 mt-auto rounded-xs text-lg font-bold text-white bg-(--color-primary)"
      >
        {loading ? "Accepting..." : "Accept Invitation"}
      </Button>
    </>
  );
};

export default AcceptButton;
