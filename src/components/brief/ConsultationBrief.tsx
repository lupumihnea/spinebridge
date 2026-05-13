"use client";

import { useMemo, useRef } from "react";
import { FileText, Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";

import { redFlags } from "@/data/safety";
import { createConsultationBrief } from "@/lib/brief";
import type { DemoState, EducationalDomain, PatientScenario } from "@/types/demo";

interface ConsultationBriefProps {
  patient: PatientScenario;
  domain: EducationalDomain;
  state: DemoState;
}

export function ConsultationBrief({ patient, domain, state }: ConsultationBriefProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const brief = useMemo(
    () => createConsultationBrief({ patient, domain, state, redFlags }),
    [domain, patient, state]
  );
  const printBrief = useReactToPrint({
    contentRef,
    documentTitle: "SpineBridge-Live-rezumat-demo"
  });

  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
      <div className="mb-5 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-black uppercase text-clinical">Rezumat printabil</p>
          <h2 className="mt-2 text-3xl font-black text-ink">Un rezumat simplu pentru consultație</h2>
        </div>
        <button
          className="focus-ring premium-transition no-print inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-ink bg-ink px-4 py-2 text-sm font-black text-white shadow-panel hover:-translate-y-0.5 hover:bg-clinical-deep hover:shadow-lift"
          onClick={() => printBrief()}
          type="button"
        >
          <Printer aria-hidden="true" size={17} />
          <span>Tipărește rezumatul</span>
        </button>
      </div>

      <article
        className="print-surface rounded-panel border border-ink/10 bg-white p-6 shadow-panel sm:p-8"
        ref={contentRef}
      >
        <div className="flex items-start gap-3 border-b border-ink/10 pb-5">
          <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
            <FileText aria-hidden="true" size={21} />
          </span>
          <div>
            <h3 className="text-2xl font-black text-ink">{brief.title}</h3>
            <p className="mt-2 text-sm font-black leading-6 text-clinical">
              Material educațional generat din date fictive.
            </p>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted">
              Se actualizează după selecțiile făcute mai sus.
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div>
            <p className="text-sm font-black uppercase text-muted">Contextul exemplului</p>
            <p className="mt-2 text-sm font-semibold leading-6 text-ink">{brief.patientLine}</p>
            <p className="mt-3 text-sm font-semibold leading-6 text-ink">{brief.focusLine}</p>
            {state.briefNote ? (
              <p className="mt-3 rounded-panel bg-paper p-3 text-sm leading-6 text-ink">
                Notă demo: {state.briefNote}
              </p>
            ) : null}
          </div>
          <div>
            <p className="text-sm font-black uppercase text-muted">Întrebări propuse</p>
            <ul className="mt-2 space-y-2 text-sm font-semibold leading-6 text-ink">
              {brief.questions.map((question) => (
                <li key={question}>• {question}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-black uppercase text-muted">Observații jurnal</p>
            <ul className="mt-2 space-y-2 text-sm font-semibold leading-6 text-ink">
              {brief.observations.map((observation) => (
                <li key={observation}>• {observation}</li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-sm font-black uppercase text-muted">Semnale de alarmă</p>
            <ul className="mt-2 space-y-2 text-sm font-semibold leading-6 text-ink">
              {brief.redFlags.map((flag) => (
                <li key={flag}>• {flag}</li>
              ))}
            </ul>
          </div>
        </div>
      </article>
    </section>
  );
}
