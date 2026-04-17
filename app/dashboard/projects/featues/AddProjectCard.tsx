// components/AddProjectCard.tsx
import Link from "next/link";

export default function AddProjectCard() {
  return (
    <Link
      href="/dashboard/projects/new"
      className="border-2 border-dashed border-gray-200 rounded-xs flex flex-col items-center justify-center text-gray-400 hover:border-primary hover:text-primary transition"
    >
      <div className="text-2xl mb-2">+</div>
      <p className="text-sm font-medium">ADD PROJECT</p>
    </Link>
  );
}