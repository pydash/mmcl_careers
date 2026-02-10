"use client";

import { X } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { titleCase } from "title-case";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";

type EmploymentFormData = {
  job_title: string;
  position_specialization: string;
  company_name: string;
  industry: string;
  monthly_salary: string | null;
  date_started: string;
  date_ended: string;
};

interface EmploymentFormProps {
  employmentData: EmploymentFormData[];
  onAddEmployment: (data: EmploymentFormData) => void;
  onDeleteEmployment: (index: number) => void;
}

export default function EmploymentForm({
  employmentData,
  onAddEmployment,
  onDeleteEmployment,
}: EmploymentFormProps) {
  const [currentEntry, setCurrentEntry] = useState<EmploymentFormData>({
    job_title: "",
    position_specialization: "",
    company_name: "",
    industry: "",
    monthly_salary: null,
    date_started: "",
    date_ended: "",
  });

  const handleAdd = () => {
    // Validate that at least some fields are filled
    if (currentEntry.job_title && currentEntry.company_name) {
      onAddEmployment({
        ...currentEntry,
      });

      // Reset form
      setCurrentEntry({
        job_title: "",
        position_specialization: "",
        company_name: "",
        industry: "",
        monthly_salary: null,
        date_started: "",
        date_ended: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Display saved employment records */}
      {employmentData.map((entry, index) => (
        <div key={index} className="p-4 border bg-gray-50/50 hover:bg-gray-50">
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Job Title</p>
              <p className="font-medium">{String(entry.job_title)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Company Name</p>
              <p className="font-medium">{String(entry.company_name)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Industry</p>
              <p className="font-medium">{String(entry.industry) || "--"}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">
                Position Specialization
              </p>
              <p className="font-medium">
                {String(entry.position_specialization) || "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Monthly Salary</p>
              <p className="font-medium">
                {entry.monthly_salary
                  ? `₱${Number(entry.monthly_salary).toLocaleString()}`
                  : "--"}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Employment Period</p>
              <p className="font-medium">
                {String(entry.date_started)} -{" "}
                {String(entry.date_ended) || "Present"}
              </p>
            </div>
          </div>
          <Separator className="my-2" />
          <button
            type="button"
            onClick={() => onDeleteEmployment(index)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Input form for new entry */}
      <FieldGroup>
        <div className="grid grid-cols-2 gap-4">
          <Field>
            <FieldLabel htmlFor="job_title">
              Job Title
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              placeholder=""
              id="job_title"
              value={String(currentEntry.job_title)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  job_title: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="position_specialization">
              Position Specialization
            </FieldLabel>
            <Input
              placeholder=""
              id="position_specialization"
              value={String(currentEntry.position_specialization)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  position_specialization: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="company_name">
              Company Name
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              placeholder=""
              id="company_name"
              value={String(currentEntry.company_name)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  company_name: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="industry">Industry</FieldLabel>
            <Input
              placeholder=""
              id="industry"
              value={String(currentEntry.industry)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  industry: e.target.value,
                })
              }
            />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="monthly_salary">Monthly Salary</FieldLabel>
            <Input
              type="number"
              placeholder=""
              id="monthly_salary"
              value={currentEntry.monthly_salary ?? ""}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  monthly_salary: e.target.value ? e.target.value : null,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="date_started">Date Started</FieldLabel>
            <input
              type="month"
              id="date_started"
              placeholder="yyyy-mm"
              className="border border-input shadow-sm rounded-md p-2 text-sm focus-visible:border-black focus-visible:outline-none w-full"
              value={String(currentEntry.date_started)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  date_started: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="date_ended">Date Ended</FieldLabel>
            <input
              type="month"
              id="date_ended"
              placeholder="yyyy-mm"
              className="border border-input shadow-sm rounded-md p-2 text-sm focus-visible:border-black focus-visible:outline-none w-full"
              value={String(currentEntry.date_ended)}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  date_ended: e.target.value,
                })
              }
            />
          </Field>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!currentEntry.job_title && !currentEntry.company_name}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm self-start"
        >
          Add Employment
        </button>
      </FieldGroup>
    </div>
  );
}
