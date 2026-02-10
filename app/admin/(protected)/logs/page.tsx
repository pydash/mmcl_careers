"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface AuditLog {
  id: string;
  timestamp: string;
  user_email: string;
  action: string;
  resource_type: string;
  resource_id: string;
  resource_name: string;
  status: "success" | "error" | "warning";
  details: string;
}

const logTypeColors: Record<string, string> = {
  create: "bg-blue-100 text-blue-800",
  update: "bg-yellow-100 text-yellow-800",
  delete: "bg-red-100 text-red-800",
  login: "bg-green-100 text-green-800",
  export: "bg-purple-100 text-purple-800",
  view: "bg-gray-100 text-gray-800",
};

const statusColors: Record<string, string> = {
  success: "bg-green-100 text-green-800",
  error: "bg-red-100 text-red-800",
  warning: "bg-yellow-100 text-yellow-800",
};

export default function LogsPage() {
  const [logs, setLogs] = useState<AuditLog[]>([
    {
      id: "1",
      timestamp: "2024-02-11 14:32:15",
      user_email: "admin@mmcl.edu",
      action: "create",
      resource_type: "Job",
      resource_id: "JOB-001",
      resource_name: "Senior Software Engineer",
      status: "success",
      details: "New job posting created for Engineering department",
    },
    {
      id: "2",
      timestamp: "2024-02-11 14:15:42",
      user_email: "jane.smith@mmcl.edu",
      action: "update",
      resource_type: "Job",
      resource_id: "JOB-045",
      resource_name: "Product Manager",
      status: "success",
      details: "Updated job description and requirements",
    },
    {
      id: "3",
      timestamp: "2024-02-11 13:48:20",
      user_email: "admin@mmcl.edu",
      action: "delete",
      resource_type: "Job",
      resource_id: "JOB-032",
      resource_name: "Marketing Intern",
      status: "success",
      details: "Job posting archived due to position filled",
    },
    {
      id: "4",
      timestamp: "2024-02-11 13:22:05",
      user_email: "john.doe@mmcl.edu",
      action: "login",
      resource_type: "User",
      resource_id: "USER-123",
      resource_name: "John Doe",
      status: "success",
      details: "Logged in from IP: 192.168.1.100",
    },
    {
      id: "5",
      timestamp: "2024-02-11 12:55:33",
      user_email: "jane.smith@mmcl.edu",
      action: "export",
      resource_type: "Report",
      resource_id: "RPT-001",
      resource_name: "Applicant Report",
      status: "success",
      details: "Exported applicant data to CSV (340 records)",
    },
    {
      id: "6",
      timestamp: "2024-02-11 12:30:18",
      user_email: "admin@mmcl.edu",
      action: "update",
      resource_type: "Account",
      resource_id: "ACC-005",
      resource_name: "Bob Wilson",
      status: "success",
      details: "Account status changed from active to inactive",
    },
    {
      id: "7",
      timestamp: "2024-02-11 11:45:50",
      user_email: "john.doe@mmcl.edu",
      action: "view",
      resource_type: "Application",
      resource_id: "APP-234",
      resource_name: "John Smith - Senior Engineer",
      status: "success",
      details: "Viewed applicant profile",
    },
    {
      id: "8",
      timestamp: "2024-02-11 11:20:10",
      user_email: "jane.smith@mmcl.edu",
      action: "update",
      resource_type: "Application",
      resource_id: "APP-234",
      resource_name: "John Smith - Senior Engineer",
      status: "success",
      details: "Updated application status to Interview",
    },
    {
      id: "9",
      timestamp: "2024-02-11 10:15:42",
      user_email: "admin@mmcl.edu",
      action: "login",
      resource_type: "User",
      resource_id: "USER-001",
      resource_name: "Admin",
      status: "success",
      details: "Logged in from IP: 192.168.1.50",
    },
    {
      id: "10",
      timestamp: "2024-02-11 09:30:25",
      user_email: "jane.smith@mmcl.edu",
      action: "create",
      resource_type: "Account",
      resource_id: "ACC-008",
      resource_name: "Sarah Johnson",
      status: "success",
      details: "New HR account created",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAction, setSelectedAction] = useState<string>("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);
  const [openDetails, setOpenDetails] = useState(false);

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      log.resource_id.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesAction =
      selectedAction === "all" || log.action === selectedAction;
    const matchesStatus =
      selectedStatus === "all" || log.status === selectedStatus;

    return matchesSearch && matchesAction && matchesStatus;
  });

  const handleViewDetails = (log: AuditLog) => {
    setSelectedLog(log);
    setOpenDetails(true);
  };

  const getActionLabel = (action: string) => {
    const labels: Record<string, string> = {
      create: "Created",
      update: "Updated",
      delete: "Deleted",
      login: "Logged In",
      export: "Exported",
      view: "Viewed",
    };
    return labels[action] || action;
  };

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Audit Logs</h1>
        <p className="text-muted-foreground mt-1">
          Track all system activities and user actions
        </p>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="search" className="text-sm mb-2 block">
            Search
          </Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by email, resource, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div>
          <Label htmlFor="action" className="text-sm mb-2 block">
            Action
          </Label>
          <Select value={selectedAction} onValueChange={setSelectedAction}>
            <SelectTrigger>
              <SelectValue placeholder="All actions" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All actions</SelectItem>
              <SelectItem value="create">Create</SelectItem>
              <SelectItem value="update">Update</SelectItem>
              <SelectItem value="delete">Delete</SelectItem>
              <SelectItem value="login">Login</SelectItem>
              <SelectItem value="export">Export</SelectItem>
              <SelectItem value="view">View</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="status" className="text-sm mb-2 block">
            Status
          </Label>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="success">Success</SelectItem>
              <SelectItem value="error">Error</SelectItem>
              <SelectItem value="warning">Warning</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Logs Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Timestamp</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Resource</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Details</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredLogs.length > 0 ? (
              filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="text-sm">{log.timestamp}</TableCell>
                  <TableCell className="font-medium text-sm">
                    {log.user_email}
                  </TableCell>
                  <TableCell>
                    <Badge className={logTypeColors[log.action]}>
                      {getActionLabel(log.action)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium text-sm">{log.resource_name}</p>
                      <p className="text-xs text-muted-foreground">
                        {log.resource_type} • {log.resource_id}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={statusColors[log.status]}>
                      {log.status.charAt(0).toUpperCase() + log.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Dialog
                      open={openDetails && selectedLog?.id === log.id}
                      onOpenChange={(open) => !open && setOpenDetails(false)}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(log)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[500px]">
                        <DialogHeader>
                          <DialogTitle>Log Details</DialogTitle>
                          <DialogDescription>
                            Complete information about this action
                          </DialogDescription>
                        </DialogHeader>
                        {selectedLog && (
                          <div className="space-y-4 py-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Timestamp
                                </p>
                                <p className="font-medium">
                                  {selectedLog.timestamp}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  User
                                </p>
                                <p className="font-medium">
                                  {selectedLog.user_email}
                                </p>
                              </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Action
                                </p>
                                <p>
                                  <Badge
                                    className={
                                      logTypeColors[selectedLog.action]
                                    }
                                  >
                                    {getActionLabel(selectedLog.action)}
                                  </Badge>
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Status
                                </p>
                                <p>
                                  <Badge
                                    className={statusColors[selectedLog.status]}
                                  >
                                    {selectedLog.status
                                      .charAt(0)
                                      .toUpperCase() +
                                      selectedLog.status.slice(1)}
                                  </Badge>
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Resource
                              </p>
                              <div className="bg-muted p-3 rounded mt-1">
                                <p className="font-medium">
                                  {selectedLog.resource_name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  Type: {selectedLog.resource_type}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                  ID: {selectedLog.resource_id}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Details
                              </p>
                              <p className="text-sm bg-muted p-3 rounded mt-1">
                                {selectedLog.details}
                              </p>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-muted-foreground"
                >
                  No logs found matching your search criteria.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Logs</p>
          <p className="text-2xl font-bold">{logs.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Successful</p>
          <p className="text-2xl font-bold text-green-600">
            {logs.filter((l) => l.status === "success").length}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Errors</p>
          <p className="text-2xl font-bold text-red-600">
            {logs.filter((l) => l.status === "error").length}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Warnings</p>
          <p className="text-2xl font-bold text-yellow-600">
            {logs.filter((l) => l.status === "warning").length}
          </p>
        </div>
      </div>
    </div>
  );
}
