import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ContactResponseType } from "./contact.types";

interface ContactState {
  submittedData: ContactResponseType | null;
  setSubmittedData: (data: ContactResponseType) => void;
  clearSubmittedData: () => void;
}

export const useContactStore = create<ContactState>()(
  persist(
    (set) => ({
      submittedData: null,
      setSubmittedData: (data) => set({ submittedData: data }),
      clearSubmittedData: () => set({ submittedData: null }),
    }),
    {
      name: "accountant",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
