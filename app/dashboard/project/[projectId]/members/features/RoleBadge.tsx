import { IMember } from "@/types/types";

function RoleBadge({ role }: { role: IMember['role'] }) {
  const styles = {
    owner: "bg-blue-600 text-white",
    admin: "bg-indigo-100 text-indigo-600",
    member: "bg-blue-100 text-blue-600",
    viewer: "bg-gray-100 text-gray-500",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${styles[role]}`}
    >
      {role}
    </span>
  );
}
export default RoleBadge;