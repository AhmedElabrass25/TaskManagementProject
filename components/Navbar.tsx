"use client";
import { useAppSelector } from "@/store/hooks";
import Image from "next/image";

export default function Navbar() {
    const user = useAppSelector((state: any) => state.user.data);

  const getInitials = (name: string) => {
    const parts = name?.trim().split(" ");
    return parts?.length >= 2 
      ? (parts[0][0] + parts[1][0]).toUpperCase() 
      : name?.slice(0, 2).toUpperCase();
  };

  return (
    <nav className="h-16 w-full shadow-sm bg-(--color-background) flex items-center justify-between px-6 z-50">
      {/* Logo on the Left */}
      <div className="ms-10 md:ms-0 flex items-center gap-2 font-bold text-xl">
           <Image src="/Logo.svg" alt="Logo" width={150} height={28} className="w-28 lg:w-30" />
      </div>

      {/* User Info on the Right */}
      <div className="flex items-center gap-3">
        <div className="hidden sm:block text-right">
          <p className="text-sm font-bold text-slate-900">{user?.name}</p>
          <p className="text-xs text-blue-600 font-medium uppercase tracking-tighter">
            {user?.department}
          </p>
        </div>
        <div className="w-10 h-10 bg-blue-600 rounded-sm flex items-center justify-center text-white font-bold shadow-sm">
          {getInitials(user?.name)}
        </div>
      </div>
    </nav>
  );
}