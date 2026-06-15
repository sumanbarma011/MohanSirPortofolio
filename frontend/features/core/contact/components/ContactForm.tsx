"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Loader2, ChevronDown } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useContactForm, UseContactFormProps } from "../contact.hooks";
import { useContactStore } from "../contact.store";
import { Service } from "../../services/service.types";
import { getAllServicesQueryOptions } from "../../services/services.query.option";
import { ContactSuccessDisplay } from "./ContactSuccessDisplay";

interface ContactFormProps extends UseContactFormProps {
  className?: string;
}

const FORM_FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
] as const;

const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const ContactForm: React.FC<ContactFormProps> = ({
  className = "lg:col-span-7",
  onSuccess,
  onError,
}) => {
  const submittedData = useContactStore((state) => state.submittedData);

  // Fetch compliance services from the database using your Query Options
  const {
    data: responseContainer,
    isLoading: isLoadingServices,
    isError: isServicesError,
  } = useQuery(getAllServicesQueryOptions);

  // Fallback to empty array safely if parsing nested structure definitions
  const fetchedServices: Service[] = responseContainer?.data ?? [];

  const { form, isSubmitting, mutationError, handleSubmit } = useContactForm({
    onSuccess: (data) => {
      if (onSuccess) onSuccess(data);
    },
    onError,
  });

  // Conditional render interceptor: If already submitted, swap layout to success mode
  if (submittedData) {
    return (
      <motion.div
        variants={fadeUpVariants}
        initial="hidden"
        animate="show"
        transition={{ duration: 0.5 }}
        className={className}
      >
        <ContactSuccessDisplay />
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={fadeUpVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={className}
    >
      <Card className="bg-card border border-border rounded-lg shadow-sm">
        <CardContent className="p-6 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Map standard text inputs */}
            {FORM_FIELDS.map((field) => (
              <form.Field key={field.id} name={field.id}>
                {(formField) => (
                  <motion.div
                    variants={fadeUpVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <Label
                      htmlFor={formField.name}
                      className="text-sm text-foreground"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={formField.name}
                      type={field.type}
                      placeholder={field.placeholder}
                      value={(formField.state.value as string) || ""}
                      onBlur={formField.handleBlur}
                      onChange={(e) => formField.handleChange(e.target.value)}
                      disabled={isSubmitting}
                      className="h-11 rounded-none border-border bg-background transition-colors"
                    />
                    {formField.state.meta.isTouched &&
                    formField.state.meta.errors.length ? (
                      <p className="text-destructive text-xs mt-1">
                        {formField.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </motion.div>
                )}
              </form.Field>
            ))}

            {/* Message Field */}
            <form.Field name="message">
              {(formField) => (
                <motion.div
                  variants={fadeUpVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-1"
                >
                  <Label
                    htmlFor={formField.name}
                    className="text-sm text-foreground"
                  >
                    Message
                  </Label>
                  <Textarea
                    id={formField.name}
                    placeholder="Write your message..."
                    value={(formField.state.value as string) || ""}
                    onBlur={formField.handleBlur}
                    onChange={(e) => formField.handleChange(e.target.value)}
                    disabled={isSubmitting}
                    className="min-h-[120px] rounded-none border-border bg-background resize-none transition-colors"
                  />
                  {formField.state.meta.isTouched &&
                  formField.state.meta.errors.length ? (
                    <p className="text-destructive text-xs mt-1">
                      {formField.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </motion.div>
              )}
            </form.Field>

            {/* Services Dropdown Select Element (Supporting Multiple Selections) */}
            <form.Field name="service">
              {(formField) => {
                // Treat value safely as a string array
                const selectedIds = (formField.state.value as string[]) || [];

                const handleToggleService = (id: string) => {
                  if (selectedIds.includes(id)) {
                    formField.handleChange(
                      selectedIds.filter((item) => item !== id),
                    );
                  } else {
                    formField.handleChange([...selectedIds, id]);
                  }
                };

                return (
                  <motion.div
                    variants={fadeUpVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <Label className="text-sm text-foreground">
                      Services Required
                    </Label>

                    <DropdownMenu>
                      {/* Using asChild forces Radix to apply the dropdown event listeners 
            to our div instead of injecting an invalid nested <button> tag.
          */}
                      <DropdownMenuTrigger
                        asChild
                        disabled={
                          isSubmitting || isLoadingServices || isServicesError
                        }
                      >
                        <div
                          role="combobox"
                          aria-expanded="false"
                          className="flex min-h-11 w-full items-center justify-between rounded-none border border-border bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-within:ring-2 focus-within:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50 text-left transition-colors cursor-pointer"
                        >
                          {selectedIds.length > 0 ? (
                            <div className="flex flex-wrap gap-1.5 max-w-[95%]">
                              {selectedIds.map((id) => {
                                const matchedService = Array.isArray(
                                  fetchedServices,
                                )
                                  ? fetchedServices.find(
                                      (s) => (s.id || s) === id,
                                    )
                                  : null;
                                const label =
                                  matchedService?.name || matchedService || id;

                                return (
                                  <Badge
                                    key={id}
                                    variant="secondary"
                                    className="rounded-none bg-secondary text-secondary-foreground gap-1 pr-1 font-normal"
                                  >
                                    {String(label).replace(/_/g, " ")}
                                    <span
                                      role="button"
                                      tabIndex={0}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        handleToggleService(id);
                                      }}
                                      onKeyDown={(e) => {
                                        if (
                                          e.key === "Enter" ||
                                          e.key === " "
                                        ) {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          handleToggleService(id);
                                        }
                                      }}
                                      className="text-muted-foreground hover:text-foreground outline-none cursor-pointer p-0.5"
                                    >
                                      <X className="h-3 w-3" />
                                    </span>
                                  </Badge>
                                );
                              })}
                            </div>
                          ) : (
                            <span className="text-muted-foreground select-none">
                              {isLoadingServices
                                ? "Loading workspace services..."
                                : isServicesError
                                  ? "Failed to load services"
                                  : "Select compliance solutions"}
                            </span>
                          )}
                          <span className="text-muted-foreground text-xs ml-2 select-none">
                            <ChevronDown className="h-4 w-4" />
                          </span>
                        </div>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="start"
                        className="w-[var(--radix-dropdown-menu-trigger-width)] bg-popover border border-border text-popover-foreground max-h-60 overflow-y-auto"
                      >
                        {Array.isArray(fetchedServices) &&
                          fetchedServices.map((srv) => {
                            const serviceValue = String(srv.id || srv);
                            const serviceLabel = String(srv.name || srv);
                            const isChecked =
                              selectedIds.includes(serviceValue);

                            return (
                              <DropdownMenuCheckboxItem
                                key={serviceValue}
                                checked={isChecked}
                                onCheckedChange={() =>
                                  handleToggleService(serviceValue)
                                }
                                onSelect={(e) => e.preventDefault()} // Keeps dropdown open for multiple rapid clicks
                                className="focus:bg-accent focus:text-accent-foreground cursor-pointer"
                              >
                                {serviceLabel.includes("_")
                                  ? serviceLabel.replace(/_/g, " ")
                                  : serviceLabel}
                              </DropdownMenuCheckboxItem>
                            );
                          })}
                      </DropdownMenuContent>
                    </DropdownMenu>

                    {formField.state.meta.isTouched &&
                    formField.state.meta.errors.length ? (
                      <p className="text-destructive text-xs mt-1">
                        {formField.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </motion.div>
                );
              }}
            </form.Field>

            {/* Global API Mutation Feedback */}
            {mutationError && (
              <p className="text-destructive text-sm mt-2 font-medium">
                Server Error: {mutationError.message}
              </p>
            )}

            {/* Form Submit Button */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <div className="flex flex-col gap-2">
                <form.Subscribe
                  selector={(state) => [state.canSubmit, state.isSubmitting]}
                >
                  {([canSubmit, isFormSubmitting]) => (
                    <Button
                      type="submit"
                      disabled={
                        !canSubmit || isFormSubmitting || isLoadingServices
                      }
                      className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-none h-11 font-medium transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isFormSubmitting ? (
                        <>
                          Sending...
                          <Loader2 className="w-4 h-4 ml-2 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  )}
                </form.Subscribe>
              </div>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
