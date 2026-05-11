import { ArrowRight } from "lucide-react";

import { conceptSteps } from "@/data/framework";

export function ConceptFlow() {
  return (
    <div className="max-w-full overflow-hidden rounded-panel border border-white/15 bg-ink p-5 text-white shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase text-white/60">Model conceptual</p>
          <h2 className="mt-1 break-words text-xl font-semibold">
            De la evaluare la încredere funcțională
          </h2>
        </div>
        <div className="hidden rounded-panel border border-white/15 px-3 py-2 text-xs text-white/70 sm:block">
          Demo educațional
        </div>
      </div>
      <div className="mt-5 grid gap-3">
        {conceptSteps.map((step, index) => (
          <div key={step.id} className="flex min-w-0 gap-3">
            <div className="flex flex-col items-center">
              <span className="flex h-8 w-8 items-center justify-center rounded-panel bg-white text-sm font-bold text-ink">
                {index + 1}
              </span>
              {index < conceptSteps.length - 1 ? (
                <span className="my-1 h-full min-h-6 w-px bg-white/20" />
              ) : null}
            </div>
            <div className="min-w-0 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <p className="min-w-0 break-words font-semibold">{step.label}</p>
                {index < conceptSteps.length - 1 ? (
                  <ArrowRight aria-hidden="true" className="shrink-0 text-clinical" size={15} />
                ) : null}
              </div>
              <p className="mt-1 break-words text-sm leading-6 text-white/70">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
