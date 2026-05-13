"use client";

import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, BookOpen, BriefcaseBusiness, Footprints, RotateCcw } from "lucide-react";

import { ActionLink } from "@/components/ActionLink";
import { ConsultationBrief } from "@/components/brief/ConsultationBrief";
import { ConceptFlow } from "@/components/framework/ConceptFlow";
import { FrameworkChart } from "@/components/framework/FrameworkChart";
import { FrameworkMap } from "@/components/framework/FrameworkMap";
import { JournalPanel } from "@/components/journal/JournalPanel";
import { frameworkDomains } from "@/data/framework";
import { seededPatients } from "@/data/patients";
import { useDemoState } from "@/lib/demo-state";
import { PatientSelector } from "./PatientSelector";

const patientIconById = {
  "runner-recreational": Footprints,
  "office-driving": BriefcaseBusiness,
  "physical-worker": BriefcaseBusiness,
  "gym-no-pain": Activity
};

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
  const SelectedPatientIcon =
    patientIconById[selectedPatient.id as keyof typeof patientIconById] ?? Activity;

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
              <h1 className="text-safe-wrap max-w-full text-5xl font-black leading-tight text-ink sm:text-7xl lg:text-8xl">
                SpineBridge
              </h1>
              <p className="text-safe-wrap mt-5 max-w-2xl text-xl font-bold leading-8 text-muted sm:text-2xl sm:leading-9">
                Legătura dintre tine și spatele tău.
              </p>
              <p className="mt-5 max-w-2xl text-base font-semibold leading-7 text-ink">
                Alege un exemplu de caz, vezi cadrul propus în articol și transformă observațiile
                pacientului în întrebări mai clare pentru consultație.
              </p>
              <div className="mt-7 flex max-w-full flex-col gap-3 sm:flex-row">
                <ActionLink
                  href="#cadru"
                  icon={<BookOpen aria-hidden="true" size={18} />}
                >
                  Explorează cadrul educațional
                </ActionLink>
                <ActionLink href="#demo" variant="secondary">
                  Alege un exemplu de caz
                </ActionLink>
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
            <p className="text-sm font-black uppercase text-clinical">Încearcă demo-ul</p>
            <h2 className="mt-3 text-3xl font-black text-ink sm:text-4xl">
              Alege o poveste, apoi vezi cum se organizează conversația.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-muted">
              Fiecare exemplu schimbă accentul discuției: muncă, condus, mers, sală sau simptome de
              comunicat. Tot ce vezi este demonstrativ și rămâne pe acest dispozitiv.
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

        <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="grid gap-5">
            <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
              <div className="flex items-start gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                  <SelectedPatientIcon aria-hidden="true" size={20} />
                </span>
                <div>
                  <p className="text-sm font-black uppercase text-clinical">Context selectat</p>
                  <h3 className="mt-1 text-2xl font-black text-ink">
                    {selectedPatient.fictionalName}, {selectedPatient.age} ani
                  </h3>
                </div>
              </div>
              <div className="mt-5 overflow-hidden rounded-panel border border-ink/10 bg-white shadow-inset">
                {[
                  ["Muncă", selectedPatient.functionalGoals.work],
                  ["Activitate cotidiană", selectedPatient.functionalGoals.dailyActivity],
                  ["Sport / sală", selectedPatient.functionalGoals.sportOrFitness]
                ].map(([label, value]) => (
                  <div
                    className="grid gap-2 border-b border-ink/10 p-4 last:border-b-0 md:grid-cols-[11rem_minmax(0,1fr)] md:items-center"
                    key={label}
                  >
                    <p className="text-xs font-black uppercase tracking-wide text-clinical">
                      {label}
                    </p>
                    <p className="text-sm font-semibold leading-6 text-ink">{value}</p>
                  </div>
                ))}
              </div>
            </div>
            <FrameworkChart patient={selectedPatient} />
          </div>
          <PatientSelector
            onSelectPatient={(patientId) => setState((current) => ({ ...current, patientId }))}
            selectedPatientId={state.patientId}
          />
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
            Ce vede pacientul și ce poate pregăti
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-muted">
            Pacientul bifează observații ușor de uitat, vede separat semnalele importante și obține
            material simplu pentru o discuție mai ordonată.
          </p>
        </div>
        <JournalPanel setState={setState} state={state} />
      </section>

      <ConsultationBrief domain={selectedDomain} patient={selectedPatient} state={state} />
    </main>
  );
}
