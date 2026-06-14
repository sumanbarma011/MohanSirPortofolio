"use client";

import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FaYoutube, FaLinkedin } from "react-icons/fa";

const Quick_Links_Items = [
  { label: "Home", link: "/" },
  { label: "Services", link: "/services" },
  { label: "Resources", link: "/resources" },
  { label: "Contact", link: "/contact" },
];

const Legal_Item_Links = [
  { label: "Privacy Policy", link: "/privacy-policy" },
  { label: "Terms of Service", link: "/terms-of-service" },
  { label: "Disclaimer", link: "/disclaimer" },
];

const Social_Items = [
  {
    link: "https://youtube.com",
    icon: FaYoutube,
  },
  {
    link: "https://linkedin.com",
    icon: FaLinkedin,
  },
];

export const Footer = () => {
  return (
    <footer className="bg-background text-foreground border-t border-border py-14 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Main Grid */}
        <div className="grid md:grid-cols-4 gap-10 mb-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="h-7 w-7 text-primary" />
              <span className="text-lg font-bold text-foreground">
                Mohan Khatri
              </span>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed">
              Professional Chartered Accountancy guidance for taxation,
              auditing, compliance, and financial strategy.
            </p>

            {/* Social Icons matching modern variable values */}
            <div className="hidden sm:flex items-center gap-4 text-muted-foreground">
              {Social_Items.map((item) => {
                const Icon = item.icon;

                return (
                  <Link
                    key={item.link}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-foreground transition-colors duration-300"
                  >
                    <Icon className="w-[18px] h-[18px] fill-current stroke-0" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Navigation
            </h3>

            <ul className="space-y-2">
              {Quick_Links_Items.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-sm text-muted-foreground hover:text-primary transition cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Learning Paths */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Learning Paths
            </h3>

            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-primary cursor-pointer transition">
                Taxation & GST
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Audit & Assurance
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Financial Reporting
              </li>
              <li className="hover:text-primary cursor-pointer transition">
                Exam Preparation (CA)
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Legal
            </h3>

            <ul className="space-y-2">
              {Legal_Item_Links.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.link}
                    className="text-sm text-muted-foreground hover:text-primary transition cursor-pointer"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Mohan Khatri. All rights reserved.
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span>Developed by Roshan Pokharel</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
