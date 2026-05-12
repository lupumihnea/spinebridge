import React from "react";

import { FooterDisclaimer } from "@/components/layout/FooterDisclaimer";
import { TopNavigation } from "@/components/layout/TopNavigation";
import { SafetyBanner } from "@/components/safety/SafetyBanner";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <SafetyBanner />
      <TopNavigation />
      {children}
      <FooterDisclaimer />
    </div>
  );
}
