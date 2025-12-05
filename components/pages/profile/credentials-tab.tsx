import { Separator } from "@/components/ui/separator";
import { userData } from "@/app/sample-data";
import {
  Item,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { IdCard, Landmark, Hash, Calendar } from "lucide-react";
import React from "react";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Item className="border p-4" variant="outline">
      <ItemMedia className="border-0">
        <div className="p-3 rounded-md border flex items-center justify-center">
          {label === "Name" && <IdCard className="size-5" />}
          {label === "Issuing Organization" && <Landmark className="size-5" />}
          {(label === "License Number" || label === "Certificate Number") && (
            <Hash className="size-5" />
          )}
          {label === "Issue Date" && <Calendar className="size-5" />}
        </div>
      </ItemMedia>

      <div className="flex flex-col">
        <ItemTitle>{value}</ItemTitle>
        <ItemDescription>{label}</ItemDescription>
      </div>
    </Item>
  );
}

export default function CredentialsTab() {
  return (
    <>
      <div className="about-info mb-6">
        <div className="font-semibold">License</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          {userData.credentials.licenses.map((license, index) => (
            <React.Fragment key={license.licenseNumber || index}>
              <InfoItem label="Name" value={license.name} />
              <InfoItem
                label="Issuing Organization"
                value={license.issuingOrganization}
              />
              <InfoItem label="License Number" value={license.licenseNumber} />
              <InfoItem label="Issue Date" value={license.issueDate} />
            </React.Fragment>
          ))}
        </div>
        <div className="font-semibold">Certification</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          {userData.credentials.certifications.map((certification) => (
            <React.Fragment key={certification.certificateNumber}>
              <InfoItem label="Name" value={certification.name} />
              <InfoItem
                label="Issuing Organization"
                value={certification.issuingOrganization}
              />
              <InfoItem
                label="Certificate Number"
                value={certification.certificateNumber}
              />
              <InfoItem label="Issue Date" value={certification.issueDate} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </>
  );
}
