import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";
import { Info } from "lucide-react";
import { userData } from "@/app/sample-data";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Item className="border p-4" variant="outline">
      <ItemMedia className="border-0">
        <div className="p-3 rounded-md border flex items-center justify-center">
          <Info className="size-5" />
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
        <div className="font-semibold">Hard Skills</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          {userData.skills.technicalSkills.map((skill, index) => (
            <InfoItem key={index} label="Technical Skill" value={skill} />
          ))}
        </div>
        <div className="font-semibold">Soft Skills</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6">
          {userData.skills.softSkills.map((skill, index) => (
            <InfoItem key={index} label="Soft Skill" value={skill} />
          ))}
        </div>
      </div>
    </>
  );
}
