import Link from "next/link";
import TaskCard from "./TaskCard";
import { getAllTasks } from "../action";
import { ITask } from "@/types/types";
import Image from "next/image";

export default async function TaskColumn({ status, projectId }: { status: string, projectId: string }) {
  // 1. Fetch all tasks for the project
  const allTasks: ITask[] = await getAllTasks(projectId);

  // We convert the column "TO DO" to "TO_DO" to match your ITask type
//   const normalizedColumnStatus = status.replace(/\s+/g, '_');
  
  const filteredTasks = allTasks.filter((task: ITask) => {
    return task.status === status;
  });

  const getStatusColor = (s: string) => {
    switch (s) {
      case "TO_DO": return "bg-slate-400";
      case "IN_PROGRESS": return "bg-blue-600";
      case "BLOCKED": return "bg-red-600";
      case "IN_REVIEW": return "bg-amber-500";
      case "READY_FOR_QA": return "bg-purple-500";
      case "REOPENED": return "bg-orange-500";
      case "READY_FOR_PRODUCTION": return "bg-cyan-500";
      case "DONE": return "bg-emerald-500";
      default: return "bg-indigo-500";
    }
  };

  return (
    <div className="flex-shrink-0 w-[300px]">
      {/* Column Header */}
      <div className="flex items-center justify-between mb-5 px-1">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${getStatusColor(status)}`} />
          <h3 className="font-bold text-slate-500 text-[11px] uppercase tracking-widest flex items-center gap-2">
            {status} 
            {/* Display only the count of tasks in this specific status */}
            <span className="flex items-center justify-center min-w-[18px] h-[18px] bg-slate-200 text-slate-600 rounded text-[10px] font-bold px-1">
              {filteredTasks.length}
            </span>
          </h3>
        </div>
        <Link href={`/project/${projectId}/tasks/new?status=${status}`} className="text-slate-300 hover:text-slate-600">
          +
        </Link>
      </div>

      {/* Add New Task Button */}
      <Link 
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="flex items-center justify-center gap-2 w-full py-3 mb-5 border-2 border-dashed border-slate-200 rounded-xl text-slate-400 text-[10px] font-bold tracking-widest hover:border-indigo-200 hover:bg-indigo-50/30 transition-all"
      >
        <Image src="/icons/circleplus.svg" width={15} height={15} alt="Plus Icon" />
        ADD NEW TASK
      </Link>

      {/* Task Cards: Only mapping the tasks that belong in this column */}
      <div className="flex flex-col gap-4">
        {filteredTasks.map((task: ITask) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {/* Empty state visual to maintain column width if no tasks exist */}
        {filteredTasks.length === 0 && (
          <div className="h-24 rounded-xl border border-dashed border-slate-100 bg-slate-50/20" />
        )}
      </div>
    </div>
  );
}