"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type CredentialRecord = {
  title: string;
  authority: string;
  number: string;
  date_issued: string;
  date_expired: string;
};

const emptyCredentialRecord: CredentialRecord = {
  title: "",
  authority: "",
  number: "",
  date_issued: "",
  date_expired: "",
};

export default function CredentialForm() {
  const [records, setRecords] = useState<CredentialRecord[]>([
    emptyCredentialRecord,
  ]);

  const updateRecord = (
    index: number,
    field: keyof CredentialRecord,
    value: string,
  ) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptyCredentialRecord }]);
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
              Credential Record {index + 1}
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
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`title-${index}`}>Title</Label>
              <Input
                id={`title-${index}`}
                name={`credentials[${index}].title`}
                placeholder="Licensed Professional Teacher"
                value={record.title}
                onChange={(e) => updateRecord(index, "title", e.target.value)}
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`authority-${index}`}>Issuing Authority</Label>
              <Input
                id={`authority-${index}`}
                name={`credentials[${index}].authority`}
                placeholder="Professional Regulation Commission"
                value={record.authority}
                onChange={(e) =>
                  updateRecord(index, "authority", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`number-${index}`}>
                License / Certificate Number
              </Label>
              <Input
                id={`number-${index}`}
                name={`credentials[${index}].number`}
                placeholder="0123456"
                value={record.number}
                onChange={(e) => updateRecord(index, "number", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`date_issued-${index}`}>
                Date Issued (MM-YYYY)
              </Label>
              <Input
                id={`date_issued-${index}`}
                name={`credentials[${index}].date_issued`}
                placeholder="06-2019"
                value={record.date_issued}
                onChange={(e) =>
                  updateRecord(index, "date_issued", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`date_expired-${index}`}>
                Date Expired (MM-YYYY)
              </Label>
              <Input
                id={`date_expired-${index}`}
                name={`credentials[${index}].date_expired`}
                placeholder="06-2025"
                value={record.date_expired}
                onChange={(e) =>
                  updateRecord(index, "date_expired", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={addRecord}>
          Add Credential Record
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Credential Information
        </Button>
      </div>
    </form>
  );
}
