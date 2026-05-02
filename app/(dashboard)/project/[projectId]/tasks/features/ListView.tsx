import { getAllTasks, getAllTasksPaginated } from "../action";
import { ITask } from "@/types/types";
import Pagination from "@/components/Pagination";
import ListRow from "./ListRow";
import TaskDetailsModal from "./TaskModal.tsx/TaskDetailsModal";
import { getAvatarColor, StatusBadge } from "../helper";
import MobileList from "./TaskModal.tsx/MobileList";
type Props = {
  projectId: string;
  page?: string;
};
export default async function ListView({ projectId, page }: Props) {
  const tasks: ITask[] = await getAllTasks(projectId);
  const limit = 5;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * limit;
  const total = tasks.length;
  const PagiantedTasks = await getAllTasksPaginated(projectId, limit, offset);
  console.log(tasks);
  return (
    <>
      {/* list view in large screens */}
      <div className="hidden lg:table w-full bg-white rounded-xs border border-slate-200 shadow-sm overflow-hidden">
        <table className="hidden lg:table w-full text-left border-collapse">
          <thead className="bg-slate-50">
            <tr className="border-b border-slate-100">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Task ID
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Due Date
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Assignee
              </th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-wider"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {PagiantedTasks.map((task: any) => (
              <ListRow task={task} key={task.id} />
            ))}
          </tbody>
        </table>
      </div>
      {/* list view in mobile */}
      <div className="block lg:hidden ">
        <div className="flex flex-col gap-3">
          {PagiantedTasks.map((task: ITask) => (
           <MobileList task={task} key={task.id} />
          ))}
        </div>
      </div>
      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-20">
        <p>
          Showing {PagiantedTasks.length} of {total} active projects
        </p>
        <Pagination total={total} page={currentPage} limit={limit} />
      </div>
      <TaskDetailsModal />
    </>
  );
}

