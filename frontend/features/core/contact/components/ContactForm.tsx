import React from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useContactForm, UseContactFormProps } from "../contact.hooks";
import { SERVICE } from "../contact.types";

// Define component property interface extending your hook options
interface ContactFormProps extends UseContactFormProps {
  className?: string;
}

// Mocking your form fields layout definition inside or outside the file
const FORM_FIELDS = [
  { id: "name", label: "Full Name", type: "text", placeholder: "John Doe" },
  {
    id: "email",
    label: "Email Address",
    type: "email",
    placeholder: "john@example.com",
  },
] as const;

// Framer Motion layout configuration preset passed from your parent view
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export const ContactForm: React.FC<ContactFormProps> = ({
  className = "lg:col-span-7",
  onSuccess,
  onError,
}) => {
  const { form, isSubmitting, mutationError, handleSubmit } = useContactForm({
    onSuccess,
    onError,
  });

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
                      <p className="text-red-500 text-xs mt-1">
                        {formField.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </motion.div>
                )}
              </form.Field>
            ))}

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
                    <p className="text-red-500 text-xs mt-1">
                      {formField.state.meta.errors[0]?.message}
                    </p>
                  ) : null}
                </motion.div>
              )}
            </form.Field>

            <form.Field name="service">
              {(formField) => {
                const currentServices =
                  (formField.state.value as SERVICE[]) || [];

                return (
                  <motion.div
                    variants={fadeUpVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-2"
                  >
                    <Label className="text-sm text-foreground">
                      Services Required
                    </Label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                      {Object.values(SERVICE).map((item, i) => {
                        const isChecked = currentServices.includes(item);

                        return (
                          <motion.label
                            key={i}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                            className="flex items-center gap-2 cursor-pointer"
                          >
                            <Checkbox
                              id={`service-${i}`}
                              checked={isChecked}
                              disabled={isSubmitting}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  formField.handleChange([
                                    ...currentServices,
                                    item,
                                  ]);
                                } else {
                                  formField.handleChange(
                                    currentServices.filter((s) => s !== item),
                                  );
                                }
                              }}
                            />
                            <span>
                              {item.includes("_")
                                ? item.replace("_", " ")
                                : item}
                            </span>
                          </motion.label>
                        );
                      })}
                    </div>
                    {formField.state.meta.isTouched &&
                    formField.state.meta.errors.length ? (
                      <p className="text-red-500 text-xs mt-1">
                        {formField.state.meta.errors[0]?.message}
                      </p>
                    ) : null}
                  </motion.div>
                );
              }}
            </form.Field>

            {/* Global API Mutation Handling Feedback Element */}
            {mutationError && (
              <p className="text-red-500 text-sm mt-2">
                Server Error: {mutationError.message}
              </p>
            )}

            {/* Form Action Submit Button */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.1 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-none h-11 font-medium transition-opacity disabled:bg-gray-400"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};
