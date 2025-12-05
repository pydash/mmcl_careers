import * as React from "react";
import { cn } from "@/lib/utils";

const gridCardVariants = {
  default: "bg-card border rounded-xl shadow-sm",
  outline: "bg-card border border-border rounded-xl",
  elevated: "bg-card border rounded-xl shadow-md",
};

const gridCardActionVariants = {
  default:
    "px-4 py-2 rounded-md text-sm bg-primary text-primary-foreground hover:bg-primary/90",
  subtle:
    "px-4 py-2 rounded bg-secondary text-secondary-foreground hover:bg-secondary/10",
  outline:
    "px-4 py-2 rounded border border-primary text-primary hover:bg-primary/5",
};

type GridCardVariant = keyof typeof gridCardVariants;
type GridCardActionVariant = keyof typeof gridCardActionVariants;

export function GridCard({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { variant?: GridCardVariant }) {
  return (
    <div
      className={cn(
        gridCardVariants[variant],
        "overflow-hidden", // needed for media with rounded corners
        className
      )}
      {...props}
    />
  );
}

export function GridCardHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("p-4 pb-2", className)} {...props} />;
}

export function GridCardTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      className={cn(
        "text-lg font-semibold leading-none tracking-tight",
        className
      )}
      {...props}
    />
  );
}

export function GridCardDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props} />
  );
}

export function GridCardContent({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("px-4 pb-2", className)} {...props} />;
}

export function GridCardFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("px-4 pb-4 flex items-center", className)} {...props} />
  );
}

export function GridCardMedia({
  src,
  alt,
  className,
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("w-full h-40 overflow-hidden", className)}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        children // fallback for custom media
      )}
    </div>
  );
}

export function GridCardAction({
  className,
  variant = "default",
  ...props
}: React.HTMLAttributes<HTMLButtonElement> & {
  variant?: GridCardActionVariant;
}) {
  return (
    <button
      className={cn(gridCardActionVariants[variant], className)}
      {...props}
    />
  );
}
