// Root response type
export interface ProfileResponse {
  profile: Profile;
}

// Main profile
export interface Profile {
  personal: Personal;
  education: Education;
  employment: Employment[];
  gov_ids: GovID[];
  license: License[];
  attachments: Attachment[];
  extras: Extras;
  socials: Social[];
  has_profile: boolean;
}

// ---------- Personal ----------
export interface Personal {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  sex: "male" | "female" | string;
  birth_date: string; // ISO date
  civil_status: string;
  citizenship: string;
  phone_number: string;
  physical_address: string;
  honorifics: string[];
  about: string | null;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Education ----------
export interface Education {
  id: string;
  institution: string;
  course: string;
  degree: string;
  status: string;
  units_earned: number;
  year_finished: number;
  honors: string[];
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Employment ----------
export interface Employment {
  id: number;
  acc_id: string;
  company_name: string;
  job_title: string;
  industry: string;
  position_specialization: string;
  monthly_salary: number;
  date_started: string; // ISO date
  date_ended: string; // ISO date
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Government IDs ----------
export interface GovID {
  id: number;
  acc_id: string;
  id_type: string;
  id_number: string;
  issued_by: string;
  issued_date: string; // ISO date
  expiry_date: string; // ISO date
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- License ----------
export interface License {
  id: number;
  acc_id: string;
  title: string;
  number: string;
  issuing_organization: string;
  image_url: string;
  date_issued: string; // ISO date
  expiry_date: string; // ISO date
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Extras ----------
export interface Extras {
  id: string;
  skills: string[];
  sources: string[];
  onsite_willing: string;
  wfh_capability: string;
  start_date_preference: string; // ISO date
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Attachments ----------
export interface Attachment {
  id: number;
  acc_id: string;
  file_name: string;
  file_url: string;
  file_type: string;
  file_size: number;
  created_at: string; // ISO datetime
  updated_at: string; // ISO datetime
}

// ---------- Socials ----------
export interface Social {
  platform: string;
  url: string;
}
