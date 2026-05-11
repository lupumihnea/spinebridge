import { BookOpen, MessageSquareText } from "lucide-react";

import { frameworkDomains } from "@/data/framework";
import { cn } from "@/lib/utils";

const accentClasses = {
  clinical: "border-clinical/30 bg-clinical/10 text-clinical",
  clay: "border-clay/30 bg-clay/10 text-clay",
  saffron: "border-saffron/35 bg-saffron/10 text-saffron",
  graphite: "border-graphite/25 bg-graphite/10 text-graphite",
  signal: "border-signal/30 bg-signal/10 text-signal"
};

interface FrameworkMapProps {
  selectedDomainId: string;
  onSelectDomain: (domainId: string) => void;
}

export function FrameworkMap({ selectedDomainId, onSelectDomain }: FrameworkMapProps) {
  return (
    <section id="cadru" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-clinical">Cadru educațional</p>
        <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
          Cinci domenii pentru o conversație mai clară
        </h2>
        <p className="mt-4 text-base leading-7 text-muted">
          Domeniile structurează educația și auto-monitorizarea. Ele nu funcționează ca
          etape clinice obligatorii sau calendar universal.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {frameworkDomains.map((domain) => {
          const selected = domain.id === selectedDomainId;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "focus-ring flex min-h-72 flex-col justify-between rounded-panel border bg-white p-5 text-left shadow-panel transition duration-200 hover:-translate-y-1",
                selected ? "border-clinical ring-2 ring-clinical/20" : "border-ink/10"
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
                  <BookOpen aria-hidden="true" size={20} />
                </span>
                <p className="mt-5 text-sm font-bold text-clinical">Domeniul {domain.order}</p>
                <h3 className="mt-2 text-lg font-bold leading-6 text-ink">{domain.title}</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  {domain.patientFriendlyMessage}
                </p>
              </div>
              <div className="mt-5 flex items-center gap-2 border-t border-ink/10 pt-4 text-xs font-semibold text-ink">
                <MessageSquareText aria-hidden="true" size={15} />
                <span>{domain.academicLabel}</span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
