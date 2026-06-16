import type { Metadata } from "next";
import "./globals.css";
import Providers from "@/components/providers/provider";

import { Poppins } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeHydrator } from "@/components/ThemeHydrator";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Mohan Khatri",
  description: "A young chartered accountant from Butwal",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  console.log(process.env.NEXT_PUBLIC_BACKEND_API_URL);
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className={cn("font-sans")}>
        <ThemeHydrator />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
