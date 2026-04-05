import { ExperienceInfo } from "@/models/user";
import { getDateFromShortDate } from "@/lib/datetime.helpers";

export default function ExperienceContent({
  experience,
}: {
  experience: ExperienceInfo[];
}) {
  return (
    <div className="flex flex-col">
      {experience.map((exp, index) => (
        <div
          key={index}
          className="flex flex-col gap-2 border rounded-lg p-4 mb-4 w-full bg-white"
        >
          <h3 className="text-md font-semibold">{exp.position}</h3>
          <p className="text-sm text-gray-600">
            {exp.company} | {exp.department}
          </p>
          <p className="text-sm text-gray-600">
            {getDateFromShortDate(exp.date_started)} -{" "}
            {getDateFromShortDate(exp.date_ended)}
          </p>
        </div>
      ))}
    </div>
  );
}
