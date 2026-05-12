import { AlertTriangle, ShieldCheck } from "lucide-react";

import { layoutSafetyStatement, safetyMessages } from "@/data/safety";

export function SafetyBanner() {
  return (
    <div className="no-print max-w-full border-b border-clinical/25 bg-graphite text-white shadow-inset">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-panel bg-clinical text-white shadow-panel">
            <ShieldCheck aria-hidden="true" size={19} />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-safe-wrap text-sm font-black leading-6 text-white sm:text-base">
              {layoutSafetyStatement}
            </p>
            <p className="text-safe-wrap mt-1 text-sm font-semibold leading-5 text-white/72">
              {safetyMessages[1]}
            </p>
          </div>
        </div>
        <div className="flex w-full min-w-0 max-w-full items-start gap-2 rounded-panel border border-signal/40 bg-signal/25 px-3 py-2 text-sm font-black leading-5 text-white lg:w-auto">
          <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={16} />
          <span className="text-safe-wrap block min-w-0 flex-1 whitespace-normal">
            Semnalele de alarmă se comunică prompt echipei medicale.
          </span>
        </div>
      </div>
    </div>
  );
}
