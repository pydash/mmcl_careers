import { userData } from "@/app/sample-data";
import { Separator } from "@/components/ui/separator";
import {
  Item,
  ItemTitle,
  ItemDescription,
  ItemMedia,
} from "@/components/ui/item";
import { School, GraduationCap, Book, Calendar, Award } from "lucide-react";

const graduateDetails = {
  institution: userData.educational.graduateStudies.institution,
  degree: userData.educational.graduateStudies.degree,
  major: userData.educational.graduateStudies.major,
  yearCompleted: userData.educational.graduateStudies.yearGraduated,
  awards: userData.educational.graduateStudies.achievements,
};

const undergradDetails = {
  institution: userData.educational.undergraduateStudies.institution,
  degree: userData.educational.undergraduateStudies.degree,
  major: userData.educational.undergraduateStudies.major,
  yearCompleted: userData.educational.undergraduateStudies.yearGraduated,
  awards: userData.educational.undergraduateStudies.achievements,
};

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <Item className="border p-4" variant="outline">
      <ItemMedia className="border-0">
        <div className="p-3 rounded-md border flex items-center justify-center">
          {label === "Institution" && <School className="size-5" />}
          {label === "Degree" && <GraduationCap className="size-5" />}
          {label === "Major" && <Book className="size-5" />}
          {label === "Year Completed" && <Calendar className="size-5" />}
          {label === "Awards" && <Award className="size-5" />}
        </div>
      </ItemMedia>

      <div className="flex flex-col">
        <ItemTitle>{value}</ItemTitle>
        <ItemDescription>{label}</ItemDescription>
      </div>
    </Item>
  );
}
export default function EducationalTab() {
  return (
    <>
      <div className="about-info mb-6">
        <div className="font-semibold">Graduate Studies</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          <InfoItem label="Institution" value={graduateDetails.institution} />
          <InfoItem label="Degree" value={graduateDetails.degree} />
          <InfoItem label="Major" value={graduateDetails.major} />
          <InfoItem
            label="Year Completed"
            value={graduateDetails.yearCompleted}
          />
          <InfoItem label="Awards" value={graduateDetails.awards} />
        </div>
      </div>
      <div className="about-info mb-6">
        <div className="font-semibold">Undergraduate Studies</div>
        <Separator className="my-4" />
        <div className="grid grid-cols-4 gap-6 mb-6">
          <InfoItem label="Institution" value={undergradDetails.institution} />
          <InfoItem label="Degree" value={undergradDetails.degree} />
          <InfoItem label="Major" value={undergradDetails.major} />
          <InfoItem
            label="Year Completed"
            value={undergradDetails.yearCompleted}
          />
          <InfoItem label="Awards" value={undergradDetails.awards} />
        </div>
      </div>
    </>
  );
}
