export type ApplicationStageHistory = {
  title: string;
  application_id: string;
  stage: string;
  status: string;
  created_at: string;
};

export type RecentApplication = {
  id: string;
  title: string;
  status: string;
  created_at: string;
};

export type JobRecommendation = {
  public_id: string;
  title: string;
  department: string;
  expiry_date: string | null;
  created_at: string;
};

export type UpcomingInterview = {
  id: string;
  application_id: string;
  job_title: string;
  title: string;
  scheduled_date: string;
  mode: string;
  meeting_link: string | null;
  status: string;
  created_at: string;
};

export type ApplicantDashboardResponse = {
  app_stage_history: ApplicationStageHistory[];
  recent_applications: RecentApplication[];
  job_recommendations: JobRecommendation[];
  upcoming_interviews: UpcomingInterview[];
};
