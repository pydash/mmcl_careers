export interface Job {
  id: number;
  role: string;
  department: string;
  type: string;
  teaching_type: string;
  posted: string;
  description?: string;
  requirements?: string[];
  salary_range?: string;
}
