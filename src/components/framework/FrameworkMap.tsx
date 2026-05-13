import {
  Activity,
  BriefcaseBusiness,
  ChevronRight,
  Footprints,
  Home,
  Stethoscope
} from "lucide-react";

import { frameworkDomains } from "@/data/framework";
import { cn } from "@/lib/utils";

const accentClasses = {
  clinical: "border-clinical/30 bg-clinical/10 text-clinical",
  clay: "border-clay/30 bg-clay/10 text-clay",
  saffron: "border-saffron/35 bg-saffron/10 text-saffron",
  graphite: "border-graphite/25 bg-graphite/10 text-graphite",
  signal: "border-signal/30 bg-signal/10 text-signal"
};

const accentTextClasses = {
  clinical: "text-clinical",
  clay: "text-clay",
  saffron: "text-saffron",
  graphite: "text-graphite",
  signal: "text-signal"
};

const domainIcons = [Stethoscope, Home, Footprints, BriefcaseBusiness, Activity];

interface FrameworkMapProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
}

export function FrameworkMap({ selectedDomainId, onSelectDomain }: FrameworkMapProps) {
  return (
    <section id="cadru" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-black uppercase text-clinical">Cadru educațional</p>
        <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
          Cinci domenii pentru o conversație mai clară
        </h2>
        <p className="mt-4 text-base font-semibold leading-7 text-muted">
          Mai jos vezi cele cinci domenii propuse de articol. Alege unul ca să vezi ce întrebări,
          observații și idei poate pregăti pacientul pentru discuția cu clinicianul.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {frameworkDomains.map((domain, index) => {
          const selected = domain.id === selectedDomainId;
          const Icon = domainIcons[index] ?? Stethoscope;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "focus-ring premium-transition flex min-h-72 flex-col justify-between rounded-panel border bg-white p-5 text-left shadow-panel hover:-translate-y-1 hover:shadow-lift",
                selected ? "border-clinical ring-2 ring-clinical/20" : "border-ink/10 hover:border-clinical/30"
              )}
              key={domain.id}
              onClick={() => onSelectDomain(domain.id)}
              type="button"
            >
              <div>
                <span
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-panel border",
                    accentClasses[domain.visualStyleKey]
                  )}
                >
                  <Icon aria-hidden="true" size={20} />
                </span>
                <p
                  className={cn(
                    "mt-5 text-sm font-black",
                    accentTextClasses[domain.visualStyleKey]
                  )}
                >
                  Pasul {domain.order}
                </p>
                <h3 className="mt-2 text-lg font-black leading-6 text-ink">{domain.title}</h3>
                <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                  {domain.patientFriendlyMessage}
                </p>
              </div>
              <div className="mt-5 flex items-center justify-between gap-2 border-t border-ink/10 pt-4 text-xs font-black uppercase text-ink">
                <span>{selected ? "Pas selectat" : "Vezi detalii"}</span>
                <ChevronRight aria-hidden="true" size={15} />
              </div>
            </button>
          );
        })}
      </div>

    </section>
  );
}
