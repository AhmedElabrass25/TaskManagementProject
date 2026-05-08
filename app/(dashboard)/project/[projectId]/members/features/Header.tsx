"use client";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import InviteFormModal from "./InviteFormModal";

const Header = () => {
  const [openInviteModal, setOpenInviteModal] = useState(false);
  const closeInviteModal = () => setOpenInviteModal(false);
  return (
    <>
      <div className="w-full flex items-center justify-between mb-10">
        <h1>Project Members</h1>
        <Link href="#" className="hidden md:block">
          <Button
            onClick={() => setOpenInviteModal(true)}
            className="w-53.5 flex items-center justify-center gap-2"
          >
            <Image
              src={"/icons/invitemember.svg"}
              alt="invite"
              width={20}
              height={20}
            />{" "}
            <span>Invite Member</span>
          </Button>
        </Link>
      </div>
      <InviteFormModal
        openInviteModal={openInviteModal}
        closeInviteModal={closeInviteModal}
      />
    </>
  );
};

export default Header;
