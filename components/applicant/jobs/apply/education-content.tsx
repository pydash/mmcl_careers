import { EducationInfo } from "@/models/user";

export default function EducationContent({
  education,
}: {
  education: EducationInfo[];
}) {
  return (
    <div className="flex flex-col">
      {education.map((edu, index) => (
        <div 
          key={index} 
          className="border rounded-lg p-4 mb-4 w-full bg-white shadow-sm"
        >

          <h3 className="text-sm md:text-base font-semibold text-slate-900 break-words">
            {edu.level} in {edu.degree}
          </h3>
          
        
          <p className="text-sm text-gray-600 mt-1">
            {edu.institution}
          </p>
          <p className="text-xs md:text-sm text-gray-500 mt-1">
            Class of {edu.year_graduate}
          </p>
        </div>
      ))}
    </div>
  );
}