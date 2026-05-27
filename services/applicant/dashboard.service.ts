import { ApplicantDashboardResponse } from "@/types/dashboard";

export async function getDashboard(): Promise<ApplicantDashboardResponse> {
  const res = await fetch("/api/applicant/dashboard", {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}
