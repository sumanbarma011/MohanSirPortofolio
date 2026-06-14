import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { CA_SKILLS } from "@/mockdata/CA_SKILLS";

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

export default function SkillsShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section
      id="skills"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background text-foreground overflow-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          transition={{
            duration: 0.7,
            ease: "easeOut",
          }}
          className="max-w-3xl mb-14"
        >
          <span className="inline-flex items-center rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Skills
          </span>

          <h2 className="mt-4 text-4xl font-bold tracking-tight">
            Areas of Expertise
          </h2>

          <p className="mt-4 text-muted-foreground leading-relaxed">
            Professional accounting, taxation, compliance, and advisory services
            designed to help businesses operate efficiently and remain
            financially compliant.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-12">
          <motion.div
            initial={{
              opacity: 0,
              x: -30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <div className="border-l border-border">
              {CA_SKILLS.map((item, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full text-left px-5 py-4 transition-colors cursor-pointer ${
                    activeTab === idx
                      ? "border-l-2 border-primary text-foreground font-semibold -ml-px"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.category}
                </motion.button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
              x: 30,
            }}
            whileInView={{
              opacity: 1,
              x: 0,
            }}
            viewport={{ once: true }}
            transition={{
              duration: 0.6,
              ease: "easeOut",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: -10,
                }}
                transition={{
                  duration: 0.3,
                  ease: "easeOut",
                }}
              >
                <div className="mb-8">
                  <h3 className="text-2xl font-semibold">
                    {CA_SKILLS[activeTab].category}
                  </h3>

                  <p className="mt-3 text-muted-foreground leading-relaxed max-w-2xl">
                    {CA_SKILLS[activeTab].description}
                  </p>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  {CA_SKILLS[activeTab].skills.map((skill, index) => (
                    <motion.div
                      key={skill}
                      initial={{
                        opacity: 0,
                        y: 15,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      transition={{
                        duration: 0.35,
                        delay: index * 0.05,
                        ease: "easeOut",
                      }}
                      whileHover={{
                        y: -2,
                      }}
                      className="flex items-center gap-3 rounded-xs border border-border bg-card px-4 py-4 transition-colors hover:bg-muted/40"
                    >
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                      <span className="text-sm font-medium">{skill}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
