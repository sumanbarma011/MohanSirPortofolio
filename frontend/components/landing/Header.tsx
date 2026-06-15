"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronDown, PhoneCallIcon, Menu, X } from "lucide-react";
import BookConsultationButton from "../BookConsultationButton";
import { ThemeToggle } from "../ThemeToggle";

const NAV_ITEMS = [
  { name: "Home", href: "#" },
  { name: "About", href: "#about" },
  {
    name: "Services",
    href: "#services",
    dropdown: [
      { name: "Audit & Assurance", href: "#services" },
      { name: "Tax Planning", href: "#services" },
      { name: "Accounting Services", href: "#services" },
      { name: "Compliance Management", href: "#services" },
    ],
  },
  {
    name: "Blog",
    href: "#blogs",
    isButton: true,
    dropdown: [
      { name: "Latest Blogs", href: "#blogs" },
      { name: "Highlighted Blogs", href: "#blogs" },
    ],
  },
];

const headerVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

const navItemVariants = {
  hidden: { opacity: 0, y: -6 },
  visible: { opacity: 1, y: 0 },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMobileDropdown, setActiveMobileDropdown] = useState<
    number | null
  >(null);

  const toggleMobileDropdown = (index: number) => {
    setActiveMobileDropdown(activeMobileDropdown === index ? null : index);
  };

  return (
    <>
      <motion.header
        variants={headerVariants}
        initial="hidden"
        animate="visible"
        className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 text-foreground backdrop-blur-md transition-colors duration-300"
      >
        <div className="flex h-16 max-w-[1400px] items-center justify-between px-4 sm:px-6 md:px-12">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link
              href="/"
              className="flex items-center gap-1 text-2xl font-bold tracking-tight select-none hover:opacity-90 transition-opacity"
            >
              <span id="top" className="text-foreground/90 font-light">
                Mohan
              </span>
              <span className="text-primary font-medium">Khatri</span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item, index) => {
              if (item.dropdown) {
                return (
                  <motion.div
                    key={index}
                    className="relative group"
                    initial="initialState"
                    whileHover="hoverState"
                    whileFocus="hoverState"
                  >
                    {item.isButton ? (
                      <button className="flex items-center gap-1 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200">
                        {item.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                    ) : (
                      <Link
                        href={item.href}
                        className="flex items-center gap-1 text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        {item.name}
                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                      </Link>
                    )}

                    {/* Invisible Hover  */}
                    <div className="absolute left-0 top-full h-2 w-full z-10" />

                    {/* Desktop Dropdown Menu */}
                    <motion.div
                      className="absolute left-0 top-full z-20 w-64 pt-2"
                      variants={{
                        initialState: {
                          opacity: 0,
                          y: 8,
                          scale: 0.98,
                          pointerEvents: "none",
                        },
                        hoverState: {
                          opacity: 1,
                          y: 0,
                          scale: 1,
                          pointerEvents: "auto",
                        },
                      }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <div className="rounded-xl border bg-card p-2 shadow-xl">
                        {item.dropdown.map((subItem, subIndex) => (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className="block rounded-lg px-4 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                );
              }
              return (
                <motion.div key={index} variants={navItemVariants}>
                  <Link
                    href={item.href}
                    className="text-[15px] font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                </motion.div>
              );
            })}
          </nav>

          {/* Action Row */}
          <motion.div
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="flex items-center gap-3 sm:gap-5"
          >
            <motion.a
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              href="tel:+9779867473181"
              className="p-2.5 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors duration-200"
              title="Call Me"
            >
              <PhoneCallIcon className="w-5 h-5" />
            </motion.a>

            {/* <ThemeToggle /> */}

            <motion.div
              whileHover={{ scale: 1.02, filter: "brightness(1.10)" }}
              className="md:block hidden"
            >
              <BookConsultationButton />
            </motion.div>
            {/* Hamburger Button Container  */}
            <button
              onClick={() => setIsOpen(true)}
              className="p-2.5 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted md:hidden transition-colors duration-200"
              aria-label="Toggle Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </motion.div>
        </div>
      </motion.header>

      {/* Right Sliding  */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop Layer Fade */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-background md:hidden"
            />

            {/* Content Sidebar Panel  */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm bg-background border-l border-border p-6 shadow-2xl flex flex-col justify-between md:hidden"
            >
              <div>
                {/* Drawer Close Actions Header */}
                <div className="flex items-center justify-between mb-8">
                  <span className="text-xl font-bold tracking-tight">
                    Navigation
                  </span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Mobile Item List Stack */}
                <div className="space-y-1">
                  {NAV_ITEMS.map((item, index) => {
                    if (item.dropdown) {
                      const isDropdownOpen = activeMobileDropdown === index;
                      return (
                        <div key={index} className="py-1">
                          <button
                            onClick={() => toggleMobileDropdown(index)}
                            className="flex w-full items-center justify-between rounded-lg py-2 px-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                          >
                            <span>{item.name}</span>
                            <ChevronDown
                              className={`w-4 h-4 transition-transform duration-200 ${
                                isDropdownOpen
                                  ? "rotate-180 text-foreground"
                                  : ""
                              }`}
                            />
                          </button>

                          <AnimatePresence initial={false}>
                            {isDropdownOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{
                                  duration: 0.2,
                                  ease: "easeInOut",
                                }}
                                className="overflow-hidden pl-4 pr-2 mt-1 space-y-1 border-l border-border/60 ml-3"
                              >
                                {item.dropdown.map((subItem, subIndex) => (
                                  <Link
                                    key={subIndex}
                                    href={subItem.href}
                                    onClick={() => setIsOpen(false)}
                                    className="block rounded-md py-2 px-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                                  >
                                    {subItem.name}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    }

                    return (
                      <Link
                        key={index}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className="block rounded-lg py-3 px-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Fixed Action Drawer Area */}
              <div className="pt-6 border-t border-border">
                <Button
                  asChild
                  onClick={() => setIsOpen(false)}
                  className="w-full rounded-md bg-primary text-primary-foreground font-semibold shadow-sm text-sm py-2"
                >
                  <Link
                    href="#contact"
                    className="w-full h-full flex items-center justify-center text-center"
                  >
                    Book Consultation
                  </Link>
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
