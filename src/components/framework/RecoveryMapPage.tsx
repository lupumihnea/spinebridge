"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowRight,
  BookOpenCheck,
  ChevronDown,
  ClipboardList,
  MessageSquareText,
  Route,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  UserCheck
} from "lucide-react";

import { ResearchMaturityLadder } from "@/components/research/ResearchMaturityLadder";
import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import { conceptSteps, frameworkDomains } from "@/data/framework";
import { cn } from "@/lib/utils";

const stepIcons = [Stethoscope, BookOpenCheck, ClipboardList, MessageSquareText, Route, UserCheck];

const domainIcons = [ShieldCheck, UserCheck, Route, MessageSquareText, Sparkles];

const styleClasses = {
  clinical: {
    surface: "bg-clinical/10 text-clinical border-clinical/25",
    ring: "ring-clinical/25 border-clinical",
    bar: "bg-clinical"
  },
  clay: {
    surface: "bg-clay/10 text-clay border-clay/25",
    ring: "ring-clay/25 border-clay",
    bar: "bg-clay"
  },
  saffron: {
    surface: "bg-saffron/10 text-saffron border-saffron/30",
    ring: "ring-saffron/25 border-saffron",
    bar: "bg-saffron"
  },
  graphite: {
    surface: "bg-graphite/10 text-graphite border-graphite/25",
    ring: "ring-graphite/20 border-graphite",
    bar: "bg-graphite"
  },
  signal: {
    surface: "bg-signal/10 text-signal border-signal/25",
    ring: "ring-signal/20 border-signal",
    bar: "bg-signal"
  }
};

function DomainList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2">
      {items.map((item) => (
        <li className="flex gap-2 text-sm leading-6 text-ink" key={item}>
          <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clinical" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function RecoveryMapPage() {
  const [openDomainId, setOpenDomainId] = useState(frameworkDomains[0].id);

  const openDomain = useMemo(
    () => frameworkDomains.find((domain) => domain.id === openDomainId) ?? frameworkDomains[0],
    [openDomainId]
  );

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="relative border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-semibold text-clinical shadow-panel">
              <Route aria-hidden="true" size={16} />
              <span>Recovery Map</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-4xl text-3xl font-black leading-tight text-ink sm:text-5xl lg:text-6xl">
              Harta educațională a recuperării funcționale
            </h1>
            <p className="text-safe-wrap mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              O reprezentare vizuală pentru educație, automonitorizare și dialog clinic, fără
              diagnostic, tratament sau autorizare a progresiei.
            </p>
          </div>

          <aside className="min-w-0 overflow-hidden rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <p className="text-xs font-bold uppercase text-clinical">Explicație pentru juriu</p>
            <p className="text-safe-wrap mt-3 text-xl font-bold leading-7 text-ink sm:text-2xl sm:leading-8">
              Acesta este un cadru educațional, nu un algoritm clinic. Valoarea lui este
              organizarea comunicării.
            </p>
            <div className="mt-5 rounded-panel border border-signal/20 bg-signal/5 p-4 text-sm font-semibold leading-6 text-signal">
              Deciziile clinice rămân la echipa medicală.
            </div>
            <ResearchMaturityLadder className="mt-5 shadow-none" compact />
          </aside>
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <EvidenceBoundaryLayer surface="recovery-map" />
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="min-w-0 overflow-hidden rounded-panel border border-ink/10 bg-white p-5 shadow-soft sm:p-6">
          <div className="mb-6 flex flex-col justify-between gap-3 lg:flex-row lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase text-clinical">Călătorie educațională</p>
              <h2 className="text-safe-wrap mt-2 text-2xl font-bold text-ink sm:text-3xl">
                De la evaluare la încredere
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-6 text-muted">
              Săgețile arată fluxul conversației, nu o secvență clinică obligatorie.
            </p>
          </div>

          <div className="grid gap-3 xl:grid-cols-6">
            {conceptSteps.map((step, index) => {
              const Icon = stepIcons[index] ?? Sparkles;

              return (
                <motion.div
                  animate={{ opacity: 1, y: 0 }}
                  className="relative min-h-44 min-w-0 overflow-hidden rounded-panel border border-ink/10 bg-paper p-4"
                  initial={{ opacity: 0, y: 12 }}
                  key={step.id}
                  transition={{ delay: index * 0.04, duration: 0.28 }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-ink text-white">
                      <Icon aria-hidden="true" size={19} />
                    </span>
                    <span className="text-sm font-black text-clinical">{index + 1}</span>
                  </div>
                  <h3 className="text-safe-wrap mt-4 text-lg font-bold leading-6 text-ink">
                    {step.label}
                  </h3>
                  <p className="text-safe-wrap mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                  {index < conceptSteps.length - 1 ? (
                    <ArrowRight
                      aria-hidden="true"
                      className="absolute -right-5 top-1/2 z-10 hidden text-clinical xl:block"
                      size={24}
                    />
                  ) : null}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mb-7 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-clinical">Domenii educaționale</p>
            <h2 className="text-safe-wrap mt-2 text-3xl font-bold text-ink sm:text-4xl">
              Cinci carduri explicabile, fără decizii clinice
            </h2>
          </div>
          <div className="rounded-panel border border-ink/10 bg-white p-4 text-sm leading-6 text-muted shadow-panel lg:max-w-md">
            Domeniul deschis: <span className="font-bold text-ink">{openDomain.title}</span>
          </div>
        </div>

        <div className="grid gap-5">
          {frameworkDomains.map((domain, index) => {
            const isOpen = domain.id === openDomainId;
            const Icon = domainIcons[index] ?? BookOpenCheck;
            const style = styleClasses[domain.visualStyleKey];

            return (
              <motion.article
                className={cn(
                  "overflow-hidden rounded-panel border bg-white shadow-panel transition",
                  isOpen ? `${style.ring} ring-2` : "border-ink/10"
                )}
                initial={{ opacity: 0, y: 12 }}
                key={domain.id}
                transition={{ delay: index * 0.035, duration: 0.25 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <button
                  aria-expanded={isOpen}
                  className="focus-ring flex w-full items-center gap-4 p-5 text-left sm:p-6"
                  onClick={() => setOpenDomainId(isOpen ? "" : domain.id)}
                  type="button"
                >
                  <span
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-panel border",
                      style.surface
                    )}
                  >
                    <Icon aria-hidden="true" size={24} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-black uppercase text-clinical">
                      {domain.order}. {domain.academicLabel}
                    </span>
                    <span className="mt-1 block break-words text-2xl font-black leading-8 text-ink">
                      {domain.title}
                    </span>
                  </span>
                  <ChevronDown
                    aria-hidden="true"
                    className={cn("shrink-0 text-muted transition", isOpen && "rotate-180")}
                    size={24}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                      <div className="grid gap-4 border-t border-ink/10 p-5 sm:p-6 lg:grid-cols-4">
                        <div className="rounded-panel bg-paper p-4">
                          <p className="text-sm font-black uppercase text-clinical">
                            Ce înțelege pacientul
                          </p>
                          <p className="mt-3 text-base font-semibold leading-7 text-ink">
                            {domain.patientFriendlyMessage}
                          </p>
                        </div>
                        <div className="rounded-panel bg-paper p-4">
                          <p className="text-sm font-black uppercase text-clay">
                            Ce monitorizează
                          </p>
                          <div className="mt-3">
                            <DomainList items={domain.selfMonitoringItems} />
                          </div>
                        </div>
                        <div className="rounded-panel bg-paper p-4">
                          <p className="text-sm font-black uppercase text-saffron">
                            Ce întreabă clinicianul
                          </p>
                          <div className="mt-3">
                            <DomainList items={domain.suggestedQuestionsForClinician} />
                          </div>
                        </div>
                        <div className="rounded-panel border border-signal/15 bg-signal/5 p-4">
                          <p className="flex items-center gap-2 text-sm font-black uppercase text-signal">
                            <AlertTriangle aria-hidden="true" size={16} />
                            Ce NU decide aplicația
                          </p>
                          <div className="mt-3">
                            <DomainList items={domain.appMustNotClaim} />
                          </div>
                        </div>
                      </div>
                      <div className={cn("h-1.5", style.bar)} />
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            );
          })}
        </div>
      </section>
    </main>
  );
}
