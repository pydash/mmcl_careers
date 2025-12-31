import { useEffect, useState } from "react";
import { fetchNotifications } from "@/services/applicant/dashboard/notification.service";
import Notification from "@/models/Notification";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchNotifications()
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  return { notifications, loading, error };
}
