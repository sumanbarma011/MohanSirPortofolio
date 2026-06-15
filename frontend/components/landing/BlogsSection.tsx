"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllBlogsQueryOptions } from "@/features/core/blogs/blog.query.options";

const fadeUpVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function BlogSection() {
  // Fetch dynamic blog data from your Query Options configuration
  const {
    data: dynamicBlogs,
    isLoading,
    isError,
  } = useQuery(getAllBlogsQueryOptions);

  // Safely intercept query response structures
  const blogs = dynamicBlogs?.data ?? [];

  return (
    <section
      id="blogs"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-background overflow-x-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUpVariants}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-left mb-16"
        >
          <span className="inline-flex items-start rounded-full border border-border bg-muted px-4 py-1.5 text-sm text-muted-foreground">
            Insights & Knowledge
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Latest Articles
          </h2>
          <p className="mt-4 text-muted-foreground">
            Practical insights on taxation, auditing, compliance, financial
            reporting, and business growth.
          </p>
        </motion.div>

        {/* Blog Feed Grid Matrix */}
        <div className="space-y-20">
          {isLoading ? (
            // Layout-matched Skeleton Loading Component State
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={`blog-skeleton-${index}`}
                className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Media Block Skeleton */}
                <div
                  className={cn("w-full", index % 2 !== 0 ? "lg:order-2" : "")}
                >
                  <Skeleton className="w-full h-[320px] rounded-3xl border border-border" />
                </div>
                {/* Text Block Skeleton */}
                <div
                  className={cn(
                    "space-y-5",
                    index % 2 !== 0 ? "lg:order-1" : "",
                  )}
                >
                  <Skeleton className="h-5 w-24 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-8 w-[85%] rounded-md" />
                    <Skeleton className="h-8 w-[60%] rounded-md" />
                  </div>
                  <div className="space-y-2.5">
                    <Skeleton className="h-4 w-full rounded-md" />
                    <Skeleton className="h-4 w-[90%] rounded-md" />
                    <Skeleton className="h-4 w-[75%] rounded-md" />
                  </div>
                  <Skeleton className="h-5 w-28 rounded-md" />
                </div>
              </div>
            ))
          ) : isError ? (
            <div className="text-center py-12 border border-dashed border-border rounded-3xl bg-card">
              <p className="text-destructive font-medium">
                Failed to load articles.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Please refresh the interface or try again later.
              </p>
            </div>
          ) : blogs.length === 0 ? (
            <div className="text-center py-12 border border-dashed border-border rounded-3xl bg-card">
              <p className="text-muted-foreground font-medium">
                No publications found.
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                Check back later for newly released audit metrics.
              </p>
            </div>
          ) : (
            blogs.slice(0, 4).map((blog, index) => (
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
                {/* Media Block */}
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
                  <div className="relative overflow-hidden rounded-3xl border border-border bg-muted">
                    <motion.div
                      whileHover={{ scale: 1.03 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Image
                        src={
                          blog.images?.[0]?.url ||
                          blog.images?.[0]?.url ||
                          "/placeholder.jpg"
                        }
                        alt={blog.title}
                        width={700}
                        height={450}
                        className="w-full h-[320px] object-cover"
                        priority={index === 0}
                      />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Text Block */}
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
                  className={cn(
                    "space-y-5",
                    index % 2 !== 0 ? "lg:order-1" : "",
                  )}
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

                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {blog.content ||
                      "Read the latest update regarding our analytical breakdown guidelines."}
                  </p>

                  <motion.div
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/blogs/${blog.id}`}
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
            ))
          )}
        </div>

        {/* Footer Archive CTA Link (Hidden while Loading or Empty to preserve layouts) */}
        {!isLoading && blogs.length > 0 && (
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
        )}
      </div>
    </section>
  );
}
