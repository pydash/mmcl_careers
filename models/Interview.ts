interface Interview {
  id: string;
  application_id: string;
  scheduled_at: Date;
  mode: "onsite" | "virtual";
  link: string | null;
  location: string | null;
  status: "scheduled" | "completed" | "canceled";
  interviewer: string;
  created_at: Date;
  updated_at: Date;
}

interface DashboardInterview extends Interview {
  position: string;
}

export type { Interview, DashboardInterview };
