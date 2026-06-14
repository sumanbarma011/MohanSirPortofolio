"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, x: 15 },
  visible: { opacity: 1, x: 0 },
};

export default function Hero() {
  return (
    <section className="relative w-full min-h-[85vh] bg-background text-foreground flex items-center overflow-hidden px-6 md:px-12 py-16 transition-colors duration-300">
      <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-linear-to-r from-chart-1 to-chart-2 rounded-full blur-[120px] opacity-15 dark:opacity-10 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        <div className="lg:col-span-7 flex flex-col justify-center text-left space-y-6 md:space-y-8">
          <h1 className="font-bold tracking-tight leading-[1.1] text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl">
            Trusted Chartered <br />
            <span className="inline-block">Accountant for Businesses</span>
          </h1>

          <p className="text-muted-foreground font-normal leading-relaxed text-sm sm:text-base md:text-lg max-w-md animate-fade-in [animation-fill-mode:forwards] [animation-delay:100ms]">
            Helping businesses and individuals navigate taxation, audit,
            accounting, compliance, and financial advisory with confidence.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link href="/#services">
              <Button className="rounded-full bg-linear-to-r from-primary to-accent hover:opacity-90 text-primary-foreground font-medium px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] shadow-lg transition-all duration-300 border-0">
                Our Services
              </Button>
            </Link>

            <Link href={"/#about"}>
              <Button
                variant="outline"
                className="rounded-full bg-transparent border border-border text-foreground font-medium px-6 sm:px-8 py-5 sm:py-6 text-sm sm:text-[15px] hover:bg-muted/50 transition-all duration-300"
              >
                See more
              </Button>
            </Link>
          </div>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
          className="lg:col-span-5 flex items-center justify-center relative h-[450px] md:h-[500px]"
        >
          <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-chart-2/10 blur-3xl rounded-full" />

          <div className="relative w-full h-full max-w-[450px] rounded-3xl overflow-hidden border border-border shadow-2xl p-2 bg-card/30 backdrop-blur-xs">
            <Image
              src="https://images.unsplash.com/photo-1714328564923-d4826427c991?w=600&auto=format&fit=crop&q=80"
              alt="Mohan Khatri"
              fill
              priority
              sizes="(max-width: 480px) 100vw, 450px"
              className="rounded-2xl object-cover mix-blend-luminosity contrast-125 dark:contrast-100 dark:opacity-90"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
