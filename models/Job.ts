export interface JobApplication {
  id: number;
  profile_id: string;
  full_name: string;
  status: string;
  pitch: string;
  applied_at: string;
  score: number;
}

export interface JobForm {
  title: string;
  department?: string | null;
  employment_type?: string | null;
  description: string;
  responsibilities?: string | null;
  requirements?: string | null;
  salary?: string | null;
  status: "Open" | "Closed";
  expiry_date?: string | null;
  teaching_type?: "Teaching" | "Non-Teaching";
  open_vacancies?: number | null;
}
