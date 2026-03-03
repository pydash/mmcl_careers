"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Profile } from "@/models/User";
import { useEffect, useState } from "react";

interface PersonalTabProps {
  profile: Profile;
}

type ProfileFormData = Omit<Profile, "id" | "created_at" | "updated_at">;

export default function PersonalTab({ profile }: PersonalTabProps) {
  const [formData, setFormData] = useState<ProfileFormData>();
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (profile) {
      setFormData({
        first_name: profile.first_name,
        middle_name: profile.middle_name || "",
        last_name: profile.last_name,
        gender: profile.gender,
        birth_place: profile.birth_place || "",
        civil_status: profile.civil_status,
        citizenship: profile.citizenship,
        religion: profile.religion || "",
        mobile_number: profile.mobile_number,
        email_address: profile.email_address,
        permanent_address: profile.permanent_address,
        mailing_address: profile.mailing_address,
        landline_number: profile.landline_number || "",
      });
    }
  }, [profile]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => (prev ? { ...prev, [name]: value } : prev));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) {
      return;
    }

    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      const response = await fetch("/api/applicant/profile/personal", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ profile: formData }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err: any) {
      setSaveError(err?.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Success Message */}
      {saveSuccess && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-700 rounded-md text-sm">
          Personal information updated successfully!
        </div>
      )}

      {/* Error Message */}
      {saveError && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
          {saveError}
        </div>
      )}

      <div className="space-y-6">
        {/* Personal Information Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Personal Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                First Name
              </label>
              <Input
                type="text"
                name="first_name"
                value={formData?.first_name || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Middle Name
              </label>
              <Input
                type="text"
                name="middle_name"
                value={formData?.middle_name || ""}
                onChange={handleInputChange}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Last Name
              </label>
              <Input
                type="text"
                name="last_name"
                value={formData?.last_name || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Gender
              </label>
              <Select
                value={formData?.gender || ""}
                onValueChange={(value) => handleSelectChange("gender", value)}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Civil Status
              </label>
              <Select
                value={formData?.civil_status || ""}
                onValueChange={(value) =>
                  handleSelectChange("civil_status", value)
                }
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single</SelectItem>
                  <SelectItem value="married">Married</SelectItem>
                  <SelectItem value="divorced">Divorced</SelectItem>
                  <SelectItem value="widowed">Widowed</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Birth Place
              </label>
              <Input
                type="text"
                name="birth_place"
                value={formData?.birth_place || ""}
                onChange={handleInputChange}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Citizenship
              </label>
              <Input
                type="text"
                name="citizenship"
                value={formData?.citizenship || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Religion
              </label>
              <Input
                type="text"
                name="religion"
                value={formData?.religion || ""}
                onChange={handleInputChange}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <Input
                type="tel"
                name="mobile_number"
                value={formData?.mobile_number || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Landline Number
              </label>
              <Input
                type="tel"
                name="landline_number"
                value={formData?.landline_number || ""}
                onChange={handleInputChange}
                className="border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Email Address
              </label>
              <Input
                type="email"
                name="email_address"
                value={formData?.email_address || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Address Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Address</h2>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Permanent Address
              </label>
              <Textarea
                name="permanent_address"
                value={formData?.permanent_address || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300 resize-none"
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">
                Mailing Address
              </label>
              <Textarea
                name="mailing_address"
                value={formData?.mailing_address || ""}
                onChange={handleInputChange}
                required
                className="border-gray-300 resize-none"
                rows={3}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={saving}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
