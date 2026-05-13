export async function editJobDetails(public_id: string, data: any) {
  try {
    const response = await fetch(`/api/hr/jobs/${public_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`Failed to update job details: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating job details:", error);
    throw error;
  }
}
