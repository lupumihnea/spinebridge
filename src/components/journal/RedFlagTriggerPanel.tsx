"use client";

import React from "react";
import { AlertTriangle, FileText, MessageSquareText } from "lucide-react";

import { redFlagEscalation } from "@/data/safety";

export const redFlagWhyExplanation =
  "Pentru că aceste semnale pot marca o schimbare importantă față de jurnalul obișnuit. SpineBridge Live nu interpretează cauza și nu modifică activitatea; evidențiază informația pentru dialog cu echipa medicală.";

export const redFlagConsultationQuestions = [
  "Când a apărut semnalul și în ce context?",
  "Este nou sau diferit față de ultimele zile?",
  "S-a schimbat mersul, sensibilitatea, forța sau controlul urinar/intestin?",
  "Ce activitate era planificată când a fost observat?",
  "Ce valori din jurnal merită arătate echipei medicale?"
];

interface RedFlagTriggerPanelProps {
  activityLabel: string;
  briefVisible: boolean;
  entryDate: string;
  onGenerateBrief: () => void;
  patientLabel: string;
  triggeredFlags: string[];
}

export function RedFlagTriggerPanel({
  activityLabel,
  briefVisible,
  entryDate,
  onGenerateBrief,
  patientLabel,
  triggeredFlags
}: RedFlagTriggerPanelProps) {
  const visibleFlags =
    triggeredFlags.length > 0 ? triggeredFlags : ["Semnal de alarmă selectat în jurnal"];

  return (
    <section
      aria-live="polite"
      className="rounded-panel border-2 border-signal bg-signal p-5 text-white shadow-soft sm:p-7"
      data-testid="red-flag-trigger-panel"
    >
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-4">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-panel bg-white text-signal shadow-panel">
            <AlertTriangle aria-hidden="true" size={28} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-white/80">
              Semnal pentru comunicare medicală
            </p>
            <h2 className="text-safe-wrap mt-2 text-2xl font-black leading-tight sm:text-4xl">
              Semn de alarmă selectat. Nu ajusta exercițiile singur pe baza aplicației.
              Contactează echipa medicală sau solicită evaluare medicală.
            </h2>
          </div>
        </div>
        <div className="rounded-panel border border-white/25 px-4 py-3 text-sm font-bold leading-6 text-white/90">
          {redFlagEscalation}
        </div>
      </div>

      <div className="mt-6 grid gap-2 sm:grid-cols-3">
        {["Nu concluzie clinică", "Nu conduită", "Nu progresie"].map((boundary) => (
          <div
            className="rounded-panel border border-white/20 bg-white/12 px-3 py-2 text-center text-xs font-black uppercase text-white"
            key={boundary}
          >
            {boundary}
          </div>
        ))}
      </div>

      <div className="mt-7 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="border-t border-white/25 pt-5">
          <p className="text-sm font-black uppercase text-white/80">Semnale selectate</p>
          <ul className="mt-4 space-y-3">
            {visibleFlags.map((flag) => (
              <li className="flex gap-3 text-base font-bold leading-7" key={flag}>
                <span className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full bg-white" />
                <span>{flag}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-white/25 pt-5">
          <p className="text-sm font-black uppercase text-white/80">De ce?</p>
          <p className="mt-4 text-base font-semibold leading-8 text-white">
            {redFlagWhyExplanation}
          </p>
        </div>
      </div>

      <div className="mt-7 border-t border-white/25 pt-5">
        <div className="flex items-center gap-3">
          <MessageSquareText aria-hidden="true" size={22} />
          <p className="text-sm font-black uppercase text-white/85">
            Ce pregătesc pentru consultație?
          </p>
        </div>
        <ol className="mt-4 grid gap-3 md:grid-cols-2">
          {redFlagConsultationQuestions.map((question, index) => (
            <li className="text-sm font-semibold leading-6 text-white" key={question}>
              <span className="mr-2 font-black text-white/70">{index + 1}.</span>
              {question}
            </li>
          ))}
        </ol>
      </div>

      <div className="mt-7 flex flex-col gap-4 border-t border-white/25 pt-5 sm:flex-row sm:items-center sm:justify-between">
        <button
          className="focus-ring inline-flex min-h-12 items-center justify-center gap-2 rounded-panel bg-white px-5 py-3 text-sm font-black text-signal transition hover:-translate-y-0.5"
          onClick={onGenerateBrief}
          type="button"
        >
          <FileText aria-hidden="true" size={18} />
          Generează brief pentru consultație
        </button>
        <p className="max-w-xl text-sm font-semibold leading-6 text-white/85">
          Brief-ul este demonstrativ și folosește numai date fictive din această pagină.
        </p>
      </div>

      {briefVisible ? (
        <div className="mt-5 border-t border-white/25 pt-5" data-testid="red-flag-brief">
          <p className="text-sm font-black uppercase text-white/80">
            Brief demonstrativ generat
          </p>
          <div className="mt-3 grid gap-3 text-sm font-semibold leading-6 text-white lg:grid-cols-3">
            <p>Pacient fictiv: {patientLabel}</p>
            <p>Data intrării: {entryDate}</p>
            <p>Activitate țintă: {activityLabel}</p>
          </div>
          <p className="mt-3 text-sm font-semibold leading-6 text-white/85">
            Include semnalele selectate și întrebările de mai sus pentru o discuție structurată cu
            echipa medicală.
          </p>
        </div>
      ) : null}
    </section>
  );
}
