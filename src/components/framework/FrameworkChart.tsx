import { MessageSquareText } from "lucide-react";

import { frameworkDomains } from "@/data/framework";
import type { PatientScenario } from "@/types/demo";

const colorByStyle = {
  clinical: "#0f766e",
  clay: "#b85c38",
  saffron: "#c78b1c",
  graphite: "#24302c",
  signal: "#b42318"
};

const emphasisByPatient: Record<string, Record<string, number>> = {
  "runner-recreational": {
    "diagnostic-safety": 72,
    "basic-mobilization": 58,
    "trunk-walking-reconditioning": 84,
    "work-activity-sport-dialogue": 88,
    "long-term-self-management": 66
  },
  "office-driving": {
    "diagnostic-safety": 66,
    "basic-mobilization": 76,
    "trunk-walking-reconditioning": 62,
    "work-activity-sport-dialogue": 90,
    "long-term-self-management": 70
  },
  "physical-worker": {
    "diagnostic-safety": 74,
    "basic-mobilization": 68,
    "trunk-walking-reconditioning": 76,
    "work-activity-sport-dialogue": 94,
    "long-term-self-management": 78
  },
  "gym-no-pain": {
    "diagnostic-safety": 82,
    "basic-mobilization": 54,
    "trunk-walking-reconditioning": 72,
    "work-activity-sport-dialogue": 96,
    "long-term-self-management": 84
  }
};

interface FrameworkChartProps {
  patient: PatientScenario;
}

export function FrameworkChart({ patient }: FrameworkChartProps) {
  const emphasis = emphasisByPatient[patient.id] ?? emphasisByPatient["runner-recreational"];

  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
      <div className="flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <MessageSquareText aria-hidden="true" size={21} />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-black uppercase text-clinical">Pentru cazul ales</p>
          <h3 className="mt-1 text-2xl font-black text-ink">Parcursul celor 5 pași din articol</h3>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            Accentul vizual se schimbă după exemplul selectat, dar ordinea rămâne progresia propusă:
            orientare, autonomie, control, discuție despre activitate și autogestionare.
          </p>
        </div>
      </div>
      <div
        aria-label="Accent educațional demonstrativ pe pașii cadrului"
        className="mt-6 grid gap-3"
        role="list"
      >
        {frameworkDomains.map((domain, index) => (
          <div
            className="grid gap-3 rounded-panel border border-ink/10 bg-surface-muted p-4 sm:grid-cols-[4.5rem_minmax(0,1fr)_3.5rem] sm:items-center"
            key={domain.id}
            role="listitem"
          >
            <div className="flex items-center gap-3 sm:block">
              <span
                className="inline-flex h-11 w-11 items-center justify-center rounded-full text-sm font-black text-white shadow-panel"
                style={{ backgroundColor: colorByStyle[domain.visualStyleKey] }}
              >
                {domain.order}
              </span>
              {index < frameworkDomains.length - 1 ? (
                <span
                  aria-hidden="true"
                  className="hidden h-8 w-px translate-x-5 bg-ink/15 sm:block"
                />
              ) : null}
            </div>
            <div className="min-w-0">
              <p
                className="text-sm font-black uppercase leading-5"
                style={{ color: colorByStyle[domain.visualStyleKey] }}
              >
                Pasul {domain.order}: {domain.academicLabel}
              </p>
              <p className="mt-1 text-base font-black leading-6 text-ink">{domain.title}</p>
              <div
                aria-hidden="true"
                className="mt-3 h-3 overflow-hidden rounded-full border border-ink/10 bg-white shadow-inset"
              >
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${emphasis[domain.id] ?? 60}%`,
                    backgroundColor: colorByStyle[domain.visualStyleKey]
                  }}
                />
              </div>
            </div>
            <p className="text-right text-base font-black text-ink">{emphasis[domain.id] ?? 60}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
