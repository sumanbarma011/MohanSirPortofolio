"use client";

import { CreateCompanyView } from "@/features/core/company/components/CreateCompanyView";
import { useCreateCompanyForm } from "@/features/core/company/hooks/useCreateCompanyForm";

export default function CreateCompanyPage() {
  const controller = useCreateCompanyForm();

  return <CreateCompanyView formController={controller} />;
}
