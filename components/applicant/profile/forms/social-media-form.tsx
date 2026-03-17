"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type SocialMediaRecord = {
  platform: string;
  url: string;
};

const emptySocialMediaRecord: SocialMediaRecord = {
  platform: "",
  url: "",
};

export default function SocialMediaForm() {
  const [records, setRecords] = useState<SocialMediaRecord[]>([
    emptySocialMediaRecord,
  ]);

  const updateRecord = (
    index: number,
    field: keyof SocialMediaRecord,
    value: string,
  ) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptySocialMediaRecord }]);
  };

  const removeRecord = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="space-y-6">
      {records.map((record, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl border border-slate-200 p-4 bg-white"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Social Media {index + 1}
            </h3>
            {records.length > 1 && (
              <Button
                type="button"
                variant="outline"
                className="text-red-600 hover:text-red-700"
                onClick={() => removeRecord(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor={`platform-${index}`}>Platform</Label>
              <Input
                id={`platform-${index}`}
                name={`social_media[${index}].platform`}
                placeholder="LinkedIn, Facebook, Twitter..."
                value={record.platform}
                onChange={(e) =>
                  updateRecord(index, "platform", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`url-${index}`}>Profile URL</Label>
              <Input
                id={`url-${index}`}
                name={`social_media[${index}].url`}
                placeholder="https://linkedin.com/in/username"
                value={record.url}
                onChange={(e) => updateRecord(index, "url", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={addRecord}>
          Add Social Media
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Social Media
        </Button>
      </div>
    </form>
  );
}
