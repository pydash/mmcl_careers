export interface DashboardData {
  total_jobs: number;
  total_applications: number;
  total_users: number;
  open_jobs: number;
  pending_applications: number;
  [key: string]: any;
}

export async function fetchDashboardData(): Promise<DashboardData> {
  try {
    const response = await fetch("/api/dashboard", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch dashboard data: ${response.statusText}`);
    }

    const data: DashboardData = await response.json();
    return data;
  } catch (error) {
    console.error("Error in fetchDashboardData:", error);
    throw error;
  }
}
