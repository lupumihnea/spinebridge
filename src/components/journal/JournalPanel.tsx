import type { Dispatch, SetStateAction } from "react";
import { AlertTriangle, ArrowRight, ClipboardList } from "lucide-react";

import { journalItems } from "@/data/journal";
import { redFlagEscalation, redFlags } from "@/data/safety";
import { cn } from "@/lib/utils";
import type { DemoState } from "@/types/demo";

interface JournalPanelProps {
  state: DemoState;
  setState: Dispatch<SetStateAction<DemoState>>;
}

function toggleValue(values: string[], value: string) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

export function JournalPanel({ state, setState }: JournalPanelProps) {
  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_3rem_1fr] lg:items-stretch">
      <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clay/10 text-clay">
            <ClipboardList aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-clay">Pacientul poate nota</p>
            <h3 className="text-xl font-black text-ink">Observații utile pentru consult</h3>
          </div>
        </div>
        <div className="mt-5 grid gap-3">
          {journalItems.map((item) => {
            const checked = state.journalItemIds.includes(item.id);

            return (
              <label
                className={cn(
                  "premium-transition flex cursor-pointer gap-3 rounded-panel border p-4",
                  checked
                    ? "border-clay/40 bg-clay/10 shadow-panel"
                    : "border-ink/10 hover:-translate-y-0.5 hover:border-clay/30 hover:shadow-panel"
                )}
                key={item.id}
              >
                <input
                  checked={checked}
                  className="mt-1 h-4 w-4 accent-clay"
                  onChange={() =>
                    setState((current) => ({
                      ...current,
                      journalItemIds: toggleValue(current.journalItemIds, item.id)
                    }))
                  }
                  type="checkbox"
                />
                <span>
                  <span className="block font-semibold text-ink">{item.label}</span>
                  <span className="mt-1 block text-sm leading-6 text-muted">{item.detail}</span>
                </span>
              </label>
            );
          })}
        </div>
      </div>

      <div className="hidden items-center justify-center lg:flex" aria-hidden="true">
        <span className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/10 bg-white text-clinical shadow-panel">
          <ArrowRight size={20} />
        </span>
      </div>

      <div className="rounded-panel border border-signal/20 bg-white p-5 shadow-panel sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-signal text-white">
            <AlertTriangle aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-signal">Semnale de comunicat</p>
            <h3 className="text-xl font-black text-ink">Bifează dacă apare ceva important</h3>
          </div>
        </div>
        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          {redFlags.map((flag) => {
            const checked = state.redFlagIds.includes(flag.id);

            return (
              <label
                className={cn(
                  "premium-transition flex cursor-pointer gap-3 rounded-panel border p-3 text-sm font-semibold",
                  checked
                    ? "border-signal/50 bg-signal/10 shadow-panel"
                    : "border-ink/10 hover:-translate-y-0.5 hover:border-signal/30 hover:shadow-panel"
                )}
                key={flag.id}
              >
                <input
                  checked={checked}
                  className="mt-1 h-4 w-4 accent-signal"
                  onChange={() =>
                    setState((current) => ({
                      ...current,
                      redFlagIds: toggleValue(current.redFlagIds, flag.id)
                    }))
                  }
                  type="checkbox"
                />
                <span className="leading-6 text-ink">{flag.label}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-4 rounded-panel border border-signal/25 bg-signal/5 p-4 text-sm font-black leading-6 text-signal">
          {redFlagEscalation}
        </p>
      </div>
    </div>
  );
}
