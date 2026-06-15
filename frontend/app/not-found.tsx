"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText, CheckCircle2, BarChart, PhoneCallIcon } from "lucide-react";
import BookConsultationButton from "@/components/BookConsultationButton";

export default function NotFound() {
  return (
    <div className="min-h-[85vh] bg-background text-foreground flex items-center justify-center p-4 sm:p-6 md:p-8 animate-fade-in">
      <div className="w-full max-w-2xl text-center space-y-8">
        {/* Subtle Financial Icon & 404 Header combo */}
        <div className="space-y-2">
          <div className="inline-flex p-3 bg-muted text-muted-foreground rounded-full mb-2 animate-pulse [animation-duration:3s]">
            <FileText className="w-6 h-6" />
          </div>
          <h1 className="text-7xl sm:text-8xl font-extrabold tracking-tight bg-gradient-to-b from-foreground via-foreground/80 to-muted-foreground bg-clip-text text-transparent">
            404
          </h1>
        </div>

        {/* Content Section */}
        <div className="space-y-3">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            This asset is off-balance sheet{" "}
            <span className="inline-block animate-bounce [animation-duration:2s]">
              <BarChart />
            </span>
          </h2>
          <p className="text-muted-foreground text-base sm:text-lg max-w-md mx-auto leading-relaxed">
            The page you are looking for doesn&apos;t exist or has been
            relocated. Let&apos;s get your digital audit back on track.
          </p>
        </div>

        {/* Financial Services Overview Card */}
        <div className="border border-border bg-card rounded-xl p-5 text-left max-w-md mx-auto space-y-3 shadow-sm">
          <p className="text-sm font-semibold text-foreground">
            Navigate back to our financial expertise:
          </p>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex items-center gap-2">
              <span className="text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </span>{" "}
              Corporate Audit & Assurance
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </span>{" "}
              Strategic Tax Planning & Compliance
            </li>
            <li className="flex items-center gap-2">
              <span className="text-primary">
                <CheckCircle2 className="w-4 h-4" />
              </span>{" "}
              Business Advisory & Insights
            </li>
          </ul>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto pt-2">
          {/* Actions CTA Section */}
          <div className="flex items-center gap-5">
            {/* Phone Icon with an interactive hover effect */}
            <a
              href="tel:+1234567890"
              className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
              title="Call Us"
            >
              <PhoneCallIcon className="w-5 h-5" />
            </a>

            {/* Premium Gradient Consultation Button */}
            <BookConsultationButton />
          </div>

          <Link href="/" className="w-full sm:flex-1">
            <Button
              variant="outline"
              size="lg"
              className="w-full border-input bg-background text-foreground transition-all hover:bg-accent hover:text-accent-foreground"
            >
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
