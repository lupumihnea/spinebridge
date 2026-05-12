"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, MonitorPlay, RotateCcw, ShieldCheck } from "lucide-react";

import { ActionLink } from "@/components/ActionLink";
import { ConsultationBrief } from "@/components/brief/ConsultationBrief";
import { ConceptFlow } from "@/components/framework/ConceptFlow";
import { FrameworkChart } from "@/components/framework/FrameworkChart";
import { FrameworkMap } from "@/components/framework/FrameworkMap";
import { JournalPanel } from "@/components/journal/JournalPanel";
import { DisclaimerCard } from "@/components/safety/DisclaimerCard";
import { frameworkDomains } from "@/data/framework";
import { seededPatients } from "@/data/patients";
import { useDemoState } from "@/lib/demo-state";
import { PatientSelector } from "./PatientSelector";

const introStats = [
  { label: "Domenii educaționale", value: "5" },
  { label: "Flux pentru juriu", value: "7 min" },
  { label: "Server extern", value: "0" }
];

export function DemoLanding() {
  const { state, setState, resetState } = useDemoState();

  const selectedPatient = useMemo(
    () => seededPatients.find((patient) => patient.id === state.patientId) ?? seededPatients[0],
    [state.patientId]
  );

  const selectedDomain = useMemo(
    () => frameworkDomains.find((domain) => domain.id === state.domainId) ?? frameworkDomains[0],
    [state.domainId]
  );

  return (
    <main className="overflow-hidden">
      <section className="relative border-b border-ink/10">
        <div className="absolute inset-x-0 top-0 grid h-1.5 grid-cols-4" aria-hidden="true">
          <span className="bg-clinical" />
          <span className="bg-clay" />
          <span className="bg-saffron" />
          <span className="bg-graphite" />
        </div>
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <motion.div
              className="min-w-0"
              initial={false}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/88 px-3 py-2 text-sm font-black text-clinical shadow-panel">
                <MonitorPlay aria-hidden="true" size={16} />
                <span>Demo academic live pentru juriu</span>
              </div>
              <h1 className="text-safe-wrap mt-8 max-w-full text-4xl font-black leading-tight text-ink sm:text-7xl lg:text-8xl">
                SpineBridge Live
              </h1>
              <p className="text-safe-wrap mt-5 max-w-2xl text-xl font-bold leading-8 text-muted sm:text-2xl sm:leading-9">
                Simulator educațional pentru înțelegere, automonitorizare și dialog clinic
              </p>
              <div className="mt-7 max-w-2xl">
                <DisclaimerCard />
              </div>
              <div className="mt-7 flex max-w-full flex-col gap-3 sm:flex-row">
                <ActionLink href="/jury" icon={<ArrowRight aria-hidden="true" size={18} />}>
                  Deschide Jury Mode
                </ActionLink>
                <ActionLink
                  href="#cadru"
                  icon={<BookOpen aria-hidden="true" size={18} />}
                  variant="secondary"
                >
                  Explorează cadrul educațional
                </ActionLink>
              </div>
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {introStats.map((stat) => (
                  <div
                    className="rounded-panel border border-ink/10 bg-white/82 p-4 shadow-panel"
                    key={stat.label}
                  >
                    <p className="text-4xl font-black text-ink">{stat.value}</p>
                    <p className="mt-1 text-sm font-bold leading-5 text-muted">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className="min-w-0"
              initial={false}
              transition={{ duration: 0.25, ease: "easeOut" }}
              whileHover={{ y: -4 }}
            >
              <ConceptFlow />
            </motion.div>
          </div>
        </div>
      </section>

      <section id="demo" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <p className="text-sm font-black uppercase text-clinical">Panou demo</p>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              O experiență ghidată pentru prezentare
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-muted">
              Selecțiile sunt salvate doar în localStorage pentru stabilitate în demo. Nu există
              server extern și nu se folosesc date reale.
            </p>
          </div>
          <button
            className="focus-ring premium-transition no-print inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-ink/15 bg-white px-4 py-2 text-sm font-black text-ink shadow-panel hover:-translate-y-0.5 hover:border-clay/40 hover:shadow-lift"
            onClick={resetState}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={17} />
            <span>Resetează demo-ul</span>
          </button>
        </div>

        <div className="grid gap-5 lg:grid-cols-[0.9fr_1.1fr]">
          <PatientSelector
            onSelectPatient={(patientId) => setState((current) => ({ ...current, patientId }))}
            selectedPatientId={state.patientId}
          />
          <div className="grid gap-5">
            <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                  <ShieldCheck aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="text-sm font-black uppercase text-clinical">Context selectat</p>
                  <h3 className="mt-1 text-2xl font-black text-ink">
                    {selectedPatient.fictionalName}, {selectedPatient.age} ani
                  </h3>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs font-black uppercase text-muted">Muncă</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                    {selectedPatient.functionalGoals.work}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-muted">Activitate cotidiană</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                    {selectedPatient.functionalGoals.dailyActivity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-black uppercase text-muted">Sport</p>
                  <p className="mt-2 text-sm font-semibold leading-6 text-ink">
                    {selectedPatient.functionalGoals.sportOrFitness}
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-panel border border-ink/10 bg-paper p-4">
                <p className="text-sm font-semibold text-ink">
                  {selectedPatient.treatmentPathway.note}
                </p>
              </div>
            </div>
            <FrameworkChart />
          </div>
        </div>
      </section>

      <FrameworkMap
        onSelectDomain={(domainId) => setState((current) => ({ ...current, domainId }))}
        selectedDomainId={state.domainId}
      />

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <div className="mb-8 max-w-3xl">
          <p className="text-sm font-black uppercase text-clay">Auto-monitorizare</p>
          <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
            Jurnal, semnale de alarmă și întrebări
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-muted">
            {selectedDomain.suggestedQuestionsForClinician[0]}
          </p>
        </div>
        <JournalPanel setState={setState} state={state} />
      </section>

      <ConsultationBrief domain={selectedDomain} patient={selectedPatient} state={state} />
    </main>
  );
}
