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

interface AddCredentialDialogProps {
  onSuccess?: () => void;
}

export default function AddCredentialDialog({
  onSuccess,
}: AddCredentialDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    authority: "",
    number: "",
    date_taken: "",
    valid_until: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New credential entry:", formData);

    try {
      const response = await fetch("/api/applicant/profile/credentials", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: formData.title,
          authority: formData.authority,
          number: formData.number ? Number(formData.number) : null,
          date_taken: formData.date_taken,
          valid_until: formData.valid_until,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add credential entry");
      }

      setFormData({
        title: "",
        authority: "",
        number: "",
        date_taken: "",
        valid_until: "",
      });
      setOpen(false);

      // Call the callback to refresh data in parent
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error("Error adding credential entry:", error);
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
          + Add Credential
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold text-gray-900">
            Add Credential
          </DialogTitle>
          <DialogDescription>
            Add a new credential entry to your profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label
                htmlFor="title"
                className="text-sm font-medium text-gray-700"
              >
                Title
              </Label>
              <Input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter credential title"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="authority"
                className="text-sm font-medium text-gray-700"
              >
                Authority
              </Label>
              <Input
                id="authority"
                name="authority"
                type="text"
                value={formData.authority}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter authority"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="number"
                className="text-sm font-medium text-gray-700"
              >
                Number
              </Label>
              <Input
                id="number"
                name="number"
                type="text"
                value={formData.number}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter credential number"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="date_taken"
                className="text-sm font-medium text-gray-700"
              >
                Date Taken
              </Label>
              <Input
                id="date_taken"
                name="date_taken"
                type="text"
                value={formData.date_taken}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter date taken"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="valid_until"
                className="text-sm font-medium text-gray-700"
              >
                Valid Until
              </Label>
              <Input
                id="valid_until"
                name="valid_until"
                type="text"
                value={formData.valid_until}
                onChange={handleInputChange}
                className="border-gray-300"
                placeholder="Enter valid until"
              />
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
            >
              Add Credential
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
