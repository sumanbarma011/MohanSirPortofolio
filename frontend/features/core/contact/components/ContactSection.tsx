"use client";

import Image from "next/image";

import { motion } from "framer-motion";
import { ContactForm } from "@/features/core/contact/components/ContactForm";
import { Star } from "lucide-react";

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
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
