"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type EducationRecord = {
  institution: string;
  level: string;
  degree: string;
  status: string;
  year_graduate: string;
};

const emptyEducationRecord: EducationRecord = {
  institution: "",
  level: "",
  degree: "",
  status: "",
  year_graduate: "",
};

export default function EducationForm() {
  const [records, setRecords] = useState<EducationRecord[]>([
    { ...emptyEducationRecord },
  ]);

  const updateRecord = (
    index: number,
    field: keyof EducationRecord,
    value: string,
  ) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptyEducationRecord }]);
  };

  const removeRecord = (index: number) => {
    setRecords((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <form className="space-y-6">
      {records.map((record, index) => (
        <div
          key={index}
          className="space-y-4 rounded-xl bg-white border border-slate-200 p-4 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-900">
              Education Record {index + 1}
            </h3>
            {records.length > 1 && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
                onClick={() => removeRecord(index)}
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor={`institution-${index}`}>Institution</Label>
              <Input
                id={`institution-${index}`}
                name={`education[${index}].institution`}
                placeholder="University of the Philippines"
                value={record.institution}
                onChange={(e) =>
                  updateRecord(index, "institution", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`level-${index}`}>Level</Label>
              <Input
                id={`level-${index}`}
                name={`education[${index}].level`}
                placeholder="Bachelor's"
                value={record.level}
                onChange={(e) => updateRecord(index, "level", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`degree-${index}`}>Degree / Program</Label>
              <Input
                id={`degree-${index}`}
                name={`education[${index}].degree`}
                placeholder="Computer Science"
                value={record.degree}
                onChange={(e) => updateRecord(index, "degree", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`status-${index}`}>Status</Label>
              <Input
                id={`status-${index}`}
                name={`education[${index}].status`}
                placeholder="Graduated"
                value={record.status}
                onChange={(e) => updateRecord(index, "status", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`year_graduate-${index}`}>Year Graduated</Label>
              <Input
                id={`year_graduate-${index}`}
                name={`education[${index}].year_graduate`}
                placeholder="2020"
                value={record.year_graduate}
                onChange={(e) =>
                  updateRecord(index, "year_graduate", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <Button 
          type="button" 
          variant="outline" 
          onClick={addRecord}
          className="w-full sm:w-auto"
        >
          Add Education Record
        </Button>
        <Button 
          type="submit" 
          className="w-full sm:w-auto bg-red-600 hover:bg-red-700"
        >
          Save Education Information
        </Button>
      </div>
    </form>
  );
}