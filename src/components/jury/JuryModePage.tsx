"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BookOpenCheck,
  Brain,
  BriefcaseBusiness,
  ClipboardList,
  FileText,
  FlaskConical,
  Home,
  MessageSquareText,
  RefreshCcw,
  ShieldAlert,
  ShieldCheck,
  Trophy,
  UserRound
} from "lucide-react";

import { ResearchMaturityLadder } from "@/components/research/ResearchMaturityLadder";
import { frameworkDomains } from "@/data/framework";
import { jurySteps } from "@/data/juryMode";
import { demoPatients } from "@/data/demoPatients";
import { seededJournalEntries } from "@/data/seededJournalEntries";
import { demandProfiles } from "@/data/workVsSport";
import {
  consultationBriefSafetyStatement,
  generateConsultationBrief
} from "@/lib/consultationBriefGenerator";
import { analyzeTeachBack, teachBackDemoExample } from "@/lib/teachBackAnalyzer";
import { cn } from "@/lib/utils";

const stepIcons = [
  AlertTriangle,
  BookOpenCheck,
  UserRound,
  ClipboardList,
  ShieldAlert,
  Brain,
  BriefcaseBusiness,
  FileText,
  FlaskConical,
  ShieldCheck
];

function getGymPatient() {
  return demoPatients.find((patient) => patient.id === "gym-no-pain") ?? demoPatients[0];
}

function SlideShell({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="grid h-full min-h-0 gap-5"
      exit={{ opacity: 0, y: -18, scale: 0.985 }}
      initial={{ opacity: 0, y: 18, scale: 0.985 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

function MiniMetric({
  label,
  value
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-panel border border-white/12 bg-white/8 p-3">
      <p className="text-[11px] font-black uppercase text-white/55">{label}</p>
      <p className="mt-1 text-xl font-black text-white">{value}</p>
    </div>
  );
}

function StepVisual({
  briefSectionCount,
  currentStepId,
  redFlagActive
}: {
  briefSectionCount: number;
  currentStepId: string;
  redFlagActive: boolean;
}) {
  const gymPatient = getGymPatient();
  const gymEntries = seededJournalEntries.filter((entry) => entry.patientScenarioId === gymPatient.id);
  const latestGymEntry = gymEntries[gymEntries.length - 1];
  const gymDemand = demandProfiles.find((demand) => demand.id === "gym-training") ?? demandProfiles[0];
  const teachBackResult = analyzeTeachBack({
    fractureUnderstanding: teachBackDemoExample.input,
    restrictions: gymPatient.restrictionsText,
    redFlagSymptoms: "Amorțeală nouă sau slăbiciune nouă m-ar face să contactez medicul.",
    workSportDifference: "Munca și sportul sunt discuții diferite."
  });

  if (currentStepId === "framework") {
    return (
      <div className="grid min-h-0 gap-3 md:grid-cols-5">
        {frameworkDomains.map((domain, index) => (
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="min-h-0 rounded-panel border border-white/12 bg-white/8 p-4"
            initial={{ opacity: 0, y: 18 }}
            key={domain.id}
            transition={{ delay: index * 0.05, duration: 0.25 }}
          >
            <p className="text-sm font-black text-clinical">{domain.order}</p>
            <h3 className="mt-2 text-lg font-black leading-6 text-white">{domain.title}</h3>
            <p className="mt-3 line-clamp-4 text-sm font-semibold leading-6 text-white/68">
              {domain.patientFriendlyMessage}
            </p>
          </motion.div>
        ))}
      </div>
    );
  }

  if (currentStepId === "patient") {
    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr]">
        <div className="rounded-panel border border-clinical/25 bg-clinical/10 p-5">
          <p className="text-sm font-black uppercase text-clinical">Pacient fictiv</p>
          <h3 className="mt-2 text-4xl font-black text-white">
            {gymPatient.fictionalName}, {gymPatient.age} ani
          </h3>
          <p className="mt-3 text-xl font-bold leading-8 text-white/85">{gymPatient.scenarioLabel}</p>
          <p className="mt-4 text-base font-semibold leading-7 text-white/68">
            {gymPatient.demoNarrative}
          </p>
        </div>
        <div className="rounded-panel border border-saffron/30 bg-saffron/10 p-5">
          <p className="text-sm font-black uppercase text-saffron">Concepție riscantă</p>
          <p className="mt-4 text-3xl font-black leading-tight text-white">
            “no pain = safe”
          </p>
          <p className="mt-4 text-base font-semibold leading-7 text-white/70">
            {gymPatient.potentialMisconception}
          </p>
        </div>
      </div>
    );
  }

  if (currentStepId === "journal") {
    return (
      <div className="grid gap-4 lg:grid-cols-4">
        <MiniMetric label="Durere înainte" value={`${latestGymEntry.painBeforeActivity}/10`} />
        <MiniMetric label="Durere după" value={`${latestGymEntry.painAfterActivity}/10`} />
        <MiniMetric label="Mers" value={`${latestGymEntry.walkingMinutes} min`} />
        <MiniMetric label="Ședere" value={`${latestGymEntry.sittingMinutes} min`} />
        <div className="rounded-panel border border-white/12 bg-white/8 p-5 lg:col-span-4">
          <p className="text-sm font-black uppercase text-white/55">Notă jurnal</p>
          <p className="mt-2 text-2xl font-black leading-tight text-white">{latestGymEntry.notes}</p>
        </div>
      </div>
    );
  }

  if (currentStepId === "red-flag") {
    return (
      <div className={cn("rounded-panel border p-5", redFlagActive ? "border-signal bg-signal" : "border-white/12 bg-white/8")}>
        <p className="text-sm font-black uppercase text-white/70">Declanșator demonstrativ</p>
        {redFlagActive ? (
          <div className="mt-4">
            <h3 className="text-4xl font-black leading-tight text-white">
              Semn de alarmă detectat
            </h3>
            <p className="mt-3 text-2xl font-bold text-white">amorțeală nouă</p>
            <p className="mt-4 max-w-3xl text-lg font-semibold leading-8 text-white/88">
              Nu ajusta exercițiile singur. Contactează echipa medicală sau solicită evaluare
              medicală. Aplicația nu pune diagnostic și nu indică tratament.
            </p>
          </div>
        ) : (
          <div className="mt-4 grid gap-3 lg:grid-cols-[1fr_auto] lg:items-center">
            <p className="text-3xl font-black leading-tight text-white">
              Apasă o singură dată pentru “amorțeală nouă”.
            </p>
            <span className="rounded-panel border border-signal/40 bg-signal/15 px-4 py-3 text-base font-black text-signal">
              gata pentru trigger
            </span>
          </div>
        )}
      </div>
    );
  }

  if (currentStepId === "teach-back") {
    return (
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-panel border border-white/12 bg-white/8 p-5">
          <p className="text-sm font-black uppercase text-white/55">Input pacient</p>
          <p className="mt-4 text-4xl font-black leading-tight text-white">
            “{teachBackDemoExample.input}”
          </p>
        </div>
        <div className="rounded-panel border border-saffron/35 bg-saffron/10 p-5">
          <p className="text-sm font-black uppercase text-saffron">Output explicabil</p>
          <p className="mt-4 text-xl font-black leading-8 text-white">
            {teachBackResult.saferRephrasing}
          </p>
          <p className="mt-4 text-sm font-bold uppercase text-white/60">
            Claritate: {teachBackResult.clarityScore}/100
          </p>
        </div>
      </div>
    );
  }

  if (currentStepId === "work-sport") {
    return (
      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Activități zilnice", Home, "rutine, mers, autonomie"],
          ["Muncă", BriefcaseBusiness, "ședere, condus, sarcini"],
          ["Sport / sală", Trophy, "încărcare, impact, performanță"]
        ].map(([label, Icon, detail]) => {
          const TypedIcon = Icon as typeof Home;
          return (
            <div className="rounded-panel border border-white/12 bg-white/8 p-5" key={String(label)}>
              <TypedIcon aria-hidden="true" className="text-clinical" size={28} />
              <h3 className="mt-4 text-2xl font-black text-white">{String(label)}</h3>
              <p className="mt-3 text-base font-semibold leading-7 text-white/68">{String(detail)}</p>
            </div>
          );
        })}
        <div className="rounded-panel border border-signal/25 bg-signal/10 p-5 md:col-span-3">
          <p className="text-2xl font-black text-white">
            Date raportate de pacient ≠ autorizare medicală
          </p>
        </div>
      </div>
    );
  }

  if (currentStepId === "brief") {
    return (
      <div className="rounded-panel border border-white/12 bg-white p-5 text-ink">
        <p className="text-sm font-black uppercase text-clinical">Brief generat</p>
        <h3 className="mt-2 text-3xl font-black">Rezumat pentru consultație</h3>
        <p className="mt-3 rounded-panel border border-signal/20 bg-signal/5 p-3 text-sm font-black leading-6 text-signal">
          {consultationBriefSafetyStatement}
        </p>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {[
            ["Secțiuni", `${briefSectionCount}`],
            ["Pacient", gymPatient.fictionalName],
            ["Cerință", gymDemand.shortLabel]
          ].map(([label, value]) => (
            <div className="rounded-panel border border-ink/10 bg-paper p-3" key={label}>
              <p className="text-[11px] font-black uppercase text-muted">{label}</p>
              <p className="mt-1 text-xl font-black text-ink">{value}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (currentStepId === "research") {
    return (
      <ResearchMaturityLadder compact stage variant="dark" />
    );
  }

  if (currentStepId === "closing") {
    return (
      <div className="rounded-panel border border-clinical/25 bg-clinical/10 p-6">
        <p className="text-5xl font-black leading-tight text-white">
          Înțelegere → monitorizare → comunicare mai bună
        </p>
        <p className="mt-5 max-w-4xl text-xl font-semibold leading-8 text-white/75">
          Clinicianul rămâne decidentul. Aplicația face conversația mai clară, mai pregătită și mai
          bine delimitată.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-panel border border-white/12 bg-white/8 p-6">
      <p className="text-5xl font-black leading-tight text-white">
        Recuperarea funcțională are nevoie de limbaj comun.
      </p>
    </div>
  );
}

export function JuryModePage() {
  const [stepIndex, setStepIndex] = useState(0);
  const [redFlagActive, setRedFlagActive] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);
  const currentStep = jurySteps[stepIndex];
  const Icon = stepIcons[stepIndex] ?? MessageSquareText;
  const progressPercent = ((stepIndex + 1) / jurySteps.length) * 100;
  const gymPatient = getGymPatient();
  const gymDemand = demandProfiles.find((demand) => demand.id === "gym-training") ?? demandProfiles[0];
  const gymEntries = seededJournalEntries.filter((entry) => entry.patientScenarioId === gymPatient.id);
  const generatedBrief = generateConsultationBrief({
    patient: gymPatient,
    journalEntries: gymEntries,
    restrictionsText: gymPatient.restrictionsText,
    selectedDemand: gymDemand,
    teachBackInput: {
      fractureUnderstanding: teachBackDemoExample.input,
      restrictions: gymPatient.restrictionsText,
      redFlagSymptoms: "Amorțeală nouă sau slăbiciune nouă m-ar face să contactez medicul.",
      workSportDifference: "Munca și sportul sunt discuții diferite."
    }
  });

  function goNext() {
    setStepIndex((current) => Math.min(jurySteps.length - 1, current + 1));
  }

  function goBack() {
    setStepIndex((current) => Math.max(0, current - 1));
  }

  function reset() {
    setStepIndex(0);
    setRedFlagActive(false);
    setNotesOpen(false);
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight") {
        event.preventDefault();
        goNext();
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        goBack();
      }

      if (event.key.toLocaleLowerCase("ro-RO") === "r") {
        event.preventDefault();
        reset();
      }

      if (event.key.toLocaleLowerCase("ro-RO") === "n") {
        event.preventDefault();
        setNotesOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen overflow-y-auto bg-ink text-white lg:h-screen lg:overflow-hidden">
      <div className="flex min-h-screen flex-col p-4 sm:p-6 lg:h-full lg:min-h-0 lg:p-8">
        <header className="flex shrink-0 items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-black uppercase tracking-[0.18em] text-clinical">
              SpineBridge Live / Jury Mode
            </p>
            <div className="mt-3 h-2 w-72 max-w-[45vw] overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-clinical transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
          <div className="hidden items-center gap-2 text-xs font-black uppercase text-white/50 md:flex">
            <span>→ Next</span>
            <span>← Back</span>
            <span>R Reset</span>
            <span>N Notes</span>
          </div>
        </header>

        <section className="grid min-h-0 flex-1 gap-6 py-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-h-0">
            <AnimatePresence mode="wait">
              <SlideShell key={currentStep.id}>
                <div className="flex items-center gap-4">
                  <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-panel bg-clinical text-white shadow-panel">
                    <Icon aria-hidden="true" size={30} />
                  </span>
                  <div>
                    <p className="text-sm font-black uppercase text-clinical">{currentStep.eyebrow}</p>
                    <h1 className="mt-2 text-4xl font-black leading-tight text-white xl:text-6xl">
                      {currentStep.title}
                    </h1>
                  </div>
                </div>
                <p className="max-w-4xl text-2xl font-black leading-tight text-white/88 xl:text-4xl">
                  {currentStep.statement}
                </p>
                {currentStep.id === "red-flag" && !redFlagActive ? (
                  <button
                    className="focus-ring inline-flex w-fit items-center gap-3 rounded-panel bg-signal px-6 py-4 text-lg font-black text-white shadow-soft transition hover:-translate-y-0.5"
                    onClick={() => setRedFlagActive(true)}
                    type="button"
                  >
                    <AlertTriangle aria-hidden="true" size={22} />
                    Trigger: amorțeală nouă
                  </button>
                ) : null}
              </SlideShell>
            </AnimatePresence>
          </div>

          <div className="min-h-0 overflow-hidden">
            <AnimatePresence mode="wait">
              <SlideShell key={`${currentStep.id}-visual-${redFlagActive ? "red" : "base"}`}>
                <StepVisual
                  briefSectionCount={generatedBrief.appNonDecisions.length + 4}
                  currentStepId={currentStep.id}
                  redFlagActive={redFlagActive}
                />
              </SlideShell>
            </AnimatePresence>
          </div>
        </section>

        <footer className="flex shrink-0 flex-col gap-4 border-t border-white/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            {jurySteps.map((step, index) => (
              <button
                aria-label={`Pasul ${index + 1}: ${step.title}`}
                className={cn(
                  "h-2.5 rounded-full transition-all",
                  index === stepIndex ? "w-10 bg-clinical" : "w-2.5 bg-white/25"
                )}
                key={step.id}
                onClick={() => setStepIndex(index)}
                type="button"
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-panel border border-white/15 bg-white/8 px-4 py-2 text-sm font-black text-white transition hover:bg-white/14"
              onClick={goBack}
              type="button"
            >
              <ArrowLeft aria-hidden="true" size={17} />
              Back
            </button>
            <button
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-panel border border-white/15 bg-white/8 px-4 py-2 text-sm font-black text-white transition hover:bg-white/14"
              onClick={reset}
              type="button"
            >
              <RefreshCcw aria-hidden="true" size={16} />
              Reset
            </button>
            <button
              className="focus-ring inline-flex min-h-11 items-center gap-2 rounded-panel bg-clinical px-5 py-2 text-sm font-black text-white transition hover:-translate-y-0.5"
              onClick={goNext}
              type="button"
            >
              Next
              <ArrowRight aria-hidden="true" size={17} />
            </button>
          </div>
        </footer>
      </div>

      <aside
        className={cn(
          "fixed bottom-6 right-6 z-30 w-[min(28rem,calc(100vw-3rem))] rounded-panel border border-white/15 bg-white p-5 text-ink shadow-soft transition",
          notesOpen ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
        )}
        data-testid="presenter-notes"
      >
        <p className="text-xs font-black uppercase text-clinical">Presenter notes</p>
        <h2 className="mt-2 text-xl font-black">{currentStep.title}</h2>
        <p className="mt-3 text-sm font-semibold leading-6 text-muted">{currentStep.presenterNote}</p>
      </aside>
    </main>
  );
}
