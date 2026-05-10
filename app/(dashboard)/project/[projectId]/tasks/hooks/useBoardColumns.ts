"use client";
import { useState, useEffect } from "react";
import { ITask } from "@/types/types";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchTasks } from "@/store/slices/tasks/tasksThunk";

const ALL_STATUSES = [
  "TO_DO",
  "IN_PROGRESS",
  "BLOCKED",
  "IN_REVIEW",
  "READY_FOR_QA",
  "REOPENED",
  "READY_FOR_PRODUCTION",
  "DONE",
];

const LIMIT = 6;

export type ColumnState = {
  tasks: ITask[];
  count: number;
  offset: number;
  hasMore: boolean;
  loading: boolean;
};

const INITIAL_COLUMNS: Record<string, ColumnState> = Object.fromEntries(
  ALL_STATUSES.map((status) => [
    status,
    { tasks: [], count: 0, offset: 0, hasMore: true, loading: true },
  ]),
);

export function useBoardColumns(projectId: string, search?: string) {
  const [columns, setColumns] =
    useState<Record<string, ColumnState>>(INITIAL_COLUMNS);

  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const dispatch = useDispatch<AppDispatch>();
  const reduxTasks = useSelector((state: RootState) => state.tasks.items);
  const fetchColumn = async (status: string, offset: number, reset = false) => {
    try {
      if (!reset) {
        setColumns((prev) => ({
          ...prev,
          [status]: {
            ...prev[status],
            loading: true,
          },
        }));
      }

      const result = await dispatch(
        fetchTasks({
          projectId,
          status,
          limit: LIMIT,
          offset,
          search,
        }),
      ).unwrap();

      setColumns((prev) => {
        const currentData = reset ? [] : prev[status].tasks;

        const newData = result.data || [];
        const totalCount = result.count || 0;

        const combinedTasks = [...currentData, ...newData];

        const uniqueTasks = Array.from(
          new Map(combinedTasks.map((t: ITask) => [t.id, t])).values(),
        );

        return {
          ...prev,
          [status]: {
            tasks: uniqueTasks,
            count: totalCount,
            offset: offset + LIMIT,
            hasMore: uniqueTasks.length < totalCount,
            loading: false,
          },
        };
      });
    } catch (error) {
      console.error(`Failed to load tasks for ${status}`, error);

      setColumns((prev) => ({
        ...prev,
        [status]: {
          ...prev[status],
          loading: false,
        },
      }));
    }
  };

  useEffect(() => {
    setColumns(INITIAL_COLUMNS);

    const loadAll = async () => {
      await Promise.all(
        ALL_STATUSES.map((status) => fetchColumn(status, 0, true)),
      );

      setIsInitialLoad(false);
    };

    loadAll();
  }, [projectId, search]);

  useEffect(() => {
    if (reduxTasks.length > 0 && !isInitialLoad) {
      setColumns((prev) => {
        const updated = { ...prev };
        ALL_STATUSES.forEach((status) => {
          const tasksForStatus = reduxTasks.filter((t) => t.status === status);
          updated[status] = {
            ...updated[status],
            tasks: tasksForStatus,
            count: tasksForStatus.length,
            loading: false,
          };
        });

        return updated;
      });
    }
  }, [reduxTasks, isInitialLoad]);
  const handleLoadMore = (status: string) => {
    const col = columns[status];

    if (col.hasMore && !col.loading) {
      fetchColumn(status, col.offset);
    }
  };

  const updateTaskInColumn = (taskId: string, changes: Partial<ITask>) => {
    setColumns((prev) => {
      const updated = { ...prev };
      for (const status of Object.keys(updated)) {
        updated[status] = {
          ...updated[status],
          tasks: updated[status].tasks.map((task) =>
            task.id === taskId ? { ...task, ...changes } : task,
          ),
        };
      }

      return updated;
    });
  };

  return {
    columns,
    setColumns,
    isInitialLoad,
    handleLoadMore,
    ALL_STATUSES,
    updateTaskInColumn,
  };
}
