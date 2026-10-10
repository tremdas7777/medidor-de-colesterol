import type { ReactNode } from "react";
import { CardioFooter, CardioHeader } from "@/components/cardio/Chrome";

export function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#faf9f6]">
      <CardioHeader />
      <main className="flex-1">{children}</main>
      <CardioFooter />
    </div>
  );
}
