import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BookConsultationButtonProps extends React.ComponentPropsWithoutRef<
  typeof Button
> {
  href?: string;
  label?: string;
}

export default function BookConsultationButton({
  href = process.env.NEXT_PUBLIC_CALENDLY_URL ||
    "https://calendly.com/roshanpokharel-dev/let-s-talk",
  label = "Book Consultation",
  className,
  ...props
}: BookConsultationButtonProps) {
  return (
    <Button
      asChild
      className={cn(
        "rounded-sm bg-primary text-primary-foreground font-semibold px-4 py-3 shadow-sm text-[14px] transition-colors hover:bg-primary/90",
        className,
      )}
      {...props}
    >
      <a href={href} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  );
}
