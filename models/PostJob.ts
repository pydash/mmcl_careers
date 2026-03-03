export type PostJobData = {
  is_open: boolean;
  position: string;
  employment_type: string;
  department: string;
  expiration_date: string;
  description: string;
  salary: number | null;
};

export type PostJobResponse = {
  success: boolean;
  jobId: number;
};
