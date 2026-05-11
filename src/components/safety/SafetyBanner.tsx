import { AlertTriangle, ShieldCheck } from "lucide-react";

import { layoutSafetyStatement, safetyMessages } from "@/data/safety";

export function SafetyBanner() {
  return (
    <div className="no-print overflow-hidden border-b border-ink/10 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
            <ShieldCheck aria-hidden="true" size={19} />
          </span>
          <div className="min-w-0">
            <p className="break-words text-sm font-semibold text-ink">{layoutSafetyStatement}</p>
            <p className="mt-1 break-words text-xs text-muted">{safetyMessages[1]}</p>
          </div>
        </div>
        <div className="flex w-full min-w-0 items-center gap-2 rounded-panel border border-signal/20 bg-signal/5 px-3 py-2 text-xs font-medium text-signal lg:w-auto">
          <AlertTriangle aria-hidden="true" size={16} />
          <span className="min-w-0 break-words">
            Semnalele de alarmă se comunică prompt echipei medicale.
          </span>
        </div>
      </div>
    </div>
  );
}
