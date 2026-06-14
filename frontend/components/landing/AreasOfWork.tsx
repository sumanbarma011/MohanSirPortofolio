"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CA_SERVICES, CAServiceItem } from "@/mockdata/ServicesData";
import { ChevronDownCircleIcon } from "lucide-react";

interface AreasOfWorkProps {
  services?: CAServiceItem[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

export default function AreasOfWork({
  services = CA_SERVICES,
}: AreasOfWorkProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section
      id="area-of-work"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-12"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Area of Work
          </span>

          <h2 className="mt-4 text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
            Professional Services for Businesses & Individuals
          </h2>

          <p className="mt-3 text-muted-foreground leading-relaxed">
            From taxation and compliance to audit and business advisory, we
            provide practical financial solutions that help businesses operate
            confidently and stay compliant.
          </p>
        </motion.div>

        {/* Accordion List — Two-column layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={fadeUp}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4" // Changed from block to grid layout
        >
          {services.map((service) => {
            const Icon = service.icon;
            const isOpen = openId === service.id;

            return (
              <div
                key={service.id}
                className="bg-card border border-border rounded-2xl overflow-hidden h-fit" // Added border, rounded, and h-fit to each item
              >
                <button
                  onClick={() => toggle(service.id)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left hover:bg-muted/50 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-all duration-200 ${
                        isOpen
                          ? "border-primary/30 bg-primary/10 text-primary"
                          : "border-border bg-muted text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                    <span
                      className={`text-sm font-semibold transition-colors duration-150 ${
                        isOpen ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {service.title}
                    </span>
                  </div>

                  <ChevronDownCircleIcon
                    className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-250 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className="overflow-hidden transition-all duration-[280ms] ease-[cubic-bezier(0.4,0,0.2,1)]"
                  style={{ maxHeight: isOpen ? "300px" : "0px" }}
                >
                  <p className="px-5 pb-5 pt-1 text-sm leading-relaxed text-muted-foreground pl-[3.75rem]">
                    {service.shortDescription}
                  </p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
