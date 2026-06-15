"use client";

import { useServiceForm } from "../services.hooks";
import { CreateServiceForm } from "./CreateServiceForm";

export const CreateServicePage = () => {
  const formState = useServiceForm();

  return (
    <div className="p-6 bg-background text-foreground">
      <div className="mb-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Create New Service
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Deploy an optimized new compliance configuration to your workspace
          framework.
        </p>
      </div>

      <CreateServiceForm formState={formState} />
    </div>
  );
};
