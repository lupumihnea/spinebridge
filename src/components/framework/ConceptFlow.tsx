import {
  Activity,
  BriefcaseBusiness,
  Footprints,
  Home,
  Stethoscope
} from "lucide-react";

import { frameworkDomains } from "@/data/framework";

const domainIcons = [Stethoscope, Home, Footprints, BriefcaseBusiness, Activity];

export function ConceptFlow() {
  return (
    <div className="max-w-full overflow-hidden rounded-panel border border-white/15 bg-ink p-5 text-white shadow-soft">
      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase text-white/60">Cadrul propus în articol</p>
        <h2 className="mt-1 break-words text-2xl font-black">
          Cinci domenii pentru recuperare funcțională
        </h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-white/68">
          Fiecare domeniu traduce ideea academică în întrebări simple pentru pacient și clinician.
        </p>
      </div>
      <div className="mt-5 grid gap-3">
        {frameworkDomains.map((domain, index) => {
          const Icon = domainIcons[index] ?? Stethoscope;

          return (
            <div key={domain.id} className="grid min-w-0 grid-cols-[2.75rem_minmax(0,1fr)] gap-3 rounded-panel border border-white/10 bg-white/10 p-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-white text-clinical">
                <Icon aria-hidden="true" size={20} />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-black uppercase text-clinical">Pasul {domain.order}</p>
                <h3 className="mt-1 break-words text-base font-black leading-6 text-white">
                  {domain.title}
                </h3>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
