import { Interview } from "./Interview";
import { Offer } from "./Offer";

interface Application {
  id: string;
  profile_id: string;
  job_id: string;
  status: "pending" | "interview" | "offer" | "deferred";
  pitch: string;
  notes: string | null;
  score: number | null;
  created_at: Date;
  updated_at: Date;
}

interface DashboardRecentApplication extends Application {
  position: string;
  department: string;
}

interface ApplicationsList extends Application {
  position: string;
  department: string;
}

interface ApplicationJobDetails extends Application {
  position: string;
  department: string;
  description: string;
}

interface ApplicationDetails {
  application: ApplicationJobDetails;
  interview: Interview;
  offer: Offer;
}

export type {
  Application,
  DashboardRecentApplication,
  ApplicationsList,
  ApplicationDetails,
};
