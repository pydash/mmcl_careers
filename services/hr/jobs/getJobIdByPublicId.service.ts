export async function getJobIdByPublicId(public_id: string): Promise<number> {
  try {
    const res = await fetch(
      `/api/hr/jobs/id/${encodeURIComponent(public_id)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    const { id } = await res.json();
    if (!res.ok) {
      throw new Error(`Failed to fetch job ID: ${id}`);
    }
    return id;
  } catch (error) {
    console.error("Error fetching job ID:", error);
    throw error instanceof Error ? error : new Error("Failed to fetch job ID");
  }
}
