interface DashboardStats {
  open_roles: OpenRoles;
  new_applicants: NewApplicants;
  interviews_scheduled: InterviewsScheduled;
  offers_made: OffersMade;
}

interface OpenRoles {
  count: number;
  delta: number;
}

interface NewApplicants {
  count: number;
  delta: number;
}

interface InterviewsScheduled {
  count: number;
  delta: number;
}

interface OffersMade {
  count: number;
  delta: number;
}

export type { DashboardStats };
