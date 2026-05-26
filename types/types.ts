export type AuthResponse = {
  access_token: string;
  refresh_token: string;
  user: any;
};
export type Project = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
  created_by: string;
};
export interface IMemberMetadata {
  department: string;
  email: string;
  email_verified: boolean;
  name: string;
  phone_verified: boolean;
  sub: string;
}
export interface IMember {
  email: string;
  member_id: string;
  metadata: IMemberMetadata;
  project_id: string;
  role: "owner" | "admin" | "member" | "viewer";
  user_id: string;
}
type EpicStatus = "TO DO" | "Done";

export interface IEpicData {
  id: string;
  project_id: string;
  title: string;
  description: string;
  created_at: string;
  deadline: string;
  epic_id: string;
  created_by: IUserInfo;
  assignee: IUserInfo;
}

export interface IUserInfo {
  id: string;
  sub: string;
  name: string;
  email: string;
  department: string;
}
export type IUser = {
  id: string;
  name: string;
  email: string;
  department: string;
};

export type ITaskEpic = {
  id: string;
  title: string;
  epic_id: string;
};

export type ITask = {
  id: string;
  project_id: string;
  epic_id: string | null;
  title: string;
  description: string | null;
  status:
    | "TO_DO"
    | "IN_PROGRESS"
    | "BLOCKED"
    | "IN_REVIEW"
    | "READY_FOR_QA"
    | "REOPENED"
    | "READY_FOR_PRODUCTION"
    | "DONE";
  created_at: string;
  due_date: string | null;
  task_id: string;
  epic: ITaskEpic | null;
  created_by: IUser;
  assignee: IUser | null;
  assignee_id?: string | null;
  position?: number;
  count?: number;
};
export type TaskStatus =
  | "TO_DO"
  | "IN_PROGRESS"
  | "BLOCKED"
  | "IN_REVIEW"
  | "READY_FOR_QA"
  | "REOPENED"
  | "READY_FOR_PRODUCTION"
  | "DONE";

export type ITotalsStat = {
  [key in TaskStatus]?: number;
};

export interface IDailyStat {
  day: string;
  statuses: {
    [key in TaskStatus]?: number;
  };
}

export interface ITaskCalendarStatsResponse {
  daily: IDailyStat[];
  totals: ITotalsStat;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
}
