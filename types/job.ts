export type Job = {
  id: string;
  title: string;
  department: string;
  employment_type: string;
  description: string;
  requirements?: string;
  responsibilities?: string;
  salary?: string;
  status: string;
  expiry_date?: string;
  posted_by?: string;
  public_id: string;
  teaching_type?: "Teaching" | "Non Teaching";
  created_at: string;
};

export type PublicJobs = Pick<
  Job,
  | "public_id"
  | "title"
  | "department"
  | "employment_type"
  | "expiry_date"
  | "created_at"
>;

export type PublicJob = Omit<Job, "posted_by" | "created_at">;

export type ApplicantJobs = Omit<
  Job,
  "description" | "requirements" | "responsibilities" | "salary" | "posted_by"
>;

export type ApplicantJob = Omit<Job, "created_at">;
