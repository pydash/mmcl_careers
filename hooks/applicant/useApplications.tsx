import { useState, useEffect } from "react";
import type { ApplicationList, ApplicationDetails } from "@/types/application";
import {
  getApplication,
  getApplications,
} from "@/services/applicant/applications.service";

export function useApplications() {
  const [applications, setApplication] = useState<ApplicationList[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    async function loadApplications() {
      try {
        setLoading(true);

        const result = await getApplications();

        setApplication(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  return {
    applications,
    loading,
    error,
  };
}

export function useApplication(id: string) {
  const [application, setApplication] = useState<ApplicationDetails>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>("");

  useEffect(() => {
    async function loadApplication() {
      try {
        setLoading(true);

        const result = await getApplication(id);

        setApplication(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setLoading(false);
      }
    }

    loadApplication();
  }, []);

  return {
    application,
    loading,
    error,
  };
}
