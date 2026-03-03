interface Account {
  id: string;
  email: string;
  password: string;
  role: "applicant" | "hr" | "admin";
  email_verified: boolean;
  deleted_at: Date;
  created_at: Date;
  updated_at: Date;
}

interface Profile {
  id: string;
  first_name: string;
  middle_name: string | null;
  last_name: string;
  permanent_address: string;
  mailing_address: string;
  landline_number: string | null;
  mobile_number: string;
  email_address: string;
  religion: string | null;
  birth_place: string | null;
  civil_status: string;
  gender: string;
  citizenship: string;
  created_at: Date;
  updated_at: Date;
}

interface MediaAccounts {
  id: string;
  profile_id: string;
  platform: string;
  link: string;
  created_at: Date;
  updated_at: Date;
}

interface Credential {
  id: string;
  profile_id: string;
  title: string;
  authority: string;
  number: number | null;
  date_taken: string | null;
  valid_until: string | null;
  created_at: Date;
  updated_at: Date;
}

interface EducationBackground {
  id: string;
  profile_id: string;
  school_name: string;
  level: "SECONDARY" | "VOCATIONAL" | "TERTIARY" | "GRADUATE";
  degree: string;
  status: "ONGOING" | "COMPLETED" | "DROPPED";
  units_earned: number | null;
  year_graduated: number | null;
  created_at: Date;
  updated_at: Date;
}

interface WorkExperience {
  id: string;
  profile_id: string;
  company: string;
  position: string;
  department: string | null;
  courses_handled: string[] | null;
  salary: number | null;
  date_started: string;
  date_ended: string;
  created_at: Date;
  updated_at: Date;
}

interface GovernmentID {
  id: string;
  profile_id: string;
  id_type: "SSS" | "TIN" | "PHILHEALTH" | "PAGIBIG";
  id_number: string;
  created_at: Date;
  updated_at: Date;
}

interface Applicant {
  profile: Profile;
  education_background: EducationBackground[];
  work_experience: WorkExperience[];
  credentials: Credential[];
  government_ids: GovernmentID[];
  media_accounts: MediaAccounts[];
}

export type { Account, Profile, Applicant };
