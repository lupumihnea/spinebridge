"use client";

import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Car,
  Dumbbell,
  HelpCircle,
  Home,
  ListChecks,
  MessageSquareText,
  PersonStanding,
  Route,
  Scale,
  ShieldAlert,
  Timer,
  Trophy
} from "lucide-react";

import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import {
  comparisonColumns,
  demandProfiles,
  type ComparisonColumnId,
  type DemandProfile,
  type WorkVsSportColumn
} from "@/data/workVsSport";
import { cn } from "@/lib/utils";

const columnIcons: Record<ComparisonColumnId, typeof Home> = {
  daily: Home,
  work: BriefcaseBusiness,
  sport: Trophy
};

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

const accentClasses: Record<
  WorkVsSportColumn["accent"],
  { chip: string; bar: string; icon: string; border: string }
> = {
  clinical: {
    chip: "bg-clinical/10 text-clinical border-clinical/25",
    bar: "bg-clinical",
    icon: "bg-clinical text-white",
    border: "border-clinical/30"
  },
  clay: {
    chip: "bg-clay/10 text-clay border-clay/25",
    bar: "bg-clay",
    icon: "bg-clay text-white",
    border: "border-clay/30"
  },
  saffron: {
    chip: "bg-saffron/10 text-saffron border-saffron/30",
    bar: "bg-saffron",
    icon: "bg-saffron text-ink",
    border: "border-saffron/40"
  }
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

function ComparisonColumnCard({ column, index }: { column: WorkVsSportColumn; index: number }) {
  const Icon = columnIcons[column.id];
  const accent = accentClasses[column.accent];

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className={cn("overflow-hidden rounded-panel border bg-white shadow-panel", accent.border)}
      initial={{ opacity: 0, y: 14 }}
      transition={{ delay: index * 0.05, duration: 0.28 }}
    >
      <div className={cn("h-2", accent.bar)} />
      <div className="p-5">
        <div className="flex items-start gap-3">
          <span className={cn("flex h-12 w-12 shrink-0 items-center justify-center rounded-panel", accent.icon)}>
            <Icon aria-hidden="true" size={22} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-muted">Coloana {index + 1}</p>
            <h2 className="text-safe-wrap mt-1 text-2xl font-black leading-8 text-ink">
              {column.title}
            </h2>
            <p className="mt-1 text-sm font-semibold leading-6 text-muted">{column.subtitle}</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4">
          <section className="rounded-panel bg-paper p-4">
            <p className="mb-3 text-xs font-black uppercase text-clinical">Cerințe tipice</p>
            <BulletList items={column.typicalDemands} />
          </section>
          <section className="rounded-panel bg-paper p-4">
            <p className="mb-3 text-xs font-black uppercase text-clay">
              Ce clarifică pacientul cu clinicianul
            </p>
            <BulletList items={column.clinicianClarifications} />
          </section>
          <section className="rounded-panel bg-paper p-4">
            <p className="mb-3 text-xs font-black uppercase text-saffron">
              Ce poate fi automonitorizat
            </p>
            <BulletList items={column.selfMonitoring} />
          </section>
          <section className="rounded-panel border border-signal/20 bg-signal/5 p-4">
            <p className="mb-3 text-xs font-black uppercase text-signal">
              Ce nu decide aplicația
            </p>
            <BulletList items={column.appCannotDecide} />
          </section>
        </div>
      </div>
    </motion.article>
  );
}

function DemandDetail({ demand }: { demand: DemandProfile }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft"
      initial={{ opacity: 0, y: 10 }}
      key={demand.id}
      transition={{ duration: 0.22 }}
    >
      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_20rem]">
        <div>
          <p className="text-xs font-black uppercase text-clinical">Cerere selectată</p>
          <h2 className="text-safe-wrap mt-1 text-3xl font-black text-ink">{demand.label}</h2>
          <p className="mt-3 max-w-2xl text-base font-semibold leading-7 text-muted">
            {demand.description}
          </p>
        </div>
        <aside className="rounded-panel border border-signal/20 bg-signal/5 p-4">
          <p className="text-xs font-black uppercase text-signal">Limită de siguranță</p>
          <p className="mt-3 text-sm font-bold leading-6 text-ink">{demand.safetyBoundary}</p>
          <p className="mt-3 text-sm font-black leading-6 text-signal">
            Nu reprezintă autorizare pentru progresie.
          </p>
        </aside>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
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
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_25rem] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
              <Scale aria-hidden="true" size={17} />
              <span>Work vs Sport</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Revenire la muncă ≠ revenire la sport
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Un modul de comparație pentru juriu: organizează diferențele dintre activități
              zilnice, muncă și efort solicitant, fără concluzii clinice sau progresie decisă de
              aplicație.
            </p>
          </div>

          <aside className="rounded-panel border border-signal/20 bg-white p-5 shadow-soft">
            <p className="text-sm font-black uppercase text-signal">Mesaj cheie</p>
            <p className="mt-3 text-xl font-black leading-7 text-ink">
              Absența durerii sau toleranța la o sarcină nu transferă automat concluzii către muncă,
              sport sau sală.
            </p>
          </aside>
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <EvidenceBoundaryLayer surface="work-vs-sport" />
      </section>

      <section className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <div className="grid gap-3 rounded-panel border border-ink/10 bg-white p-4 shadow-panel md:grid-cols-[1fr_auto_1fr_auto_1fr] md:items-center">
          {[
            ["Activități zilnice", "mers, autonomie, rutină"],
            ["Muncă", "ședere, condus, sarcini"],
            ["Sport / sală", "încărcare, impact, performanță"]
          ].map(([label, detail], index) => (
            <React.Fragment key={label}>
              <div className="rounded-panel bg-paper p-4 text-center">
                <p className="text-sm font-black uppercase text-clinical">{label}</p>
                <p className="mt-2 text-base font-bold text-ink">{detail}</p>
              </div>
              {index < 2 ? (
                <div className="text-center text-2xl font-black text-signal" aria-hidden="true">
                  ≠
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          {comparisonColumns.map((column, index) => (
            <ComparisonColumnCard column={column} index={index} key={column.id} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-panel border border-ink/10 bg-ink p-5 text-white shadow-soft sm:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="min-w-0">
              <p className="text-xs font-black uppercase text-white/65">Decision Boundary</p>
              <h2 className="text-safe-wrap mt-2 text-3xl font-black leading-tight">
                Date raportate de pacient ≠ autorizare medicală
              </h2>
            </div>
            <ArrowRight aria-hidden="true" className="hidden shrink-0 text-clinical lg:block" size={34} />
            <div className="rounded-panel border border-white/15 bg-white/10 p-4 lg:max-w-xl">
              <p className="text-lg font-black leading-7">
                Restricții clinice + context lezional + follow-up = spațiul deciziei clinice
              </p>
              <p className="mt-3 text-sm font-semibold leading-6 text-white/75">
                Aplicația poate organiza conversația; echipa medicală păstrează decizia clinică.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-20 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:px-8">
        <aside className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel lg:self-start">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
              <HelpCircle aria-hidden="true" size={22} />
            </span>
            <div>
              <p className="text-xs font-black uppercase text-clinical">Selector interactiv</p>
              <h2 className="text-xl font-black text-ink">Alege o cerință</h2>
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
                      ? "border-clinical bg-clinical/10 text-clinical"
                      : "border-ink/10 bg-white text-ink hover:border-clinical/30"
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
