"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type GovIdRecord = {
  id_type: string;
  number: string;
};

const emptyGovIdRecord: GovIdRecord = {
  id_type: "",
  number: "",
};

export default function GovIdForm() {
  const [records, setRecords] = useState<GovIdRecord[]>([emptyGovIdRecord]);

  const updateRecord = (
    index: number,
    field: keyof GovIdRecord,
    value: string,
  ) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptyGovIdRecord }]);
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
              Government ID {index + 1}
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
              <Label htmlFor={`id_type-${index}`}>ID Type</Label>
              <Input
                id={`id_type-${index}`}
                name={`gov_ids[${index}].id_type`}
                placeholder="SSS, PhilHealth, TIN..."
                value={record.id_type}
                onChange={(e) => updateRecord(index, "id_type", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`number-${index}`}>ID Number</Label>
              <Input
                id={`number-${index}`}
                name={`gov_ids[${index}].number`}
                placeholder="0123456789"
                value={record.number}
                onChange={(e) => updateRecord(index, "number", e.target.value)}
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={addRecord}>
          Add Government ID
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Government IDs
        </Button>
      </div>
    </form>
  );
}
