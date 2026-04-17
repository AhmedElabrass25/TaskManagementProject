// components/EmptyState.tsx
import Image from "next/image";
import Link from "next/link";

export default function EmptyState() {
  return (
  <div className="flex flex-col flex-1 h-full items-center justify-center p-6 bg-slate-50">

      <Image src="/icons/emptyproject.svg" alt="No Projects" width={280} height={280} className="mb-6" />
      <div className="text-center max-w-md">
        <h1 className="text-3xl font-semibold text-slate-900 mb-4">
          No Projects
        </h1>
        <p className="text-base text-slate-600 mb-8">
          You don’t have any projects yet. Start by defining your first architectural workspace to begin tracking tasks and epics.
        </p>
      </div>


      <Link href="/dashboard/projects/add-project" className="flex items-center gap-3 bg-(--color-primary) text-white px-8 py-3.5 rounded-xs text-lg font-semibold hover:bg-[#1e3a8a]/90 transition-colors shadow-lg shadow-[#1e3a8a]/20">
       
+ Create New Project
      
    </Link>
    </div>
  );
}