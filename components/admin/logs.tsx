"use client";

import { useMemo, useState } from "react";
import AdminNavbar from "./navbar";
import { Badge } from "@/components/ui/badge";
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

type AdminLog = {
  id: string;
  actor: string;
  action: string;
  module: string;
  level: "Info" | "Warning" | "Critical";
  timestamp: string;
};

const adminLogs: AdminLog[] = [
  {
    id: "LOG-1001",
    actor: "Daniel Mark S. Arabusing",
    action: "Suspended HR account HR-2023-025",
    module: "Accounts",
    level: "Warning",
    timestamp: "March 18, 2026 • 9:12 AM",
  },
  {
    id: "LOG-1002",
    actor: "Daniel Mark S. Arabusing",
    action: "Updated platform notification settings",
    module: "Settings",
    level: "Info",
    timestamp: "March 18, 2026 • 8:48 AM",
  },
  {
    id: "LOG-1003",
    actor: "Maria Santos",
    action: "Edited job post: Software Engineer",
    module: "Jobs",
    level: "Info",
    timestamp: "March 17, 2026 • 4:31 PM",
  },
  {
    id: "LOG-1004",
    actor: "System",
    action: "Multiple failed login attempts detected",
    module: "Security",
    level: "Critical",
    timestamp: "March 17, 2026 • 2:09 PM",
  },
  {
    id: "LOG-1005",
    actor: "Carlo Mendoza",
    action: "Reset password for applicant account",
    module: "Accounts",
    level: "Warning",
    timestamp: "March 17, 2026 • 10:22 AM",
  },
];

export default function LogsPage() {
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    const keyword = search.trim().toLowerCase();

    if (!keyword) {
      return adminLogs;
    }

    return adminLogs.filter(
      (log) =>
        log.id.toLowerCase().includes(keyword) ||
        log.actor.toLowerCase().includes(keyword) ||
        log.action.toLowerCase().includes(keyword) ||
        log.module.toLowerCase().includes(keyword),
    );
  }, [search]);

  const criticalCount = adminLogs.filter(
    (log) => log.level === "Critical",
  ).length;

  return (
    <div className="flex min-h-screen bg-gray-50">
      <AdminNavbar />

   
      <main className="flex-1 lg:ml-64 p-4 md:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-slate-900 md:text-3xl">
              Activity Logs
            </h1>
            <p className="mt-2 text-sm text-slate-600">
              Track account management, configuration updates, and security events.
            </p>
          </section>

          <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Total Log Entries
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-slate-900">
                  {adminLogs.length}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Critical Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold text-red-700">
                  {criticalCount}
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-slate-600">
                  Last Updated
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm font-semibold text-slate-900">
                  March 18, 2026
                </p>
              </CardContent>
            </Card>
          </section>

          <Card className="border-slate-200">
            <CardHeader>
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <CardTitle>Log Entries</CardTitle>
                <Input
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search logs..."
                  className="w-full md:max-w-sm"
                />
              </div>
            </CardHeader>

            <CardContent>
\
              <div className="w-full overflow-x-auto rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Log ID</TableHead>
                      <TableHead className="whitespace-nowrap">Actor</TableHead>
                      <TableHead className="whitespace-nowrap">Action</TableHead>
                      <TableHead className="whitespace-nowrap">Module</TableHead>
                      <TableHead>Level</TableHead>
                      <TableHead className="whitespace-nowrap">Timestamp</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredLogs.length > 0 ? (
                      filteredLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium whitespace-nowrap">{log.id}</TableCell>
                          <TableCell className="whitespace-nowrap">{log.actor}</TableCell>
                          <TableCell className="min-w-[200px]">{log.action}</TableCell>
                          <TableCell className="whitespace-nowrap">{log.module}</TableCell>
                          <TableCell>
                            <Badge
                              className={
                                log.level === "Critical"
                                  ? "bg-red-100 text-red-700"
                                  : log.level === "Warning"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                              }
                            >
                              {log.level}
                            </Badge>
                          </TableCell>
                          <TableCell className="whitespace-nowrap">{log.timestamp}</TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="py-8 text-center text-slate-500"
                        >
                          No matching logs found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}