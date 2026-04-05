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
          className="flex flex-col gap-2 border rounded-lg p-4 mb-4 w-full bg-white shadow-sm"
        >
  
          <h3 className="text-sm md:text-base font-semibold text-slate-900 break-words">
            {exp.position}
          </h3>

        
          <p className="text-sm text-gray-600 break-words">
            {exp.company} <span className="text-gray-300 mx-1 hidden sm:inline">|</span> 
            <span className="block sm:inline">{exp.department}</span>
          </p>

       
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {getDateFromShortDate(exp.date_started)} — {getDateFromShortDate(exp.date_ended)}
          </p>
        </div>
      ))}
    </div>
  );
}