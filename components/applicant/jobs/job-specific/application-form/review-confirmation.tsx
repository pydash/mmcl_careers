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
    <div className="flex flex-col gap-2">
      <h2 className="font-semibold text-sm">
        Please review your details carefully before submitting.
      </h2>
      <p className="text-sm text-muted-foreground">
        Once submitted, your application will be forwarded to our recruitment
        team for evaluation.
      </p>
      <div className="flex items-center">
        <Checkbox
          id="confirm"
          className="mr-2"
          checked={confirmed}
          onCheckedChange={(checked) => onConfirmedChange?.(checked === true)}
        />
        <label htmlFor="confirm" className="text-sm text-muted-foreground">
          I confirm that all information provided is accurate and complete to
          the best of my knowledge.
        </label>
      </div>
    </div>
  );
}
