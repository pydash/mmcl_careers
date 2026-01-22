export interface Job {
  id: string;
  public_id: string;
  title: string;
  department: string;
  employment_type: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_min?: string;
  salary_max?: string;
  is_active: boolean;
  expiry_date: string;
  posted_by: string;
  posted_at: string;
  tags?: string[];
}
