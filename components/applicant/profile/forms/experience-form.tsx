"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

type ExperienceRecord = {
  company: string;
  position: string;
  department: string;
  courses_handled: string;
  date_started: string;
  date_ended: string;
};

const emptyExperienceRecord: ExperienceRecord = {
  company: "",
  position: "",
  department: "",
  courses_handled: "",
  date_started: "",
  date_ended: "",
};

export default function ExperienceForm() {
  const [records, setRecords] = useState<ExperienceRecord[]>([
    emptyExperienceRecord,
  ]);

  const updateRecord = (
    index: number,
    field: keyof ExperienceRecord,
    value: string,
  ) => {
    setRecords((prev) =>
      prev.map((record, i) =>
        i === index ? { ...record, [field]: value } : record,
      ),
    );
  };

  const addRecord = () => {
    setRecords((prev) => [...prev, { ...emptyExperienceRecord }]);
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
              Experience Record {index + 1}
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
              <Label htmlFor={`company-${index}`}>Company</Label>
              <Input
                id={`company-${index}`}
                name={`experience[${index}].company`}
                placeholder="Tech Company"
                value={record.company}
                onChange={(e) => updateRecord(index, "company", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`position-${index}`}>Position</Label>
              <Input
                id={`position-${index}`}
                name={`experience[${index}].position`}
                placeholder="Software Engineer"
                value={record.position}
                onChange={(e) =>
                  updateRecord(index, "position", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`department-${index}`}>Department</Label>
              <Input
                id={`department-${index}`}
                name={`experience[${index}].department`}
                placeholder="IT"
                value={record.department}
                onChange={(e) =>
                  updateRecord(index, "department", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`date_started-${index}`}>
                Date Started (MM-YYYY)
              </Label>
              <Input
                id={`date_started-${index}`}
                name={`experience[${index}].date_started`}
                placeholder="12-2020"
                value={record.date_started}
                onChange={(e) =>
                  updateRecord(index, "date_started", e.target.value)
                }
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor={`date_ended-${index}`}>
                Date Ended (MM-YYYY)
              </Label>
              <Input
                id={`date_ended-${index}`}
                name={`experience[${index}].date_ended`}
                placeholder="12-2023"
                value={record.date_ended}
                onChange={(e) =>
                  updateRecord(index, "date_ended", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex gap-2">
                <Label htmlFor={`courses_handled-${index}`}>
                  Courses Handled
                </Label>
                <Tooltip>
                  <TooltipTrigger>
                    <Info className="h-4 w-4 text-gray-400" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <div className="flex flex-col">
                      <p>
                        List any courses you handled in this position, separated
                        by commas. For example: "CS101, CS102".
                      </p>
                      <p>Leave blank if not applicable.</p>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </div>
              <Input
                id={`courses_handled-${index}`}
                name={`experience[${index}].courses_handled`}
                placeholder="CS101, CS102"
                value={record.courses_handled}
                onChange={(e) =>
                  updateRecord(index, "courses_handled", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      ))}

      <div className="flex gap-4 justify-end">
        <Button type="button" variant="outline" onClick={addRecord}>
          Add Experience Record
        </Button>
        <Button type="submit" className="bg-red-600 hover:bg-red-700">
          Save Experience Information
        </Button>
      </div>
    </form>
  );
}
