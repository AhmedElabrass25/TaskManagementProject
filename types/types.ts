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