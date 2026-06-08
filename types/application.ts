type Application = {
  id: string;
  profile_id: string;
  job_id: string;
  status: string;
  notes: string;
  pitch: string;
  score: number;
  created_at: string;
};

type StageHistory = {
  id: string;
  application_id: string;
  stage: string;
  status: string;
  created_at: string;
};

export type ApplicationList = Pick<
  Application,
  "id" | "status" | "created_at"
> & {
  title: string;
  department: string;
};

export type ApplicationDetails = {
  application: Omit<Application, "profile_id" | "job_id"> & {
    title: string;
    department: string;
  };
  stage_history: StageHistory[];
};
