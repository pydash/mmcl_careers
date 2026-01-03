export interface JobPostItemDetail {
  id: string;
  title: string;
  description: string;
  requirements: string;
  responsibilities: string;
  salary_min: number;
  salary_max: number;
  department: string;
  expiry_date: string;
  is_active: boolean;
  posted_at: string;
  tags: string[];
}
