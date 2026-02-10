"use client";

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { PersonalFormData } from "@/models/applicant/ProfileForms";

interface PersonalFormProps {
  personalData: PersonalFormData;
  onPersonalDataChange: (data: PersonalFormData) => void;
}

export default function PersonalForm({
  personalData,
  onPersonalDataChange,
}: PersonalFormProps) {
  return (
    <FieldGroup className="gap-4 mb-8">
      <div className="grid grid-cols-[100px_1fr_1fr_1fr] gap-4">
        <Field>
          <FieldLabel htmlFor="honorific">Honorific</FieldLabel>
          <Select
            value={personalData.honorific}
            onValueChange={(value) =>
              onPersonalDataChange({ ...personalData, honorific: value })
            }
          >
            <SelectTrigger id="honorific" className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Mr.">Mr.</SelectItem>
              <SelectItem value="Ms.">Ms.</SelectItem>
              <SelectItem value="Mrs.">Mrs.</SelectItem>
              <SelectItem value="Dr.">Dr.</SelectItem>
              <SelectItem value="Prof.">Prof.</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="first-name">
            First Name <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            placeholder=""
            id="first-name"
            value={personalData.first_name}
            onChange={(e) =>
              onPersonalDataChange({
                ...personalData,
                first_name: e.target.value,
              })
            }
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="middle-name">Middle Name</FieldLabel>
          <Input
            placeholder=""
            id="middle-name"
            value={personalData.middle_name}
            onChange={(e) =>
              onPersonalDataChange({
                ...personalData,
                middle_name: e.target.value,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="last-name">
            Last Name <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            placeholder=""
            id="last-name"
            value={personalData.last_name}
            onChange={(e) =>
              onPersonalDataChange({
                ...personalData,
                last_name: e.target.value,
              })
            }
            required
          />
        </Field>
      </div>
      <div className="grid grid-cols-[100px_1fr_1fr] gap-4">
        <Field>
          <FieldLabel htmlFor="sex">Sex</FieldLabel>
          <Select
            value={personalData.sex}
            onValueChange={(value) =>
              onPersonalDataChange({ ...personalData, sex: value })
            }
          >
            <SelectTrigger id="sex" className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
            </SelectContent>
          </Select>
        </Field>
        <Field>
          <FieldLabel htmlFor="phone">
            Phone <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            placeholder=""
            id="phone"
            value={personalData.phone}
            onChange={(e) =>
              onPersonalDataChange({ ...personalData, phone: e.target.value })
            }
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="birthdate">Birthdate</FieldLabel>
          <input
            type="date"
            id="birthdate"
            className="border border-input shadow-sm rounded-md p-2 text-sm focus-visible:border-black focus-visible:outline-none"
            value={personalData.birthdate || ""}
            onChange={(e) =>
              onPersonalDataChange({
                ...personalData,
                birthdate: e.target.value,
              })
            }
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="email">
            Email <span className="text-red-500">*</span>
          </FieldLabel>
          <Input
            placeholder=""
            id="email"
            value={personalData.email}
            onChange={(e) =>
              onPersonalDataChange({ ...personalData, email: e.target.value })
            }
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="address">Current Address</FieldLabel>
          <Input
            placeholder=""
            id="address"
            value={personalData.address}
            onChange={(e) =>
              onPersonalDataChange({ ...personalData, address: e.target.value })
            }
          />
        </Field>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel htmlFor="citizenship">Citizenship</FieldLabel>
          <Input
            placeholder=""
            id="citizenship"
            value={personalData.citizenship}
            onChange={(e) =>
              onPersonalDataChange({
                ...personalData,
                citizenship: e.target.value,
              })
            }
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="civil-status">Civil Status</FieldLabel>
          <Select
            value={personalData.civil_status}
            onValueChange={(value) =>
              onPersonalDataChange({ ...personalData, civil_status: value })
            }
          >
            <SelectTrigger id="civil-status" className="w-full">
              <SelectValue placeholder="" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single</SelectItem>
              <SelectItem value="married">Married</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </div>
      <Field>
        <FieldLabel htmlFor="about">About me</FieldLabel>
        <Textarea
          id="about"
          placeholder=""
          className="h-24 resize-none"
          value={personalData.about}
          onChange={(e) =>
            onPersonalDataChange({ ...personalData, about: e.target.value })
          }
        />
      </Field>
    </FieldGroup>
  );
}
