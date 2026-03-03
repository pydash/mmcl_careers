"use client";

import { useEffect, useState, useCallback } from "react";
import { fetchAdminAccounts } from "@/services/admin/accounts/accounts.service";

export interface AdminAccount {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
}

export interface AdminAccountsResponse {
  success: boolean;
  accounts: AdminAccount[];
  total: number;
}

export function useAdminAccounts() {
  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(() => {
    setLoading(true);
    setError(null);
    fetchAdminAccounts()
      .then((data: AdminAccountsResponse) => {
        setAccounts(data.accounts ?? []);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err?.message ?? "Unknown error");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    fetchAccounts();
  }, [fetchAccounts]);

  return { accounts, loading, error, refetch: fetchAccounts };
}
