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
  educational_background: string;
  bachelor_degree_points: string;
  master_degree_points: string;
  phd_points: string;
  work_exp_1: string;
  work_exp_2: string;
  work_exp_3: string;
  published_paper_points: string;
  research_project_points: string;
  other_points?: string[];
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
  educational_background: "",
  bachelor_degree_points: "",
  master_degree_points: "",
  phd_points: "",
  work_exp_1: "",
  work_exp_2: "",
  work_exp_3: "",
  published_paper_points: "",
  research_project_points: "",
  other_points: [],
};
