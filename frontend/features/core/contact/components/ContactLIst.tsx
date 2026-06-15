"use client";

import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
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
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { getAllContactsQueryOptions } from "../contact.query.options";
import { ContactResponseType } from "../contact.types";
import { ContactDetailDialog } from "./ContactDetailDialog"; // Adjust Path

export const AdminContactDashboard: React.FC = () => {
  const { data, isLoading, isError, error, refetch, isRefetching } = useQuery(
    getAllContactsQueryOptions,
  );

  // Modal active visibility states tracking
  const [selectedContact, setSelectedContact] =
    useState<ContactResponseType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleOpenDetails = (contact: ContactResponseType) => {
    setSelectedContact(contact);
    setIsDialogOpen(true);
  };

  const handleCloseDetails = () => {
    setSelectedContact(null);
    setIsDialogOpen(false);
  };

  // 1. LOADING / SKELETON STATE
  if (isLoading) {
    return (
      <div className="space-y-6 p-4 md:p-8">
        <div className="space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i} className="w-full border-border">
              <CardHeader className="space-y-2">
                <Skeleton className="h-5 w-1/3" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
              <CardContent className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-12 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  // 2. ERROR STATE
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center max-w-md mx-auto space-y-4">
        <div className="p-3 bg-destructive/10 rounded-full text-destructive">
          <AlertTriangle className="w-10 h-10" />
        </div>
        <div className="space-y-1">
          <h3 className="text-xl font-semibold tracking-tight">
            Failed to fetch contacts
          </h3>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error
              ? error.message
              : "An unexpected server error occurred."}
          </p>
        </div>
        <Button onClick={() => refetch()} className="gap-2">
          <RefreshCw
            className={`w-4 h-4 ${isRefetching ? "animate-spin" : ""}`}
          />
          Try Again
        </Button>
      </div>
    );
  }

  const contacts = Array.isArray(data?.data)
    ? data.data
    : data?.data
      ? [data.data]
      : [];

  // 3. EMPTY STATE
  if (contacts.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No contact submission records found.
      </div>
    );
  }

  // 4. MAIN DATA UI RENDER
  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b pb-5">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
            Messages
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage and view client inquiries submitted via your website portal.
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => refetch()}
          disabled={isRefetching}
          className="gap-2 self-stretch sm:self-auto justify-center"
        >
          <RefreshCw
            className={`w-3.5 h-3.5 ${isRefetching ? "animate-spin" : ""}`}
          />
          Refresh Data
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <Card
            key={contact._id}
            onClick={() => handleOpenDetails(contact)}
            className="flex flex-col justify-between border border-border bg-card shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.99]"
          >
            <div>
              <CardHeader className="space-y-2 pb-3">
                <div className="flex justify-between items-start gap-2">
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

                <CardTitle className="text-lg font-bold tracking-tight text-foreground line-clamp-1 mt-1">
                  {contact.subject || "No Subject Given"}
                </CardTitle>
                <CardDescription className="flex items-center gap-1 text-xs">
                  <Clock className="w-3 h-3 text-muted-foreground" />
                  {format(new Date(contact.createdAt).toISOString(), "PPP p")}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-4 text-sm pb-6">
                <div className="space-y-2 text-muted-foreground bg-muted/40 p-3 rounded-lg border border-border/50">
                  <div className="flex items-center gap-2 text-foreground font-medium truncate">
                    <User className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{contact.name}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate">
                    <Mail className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span className="text-primary truncate">
                      {contact.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-muted-foreground shrink-0" />
                    <span>{contact.phone || "No phone listed"}</span>
                  </div>
                  <div className="flex items-center gap-2 truncate border-t pt-1.5 mt-1.5 border-border/60">
                    <Briefcase className="w-4 h-4 text-muted-foreground shrink-0" />
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">
                      {Array.isArray(contact.service)
                        ? contact.service
                            .map((srv) => String(srv.name))
                            .join(", ")
                        : String(contact.service || "").replace(/_/g, " ")}
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" /> Message Preview:
                  </span>
                  <p className="text-sm text-foreground bg-background border p-3 rounded-md min-h-[60px] line-clamp-3 whitespace-pre-wrap leading-relaxed">
                    {contact.message}
                  </p>
                </div>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>

      {/* Global Mounted Container for handling full-size details view overlays */}
      <ContactDetailDialog
        contact={selectedContact}
        isOpen={isDialogOpen}
        onClose={handleCloseDetails}
      />
    </div>
  );
};
