import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import {
  Building2,
  Factory,
  BriefcaseBusiness,
  Calendar,
  HandCoins,
} from "lucide-react";
import { userData } from "@/app/sample-data";
import React from "react";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Item className="border p-4" variant="outline">
      <ItemMedia className="border-0">
        <div className="p-3 rounded-md border flex items-center justify-center">
          {label === "Company" && <Building2 className="size-5" />}
          {label === "Industry" && <Factory className="size-5" />}
          {label === "Position" && <BriefcaseBusiness className="size-5" />}
          {label === "Employment Period" && <Calendar className="size-5" />}
          {label === "Salary" && <HandCoins className="size-5" />}
        </div>
      </ItemMedia>

      <div className="flex flex-col">
        <ItemTitle>{value}</ItemTitle>
        <ItemDescription>{label}</ItemDescription>
      </div>
    </Item>
  );
}

export default function EmploymentTab() {
  return (
    <>
      <div className="about-info mb-6">
        <div className="font-semibold">Employment</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-5 gap-6 mb-6">
          {userData.employment.map((employment) => (
            <React.Fragment key={employment.company}>
              <InfoItem label="Company" value={employment.company} />
              <InfoItem label="Industry" value={employment.industry} />
              <InfoItem label="Position" value={employment.position} />
              <InfoItem
                label="Employment Period"
                value={employment.employmentPeriod}
              />
              <InfoItem label="Salary" value={employment.salary} />
              <Separator className="my-4 col-span-5" />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
