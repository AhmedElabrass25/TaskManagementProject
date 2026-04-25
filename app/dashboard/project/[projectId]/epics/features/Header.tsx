import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="w-full flex items-center justify-between mb-10">
      <h1>Project Epics</h1>
      <div className="flex items-center gap-4">
        <div className="w-75.75 h-12 relative">
          <Image
            src="/icons/searchIcon.svg"
            width={12}
            height={3}
            alt="search icon"
            className="absolute top-5 left-2.75"
          />
          <Input type="text" className="ps-8 w-full" placeholder="Search epics..." />
        </div>
        <Link href="epics/new" className="hidden md:block">
          <Button className="w-fit h-12 flex items-center justify-center gap-2">
            +<span>New Epic</span>
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
