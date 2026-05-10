"use client";
import { ITask } from "@/types/types";
import Pagination from "@/components/Pagination";
import ListRow from "./ListRow";
import TaskDetailsModal from "./TaskModal.tsx/TaskDetailsModal";
import MobileList from "./TaskModal.tsx/MobileList";
import { useEffect, useState } from "react";
import { apiFetch } from "@/lib/api";
import { getTasks } from "../action";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/slices/tasks/tasksThunk";
type Props = {
  projectId: string;
  page?: string;
  search: string;
};
export default function ListView({ projectId, page, search }: Props) {
  const limit = 5;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * limit;
  const dispatch = useDispatch<AppDispatch>();

  const { items, count, loading, error } = useSelector(
    (state: RootState) => state.tasks,
  );
  useEffect(() => {
    dispatch(
      fetchTasks({
        projectId,
        limit,
        offset,
        search,
      }),
    );
  }, [projectId, search, offset]);

  if (loading) {
    return (
      <div className="py-20 text-center text-slate-500">Loading tasks...</div>
    );
  }

  return (
    <>
      {/* list view in large screens */}
      <div className="hidden lg:table w-full bg-white rounded-xs border border-slate-200 shadow-sm overflow-hidden text-slate-800">
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
            {items.map((task: any) => (
              <ListRow task={task} key={task.id} />
            ))}
          </tbody>
        </table>
        {items.length === 0 && (
          <div className="py-10 text-center text-slate-400">
            No tasks found.
          </div>
        )}
      </div>
      {/* list view in mobile */}
      <div className="block lg:hidden ">
        <div className="flex flex-col gap-3">
          {items.map((task: ITask) => (
            <MobileList task={task} key={task.id} />
          ))}
          {items.length === 0 && (
            <div className="py-10 text-center text-slate-400">
              No tasks found.
            </div>
          )}
        </div>
      </div>
      {/* Pagination Footer */}
      <div className="flex items-center justify-between mt-8">
        <p className="text-sm text-slate-500">
          Showing {items.length} of {count} active tasks
        </p>
        <Pagination total={count} page={currentPage} limit={limit} />
      </div>
      <TaskDetailsModal />
    </>
  );
}
