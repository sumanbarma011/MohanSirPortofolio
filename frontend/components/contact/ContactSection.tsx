"use client";

import React from "react";
import Image from "next/image";
import { Star, Send } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Configuration data matrices for dynamic layout mapping
const FORM_FIELDS = [
  { id: "name", label: "Name", type: "input", placeholder: "Your full name" },
  {
    id: "email",
    label: "Email",
    type: "email",
    placeholder: "you@example.com",
  },
  {
    id: "subject",
    label: "Subject",
    type: "input",
    placeholder: "Service or inquiry",
  },
];

const SERVICES_LIST = [
  "Audit & Assurance",
  "Tax Planning",
  "Financial Advisory",
  "Compliance Services",
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const fadeUpVariants = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0 },
};

const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  show: { opacity: 1, scale: 1 },
};

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="w-full bg-background text-foreground py-16 px-6 md:px-12 lg:px-24"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.12, delayChildren: 0.1 }}
          className="text-center space-y-3"
        >
          <motion.p
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-xs uppercase tracking-widest text-primary font-semibold"
          >
            Contact Us
          </motion.p>

          <motion.h2
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-2xl md:text-3xl lg:text-4xl font-semibold tracking-tight"
          >
            Contact Our Team
          </motion.h2>

          <motion.p
            variants={fadeUpVariants}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-muted-foreground max-w-2xl mx-auto text-sm md:text-base leading-relaxed"
          >
            Whether you need help with audit, taxation, compliance, or advisory
            services, our team is ready to assist you.
          </motion.p>
        </motion.div>

        {/* Form and Showcase Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <motion.div
            variants={scaleInVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-5 relative overflow-hidden border border-border rounded-lg aspect-square sm:aspect-video md:aspect-auto md:min-h-[450px] w-full"
          >
            <Image
              src="https://images.unsplash.com/photo-1714328564923-d4826427c991?w=1000&auto=format&fit=crop&q=80"
              alt="CA Professional"
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-top md:object-[center_25%] brightness-[0.35] transition-all duration-300"
            />

            <div className="absolute inset-0 flex flex-col justify-end p-6 space-y-4 bg-linear-to-t from-background via-background/40 to-transparent">
              <motion.div
                transition={{ duration: 0.6 }}
                className="flex items-center gap-1 text-primary"
              >
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </motion.div>

              {/* Identity Info */}
              <motion.div transition={{ duration: 0.6, delay: 0.1 }}>
                <h3 className="text-lg font-semibold text-foreground">
                  Mohan Khatri
                </h3>
                <p className="text-xs text-muted-foreground">
                  Founder, M Khatri & Associates
                </p>
              </motion.div>

              {/* Bio Quote */}
              <motion.p
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-sm text-muted-foreground italic border-l-2 border-primary pl-3"
              >
                Professional tax advisory and compliance support for long-term
                business stability.
              </motion.p>
            </div>
          </motion.div>

          {/* Right Panel Client Contact Form */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-7"
          >
            <Card className="bg-card border border-border rounded-lg shadow-sm">
              <CardContent className="p-6 space-y-5">
                {FORM_FIELDS.map((field) => (
                  <motion.div
                    key={field.id}
                    variants={fadeUpVariants}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="space-y-1"
                  >
                    <Label
                      htmlFor={field.id}
                      className="text-sm text-foreground"
                    >
                      {field.label}
                    </Label>
                    <Input
                      id={field.id}
                      type={field.type}
                      placeholder={field.placeholder}
                      className="h-11 rounded-none border-border bg-background transition-colors"
                    />
                  </motion.div>
                ))}

                {/* Textarea Field Control */}
                <motion.div
                  variants={fadeUpVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-1"
                >
                  <Label htmlFor="message" className="text-sm text-foreground">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Write your message..."
                    className="min-h-[120px] rounded-none border-border bg-background resize-none transition-colors"
                  />
                </motion.div>

                {/* Multi Select Service Checkboxes Layout */}
                <motion.div
                  variants={fadeUpVariants}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="space-y-2"
                >
                  <Label className="text-sm text-foreground">
                    Services Required
                  </Label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-muted-foreground">
                    {SERVICES_LIST.map((item, i) => (
                      <motion.label
                        key={i}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox id={`service-${i}`} />
                        <span>{item}</span>
                      </motion.label>
                    ))}
                  </div>
                </motion.div>

                {/* Form Action Submit Button */}
                <motion.div
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.1 }}
                >
                  <Button className="w-full bg-primary text-primary-foreground hover:opacity-90 rounded-none h-11 font-medium transition-opacity">
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
