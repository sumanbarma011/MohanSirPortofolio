"use client";

import React from "react";
import Link from "next/link";
import {
  CheckCircle2,
  User,
  Mail,
  Phone,
  Briefcase,
  FileText,
  MessageSquare,
  ArrowLeft,
  PhoneCallIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useContactStore } from "../contact.store";

export const ContactSuccessDisplay: React.FC = () => {
  const { submittedData } = useContactStore();

  // Fallback UI if someone navigates directly to this route without submitting data
  if (!submittedData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] p-6 text-center max-w-md mx-auto space-y-4">
        <p className="text-muted-foreground text-sm">
          No recent form submission details found in this session.
        </p>
        <Button asChild size="sm">
          <Link href="/#top">Go to Homepage</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl mx-auto space-y-6">
        {/* Success Splash Card */}
        <Card className="border-emerald-500/20 bg-emerald-500/5 text-center p-6 md:p-8 shadow-sm">
          <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 mb-4">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-foreground">
            Thank You for Contacting Us!
          </h1>
          <p className="text-muted-foreground text-sm max-w-md mx-auto mt-2 leading-relaxed">
            Hajur ko message hami le pai sakyeu. Our team of senior accountants
            will review your submission and connect with you shortly.
          </p>
        </Card>

        {/* Details Record Breakdown Card */}
        <Card className="border border-border bg-card shadow-sm">
          <CardHeader className="border-b pb-4">
            <CardTitle className="text-base font-semibold text-foreground">
              Submission Details Overview
            </CardTitle>
            <CardDescription className="text-xs">
              A copy of this record has been emailed to the contacted person
              with the following details.
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-6 space-y-5 text-sm">
            {/* Meta Attributes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-lg border border-border/60">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5" /> Full Name
                </span>
                <p className="font-semibold text-foreground">
                  {submittedData.name}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5" /> Email Address
                </span>
                <p className="text-foreground font-medium break-all">
                  {submittedData.email}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5" /> Contact Number
                </span>
                <p className="text-foreground font-medium">
                  {submittedData.phone || "Not provided"}
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5" /> Service Segment
                  {submittedData.service?.length > 1 ? "s" : ""}
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  {Array.isArray(submittedData.service)
                    ? submittedData.service
                        .map((srv) => String(srv.name))
                        .join(", ")
                    : String(submittedData.service || "").replace(/_/g, " ")}
                </p>
              </div>
            </div>

            {/* Subject and Message block */}
            <div className="space-y-3">
              <div className="space-y-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5" /> Email Subject
                </span>
                <p className="font-medium text-foreground border-b pb-2">
                  {submittedData.subject}
                </p>
              </div>

              <div className="space-y-1.5">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <MessageSquare className="w-3.5 h-3.5" /> Message Body
                </span>
                <div className="bg-muted/30 border p-4 rounded-md text-foreground whitespace-pre-wrap leading-relaxed max-h-[200px] overflow-y-auto text-[13.5px]">
                  {submittedData.message}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Navigation Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-2">
          <motion.a
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            href="tel:+9779867473181"
            className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
            title="Call Me"
          >
            <PhoneCallIcon className="w-5 h-5" /> Contact
          </motion.a>

          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full sm:w-auto"
          >
            <Link href="/#about">Know More About Me</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
