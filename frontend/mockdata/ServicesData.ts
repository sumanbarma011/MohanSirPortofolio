import {
  Scale,
  FileCheck2,
  BarChart3,
  Briefcase,
  Building2,
  ShieldAlert,
  LucideIcon,
} from "lucide-react";

export interface CAServiceItem {
  id: string;
  title: string;
  shortDescription: string;
  icon: LucideIcon;
}

export const CA_SERVICES: CAServiceItem[] = [
  {
    id: "tax-gst",
    title: "Taxation & GST Filing",
    shortDescription:
      "Strategic tax planning, corporate structuring, and seamless compliance filings.",
    icon: Scale,
  },
  {
    id: "audit-assurance",
    title: "Audit & Assurance",
    shortDescription:
      "Independent, rigorous evaluations to ensure true statutory financial compliance.",
    icon: FileCheck2,
  },
  {
    id: "financial-reporting",
    title: "Financial Reporting",
    shortDescription:
      "Precision-engineered bookkeeping, MIS reporting, and robust financial statements.",
    icon: BarChart3,
  },
  {
    id: "business-advisory",
    title: "Business Advisory",
    shortDescription:
      "Data-driven corporate strategies to scale operations and maximize valuation.",
    icon: Briefcase,
  },
  {
    id: "company-registration",
    title: "Corporate Compliance",
    shortDescription:
      "End-to-end entity incorporation, MCA filings, and secretarial management.",
    icon: Building2,
  },
  {
    id: "risk-consulting",
    title: "Risk & Consulting",
    shortDescription:
      "Proactive internal controls, risk identification, and cash flow stabilization.",
    icon: ShieldAlert,
  },
];
