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
  role: 'owner' | 'admin' | 'member' | 'viewer';
  user_id: string;
}
type EpicStatus = 'TO DO' | 'Done';

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