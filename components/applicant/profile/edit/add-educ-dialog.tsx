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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface AddEducDialogProps {
  onSuccess?: () => void;
}

export default function AddEducDialog({ onSuccess }: AddEducDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    school_name: "",
    degree: "",
    level: "",
    status: "",
    units_earned: "",
    year_graduated: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("New education entry:", formData);

    try {
      const response = await fetch("/api/applicant/profile/education", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to add education entry");
      }

      setFormData({
        school_name: "",
        level: "",
        degree: "",
        status: "",
        units_earned: "",
        year_graduated: "",
      });
      setOpen(false);

      // Call the callback to refresh data in parent
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding education entry:", error);
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
          + Add Education
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Education
          </DialogTitle>
          <DialogDescription>
            Add a new education entry to your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="school_name"
                className="text-sm font-medium text-gray-700"
              >
                School Name
              </Label>
              <Input
                id="school_name"
                name="school_name"
                type="text"
                value={formData.school_name}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter school name"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="level"
                className="text-sm font-medium text-gray-700"
              >
                Level
              </Label>
              <Select
                value={formData.level}
                onValueChange={(value) => handleSelectChange("level", value)}
              >
                <SelectTrigger id="level" className="border-gray-300">
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SECONDARY">Secondary</SelectItem>
                  <SelectItem value="VOCATIONAL">Vocational</SelectItem>
                  <SelectItem value="TERTIARY">Tertiary</SelectItem>
                  <SelectItem value="GRADUATE">Graduate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="degree"
                className="text-sm font-medium text-gray-700"
              >
                Degree
              </Label>
              <Input
                id="degree"
                name="degree"
                type="text"
                value={formData.degree}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter degree"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="status"
                className="text-sm font-medium text-gray-700"
              >
                Status
              </Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleSelectChange("status", value)}
              >
                <SelectTrigger id="status" className="border-gray-300">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ONGOING">Ongoing</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="DROPPED">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="units_earned"
                className="text-sm font-medium text-gray-700"
              >
                Units Earned
              </Label>
              <Input
                id="units_earned"
                name="units_earned"
                type="number"
                value={formData.units_earned}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter units earned"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="year_graduated"
                className="text-sm font-medium text-gray-700"
              >
                Year Graduated
              </Label>
              <Input
                id="year_graduated"
                name="year_graduated"
                type="number"
                value={formData.year_graduated}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter year graduated"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Education
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
