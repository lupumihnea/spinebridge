import React, { type ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ActionLinkProps {
  href: string;
  children: ReactNode;
  icon?: ReactNode;
  variant?: "primary" | "secondary";
}

export function ActionLink({ href, children, icon, variant = "primary" }: ActionLinkProps) {
  return (
    <a
      className={cn(
        "focus-ring premium-transition inline-flex min-h-12 w-full min-w-0 items-center justify-center gap-2 rounded-panel border px-5 py-3 text-center text-sm font-black shadow-panel sm:w-auto",
        variant === "primary" &&
          "border-ink bg-ink text-white hover:-translate-y-0.5 hover:border-clinical-deep hover:bg-clinical-deep hover:shadow-lift",
        variant === "secondary" &&
          "border-ink/15 bg-white/88 text-ink hover:-translate-y-0.5 hover:border-clinical/40 hover:bg-white hover:shadow-lift"
      )}
      href={href}
    >
      {icon}
      <span className="min-w-0 break-words">{children}</span>
    </a>
  );
}
