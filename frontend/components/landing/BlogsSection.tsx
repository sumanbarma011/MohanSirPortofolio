"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { BlogData } from "@/mockdata/BlogData";
import { cn } from "@/lib/utils";

export default function BlogSection() {
  return (
    <section
      id="blogs"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-x-hidden"
    >
      <div className="max-w-7xl">
        {/* Section Header  */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left mb-16"
        >
          <span className="inline-flex items-start rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            Insights & Knowledge
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Latest Articles
          </h2>
          <p className="mt-4  text-muted-foreground">
            Practical insights on taxation, auditing, compliance, financial
            reporting, and business growth.
          </p>
        </motion.div>

        {/* Blog Feed Grid Matrix */}
        <div className="space-y-20">
          {BlogData.map((blog, index) => (
            <motion.article
              key={blog.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: "easeOut",
              }}
              className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
            >
              {/* Media Block  */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? -30 : 30,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className={cn("group", index % 2 !== 0 ? "lg:order-2" : "")}
              >
                <div className="relative overflow-hidden rounded-3xl border border-border">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    transition={{ duration: 0.4 }}
                  >
                    <Image
                      src={blog.images[0] || "/placeholder.jpg"}
                      alt={blog.title}
                      width={700}
                      height={450}
                      className="w-full h-[320px] object-cover"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Text Block  */}
              <motion.div
                initial={{
                  opacity: 0,
                  x: index % 2 === 0 ? 30 : -30,
                }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: "easeOut",
                }}
                className={cn("space-y-5", index % 2 !== 0 ? "lg:order-1" : "")}
              >
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.15 }}
                  className="inline-flex rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground"
                >
                  Finance
                </motion.span>

                <h3 className="text-3xl font-bold text-foreground leading-tight">
                  {blog.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {blog.description}
                </p>

                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={blog.slug}
                    className="inline-flex items-center gap-2 text-primary font-medium group"
                  >
                    Read Article
                    <motion.div
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.article>
          ))}
        </div>

        {/* Footer Archive CTA Link */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mt-20 flex justify-center"
        >
          <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
            <Link
              href="/blogs"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card px-6 py-3 text-foreground font-medium transition-all duration-300 hover:border-primary hover:text-primary"
            >
              View All Articles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
