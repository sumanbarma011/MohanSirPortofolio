import { motion } from "framer-motion";
import { CheckCircle, Award } from "lucide-react";
import Image from "next/image";

// Reusable configurations for Profile Stats and Features List
const PROFILE_STATS = [
  { label: "Years Experience", value: "5+" },
  { label: "Clients Served", value: "300+" },
  { label: "Industries", value: "20+" },
  { label: "Tax Compliance", value: "100%" },
];

const FEATURES = [
  "Certified Chartered Accountant",
  "Tax & Compliance Expertise",
  "Audit & Assurance Services",
  "Business Advisory Support",
  "Industry-Specific Solutions",
  "Timely Regulatory Compliance",
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

const fadeLeft = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

const fadeRight = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
  },
};

export const About = () => {
  return (
    <section
      id="about"
      className="px-4 sm:px-6 lg:px-8 bg-background text-foreground transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="text-left mb-16"
        >
          <span className="inline-block px-4 py-1.5 bg-background text-foreground border border-border/60 rounded-full text-sm font-semibold mb-4 select-none">
            About Me
          </span>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-foreground mb-4 tracking-tight">
            Trusted Chartered Accountants & Business Advisors
          </h2>
        </motion.div>

        {/* Main Content Layout Card */}
        <motion.div
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="bg-card text-card-foreground rounded-2xl border border-border shadow-lg overflow-hidden"
        >
          <div className="grid lg:grid-cols-[380px_1fr]">
            {/* Left Side Panel */}
            <motion.div
              variants={fadeRight}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="bg-muted/20 border-b lg:border-b-0 lg:border-r border-border p-8 sm:p-10"
            >
              <div className="flex flex-col items-center">
                {/* Profile Image */}
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  whileInView={{
                    opacity: 1,
                    scale: 1,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    delay: 0.1,
                    ease: "easeOut",
                  }}
                  className="relative"
                >
                  <div className="w-56 h-56 rounded-2xl overflow-hidden border border-border shadow-md">
                    <Image
                      src="https://images.unsplash.com/photo-1714328564923-d4826427c991?w=400&auto=format&fit=crop&q=60"
                      alt="Mohan Khatri"
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Profile Meta */}
                <motion.div
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="text-center mt-6"
                >
                  <h3 className="text-2xl font-bold text-foreground">
                    Mohan Khatri
                  </h3>

                  <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm font-medium">
                    <Award className="h-4 w-4 text-primary" />
                    Chartered Accountant
                  </div>
                </motion.div>

                {/* Stats */}
                <div className="w-full mt-10 pt-8 border-t border-border">
                  <div className="grid grid-cols-2 gap-6">
                    {PROFILE_STATS.map((stat, idx) => (
                      <motion.div
                        key={idx}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.4,
                          delay: idx * 0.1,
                          ease: "easeOut",
                        }}
                        className="text-center"
                      >
                        <p className="text-3xl font-bold text-foreground">
                          {stat.value}
                        </p>

                        <p className="text-sm text-muted-foreground mt-1">
                          {stat.label}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right Side Panel */}
            <motion.div
              variants={fadeLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                ease: "easeOut",
              }}
              className="p-8 sm:p-12 flex flex-col justify-center"
            >
              {/* Bio Content */}
              <div className="space-y-5">
                <motion.h3
                  initial={{
                    opacity: 0,
                    y: 20,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  className="text-3xl font-bold tracking-tight text-foreground"
                >
                  Professional Accounting, Taxation & Compliance Services Built
                  on Trust
                </motion.h3>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1,
                    ease: "easeOut",
                  }}
                  className="text-muted-foreground md:text-justify leading-relaxed"
                >
                  At{" "}
                  <span className="font-semibold text-foreground">
                    M Khatri & Associates
                  </span>
                  , we help businesses and individuals navigate financial
                  challenges through expert accounting, taxation, audit, and
                  compliance services.
                </motion.p>

                <motion.p
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.2,
                    ease: "easeOut",
                  }}
                  className="text-muted-foreground md:text-justify leading-relaxed"
                >
                  My approach combines technical expertise, industry knowledge,
                  and practical business insight to help clients remain
                  compliant, improve financial clarity, and make confident
                  decisions for sustainable growth.
                </motion.p>
              </div>

              <div className="my-8 border-t border-border" />

              {/* Features */}
              <div>
                <motion.h4
                  initial={{
                    opacity: 0,
                    y: 15,
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    ease: "easeOut",
                  }}
                  className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6"
                >
                  Why Clients Choose Me
                </motion.h4>

                <div className="grid sm:grid-cols-2 gap-y-5 gap-x-8">
                  {FEATURES.map((feature, idx) => (
                    <motion.div
                      key={idx}
                      initial={{
                        opacity: 0,
                        x: -10,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.4,
                        delay: idx * 0.05,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-3"
                    >
                      <CheckCircle className="h-5 w-5 text-primary shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quote */}
              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.25,
                  ease: "easeOut",
                }}
                className="mt-10 border-l-4 border-primary pl-5"
              >
                <p className="italic text-muted-foreground leading-relaxed">
                  My goal is to help businesses remain compliant, strengthen
                  their financial foundation, and achieve sustainable long-term
                  growth through trusted professional guidance.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
