import * as React from "react";
import { cn } from "@/lib/utils";

const rowCardVariants = {
  default: "bg-card border rounded-xl shadow-sm",
  outline: "bg-card border border-border rounded-xl",
  elevated: "bg-card border rounded-xl shadow-md",
};

const rowCardActionVariants = {
  default:
    "px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90",
  subtle:
    "px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/10",
  outline:
    "px-4 py-2 border border-primary text-primary rounded-md text-sm hover:bg-primary/5",
};

type RowCardVariant = keyof typeof rowCardVariants;
type RowCardActionVariant = keyof typeof rowCardActionVariants;

export function RowCard({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLElement> & { variant?: RowCardVariant }) {
  return (
    <div
      className={cn(
        rowCardVariants[variant],
        "overflow-hidden", // needed for media with rounded corners
        className
      )}
      {...props}
    />
  );
}

export function RowCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("p-4 pb-2 inline-flex w-full justify-between", className)}
      {...props}
    />
  );
}

export function RowCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("text-lg font-semibold", className)} {...props} />;
}

export function RowCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

export function RowCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pt-2", className)} {...props} />;
}

export function RowCardAction({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  variant?: RowCardActionVariant;
}) {
  return (
    <button
      className={cn(rowCardActionVariants[variant], className)}
      {...props}
    />
  );
}
