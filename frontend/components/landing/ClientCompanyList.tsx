"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import {
  SiGoogle,
  SiApple,
  SiMeta,
  SiAutozone,
  SiTwilio,
} from "react-icons/si";
import LogoTicker from "../LogoDisplayer";

interface StatItem {
  label: string;
  value: string;
  colorClass: string;
}

const STATS_DATA: StatItem[] = [
  { label: "Clients Served", value: "300+", colorClass: "text-foreground" },
  { label: "Audits Completed", value: "50+", colorClass: "text-foreground" },
  { label: "Tax Compliance", value: "100%", colorClass: "text-chart-1" },
  { label: "Experience", value: "5+", colorClass: "text-foreground" },
];

export const mockCompanies = [
  { name: "Google", logo: SiGoogle },
  { name: "Meta", logo: SiMeta },
  { name: "Amazon", logo: SiAutozone },
  { name: "Twilio", logo: SiTwilio },
  { name: "Apple", logo: SiApple },
];

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const cardVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const numericValue = parseInt(value.replace(/[^0-9]/g, ""), 10);
  const suffix = value.replace(/[0-9]/g, "");

  const motionValue = useMotionValue(0);

  // higher damping + lower stiffness = slow, eased
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 40,
  });

  // point outside the viewport so the counter never fires
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = Math.floor(latest).toString();
      }
    });
  }, [springValue]);

  return (
    <span className="tabular-nums">
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}

export default function ClientCompanyList() {
  return (
    <div className="w-full py-16 bg-background border-t border-border/40 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-16 relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          // no negative margin here either — same mobile trigger issue
          viewport={{ once: true }}
          transition={{
            duration: 0.5,
            ease: "easeOut",
            staggerChildren: 0.1,
          }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full"
        >
          {STATS_DATA.map((stat, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              transition={{ duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -4 }}
              className="relative bg-card/40 border border-border/60 rounded-2xl p-6 md:p-8 shadow-sm backdrop-blur-md flex flex-col justify-between items-start group hover:bg-card/80 hover:border-border transition-all duration-300 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center" />

              <p className="text-muted-foreground text-xs sm:text-sm font-semibold tracking-wider uppercase mb-4 transition-colors duration-300 group-hover:text-muted-foreground/80">
                {stat.label}
              </p>

              <h4
                className={`${stat.colorClass} text-4xl sm:text-5xl font-extrabold tracking-tight`}
              >
                <AnimatedCounter value={stat.value} />
              </h4>
            </motion.div>
          ))}
        </motion.div>

        <div className="w-full pt-4 flex flex-col items-center">
          <h2 className="text-center text-xs sm:text-sm font-semibold tracking-widest text-muted-foreground/60 uppercase mb-8 relative after:content-[''] after:block after:w-8 after:h-[1px] after:bg-border after:mx-auto after:mt-3">
            Trusted By Market Leaders
          </h2>
          <div className="w-full opacity-80 hover:opacity-100 transition-opacity duration-300">
            <LogoTicker companies={mockCompanies} speed="medium" />
          </div>
        </div>
      </div>
    </div>
  );
}
