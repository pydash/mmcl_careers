"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";

interface HRAccount {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  department: string;
  status: "active" | "inactive";
  created_at: string;
}

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<HRAccount[]>([
    {
      id: "1",
      email: "john.doe@mmcl.edu",
      first_name: "John",
      last_name: "Doe",
      department: "HR",
      status: "active",
      created_at: "2024-01-15",
    },
    {
      id: "2",
      email: "jane.smith@mmcl.edu",
      first_name: "Jane",
      last_name: "Smith",
      department: "HR",
      status: "active",
      created_at: "2024-02-10",
    },
    {
      id: "3",
      email: "bob.wilson@mmcl.edu",
      first_name: "Bob",
      last_name: "Wilson",
      department: "HR",
      status: "inactive",
      created_at: "2024-01-05",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    department: "HR",
    status: "active" as const,
  });

  const filteredAccounts = accounts.filter(
    (account) =>
      account.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      account.last_name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleCreateAccount = () => {
    if (!formData.email || !formData.first_name || !formData.last_name) {
      alert("Please fill in all required fields");
      return;
    }

    const newAccount: HRAccount = {
      id: String(accounts.length + 1),
      email: formData.email,
      first_name: formData.first_name,
      last_name: formData.last_name,
      department: formData.department,
      status: formData.status,
      created_at: new Date().toISOString().split("T")[0],
    };

    setAccounts([...accounts, newAccount]);
    setSuccessMessage("Account created successfully!");
    setOpenCreateDialog(false);
    setFormData({
      email: "",
      first_name: "",
      last_name: "",
      department: "HR",
      status: "active",
    });

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteAccount = (id: string) => {
    setSelectedAccountId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedAccountId) {
      setAccounts(
        accounts.filter((account) => account.id !== selectedAccountId),
      );
      setSuccessMessage("Account deleted successfully!");
      setOpenDeleteDialog(false);
      setSelectedAccountId(null);

      setTimeout(() => setSuccessMessage(""), 3000);
    }
  };

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">HR Accounts</h1>
        <Dialog open={openCreateDialog} onOpenChange={setOpenCreateDialog}>
          <DialogTrigger asChild>
            <Button>Create New Account</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New HR Account</DialogTitle>
              <DialogDescription>
                Add a new HR account to the system. Fill in the details below.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john.doe@mmcl.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First Name *</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    value={formData.first_name}
                    onChange={(e) =>
                      setFormData({ ...formData, first_name: e.target.value })
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last Name *</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    value={formData.last_name}
                    onChange={(e) =>
                      setFormData({ ...formData, last_name: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="department">Department</Label>
                <Select
                  value={formData.department}
                  onValueChange={(value) =>
                    setFormData({ ...formData, department: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({
                      ...formData,
                      status: value as "active" | "inactive",
                    })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-3">
              <Button
                variant="outline"
                onClick={() => setOpenCreateDialog(false)}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateAccount}>Create Account</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50">
          <p className="text-sm text-green-800">{successMessage}</p>
        </Alert>
      )}

      {/* Search Bar */}
      <div>
        <Input
          type="text"
          placeholder="Search by email, first name, or last name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>

      {/* Accounts Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAccounts.length > 0 ? (
              filteredAccounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.email}</TableCell>
                  <TableCell>
                    {account.first_name} {account.last_name}
                  </TableCell>
                  <TableCell>{account.department}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        account.status === "active" ? "default" : "secondary"
                      }
                    >
                      {account.status.charAt(0).toUpperCase() +
                        account.status.slice(1)}
                    </Badge>
                  </TableCell>
                  <TableCell>{account.created_at}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => alert("Edit feature coming soon")}
                    >
                      Edit
                    </Button>
                    <Dialog
                      open={
                        openDeleteDialog && selectedAccountId === account.id
                      }
                      onOpenChange={(open) =>
                        !open && setOpenDeleteDialog(false)
                      }
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDeleteAccount(account.id)}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Account</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete the account for{" "}
                            <span className="font-semibold">
                              {account.email}
                            </span>
                            ? This action cannot be undone.
                          </DialogDescription>
                        </DialogHeader>
                        <div className="flex justify-end gap-3">
                          <Button
                            variant="outline"
                            onClick={() => setOpenDeleteDialog(false)}
                          >
                            Cancel
                          </Button>
                          <Button variant="destructive" onClick={confirmDelete}>
                            Delete Account
                          </Button>
                        </div>
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
                  No accounts found matching your search.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Stats Footer */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Total Accounts</p>
          <p className="text-2xl font-bold">{accounts.length}</p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Active Accounts</p>
          <p className="text-2xl font-bold text-green-600">
            {accounts.filter((a) => a.status === "active").length}
          </p>
        </div>
        <div className="border rounded-lg p-4">
          <p className="text-sm text-muted-foreground">Inactive Accounts</p>
          <p className="text-2xl font-bold text-red-600">
            {accounts.filter((a) => a.status === "inactive").length}
          </p>
        </div>
      </div>
    </div>
  );
}
