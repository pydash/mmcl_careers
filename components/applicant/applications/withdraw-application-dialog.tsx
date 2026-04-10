"use client";

import { Button } from "@/components/ui/button";
import {
  DialogClose,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface WithdrawApplicationDialogProps {
  onConfirm: () => Promise<void>;
  isSubmitting?: boolean;
}

export default function WithdrawApplicationDialog({
  onConfirm,
  isSubmitting = false,
}: WithdrawApplicationDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="destructive"
          className="rounded-none shadow-none bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
        >
          <span className="flex items-center gap-2">Cancel Application</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Withdraw Application</DialogTitle>
          <DialogDescription>
            Are you sure you want to withdraw your application?
          </DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="rounded-none shadow-none">
              Keep Application
            </Button>
          </DialogClose>
          <Button
            type="button"
            variant="destructive"
            className="rounded-none shadow-none"
            onClick={onConfirm}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Withdrawing..." : "Yes, Withdraw"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
