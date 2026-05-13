import React from "react";

import { TopNavigation } from "@/components/layout/TopNavigation";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-shell">
      <TopNavigation />
      {children}
    </div>
  );
}
