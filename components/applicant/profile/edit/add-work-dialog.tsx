import {
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogDescription,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddWorkDialogProps {
  onSuccess?: () => void;
}

export default function AddWorkDialog({ onSuccess }: AddWorkDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    department: "",
    salary: "",
    date_started: "",
    date_ended: "",
    courses_handled: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New work entry:", formData);

    try {
      const response = await fetch("/api/applicant/profile/work", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          company: formData.company,
          position: formData.position,
          department: formData.department,
          salary: formData.salary ? Number(formData.salary) : null,
          date_started: formData.date_started,
          date_ended: formData.date_ended,
          courses_handled: formData.courses_handled
            .split(",")
            .map((c) => c.trim())
            .filter((c) => c),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add work entry");
      }

      setFormData({
        company: "",
        position: "",
        department: "",
        salary: "",
        date_started: "",
        date_ended: "",
        courses_handled: "",
      });
      setOpen(false);

      // Call the callback to refresh data in parent
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding work entry:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-blue-600 text-blue-600 hover:bg-blue-100 hover:text-blue-600"
        >
          + Add Experience
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Work Experience
          </DialogTitle>
          <DialogDescription>
            Add a new work experience entry to your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="company"
                className="text-sm font-medium text-gray-700"
              >
                Company
              </Label>
              <Input
                id="company"
                name="company"
                type="text"
                value={formData.company}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter company name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="position"
                className="text-sm font-medium text-gray-700"
              >
                Position
              </Label>
              <Input
                id="position"
                name="position"
                type="text"
                value={formData.position}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter position"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="department"
                className="text-sm font-medium text-gray-700"
              >
                Department
              </Label>
              <Input
                id="department"
                name="department"
                type="text"
                value={formData.department}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter department"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="salary"
                className="text-sm font-medium text-gray-700"
              >
                Salary
              </Label>
              <Input
                id="salary"
                name="salary"
                type="number"
                value={formData.salary}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter salary"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="date_started"
                className="text-sm font-medium text-gray-700"
              >
                Date Started
              </Label>
              <Input
                id="date_started"
                name="date_started"
                type="text"
                value={formData.date_started}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter date started"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="date_ended"
                className="text-sm font-medium text-gray-700"
              >
                Date Ended
              </Label>
              <Input
                id="date_ended"
                name="date_ended"
                type="text"
                value={formData.date_ended}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter date ended"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="courses_handled"
                className="text-sm font-medium text-gray-700"
              >
                Courses Handled (comma-separated)
              </Label>
              <Input
                id="courses_handled"
                name="courses_handled"
                type="text"
                value={formData.courses_handled}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter courses handled"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Work Experience
            </Button>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
