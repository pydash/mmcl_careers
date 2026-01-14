export type JobFormData = {
  is_active: string;
  title: string;
  job_type: string;
  department: string;
  deadline_date: string;
  description: string;
  responsibilities: string;
  requirements: string;
  salary_min: string;
  salary_max: string;
};

export const initialJobFormData: JobFormData = {
  is_active: "true",
  title: "",
  job_type: "full_time",
  department: "",
  deadline_date: "",
  description: "",
  responsibilities: "",
  requirements: "",
  salary_min: "",
  salary_max: "",
};
