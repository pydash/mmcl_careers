import { useState } from "react";
import IntextEmpty from "@/components/intext-empty";
import {
  Item,
  ItemContent,
  ItemTitle,
  ItemDescription,
  ItemFooter,
} from "@/components/ui/item";
import Interview from "@/models/Interview";
import { getDateTime } from "@/utils/formatDate";
import { useInterviews } from "@/hooks/applicant/dashboard/useInterviews";
import { CalendarDays, Video, MapPin } from "lucide-react";

export default function InterviewCard() {
  const { interviews, loading, error } = useInterviews();

  if (loading) {
    return (
      <div className="p-4 flex items-center justify-center min-h-[150px]">
        <p className="text-sm font-medium text-slate-500 animate-pulse">
          Loading upcoming interviews...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 border border-red-100 rounded-xl">
        <p className="text-sm text-red-600 font-medium">
          Error loading interviews: {error}
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 rounded-xl bg-gray-50 self-start w-full transition-all">
      <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <CalendarDays className="h-5 w-5 text-red-600" />
        Upcoming Interviews
      </h2>

      {interviews.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-8 text-center bg-white rounded-xl border border-dashed border-slate-300">
          <IntextEmpty message="You have no upcoming interviews." />
        </div>
      ) : (
       
        <div className="space-y-3">
          {interviews.map((interview, index) => (
            <Item
              key={index}
              className="bg-white border border-slate-200 p-4 rounded-xl shadow-sm hover:shadow-md hover:border-red-200 transition-all group"
            >
              <ItemContent className="flex flex-col gap-1">
                <ItemTitle className="text-base font-bold text-slate-900 group-hover:text-red-700 transition-colors">
                  {interview.title}
                </ItemTitle>
                
        
                <ItemDescription className="flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700 whitespace-nowrap">
                    {getDateTime(interview.schedule)}
                  </span>
                  
                  <span className="hidden sm:inline text-slate-300" aria-hidden="true">|</span>
                  
                  <span className="flex items-center gap-1.5 capitalize py-1 px-2.5 bg-slate-100 rounded-lg text-[11px] font-bold text-slate-600 border border-slate-200">
                    {interview.mode.toLowerCase() === "online" || 
                     interview.mode.toLowerCase() === "virtual" ? (
                      <Video className="h-3.5 w-3.5 text-blue-600" />
                    ) : (
                      <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    )}
                    {interview.mode}
                  </span>
                </ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </div>
      )}
    </div>
  );
}