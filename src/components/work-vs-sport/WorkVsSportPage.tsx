"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  BriefcaseBusiness,
  Car,
  Dumbbell,
  HelpCircle,
  Home,
  ListChecks,
  MessageSquareText,
  PersonStanding,
  Route,
  ShieldAlert,
  Timer,
} from "lucide-react";

import {
  demandProfiles,
  type DemandProfile,
} from "@/data/workVsSport";
import { cn } from "@/lib/utils";

const demandIcons: Record<string, typeof Home> = {
  "office-work": BriefcaseBusiness,
  driving: Car,
  "prolonged-sitting": Timer,
  "lifting-carrying": PersonStanding,
  "gym-training": Dumbbell,
  running: Route,
  "contact-sport": ShieldAlert,
  "mixed-physical-work": BriefcaseBusiness
};

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex gap-2 text-sm font-semibold leading-6 text-ink" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clinical" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DemandDetail({ demand }: { demand: DemandProfile }) {
  const Icon = demandIcons[demand.id] ?? ListChecks;

  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="overflow-hidden rounded-panel border border-ink/10 bg-white shadow-soft"
      initial={{ opacity: 0, y: 10 }}
      key={demand.id}
      transition={{ duration: 0.22 }}
    >
      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[minmax(0,1fr)_18rem]">
        <div>
          <span className="mb-4 flex h-14 w-14 items-center justify-center rounded-panel bg-clinical text-white shadow-panel">
            <Icon aria-hidden="true" size={24} />
          </span>
          <p className="text-xs font-black uppercase text-clinical">Activitate selectată</p>
          <h2 className="text-safe-wrap mt-1 text-4xl font-black leading-tight text-ink">
            {demand.label}
          </h2>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-muted">
            {demand.description}
          </p>
        </div>
        <aside className="rounded-panel border border-clinical/20 bg-clinical/10 p-4">
          <p className="text-xs font-black uppercase text-clinical">Ce clarifică această alegere</p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">
            Tipul de activitate schimbă întrebările: durată, poziții, încărcare, repetare, impact și
            contextul în care apare simptomul.
          </p>
        </aside>
      </div>

      <div className="grid gap-4 border-t border-ink/10 bg-surface-muted p-5 sm:p-6 lg:grid-cols-3">
        <section className="rounded-panel bg-paper p-4">
          <div className="flex items-center gap-2">
            <MessageSquareText aria-hidden="true" className="text-clinical" size={18} />
            <p className="text-xs font-black uppercase text-clinical">
              Întrebări pentru clinician
            </p>
          </div>
          <ol className="mt-3 space-y-2">
            {demand.clinicianQuestions.map((question, index) => (
              <li className="text-sm font-semibold leading-6 text-ink" key={question}>
                <span className="mr-2 font-black text-clinical">{index + 1}.</span>
                {question}
              </li>
            ))}
          </ol>
        </section>
        <section className="rounded-panel bg-paper p-4">
          <div className="flex items-center gap-2">
            <ListChecks aria-hidden="true" className="text-clay" size={18} />
            <p className="text-xs font-black uppercase text-clay">
              Metrici de jurnal utile discuției
            </p>
          </div>
          <div className="mt-3">
            <BulletList items={demand.journalMetrics} />
          </div>
        </section>
        <section className="rounded-panel border border-signal/20 bg-white p-4">
          <p className="text-xs font-black uppercase text-signal">Limită a modulului</p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">{demand.safetyBoundary}</p>
        </section>
      </div>
    </motion.section>
  );
}

export function WorkVsSportPage() {
  const [selectedDemandId, setSelectedDemandId] = useState(demandProfiles[0].id);
  const selectedDemand = useMemo(
    () => demandProfiles.find((demand) => demand.id === selectedDemandId) ?? demandProfiles[0],
    [selectedDemandId]
  );

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
              <ListChecks aria-hidden="true" size={17} />
              <span>Selector de activități</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Alege activitatea și vezi ce merită clarificat
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Condus, ședere, ridicare, alergare, sală sau sport de contact: fiecare activitate are
              cerințe diferite. Munca și sportul rămân discuții separate, dar pagina se concentrează
              pe activitatea aleasă.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[26rem_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-panel border border-clinical/20 bg-white p-5 shadow-soft lg:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
              <HelpCircle aria-hidden="true" size={22} />
            </span>
            <div>
              <p className="text-xs font-black uppercase text-clinical">Selector interactiv</p>
              <h2 className="text-xl font-black text-ink">Alege o activitate</h2>
            </div>
          </div>

          <div className="mt-5 grid gap-2">
            {demandProfiles.map((demand) => {
              const Icon = demandIcons[demand.id] ?? ListChecks;
              const selected = demand.id === selectedDemandId;

              return (
                <button
                  className={cn(
                    "focus-ring flex items-center gap-3 rounded-panel border p-3 text-left transition",
                    selected
                      ? "border-clinical bg-clinical/10 text-clinical shadow-panel"
                      : "border-ink/10 bg-white text-ink hover:-translate-y-0.5 hover:border-clinical/30 hover:shadow-panel"
                  )}
                  key={demand.id}
                  onClick={() => setSelectedDemandId(demand.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "flex h-9 w-9 shrink-0 items-center justify-center rounded-panel",
                      selected ? "bg-clinical text-white" : "bg-paper text-muted"
                    )}
                  >
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <span>
                    <span className="block text-sm font-black">{demand.label}</span>
                    <span className="block text-xs font-semibold text-muted">{demand.shortLabel}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </aside>

        <DemandDetail demand={selectedDemand} />
      </section>
    </main>
  );
}
