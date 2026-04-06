"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import AdminNavbar from "@/components/admin/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type HRAccount = {
  id: string;
  fullName: string;
  email: string;
  department: string;
  status: "Active" | "Suspended";
  lastLogin: string;
};

const hrAccounts: HRAccount[] = [
  {
    id: "HR-2021-014",
    fullName: "Maria Santos",
    email: "maria.santos@mmcl.edu.ph",
    department: "Human Resources",
    status: "Active",
    lastLogin: "March 16, 2026 • 8:42 AM",
  },
  {
    id: "HR-2022-019",
    fullName: "Carlo Mendoza",
    email: "carlo.mendoza@mmcl.edu.ph",
    department: "Human Resources",
    status: "Active",
    lastLogin: "March 15, 2026 • 3:10 PM",
  },
  {
    id: "HR-2023-025",
    fullName: "Alyssa Reyes",
    email: "alyssa.reyes@mmcl.edu.ph",
    department: "Talent Acquisition",
    status: "Suspended",
    lastLogin: "March 10, 2026 • 10:05 AM",
  },
  {
    id: "HR-2024-031",
    fullName: "Joshua Lim",
    email: "joshua.lim@mmcl.edu.ph",
    department: "Recruitment Operations",
    status: "Active",
    lastLogin: "March 17, 2026 • 9:01 AM",
  },
];

export default function AdminAccounts() {
  const [search, setSearch] = useState("");

  const filteredAccounts = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return hrAccounts;
    }

    return hrAccounts.filter(
      (account) =>
        account.fullName.toLowerCase().includes(keyword) ||
        account.email.toLowerCase().includes(keyword) ||
        account.id.toLowerCase().includes(keyword),
    );
  }, [search]);

  const activeCount = hrAccounts.filter(
    (account) => account.status === "Active",
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

      <main className="ml-64 flex-1 p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
                  HR Accounts
                </h1>
                <p className="mt-2 text-sm text-slate-600">
                  Manage HR user access, account status, and permissions.
                </p>
              </div>

              <Button className="bg-red-600 hover:bg-red-700">
                Add HR Account
              </Button>
            </div>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Total HR Accounts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {hrAccounts.length}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">Active</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-emerald-700">
                  {activeCount}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Suspended
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-amber-700">
                  {hrAccounts.length - activeCount}
                </p>
              </CardContent>
            </Card>
          </section>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle>Account List</CardTitle>
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search by name, email, or employee ID"
                  className="w-full md:max-w-sm"
                />
              </div>
            </CardHeader>

            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAccounts.length > 0 ? (
                    filteredAccounts.map((account) => (
                      <TableRow key={account.id}>
                        <TableCell className="font-medium">
                          {account.id}
                        </TableCell>
                        <TableCell>{account.fullName}</TableCell>
                        <TableCell>{account.email}</TableCell>
                        <TableCell>{account.department}</TableCell>
                        <TableCell>
                          <Badge
                            className={
                              account.status === "Active"
                                ? "bg-emerald-100 text-emerald-700"
                                : "bg-amber-100 text-amber-700"
                            }
                          >
                            {account.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{account.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex justify-end gap-2">
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                            <Button size="sm" variant="outline">
                              Reset Password
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className={
                                account.status === "Active"
                                  ? "text-amber-700"
                                  : "text-emerald-700"
                              }
                            >
                              {account.status === "Active"
                                ? "Suspend"
                                : "Activate"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={7}
                        className="py-8 text-center text-slate-500"
                      >
                        No matching HR accounts found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

              <div className="mt-4 flex justify-end">
                <Button asChild variant="outline">
                  <Link href="/admin/dashboard">Back to Dashboard</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
