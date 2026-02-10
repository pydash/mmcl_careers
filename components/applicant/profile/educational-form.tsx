"use client";

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
import { Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";

type EducationalFormData = {
  degree: string;
  institution: string;
  course: string;
  status: string;
  units_earned: number | null;
  year_finished: string;
  honors: Array<string>;
};

interface EducationalFormProps {
  educationalData: EducationalFormData[];
  onAddEducation: (data: EducationalFormData) => void;
  onDeleteEducation: (index: number) => void;
}

export default function EducationalForm({
  educationalData,
  onAddEducation,
  onDeleteEducation,
}: EducationalFormProps) {
  const [currentEntry, setCurrentEntry] = useState<EducationalFormData>({
    degree: "",
    institution: "",
    course: "",
    status: "",
    units_earned: null,
    year_finished: "",
    honors: [],
  });

  const [honorsInput, setHonorsInput] = useState("");

  const handleAdd = () => {
    // Validate that all required fields are filled
    if (
      currentEntry.degree &&
      currentEntry.course &&
      currentEntry.institution &&
      currentEntry.status
    ) {
      onAddEducation({
        ...currentEntry,
        honors: honorsInput
          .split(",")
          .map((honor) => honor.trim())
          .filter((h) => h),
      });
      // Reset form
      setCurrentEntry({
        degree: "",
        institution: "",
        course: "",
        status: "",
        units_earned: null,
        year_finished: "",
        honors: [],
      });
      setHonorsInput("");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Display saved educational records */}
      {educationalData.map((entry, index) => (
        <div key={index} className="p-4 border bg-gray-50/50 hover:bg-gray-50">
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Degree</p>
              <p className="font-medium">{titleCase(entry.degree)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Course</p>
              <p className="font-medium">{titleCase(entry.course)}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Institution</p>
              <p className="font-medium">{titleCase(entry.institution)}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Status</p>
              <p className="font-medium">{entry.status}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Year Finished</p>
              <p className="font-medium">{entry.year_finished ?? "--"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Units Earned</p>
              <p className="font-medium">{entry.units_earned ?? "--"}</p>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-xs text-muted-foreground">Honors / Awards</p>
            <p className="font-medium">
              {entry.honors.length > 0 ? entry.honors.join(", ") : "--"}
            </p>
          </div>
          <Separator className="my-2" />
          <button
            type="button"
            onClick={() => onDeleteEducation(index)}
            className="text-red-600 hover:text-red-800 text-sm"
          >
            Delete
          </button>
        </div>
      ))}

      {/* Input form for new entry */}
      <FieldGroup>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="degree">
              Degree <span className="text-red-500">*</span>
            </FieldLabel>
            <Select
              value={currentEntry.degree}
              onValueChange={(value) =>
                setCurrentEntry({ ...currentEntry, degree: value })
              }
            >
              <SelectTrigger id="degree" className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Associate">Associate</SelectItem>
                <SelectItem value="Bachelors">Bachelor's</SelectItem>
                <SelectItem value="Masters">Master's</SelectItem>
                <SelectItem value="Doctoral">Doctoral</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="course">
              Course <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              placeholder=""
              id="course"
              value={currentEntry.course}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  course: titleCase(e.target.value),
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="institution">
              Institution <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              placeholder=""
              id="institution"
              value={currentEntry.institution}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  institution: titleCase(e.target.value),
                })
              }
            />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="status">
              Status <span className="text-red-500">*</span>
            </FieldLabel>
            <Select
              value={currentEntry.status}
              onValueChange={(value) =>
                setCurrentEntry({ ...currentEntry, status: value })
              }
            >
              <SelectTrigger id="status" className="w-full">
                <SelectValue placeholder="" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="On-Going">On-Going</SelectItem>
                <SelectItem value="Dropped">Dropped</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field>
            <FieldLabel htmlFor="year_finished">Year Finished</FieldLabel>
            <Input
              type="month"
              placeholder="yyyy-mm"
              id="year_finished"
              value={currentEntry.year_finished}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  year_finished: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="units_earned">Units Earned</FieldLabel>
            <Input
              type="number"
              placeholder=""
              id="units_earned"
              value={currentEntry.units_earned ?? ""}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  units_earned: e.target.value
                    ? parseInt(e.target.value)
                    : null,
                })
              }
            />
          </Field>
        </div>
        <Field>
          <div className="flex">
            <FieldLabel className="mr-2" htmlFor="honors">
              Honors / Awards
            </FieldLabel>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="w-4 h-4" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Separate by commas if multiple</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <Input
            placeholder=""
            id="honors"
            value={honorsInput}
            onChange={(e) => setHonorsInput(titleCase(e.target.value))}
          />
        </Field>
        <button
          type="button"
          onClick={handleAdd}
          disabled={
            !currentEntry.degree ||
            !currentEntry.course ||
            !currentEntry.institution ||
            !currentEntry.status
          }
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm self-start"
        >
          Add Education
        </button>
      </FieldGroup>
    </div>
  );
}
