"use client";

import { Info, X } from "lucide-react";
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
import { Tooltip } from "@radix-ui/react-tooltip";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type LicenseCertificationFormData = {
  title: string;
  issuing_organization: string;
  number: string;
  date_issued: string;
  expiry_date: string;
};

interface LicenseCertificationFormProps {
  licenseCertificationData: LicenseCertificationFormData[];
  onAddLicenseCertification: (data: LicenseCertificationFormData) => void;
  onDeleteLicenseCertification: (index: number) => void;
}

export default function LicenseCertificationForm({
  licenseCertificationData,
  onAddLicenseCertification,
  onDeleteLicenseCertification,
}: LicenseCertificationFormProps) {
  const [currentEntry, setCurrentEntry] =
    useState<LicenseCertificationFormData>({
      title: "",
      issuing_organization: "",
      number: "",
      date_issued: "",
      expiry_date: "",
    });

  const handleAdd = () => {
    // Validate that at least some fields are filled
    if (currentEntry.title) {
      onAddLicenseCertification({
        ...currentEntry,
      });

      // Reset form
      setCurrentEntry({
        title: "",
        issuing_organization: "",
        number: "",
        date_issued: "",
        expiry_date: "",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Display saved license/certification records */}
      {licenseCertificationData.map((entry, index) => (
        <div key={index} className="p-4 border bg-gray-50/50 hover:bg-gray-50">
          <div className="grid grid-cols-3 gap-4 mb-2">
            <div>
              <p className="text-xs text-muted-foreground">Title</p>
              <p className="font-medium">{entry.title}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                Issuing Organization
              </p>
              <p className="font-medium">{entry.issuing_organization}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Number</p>
              <p className="font-medium">{entry.number || "-"}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-muted-foreground">Date Issued</p>
              <p className="font-medium">{entry.date_issued || "-"}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Expiry Date</p>
              <p className="font-medium">{entry.expiry_date || "-"}</p>
            </div>
          </div>
          <Separator className="my-2" />
          <button
            type="button"
            onClick={() => onDeleteLicenseCertification(index)}
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
            <FieldLabel htmlFor="title">
              Title
              <span className="text-red-500">*</span>
            </FieldLabel>
            <Input
              placeholder=""
              id="title"
              value={currentEntry.title}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  title: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="issuing_organization">
              Issuing Organization
            </FieldLabel>
            <Input
              placeholder=""
              id="issuing_organization"
              value={currentEntry.issuing_organization}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  issuing_organization: e.target.value,
                })
              }
            />
          </Field>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Field>
            <FieldLabel htmlFor="number">
              License/Certification Number
            </FieldLabel>
            <Input
              placeholder=""
              id="number"
              value={currentEntry.number}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  number: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel className="mr-2" htmlFor="date_issued">
              Date Issued
            </FieldLabel>
            <input
              type="month"
              id="date_issued"
              placeholder="yyyy-mm"
              className="border border-input shadow-sm rounded-md p-2 text-sm focus-visible:border-black focus-visible:outline-none w-full"
              value={currentEntry.date_issued}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  date_issued: e.target.value,
                })
              }
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="expiry_date">Expiry Date</FieldLabel>
            <input
              type="month"
              id="expiry_date"
              placeholder="yyyy-mm"
              className="border border-input shadow-sm rounded-md p-2 text-sm focus-visible:border-black focus-visible:outline-none w-full"
              value={currentEntry.expiry_date}
              onChange={(e) =>
                setCurrentEntry({
                  ...currentEntry,
                  expiry_date: e.target.value,
                })
              }
            />
          </Field>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={!currentEntry.title}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-2 rounded-md text-sm self-start"
        >
          Add License/Certification
        </button>
      </FieldGroup>
    </div>
  );
}
