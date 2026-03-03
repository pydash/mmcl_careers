"use client";

import { useState } from "react";
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
import { useAdminAccounts } from "@/hooks/admin/accounts/useAdminAccounts";

export default function AccountsPage() {
  const { accounts, loading, error: fetchError, refetch } = useAdminAccounts();

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null,
  );
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [creating, setCreating] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    department: "HR",
    status: "active" as const,
  });

  const handleCreateAccount = async () => {
    if (!formData.email || !formData.first_name || !formData.last_name) {
      setErrorMessage("Please fill in all required fields");
      setTimeout(() => setErrorMessage(""), 3000);
      return;
    }

    setCreating(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/admin/accounts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formData.email,
          first_name: formData.first_name,
          last_name: formData.last_name,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to create account");
      }

      setSuccessMessage(
        "Account created successfully! Default password: ChangeMe123!",
      );
      setOpenCreateDialog(false);
      setFormData({
        email: "",
        first_name: "",
        last_name: "",
        department: "HR",
        status: "active",
      });

      // Refresh the accounts list
      refetch();

      setTimeout(() => setSuccessMessage(""), 5000);
    } catch (error: any) {
      setErrorMessage(error.message || "Failed to create account");
      setTimeout(() => setErrorMessage(""), 3000);
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteAccount = (id: string) => {
    setSelectedAccountId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (selectedAccountId) {
      setDeleting(true);
      setErrorMessage("");

      try {
        const response = await fetch(
          `/api/admin/accounts?id=${selectedAccountId}`,
          {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
          },
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to delete account");
        }

        setSuccessMessage("Account deleted successfully");
        setOpenDeleteDialog(false);
        setSelectedAccountId(null);
        refetch();
        setTimeout(() => setSuccessMessage(""), 5000);
      } catch (error: any) {
        setErrorMessage(error.message || "Failed to delete account");
        setTimeout(() => setErrorMessage(""), 3000);
      } finally {
        setDeleting(false);
      }
    }
  };

  return (
    <div className="space-y-6 py-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold">HR Accounts</h1>
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
                disabled={creating}
              >
                Cancel
              </Button>
              <Button onClick={handleCreateAccount} disabled={creating}>
                {creating ? "Creating..." : "Create Account"}
              </Button>
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

      {errorMessage && (
        <Alert className="border-red-200 bg-red-50">
          <p className="text-sm text-red-800">{errorMessage}</p>
        </Alert>
      )}

      {fetchError && (
        <Alert className="border-red-200 bg-red-50">
          <p className="text-sm text-red-800">Error: {fetchError}</p>
        </Alert>
      )}

      {/* Accounts Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted">
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  Loading accounts...
                </TableCell>
              </TableRow>
            ) : accounts.length > 0 ? (
              accounts.map((account) => (
                <TableRow key={account.id}>
                  <TableCell className="font-medium">{account.email}</TableCell>
                  <TableCell>{account.full_name}</TableCell>
                  <TableCell>
                    <Badge variant="default">Active</Badge>
                  </TableCell>
                  <TableCell>
                    {new Date(account.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="text-right space-x-2">
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
                            disabled={deleting}
                          >
                            Cancel
                          </Button>
                          <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={deleting}
                          >
                            {deleting ? "Deleting..." : "Delete Account"}
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
                  colSpan={5}
                  className="text-center py-8 text-muted-foreground"
                >
                  No accounts found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
