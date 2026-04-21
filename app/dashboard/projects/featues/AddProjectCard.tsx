// components/AddProjectCard.tsx
import Image from "next/image";
import Link from "next/link";

export default function AddProjectCard() {
  return (
    <Link
      href="/dashboard/projects/add"
      className="h-55 border-2 border-dashed border-gray-200 rounded-xs flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition"
    >
      <div className="text-2xl w-12 h-12 flex items-center justify-center bg-(--color-surface-low) rounded">
        <Image
          src="/icons/circleplus.svg"
          alt="Add Project"
          width={20}
          height={20}
        />
      </div>
      <p className="text-sm font-medium text-black">ADD PROJECT</p>
    </Link>
  );
}