import { Footer } from "@/components/Footer";
import Header from "@/components/landing/Header";
import { cn } from "@/lib/utils";
import LenisScrollProvider from "@/providers/lenis-provider";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <LenisScrollProvider>
      <div className="max-w-7xl mx-auto">
        <Header />
        <main className={cn("max-w-[1400px] w-full")}>{children}</main>
        <Footer />
      </div>
    </LenisScrollProvider>
  );
}
