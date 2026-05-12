"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertTriangle,
  Brain,
  ClipboardCheck,
  MessageSquareText,
  RotateCcw,
  ShieldCheck,
  Sparkles
} from "lucide-react";

import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import {
  analyzeTeachBack,
  teachBackDemoExample,
  type TeachBackAnalyzerInput
} from "@/lib/teachBackAnalyzer";
import { cn } from "@/lib/utils";

const emptyInput: TeachBackAnalyzerInput = {
  fractureUnderstanding: teachBackDemoExample.input,
  restrictions: "",
  redFlagSymptoms: "",
  workSportDifference: ""
};

const clearInput: TeachBackAnalyzerInput = {
  fractureUnderstanding: "",
  restrictions: "",
  redFlagSymptoms: "",
  workSportDifference: ""
};

const fieldConfig: Array<{
  key: keyof TeachBackAnalyzerInput;
  label: string;
  placeholder: string;
}> = [
  {
    key: "fractureUnderstanding",
    label: "Explică în cuvintele tale ce ai înțeles despre fractură",
    placeholder: "Exemplu: înțeleg ce s-a întâmplat, ce trebuie urmărit și ce nu decide aplicația."
  },
  {
    key: "restrictions",
    label: "Ce restricții ți-au fost comunicate?",
    placeholder: "Scrie doar restricții deja comunicate de medic, clinician sau echipa medicală."
  },
  {
    key: "redFlagSymptoms",
    label: "Ce simptome te-ar face să contactezi medicul?",
    placeholder: "Exemplu: slăbiciune nouă, amorțeală, modificări ale mersului sau alte semnale comunicate."
  },
  {
    key: "workSportDifference",
    label: "Care este diferența dintre revenirea la muncă și revenirea la sport?",
    placeholder: "Descrie de ce sunt discuții separate, cu sarcini și cerințe diferite."
  }
];

function scoreTone(score: number) {
  if (score >= 75) {
    return {
      label: "claritate bună pentru dialog",
      color: "text-clinical",
      surface: "border-clinical/25 bg-clinical/10"
    };
  }

  if (score >= 45) {
    return {
      label: "claritate parțială",
      color: "text-saffron",
      surface: "border-saffron/35 bg-saffron/10"
    };
  }

  return {
    label: "necesită clarificare",
    color: "text-signal",
    surface: "border-signal/30 bg-signal/10"
  };
}

export function TeachBackPage() {
  const [input, setInput] = useState<TeachBackAnalyzerInput>(emptyInput);

  const analysis = useMemo(() => analyzeTeachBack(input), [input]);
  const tone = scoreTone(analysis.clarityScore);

  function updateField(key: keyof TeachBackAnalyzerInput, value: string) {
    setInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
              <Brain aria-hidden="true" size={17} />
              <span>Teach-Back</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Asistent de claritate pentru ce a înțeles pacientul
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Pacientul formulează în propriile cuvinte. Aplicația marchează neclarități și
              concepții riscante pentru dialog clinic, fără diagnostic, tratament sau progresie.
            </p>
          </div>

          <aside className="rounded-panel border border-signal/20 bg-white p-5 shadow-soft">
            <p className="text-sm font-black uppercase text-signal">Limită vizibilă</p>
            <p className="mt-3 text-xl font-black leading-7 text-ink">
              Analiza este educațională. Nu validează activități, nu schimbă restricții și nu
              transformă lipsa durerii în concluzie clinică.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <EvidenceBoundaryLayer surface="teach-back" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8">
        <div className="grid gap-5">
          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-black uppercase text-clinical">
                  Răspunsuri teach-back
                </p>
                <h2 className="mt-1 text-2xl font-black text-ink">Scrie ce ai înțeles</h2>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <button
                  className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-clinical bg-clinical px-4 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
                  onClick={() => setInput(emptyInput)}
                  type="button"
                >
                  <Sparkles aria-hidden="true" size={16} />
                  Exemplu demo
                </button>
                <button
                  className="focus-ring inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-ink/15 bg-white px-4 py-2 text-sm font-black text-ink transition hover:-translate-y-0.5"
                  onClick={() => setInput(clearInput)}
                  type="button"
                >
                  <RotateCcw aria-hidden="true" size={16} />
                  Curăță
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-4">
              {fieldConfig.map((field) => (
                <label className="block" key={field.key}>
                  <span className="text-sm font-black text-ink">{field.label}</span>
                  <textarea
                    className="focus-ring mt-2 min-h-28 w-full resize-none rounded-panel border border-ink/10 bg-paper/75 p-4 text-sm font-semibold leading-7 text-ink placeholder:text-muted/70"
                    onChange={(event) => updateField(field.key, event.target.value)}
                    placeholder={field.placeholder}
                    value={input[field.key]}
                  />
                </label>
              ))}
            </div>
          </section>

          <section className="rounded-panel border border-ink/10 bg-ink p-5 text-white shadow-soft">
            <div className="flex items-start gap-3">
              <ShieldCheck aria-hidden="true" className="mt-1 shrink-0 text-clinical" size={22} />
              <div>
                <p className="text-sm font-black uppercase text-white/70">
                  Ce face analiza deterministă
                </p>
                <p className="mt-2 text-base font-semibold leading-7 text-white">
                  Caută indicii de claritate, semnale de alarmă menționate și formulări riscante.
                  Nu oferă pași de tratament, program de exerciții sau decizii despre revenire.
                </p>
              </div>
            </div>
          </section>
        </div>

        <aside className="lg:sticky lg:top-6 lg:self-start">
          <motion.section
            animate={{ opacity: 1, y: 0 }}
            className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft"
            initial={{ opacity: 0, y: 10 }}
            key={analysis.saferRephrasing}
            transition={{ duration: 0.24 }}
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase text-clinical">
                  Asistent de explicație
                </p>
                <h2 className="mt-1 text-2xl font-black text-ink">Claritate teach-back</h2>
              </div>
              <div
                className={cn(
                  "flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-8 text-xl font-black",
                  tone.surface,
                  tone.color
                )}
                style={{
                  backgroundImage: `conic-gradient(currentColor ${analysis.clarityScore}%, rgba(23,32,29,0.08) 0)`
                }}
              >
                <span className="rounded-full bg-white px-2 py-1">{analysis.clarityScore}</span>
              </div>
            </div>

            <div className={cn("mt-5 rounded-panel border p-4", tone.surface)}>
              <p className={cn("text-sm font-black uppercase", tone.color)}>{tone.label}</p>
              <p className="mt-3 text-base font-bold leading-7 text-ink">
                {analysis.saferRephrasing}
              </p>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <AlertTriangle aria-hidden="true" className="text-signal" size={18} />
                <p className="text-sm font-black uppercase text-signal">
                  Concepții riscante sau lipsuri
                </p>
              </div>
              <div className="mt-3 grid gap-2">
                {analysis.riskMisconceptions.length > 0 ? (
                  analysis.riskMisconceptions.map((misconception) => (
                    <div
                      className="rounded-panel border border-signal/15 bg-signal/5 p-3 text-sm font-semibold leading-6 text-ink"
                      key={misconception}
                    >
                      {misconception}
                    </div>
                  ))
                ) : (
                  <div className="rounded-panel border border-clinical/20 bg-clinical/10 p-3 text-sm font-semibold leading-6 text-ink">
                    Nu apar concepții riscante în regulile deterministe curente.
                  </div>
                )}
              </div>
            </div>

            <div className="mt-5">
              <div className="flex items-center gap-2">
                <MessageSquareText aria-hidden="true" className="text-clinical" size={18} />
                <p className="text-sm font-black uppercase text-clinical">
                  Întrebări pentru clinician
                </p>
              </div>
              <ol className="mt-3 space-y-2">
                {analysis.suggestedClinicianQuestions.map((question, index) => (
                  <li
                    className="rounded-panel bg-paper p-3 text-sm font-semibold leading-6 text-ink"
                    key={question}
                  >
                    <span className="mr-2 font-black text-clinical">{index + 1}.</span>
                    {question}
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-5 rounded-panel border border-ink/10 bg-paper p-4">
              <div className="flex items-center gap-2">
                <ClipboardCheck aria-hidden="true" className="text-graphite" size={18} />
                <p className="text-sm font-black uppercase text-graphite">Exemplu demo</p>
              </div>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                Input: “{teachBackDemoExample.input}”
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-ink">
                Output: “{teachBackDemoExample.output}”
              </p>
            </div>
          </motion.section>
        </aside>
      </section>
    </main>
  );
}
