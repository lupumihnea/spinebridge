import { AlertTriangle } from "lucide-react";

import { strongDisclaimer } from "@/data/safety";

export function DisclaimerCard() {
  return (
    <div className="max-w-full rounded-panel border border-signal/25 bg-white p-5 shadow-panel">
      <div className="flex min-w-0 items-start gap-3">
        <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-signal text-white shadow-panel">
          <AlertTriangle aria-hidden="true" size={22} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-safe-wrap text-lg font-black leading-7 text-ink">
            {strongDisclaimer}
          </p>
          <p className="text-safe-wrap mt-2 text-sm font-semibold leading-6 text-muted">
            Toate scenariile sunt fictive, iar aplicația organizează informații pentru dialog
            clinic, nu pentru decizii clinice.
          </p>
        </div>
      </div>
    </div>
  );
}
