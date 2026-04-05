"use client";
import { useEffect, useState } from "react";

import { Separator } from "@/components/ui/separator";

type PitchCardProps = {
  pitch?: string;
  onPitchChange?: (value: string) => void;
};

export default function PitchCard({
  pitch = "",
  onPitchChange,
}: PitchCardProps) {
  const [pitchValue, setPitchValue] = useState(pitch);

  useEffect(() => {
    setPitchValue(pitch);
  }, [pitch]);

  const handleChange = (value: string) => {
    setPitchValue(value);
    onPitchChange?.(value);
  };
  return (
    <div className="flex flex-col p-4 md:p-6 bg-gray-50 rounded-xl border border-slate-200 shadow-sm">
      <h1 className="font-bold text-lg text-slate-900">Answer question</h1>
      <Separator className="my-3" />
      <label htmlFor="pitch" className="mt-4 mb-3 text-sm font-semibold text-slate-700">
        Why should we hire you?
      </label>
      <p className="mb-6 text-xs text-slate-500 leading-relaxed">
        Briefly explain what makes you the right fit for this position and the organization.
      </p>
      <textarea
        id="pitch"
        className="w-full p-3 text-sm border border-slate-300 rounded-lg resize-y min-h-[120px] bg-white focus:outline-none focus:ring-2 focus:ring-red-600/10 focus:border-red-600 transition-all placeholder:text-slate-400"
        placeholder="Write your pitch here..."
        value={pitchValue}
        onChange={(e) => handleChange(e.target.value)}
      ></textarea>
      <div className="mt-2 flex justify-end">
        <p className="text-[10px] text-slate-400 font-medium">
          Character count: {pitchValue.length}
        </p>
      </div>
    </div>
  );
}