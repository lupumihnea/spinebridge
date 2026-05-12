import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

import { layoutSafetyStatement, safetyMessages } from "@/data/safety";

export function FooterDisclaimer() {
  return (
    <footer className="no-print border-t border-ink/10 bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:px-8">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-panel bg-clinical text-white">
            <ShieldCheck aria-hidden="true" size={22} />
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black uppercase text-clinical">Limită produs</p>
            <p className="mt-2 text-base font-bold leading-7 text-white">{layoutSafetyStatement}</p>
          </div>
        </div>

        <div className="rounded-panel border border-signal/35 bg-signal/15 p-4">
          <div className="flex gap-3">
            <AlertTriangle aria-hidden="true" className="mt-1 shrink-0 text-white" size={20} />
            <div>
              <p className="text-sm font-black uppercase text-white/75">Nu este text mic</p>
              <p className="mt-2 text-base font-bold leading-7 text-white">
                {safetyMessages[2]} {safetyMessages[3]} {safetyMessages[4]}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
