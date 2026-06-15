"use client";

import React from "react";
import { format } from "date-fns";
import {
  User,
  Mail,
  Phone,
  Briefcase,
  MessageSquare,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { ContactResponseType } from "../contact.types";

interface ContactDetailDialogProps {
  contact: ContactResponseType | null;
  isOpen: boolean;
  onClose: () => void;
}

export const ContactDetailDialog: React.FC<ContactDetailDialogProps> = ({
  contact,
  isOpen,
  onClose,
}) => {
  if (!contact) return null;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto bg-card text-card-foreground">
        <DialogHeader className="space-y-3 text-left border-b pb-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="outline"
              className="uppercase tracking-wider text-[10px] font-semibold px-2 py-0.5"
            >
              {contact.status}
            </Badge>
            {contact.isResponded ? (
              <Badge className="bg-emerald-500/10 text-emerald-600 hover:bg-emerald-500/10 border-emerald-500/20 gap-1 rounded-full text-xs">
                <CheckCircle2 className="w-3 h-3" /> Responded
              </Badge>
            ) : (
              <Badge
                variant="destructive"
                className="bg-amber-500/10 text-amber-600 hover:bg-amber-500/10 border-amber-500/20 gap-1 rounded-full text-xs"
              >
                <XCircle className="w-3 h-3" /> Pending
              </Badge>
            )}
          </div>
          <DialogTitle className="text-xl font-bold tracking-tight leading-tight">
            {contact.subject || "No Subject Given"}
          </DialogTitle>
          <DialogDescription className="flex items-center gap-1 text-xs">
            <Clock className="w-3 h-3 text-muted-foreground" />
            Received on {format(new Date(contact.createdAt), "PPP p")}
          </DialogDescription>
        </DialogHeader>

        {/* Full Details Grid Body */}
        <div className="space-y-5 pt-2 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-muted/40 p-4 rounded-lg border border-border/60">
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <User className="w-3 h-3" /> Client Name
              </Label>
              <p className="font-medium text-foreground">{contact.name}</p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Mail className="w-3 h-3" /> Email Address
              </Label>
              <p>
                <a
                  href={`mailto:${contact.email}`}
                  className="text-primary hover:underline font-medium"
                >
                  {contact.email}
                </a>
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Phone className="w-3 h-3" /> Phone Number
              </Label>
              <p className="text-foreground font-medium">
                {contact.phone || "Not provided"}
              </p>
            </div>
            <div className="space-y-1">
              <Label className="text-xs text-muted-foreground flex items-center gap-1">
                <Briefcase className="w-3 h-3" /> Requested Service
              </Label>
              <p className="text-xs font-bold uppercase tracking-wider text-primary">
                {Array.isArray(contact.service)
                  ? contact.service.map((srv) => String(srv.name)).join(", ")
                  : String(contact.service || "").replace(/_/g, " ")}
              </p>
            </div>
          </div>

          {/* Full Message Block Area */}
          <div className="space-y-1.5">
            <Label className="text-xs text-muted-foreground flex items-center gap-1">
              <MessageSquare className="w-3 h-3" /> Full Message Context
            </Label>
            <div className="bg-background border p-4 rounded-md text-foreground whitespace-pre-wrap leading-relaxed max-h-[300px] overflow-y-auto text-[14px]">
              {contact.message}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
