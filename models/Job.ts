interface JobPost {
  id: string;
  public_id: string;
  position: string;
  department: string;
  employment_type: string;
  description: string;
  salary: string;
  is_open: boolean;
  expiration_date: Date;
  posted_by: string;
  created_at: Date;
  updated_at: Date;
}

interface JobPostApplication extends JobPost {
  app_id: string;
  has_applied: boolean;
}

interface JobListProps {
  jobs: JobPostApplication[];
}

export type { JobPost, JobListProps, JobPostApplication };
