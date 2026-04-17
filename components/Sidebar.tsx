"use client";
import { logoutAction } from "@/services/logout.service";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const menuItems = [
    { icon: "/icons/dashboard.svg", label: "Projects", active: true, href: "/dashboard/projects" },
    { icon: "/icons/epics.svg", label: "Project Epics", active: false, href: "/dashboard/projects/epics" },
    { icon: "/icons/tasks.svg", label: "Project Tasks", active: false, href: "/dashboard/projects/tasks" },
    { icon: "/icons/groups.svg", label: "Project Members", active: false, href: "/dashboard/projects/members" },
    { icon: "/icons/details.svg", label: "Project Details", active: false, href: "/dashboard/projects/details" },
  ];
  // logout handler
  const handleLogout = async () => {
    try {
      await logoutAction();
      localStorage.clear();
      sessionStorage.clear();

      toast.success("Logged out successfully");

      router.push("/login");
    } catch (error) {
      toast.error("Logout failed, please try again.");
    }
  };

  return (
    <>
      {/*  Menu Button (Mobile ) */}
      <button
        className="md:hidden fixed top-3.5 left-4 z-50 p-2 text-slate-900 rounded-md"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <Image
            src="/icons/menuButton.svg"
            alt="Close"
            width={30}
            height={30}
          />
        ) : (
          <Image
            src="/icons/menuButton.svg"
            alt="Menu"
            width={30}
            height={30}
          />
        )}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`
        fixed md:static inset-y-0 left-0 z-40
        ${isCollapsed ? "w-20" : "w-64"} 
        ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        bg-(--color-surface-low) transition-all duration-300 flex flex-col
      `}
      >
        {/* Menu Items */}
        <nav className="flex-1 px-3 space-y-2 pt-18 md:pt-5">
          {menuItems.map((item) => (
            <Link href={item.href || "#"} key={item.label}>
            <button
             
              className="group w-full flex items-center gap-4 p-3 hover:bg-white cursor-pointer rounded-sm text-slate-900"
            >
              <Image
                src={item.icon}
                alt={item.label}
                className="w-5 h-5 group-hover:text-(--color-primary)"
                width={20}
                height={20}
              />

              {!isCollapsed && (
                <span className="text-sm font-medium group-hover:text-(--color-primary)">
                  {item.label}
                </span>
              )}
            </button>
            </Link>
          ))}
        </nav>

        {/* Bottom Actions */}
        <div className="p-4 border-t border-slate-200 space-y-2">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center gap-4 p-3 text-slate-500 hover:text-blue-600"
          >
            {isCollapsed ? (
              <Image
                src="/icons/rightarrow.svg"
                alt="Expand"
                className="w-5 h-5"
                width={20}
                height={20}
              />
            ) : (
              <Image
                src="/icons/arrowcollapse.svg"
                alt="Expand"
                className="w-5 h-5"
                width={20}
                height={20}
              />
            )}
            {!isCollapsed && (
              <span className="text-sm font-medium">Collapse</span>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-4 p-3 text-red-500 cursor-pointer"
          >
            <Image
              src="/icons/logout.svg"
              alt="Logout"
              className="w-5 h-5"
              width={20}
              height={20}
            />
            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
