export interface IGroup {
  id: string;
  created_at: string | null;
  image: string | null;
  title: string | null;
  created_by: string | null;
  members?: string[] | null;
  description: string | null;
  user_id: string;
}
