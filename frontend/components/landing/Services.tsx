"use client";

import { motion } from "framer-motion";
import {
  FileText,
  ShieldCheck,
  BarChart3,
  Building2,
  Calculator,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  points: string[];
}

const SERVICES: Service[] = [
  {
    title: "Taxation & GST",
    description:
      "Comprehensive tax planning, GST compliance, and advisory services designed to minimize risks and maximize efficiency.",
    icon: Calculator,
    points: ["Income Tax Filing", "GST Returns", "TDS Compliance"],
  },
  {
    title: "Audit & Assurance",
    description:
      "Independent audit services that strengthen transparency, improve governance, and build stakeholder confidence.",
    icon: ShieldCheck,
    points: ["Statutory Audit", "Internal Audit", "Risk Assessment"],
  },
  {
    title: "Financial Reporting",
    description:
      "Accurate and timely financial reporting aligned with current accounting and regulatory standards.",
    icon: FileText,
    points: ["Balance Sheet", "P&L Statements", "MIS Reports"],
  },
  {
    title: "Business Advisory",
    description:
      "Strategic guidance to support growth, improve profitability, and help businesses make informed decisions.",
    icon: BarChart3,
    points: [
      "Business Structuring",
      "Investment Advisory",
      "Cost Optimization",
    ],
  },
  {
    title: "Company Compliance",
    description:
      "End-to-end corporate compliance solutions ensuring your business remains fully compliant year-round.",
    icon: Building2,
    points: ["Company Registration", "ROC Filings", "Annual Compliance"],
  },
];

const fadeUp = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative py-24 px-6 sm:px-12 lg:px-16 bg-background text-foreground overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[300px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mb-16"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Services
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Financial Expertise Built Around
            <span className="block text-primary">
              Business Growth & Compliance
            </span>
          </h2>

          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            We help individuals, startups, and established businesses manage
            taxation, compliance, reporting, and financial strategy through
            structured professional services tailored to their goals.
          </p>
        </motion.div>

        {/* Services Grid — Centered leftover cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {" "}
          {/* Changed grid to flex layout with justify-center */}
          {SERVICES.map((service, index) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -6,
                }}
                // Added responsive basis widths to mimic the 2-column and 3-column grid layout perfectly
                className="group h-auto w-full sm:w-[calc(50%-12px)] xl:w-[calc(33.333%-16px)] rounded-3xl border border-border bg-card p-7 transition-all duration-300 hover:border-primary/30 hover:shadow-lg flex flex-col justify-between"
              >
                <div>
                  {/* Icon */}
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon className="h-7 w-7" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold mb-3">
                    {service.title}
                  </h3>

                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Included Services */}
                  <div className="space-y-3 mb-8">
                    {service.points.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 text-sm"
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-5 border-t border-border flex items-center justify-between mt-auto">
                  <span className="text-sm font-medium text-primary">
                    Explore Service
                  </span>
                  <ArrowRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Trust Statement */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-16 rounded-3xl border border-border bg-card/50 p-8 text-center"
        >
          <h3 className="text-xl font-semibold mb-3">
            Trusted Guidance for Every Stage of Business
          </h3>

          <p className="max-w-3xl mx-auto text-muted-foreground leading-relaxed">
            From registrations and compliance to audits and strategic advisory,
            we provide practical financial solutions that help businesses remain
            compliant, efficient, and prepared for growth.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
