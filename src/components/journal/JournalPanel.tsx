import type { Dispatch, SetStateAction } from "react";
import { AlertTriangle, ClipboardList } from "lucide-react";

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
    <div className="grid gap-5 lg:grid-cols-[1fr_1fr]">
      <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clay/10 text-clay">
            <ClipboardList aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-clay">Jurnal demonstrativ</p>
            <h3 className="text-xl font-black text-ink">Observații de comunicat</h3>
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
        <label className="mt-4 block">
          <span className="text-sm font-black text-ink">Notă scurtă pentru prezentare</span>
          <textarea
            className="focus-ring premium-transition mt-2 min-h-24 w-full resize-none rounded-panel border border-ink/10 bg-paper/70 p-3 text-sm font-semibold leading-6 text-ink placeholder:text-muted/70 hover:border-clinical/25"
            maxLength={280}
            onChange={(event) =>
              setState((current) => ({ ...current, briefNote: event.target.value }))
            }
            placeholder="Exemplu: întrebări despre navetă, stat prelungit la birou sau comunicarea simptomelor."
            value={state.briefNote}
          />
        </label>
      </div>

      <div className="rounded-panel border border-signal/20 bg-white p-5 shadow-panel sm:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-signal text-white">
            <AlertTriangle aria-hidden="true" size={20} />
          </span>
          <div>
            <p className="text-sm font-black uppercase text-signal">Semnale de alarmă</p>
            <h3 className="text-xl font-black text-ink">Comunicare promptă, fără interpretare</h3>
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
