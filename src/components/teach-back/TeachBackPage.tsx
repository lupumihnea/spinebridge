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

import {
  analyzeTeachBack,
  teachBackDemoExample,
  type TeachBackAnalyzerInput
} from "@/lib/teachBackAnalyzer";
import { cn } from "@/lib/utils";

const emptyInput: TeachBackAnalyzerInput = {
  fractureUnderstanding:
    "Dacă nu mă mai doare, pot merge la sală. Cred că lipsa durerii arată că pot reveni complet dacă mă simt bine.",
  restrictions: "",
  redFlagSymptoms: "Aș suna doar dacă durerea devine foarte mare.",
  workSportDifference:
    "Pentru mine munca și sala par asemănătoare dacă nu apare durere în timpul zilei."
};

const clearInput: TeachBackAnalyzerInput = {
  fractureUnderstanding: "",
  restrictions: "",
  redFlagSymptoms: "",
  workSportDifference: ""
};

const exampleInputs: Array<{ label: string; description: string; input: TeachBackAnalyzerInput }> = [
  {
    label: "Sala prea devreme",
    description:
      "Simulează un pacient care completează toate câmpurile, dar confundă lipsa durerii cu permisiunea pentru efort.",
    input: emptyInput
  },
  {
    label: "Restricții clare",
    description: "Un exemplu mai bun pentru dialog: restricții, semnale și muncă vs sport separate.",
    input: {
      fractureUnderstanding:
        "Am înțeles că fractura trebuie urmărită după indicațiile echipei medicale și că nu forțez doar pentru că durerea este mică.",
      restrictions:
        "Mi s-au comunicat restricții despre ridicare, stat prelungit și revenirea treptată la activități, stabilite de clinician.",
      redFlagSymptoms:
        "Aș contacta medicul pentru slăbiciune nouă, amorțeală, durere radiculară severă, modificări urinare sau ale mersului.",
      workSportDifference:
        "Munca, condusul și sportul au cerințe diferite și trebuie discutate separat cu clinicianul."
    }
  },
  {
    label: "Muncă confundată cu sport",
    description: "Scoate la suprafață o neclaritate frecventă: toleranța la birou nu înseamnă sală.",
    input: {
      fractureUnderstanding:
        "Dacă pot sta la birou câteva ore, probabil pot reveni și la antrenamente dacă mă simt bine.",
      restrictions: "Nu mai știu exact ce restricții au fost comunicate.",
      redFlagSymptoms: "Aș suna dacă apare amorțeală sau slăbiciune.",
      workSportDifference: "Cred că sunt asemănătoare dacă nu doare."
    }
  }
];

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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
              <Brain aria-hidden="true" size={17} />
              <span>Teach-Back</span>
            </div>
              <h1 className="text-safe-wrap mt-6 max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Testează claritatea mesajului pacientului
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Scrii ce ai înțeles, alegi un exemplu dacă vrei, iar asistentul marchează unde
              formularea poate deveni mai clară pentru conversația cu clinicianul.
              </p>
          </div>

        </div>
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

            <div className="mt-6 grid gap-3 lg:grid-cols-3">
              {exampleInputs.map((example) => (
                <button
                  className="focus-ring rounded-panel border border-ink/10 bg-paper p-4 text-left transition hover:-translate-y-0.5 hover:border-clinical/30 hover:bg-white hover:shadow-panel"
                  key={example.label}
                  onClick={() => setInput(example.input)}
                  type="button"
                >
                  <p className="text-sm font-black text-clinical">{example.label}</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                    {example.description}
                  </p>
                </button>
              ))}
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
                  Ce vede juriul aici
                </p>
                <div className="mt-3 grid gap-3 text-base font-semibold leading-7 text-white">
                  <p>
                    Pacientul scrie cu propriile cuvinte ce a înțeles. Modulul arată unde mesajul
                    este clar și unde poate deveni o întrebare mai bună pentru consultație.
                  </p>
                  <p className="text-white/80">
                    Regula este transparentă: caută restricții menționate, semnale de alarmă,
                    diferența dintre activități și formulări riscante de tipul „nu doare, deci pot
                    forța”.
                  </p>
                </div>
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
              <div className="relative h-24 w-24 shrink-0">
                <svg className="h-24 w-24 -rotate-90" viewBox="0 0 100 100" aria-hidden="true">
                  <circle
                    className="text-ink/10"
                    cx="50"
                    cy="50"
                    fill="none"
                    r="38"
                    stroke="currentColor"
                    strokeWidth="10"
                  />
                  <motion.circle
                    animate={{ pathLength: analysis.clarityScore / 100 }}
                    className={tone.color}
                    cx="50"
                    cy="50"
                    fill="none"
                    initial={false}
                    r="38"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="10"
                    transition={{ duration: 0.45, ease: "easeOut" }}
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center rounded-full">
                  <span className={cn("text-2xl font-black leading-none", tone.color)}>
                    {analysis.clarityScore}
                  </span>
                  <span className="mt-1 text-[10px] font-black uppercase text-muted">din 100</span>
                </div>
                <span
                  className={cn(
                    "absolute right-2 top-2 h-3 w-3 rounded-full border-2 border-white shadow-panel",
                    analysis.clarityScore >= 75
                      ? "bg-clinical"
                      : analysis.clarityScore >= 45
                        ? "bg-saffron"
                        : "bg-signal"
                  )}
                />
              </div>
            </div>

            <div className={cn("mt-5 rounded-panel border p-4", tone.surface)}>
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className={cn("text-sm font-black uppercase", tone.color)}>{tone.label}</p>
                <span className="rounded-panel border border-ink/10 bg-white px-2.5 py-1 text-[11px] font-black uppercase text-muted">
                  suport de înțelegere
                </span>
              </div>
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
