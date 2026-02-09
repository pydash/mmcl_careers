export type PersonalFormData = {
  honorific: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  sex: string;
  phone: string;
  birthdate: string | null;
  email: string;
  address: string;
  citizenship: string;
  civil_status: string;
  about: string;
};

export type EducationalFormData = {
  degree: string;
  institution: string;
  course: string;
  status: string;
  units_earned: number | null;
  year_finished: string;
  honors: Array<string>;
};

export type EmploymentFormData = {
  job_title: string;
  position_specialization: string;
  company_name: string;
  industry: string;
  monthly_salary: string | null;
  date_started: string;
  date_ended: string;
};

export type LicenseCertificationFormData = {
  title: string;
  issuing_organization: string;
  number: string;
  date_issued: string;
  expiry_date: string;
};

export type AttachmentFormData = {
  file_name: string;
  attachment: File | null;
};
