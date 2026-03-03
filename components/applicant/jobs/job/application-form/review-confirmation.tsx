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
    <div className="border rounded-lg p-6 bg-blue-50 border-blue-200">
      <div className="space-y-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">
            Review Your Application
          </h3>
          <p className="text-sm text-gray-600">
            Please review your details carefully before submitting. Once
            submitted, your application will be forwarded to our recruitment
            team for evaluation.
          </p>
        </div>
        <div className="flex items-start gap-3 p-4 bg-white rounded-lg border border-blue-200">
          <Checkbox
            id="confirm"
            className="mt-0.5"
            checked={confirmed}
            onCheckedChange={(checked) => onConfirmedChange?.(checked === true)}
          />
          <label
            htmlFor="confirm"
            className="text-sm text-gray-700 leading-relaxed cursor-pointer"
          >
            I confirm that all information provided is accurate and complete to
            the best of my knowledge.
          </label>
        </div>
      </div>
    </div>
  );
}
