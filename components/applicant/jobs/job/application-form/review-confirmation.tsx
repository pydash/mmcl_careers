import { Checkbox } from "@/components/ui/checkbox";

type ReviewConfirmationProps = {
  confirmed: boolean;
  onConfirmedChange?: (value: boolean) => void;
};

export default function ReviewConfirmation({
  confirmed,
  onConfirmedChange,
}: ReviewConfirmationProps) {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-6 rounded-xl bg-slate-50 border border-slate-200 shadow-sm">
      <div className="space-y-1">
        <h2 className="font-bold text-sm md:text-base text-slate-900">
          Please review your details carefully before submitting.
        </h2>
        <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">
          Once submitted, your application will be forwarded to our recruitment
          team for evaluation.
        </p>
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <Checkbox
          id="confirm"
          className="mt-1 border-slate-300 data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
          checked={confirmed}
          onCheckedChange={(checked) => onConfirmedChange?.(checked === true)}
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