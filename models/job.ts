export interface Job {
  id: number;
  public_id: string;
  position: string;
  department: string;
  employment_type: string;
  description?: string;
  salary?: string;
  is_open: boolean;
  expiration_date: string;
  posted_by: number;
  created_at: string;
  updated_at: string;
}
