interface PersonalInfo {
  first_name: string;
  last_name: string;
  email: string;
  mobile: string;
  landline: string;
  address: string;
  birthplace: string;
  civil_status: string;
  gender: string;
  religion: string;
  citizenship: string;
}

interface EducationInfo {
  institution: string;
  level: string;
  degree: string;
  status: string;
  year_graduate: string;
}

interface ExperienceInfo {
  company: string;
  position: string;
  department: string;
  courses_handled: string[];
  date_started: string;
  date_ended: string;
}

interface CredentialInfo {
  title: string;
  authority: string;
  number: string;
  date_issued: string;
  date_expired: string;
}

interface GovernmentIDInfo {
  type: string;
  number: string;
}

interface SocialMediaInfo {
  platform: string;
  link: string;
}

interface AttachmentsInfo {
  name: string;
  file: File;
}

export type {
  PersonalInfo,
  EducationInfo,
  ExperienceInfo,
  CredentialInfo,
  GovernmentIDInfo,
  SocialMediaInfo,
  AttachmentsInfo,
};
