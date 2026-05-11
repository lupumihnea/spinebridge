import { AlertTriangle } from "lucide-react";

import { strongDisclaimer } from "@/data/safety";

export function DisclaimerCard() {
  return (
    <div className="overflow-hidden rounded-panel border border-signal/20 bg-white p-4 shadow-panel">
      <div className="flex min-w-0 items-start gap-3">
        <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-panel bg-signal/10 text-signal">
          <AlertTriangle aria-hidden="true" size={20} />
        </span>
        <div className="min-w-0">
          <p className="break-words text-base font-bold text-ink">{strongDisclaimer}</p>
          <p className="mt-2 break-words text-sm leading-6 text-muted">
            Toate scenariile sunt fictive, iar aplicația organizează informații pentru dialog
            clinic, nu pentru decizii clinice.
          </p>
        </div>
      </div>
    </div>
  );
}
