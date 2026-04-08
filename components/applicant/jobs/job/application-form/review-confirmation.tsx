// UI components
import { Checkbox } from "@/components/ui/checkbox";

// Props contract for confirmation checkbox state
type ReviewConfirmationProps = {
  confirmed: boolean;
  onConfirmedChange?: (value: boolean) => void;
};

export default function ReviewConfirmation({
  confirmed,
  onConfirmedChange,
}: ReviewConfirmationProps) {
  // Normalize checkbox payload to strict boolean for parent callback
  const handleConfirmationChange = (checked: boolean | "indeterminate") => {
    onConfirmedChange?.(checked === true);
  };

  return (
    // Main confirmation card
    <div className="flex flex-col gap-4 p-4 md:p-6 bg-slate-50 border border-slate-200">
      {/* Instructional copy */}
      <div className="space-y-1">
        <h2 className="font-bold text-sm md:text-base text-slate-900">
          Please review your details carefully before submitting.
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          Once submitted, your application will be forwarded to our recruitment
          team for evaluation.
        </p>
      </div>

      {/* Confirmation control */}
      <div className="flex items-center gap-4">
        <Checkbox
          id="confirm"
          className="border-slate-300 data-[state=checked]:bg-blue-600 rounded-none p-2"
          checked={confirmed}
          onCheckedChange={handleConfirmationChange}
        />
        <label
          htmlFor="confirm"
          className="text-sm font-medium text-slate-700 leading-tight cursor-pointer select-none"
        >
          I confirm that all information provided is accurate and complete to
          the best of my knowledge.
        </label>
      </div>
    </div>
  );
}
