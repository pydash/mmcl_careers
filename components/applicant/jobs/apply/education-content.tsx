import { EducationInfo } from "@/models/user";

export default function EducationContent({
  education,
}: {
  education: EducationInfo[];
}) {
  return (
    <div className="flex flex-col">
      {education.map((edu, index) => (
        <div key={index} className="border rounded-lg p-4 mb-4 w-full bg-white">
          <h3 className="text-md font-semibold">
            {edu.level} in {edu.degree}
          </h3>
          <p className="text-sm text-gray-600">{edu.institution}</p>
          <p className="text-sm text-gray-600">{edu.year_graduate}</p>
        </div>
      ))}
    </div>
  );
}
