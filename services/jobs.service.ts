import { Job } from "@/models/job";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "/api";

export class JobsService {
  static async getAllJobs(): Promise<Job[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`);
      if (!response.ok) {
        throw new Error(`Failed to fetch jobs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error fetching jobs:", error);
      throw error;
    }
  }

  static async getJobById(id: number): Promise<Job | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`);
      if (!response.ok) {
        if (response.status === 404) {
          return null;
        }
        throw new Error(`Failed to fetch job: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      throw error;
    }
  }

  static async filterJobs(filters: {
    type?: string;
    teaching_type?: string;
    department?: string;
  }): Promise<Job[]> {
    try {
      const params = new URLSearchParams();
      if (filters.type) params.append("type", filters.type);
      if (filters.teaching_type)
        params.append("teaching_type", filters.teaching_type);
      if (filters.department) params.append("department", filters.department);

      const response = await fetch(`${API_BASE_URL}/jobs?${params.toString()}`);
      if (!response.ok) {
        throw new Error(`Failed to filter jobs: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error filtering jobs:", error);
      throw error;
    }
  }

  static async createJob(job: Omit<Job, "id">): Promise<Job> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        throw new Error(`Failed to create job: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error("Error creating job:", error);
      throw error;
    }
  }

  static async updateJob(id: number, job: Partial<Job>): Promise<Job> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(job),
      });
      if (!response.ok) {
        throw new Error(`Failed to update job: ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error updating job ${id}:`, error);
      throw error;
    }
  }

  static async deleteJob(id: number): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/jobs/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete job: ${response.statusText}`);
      }
    } catch (error) {
      console.error(`Error deleting job ${id}:`, error);
      throw error;
    }
  }
}
