import { ITask } from "@/types/types";
import TaskStatus from "./TaskStatus";
import TaskDate from "./TaskDate";
import TaskAssigne from "./TaskAssigne";
type Props = {
  task: ITask | null;
  updateTaskInColumn?: (taskId: string, changes: Partial<ITask>) => void;
};
const Sidebar = ({ task, updateTaskInColumn }: Props) => {
  return (
    <>
      <div className="flex-1 bg-[#f1f3ff] p-8 space-y-8 overflow-y-auto">
        {/* Status Selector */}
        {task && (
          <TaskStatus
            taskId={task?.id!}
            status={task?.status!}
            updateTaskInColumn={updateTaskInColumn}
          />
        )}

        {task && (
          <TaskAssigne
            projectId={task?.project_id!}
            taskId={task?.id!}
            assign={task?.assignee}
            updateTaskInColumn={updateTaskInColumn}
          />
        )}
        <div className="space-y-3">
          <h3 className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Reporter
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-[10px] font-bold text-indigo-600">
              {task?.created_by.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <p className="text-[13px] font-semibold text-slate-700">
              {task?.created_by.name}
            </p>
          </div>
        </div>
        <div className="space-y-4 pt-4 border-t border-slate-100">
          {task && (
            <TaskDate
              taskId={task?.id!}
              date={task?.due_date!}
              updateTaskInColumn={updateTaskInColumn}
            />
          )}
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-400 font-medium">Created At</span>
            <span className="text-slate-700 font-bold">
              {task &&
                new Date(task.created_at).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "short",
                  year: "numeric",
                })}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
