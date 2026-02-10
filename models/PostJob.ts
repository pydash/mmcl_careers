export type PostJobData = {
  is_active: boolean;
  title: string;
  job_type: string;
  department: string;
  deadline_date: string;
  description: string;
  responsibilities: string;
  requirements: string;
  salary_min?: number | null;
  salary_max?: number | null;
  score: number;
};

export type PostJobResponse = {
  success: boolean;
  jobId?: string;
  error?: string;
};
