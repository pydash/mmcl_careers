"use client";
import { useEffect, useState } from "react";
import { PitchCardProps } from "@/models/Pitch";

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
    <div className="border rounded-lg p-6 bg-white">
      <div className="mb-4 pb-3 border-b">
        <h3 className="text-base font-semibold text-gray-900">
          Application Question
        </h3>
        <p className="text-sm text-gray-600 mt-1">
          Tell us why you're the right fit for this position
        </p>
      </div>
      <div className="space-y-3">
        <label
          htmlFor="pitch"
          className="text-xs font-medium text-gray-500 uppercase tracking-wide block"
        >
          Why should we hire you?
        </label>
        <textarea
          id="pitch"
          className="w-full text-sm p-4 border border-gray-300 rounded-lg resize-y min-h-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          placeholder="Share your qualifications, experiences, and what makes you an ideal candidate for this position..."
          value={pitchValue}
          onChange={(e) => handleChange(e.target.value)}
        />
        <p className="text-xs text-gray-500">
          Provide a thoughtful response that highlights your relevant skills and
          experience.
        </p>
      </div>
    </div>
  );
}
