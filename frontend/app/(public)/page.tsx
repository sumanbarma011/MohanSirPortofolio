"use client";

import Hero from "@/components/landing/Hero";
import ClientCompanyList from "@/components/landing/ClientCompanyList";

import { About } from "@/components/landing/About";
import SkillsShowcase from "@/components/landing/SkillsShowcase";
import AreasOfWork from "@/components/landing/AreasOfWork";
import BlogSection from "@/components/landing/BlogsSection";
import ContactSection from "@/features/core/contact/components/ContactSection";
import ServicesSection from "@/components/landing/Services";

export default function Home() {
  return (
    <>
      <Hero />
      <ClientCompanyList />
      <About />
      <SkillsShowcase />
      <AreasOfWork />

      <ServicesSection />
      <BlogSection />
      <ContactSection />
    </>
  );
}
