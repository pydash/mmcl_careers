export type UserProfile = {
  id: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  honorific: string;
  phone_number: string;
  email_address: string;
  physical_address: string;
  birth_date: string;
  sex: string;
  citizenship: string;
  civil_status: string;
  about: string;
  created_at: string;
  updated_at: string;
};

export type UserAccount = {
  id: string;
  email: string;
  role: string;
  created_at: string;
};

export type EducationalBackground = {
  id: string;
  profile_id: string;
  degree: string;
  institution: string;
  course: string;
  status: string;
  units_earned: number;
  year_finished: number;
  honors: string[];
  created_at: string;
};

export type EmploymentHistory = {
  id: string;
  profile_id: string;
  position: string;
  specialization: string;
  company: string;
  industry: string;
  monthly_salary: number;
  date_started: string;
  date_ended: string;
  courses_handled: string[];
  created_at: string;
};

export type Credential = {
  id: number;
  profile_id: string;
  title: string;
  issuing_organization: string;
  number: string;
  date_issued: string;
  expiry_date: string;
  image_url: string;
  created_at: string;
};

export type GovernmentID = {
  profile_id: string;
  type: string;
  number: string;
  issued_by: string;
  issued_date: string;
  expiry_date: string;
  created_at: string;
};

export type UserSocial = {
  id: string;
  platform: string;
  url: string;
};

export type UserProfileResponse = {
  profile: Omit<UserProfile, "created_at" | "updated_at" | "id">;
  educational_backgrounds: Omit<
    EducationalBackground[],
    "created_at" | "profile_id"
  >;
  employment_histories: Omit<EmploymentHistory[], "created_at" | "profile_id">;
  credentials: Omit<Credential[], "created_at" | "profile_id">;
  government_ids: Omit<GovernmentID[], "created_at" | "profile_id">;
  user_socials: UserSocial[];
};
