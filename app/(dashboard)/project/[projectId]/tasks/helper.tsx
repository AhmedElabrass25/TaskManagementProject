export function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    "IN PROGRESS": "bg-blue-100 text-blue-700",
    "TO DO": "bg-slate-100 text-slate-600",
    COMPLETED: "bg-emerald-100 text-emerald-700",
    DONE: "bg-emerald-100 text-emerald-700",
    URGENT: "bg-red-100 text-red-700",
    BLOCKED: "bg-orange-100 text-orange-700",
  };

    return (
      <>
    <span className={`px-2.5 py-1 rounded text-[10px] font-bold uppercase tracking-wide ${styles[status] || "bg-slate-100 text-slate-600"}`}>
      {status}
    </span>
    </>
  );
}
export function getAvatarColor(initials: string) {
  const colors = [
    "bg-indigo-500",
    "bg-emerald-500",
    "bg-amber-500",
    "bg-rose-500",
    "bg-sky-500",
  ];
  const charCode = initials ? initials.charCodeAt(0) : 0;
  return colors[charCode % colors.length];
}
