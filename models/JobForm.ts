export type JobFormData = {
  is_open: string;
  position: string;
  employment_type: string;
  department: string;
  expiration_date: string;
  description: string;
  salary: string;
};

export const initialJobFormData: JobFormData = {
  is_open: "true",
  position: "",
  employment_type: "Full-time",
  department: "",
  expiration_date: "",
  description: "",
  salary: "",
};
