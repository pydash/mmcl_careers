"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface AddGovIdDialogProps {
  onSuccess?: () => void;
}

export default function AddGovIdDialog({ onSuccess }: AddGovIdDialogProps) {
  const [formData, setFormData] = useState({
    id_type: "SSS",
    id_number: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/applicant/profile/gov-id", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add government ID");
      }

      setFormData({
        id_type: "SSS",
        id_number: "",
      });
      setOpen(false);
      onSuccess?.();
    } catch (err: any) {
      setError(err?.message || "Failed to add government ID");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="border-blue-600 text-blue-600 hover:bg-blue-50"
        >
          + Add ID
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Government ID</DialogTitle>
          <DialogDescription>
            Enter the details of the government ID to add.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ID Type
              </label>
              <Select
                value={formData.id_type}
                onValueChange={(value) =>
                  setFormData({ ...formData, id_type: value })
                }
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SSS">SSS</SelectItem>
                  <SelectItem value="TIN">TIN</SelectItem>
                  <SelectItem value="PHILHEALTH">PhilHealth</SelectItem>
                  <SelectItem value="PAGIBIG">Pag-ibig</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                ID Number
              </label>
              <Input
                type="text"
                value={formData.id_number}
                onChange={(e) =>
                  setFormData({ ...formData, id_number: e.target.value })
                }
                className="border-gray-300"
              />
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={loading}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {loading ? "Adding..." : "Add ID"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
