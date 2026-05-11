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
import { safetyMessages } from "@/data/safety";
import { useDemoState } from "@/lib/demo-state";
import { PatientSelector } from "./PatientSelector";

const introStats = [
  { label: "Domenii educaționale", value: "5" },
  { label: "Date reale", value: "0" },
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
        <div className="absolute inset-x-0 top-0 grid h-1 grid-cols-4" aria-hidden="true">
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
              <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/75 px-3 py-2 text-sm font-semibold text-clinical shadow-panel">
                <MonitorPlay aria-hidden="true" size={16} />
                <span>Demo academic live pentru juriu</span>
              </div>
              <h1 className="mt-8 break-words text-4xl font-black leading-tight text-ink sm:text-6xl lg:text-7xl">
                SpineBridge Live
              </h1>
              <p className="mt-5 max-w-2xl text-xl font-medium leading-8 text-muted">
                Simulator educațional pentru recuperare funcțională și dialog clinic
              </p>
              <div className="mt-7 max-w-2xl">
                <DisclaimerCard />
              </div>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <ActionLink href="#demo" icon={<ArrowRight aria-hidden="true" size={18} />}>
                  Pornește demo-ul pentru juriu
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
                  <div className="rounded-panel border border-ink/10 bg-white/70 p-4" key={stat.label}>
                    <p className="text-3xl font-black text-ink">{stat.value}</p>
                    <p className="mt-1 text-sm font-medium leading-5 text-muted">{stat.label}</p>
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
            <p className="text-sm font-semibold uppercase text-clinical">Panou demo</p>
            <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
              O experiență ghidată pentru prezentare
            </h2>
            <p className="mt-4 text-base leading-7 text-muted">
              Selecțiile sunt salvate doar în localStorage pentru stabilitate în demo. Nu există
              server extern și nu se folosesc date reale.
            </p>
          </div>
          <button
            className="focus-ring no-print inline-flex min-h-11 items-center justify-center gap-2 rounded-panel border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition duration-200 hover:-translate-y-0.5 hover:border-clay/40"
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
            <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                  <ShieldCheck aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="text-sm font-semibold uppercase text-clinical">Context selectat</p>
                  <h3 className="mt-1 text-2xl font-bold text-ink">
                    {selectedPatient.fictionalName}, {selectedPatient.age} ani
                  </h3>
                </div>
              </div>
              <div className="mt-5 grid gap-4 md:grid-cols-3">
                <div>
                  <p className="text-xs font-bold uppercase text-muted">Muncă</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    {selectedPatient.functionalGoals.work}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted">Activitate cotidiană</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    {selectedPatient.functionalGoals.dailyActivity}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-muted">Sport</p>
                  <p className="mt-2 text-sm leading-6 text-ink">
                    {selectedPatient.functionalGoals.sportOrFitness}
                  </p>
                </div>
              </div>
              <div className="mt-5 rounded-panel bg-paper p-4">
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
          <p className="text-sm font-semibold uppercase text-clay">Auto-monitorizare</p>
          <h2 className="mt-3 text-3xl font-bold text-ink sm:text-4xl">
            Jurnal, semnale de alarmă și întrebări
          </h2>
          <p className="mt-4 text-base leading-7 text-muted">
            {selectedDomain.suggestedQuestionsForClinician[0]}
          </p>
        </div>
        <JournalPanel setState={setState} state={state} />
      </section>

      <ConsultationBrief domain={selectedDomain} patient={selectedPatient} state={state} />

      <footer className="border-t border-ink/10 bg-white/70">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-8 text-sm leading-6 text-muted sm:px-6 lg:grid-cols-2 lg:px-8">
          <p>{safetyMessages[2]}</p>
          <p>{safetyMessages[3]}</p>
        </div>
      </footer>
    </main>
  );
}
