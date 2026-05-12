"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  BriefcaseBusiness,
  FileText,
  ListChecks,
  Printer,
  ShieldCheck,
  UserRound
} from "lucide-react";

import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import { demoPatients } from "@/data/demoPatients";
import { type DemoJournalEntry, seededJournalEntries } from "@/data/seededJournalEntries";
import { demandProfiles } from "@/data/workVsSport";
import {
  consultationBriefSafetyStatement,
  formatTargetActivityLabel,
  generateConsultationBrief
} from "@/lib/consultationBriefGenerator";
import { teachBackDemoExample, type TeachBackAnalyzerInput } from "@/lib/teachBackAnalyzer";
import { cn } from "@/lib/utils";

const journalStorageKey = "spinebridge-live-journal-v1";

const demandByPatientId: Record<string, string> = {
  "runner-recreational": "running",
  "office-driving": "driving",
  "physical-worker": "mixed-physical-work",
  "gym-no-pain": "gym-training"
};

function defaultTeachBackInput(restrictions: string, selectedDemandLabel: string): TeachBackAnalyzerInput {
  return {
    fractureUnderstanding: teachBackDemoExample.input,
    restrictions,
    redFlagSymptoms: "Slăbiciune nouă, amorțeală, modificări ale mersului sau modificări urinare ar trebui comunicate medicului.",
    workSportDifference: `Munca și ${selectedDemandLabel} sunt discuții diferite, cu cerințe și riscuri diferite.`
  };
}

function SectionBlock({
  children,
  number,
  title
}: {
  children: React.ReactNode;
  number: number;
  title: string;
}) {
  return (
    <section className="print-section rounded-panel border border-ink/10 bg-white p-5">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-panel bg-ink text-sm font-black text-white">
          {number}
        </span>
        <h2 className="text-xl font-black text-ink">{title}</h2>
      </div>
      {children}
    </section>
  );
}

function TextList({ items }: { items: string[] }) {
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

export function BriefGeneratorPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(demoPatients[0].id);
  const selectedPatient = useMemo(
    () => demoPatients.find((patient) => patient.id === selectedPatientId) ?? demoPatients[0],
    [selectedPatientId]
  );
  const [entries, setEntries] = useState<DemoJournalEntry[]>(seededJournalEntries);
  const [selectedDemandId, setSelectedDemandId] = useState(
    demandByPatientId[demoPatients[0].id] ?? demandProfiles[0].id
  );
  const selectedDemand = useMemo(
    () => demandProfiles.find((demand) => demand.id === selectedDemandId) ?? demandProfiles[0],
    [selectedDemandId]
  );
  const [restrictionsText, setRestrictionsText] = useState(selectedPatient.restrictionsText);
  const [teachBackInput, setTeachBackInput] = useState<TeachBackAnalyzerInput>(() =>
    defaultTeachBackInput(selectedPatient.restrictionsText, selectedDemand.label)
  );

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(journalStorageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoJournalEntry[];
        if (Array.isArray(parsed)) {
          setEntries(parsed);
        }
      }
    } catch {
      setEntries(seededJournalEntries);
    }
  }, []);

  useEffect(() => {
    const nextDemandId = demandByPatientId[selectedPatient.id] ?? demandProfiles[0].id;
    const nextDemand =
      demandProfiles.find((demand) => demand.id === nextDemandId) ?? demandProfiles[0];

    setSelectedDemandId(nextDemand.id);
    setRestrictionsText(selectedPatient.restrictionsText);
    setTeachBackInput(defaultTeachBackInput(selectedPatient.restrictionsText, nextDemand.label));
  }, [selectedPatient]);

  const selectedPatientEntries = useMemo(
    () =>
      entries
        .filter((entry) => entry.patientScenarioId === selectedPatient.id)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [entries, selectedPatient.id]
  );

  const generatedBrief = useMemo(
    () =>
      generateConsultationBrief({
        patient: selectedPatient,
        journalEntries: selectedPatientEntries,
        restrictionsText,
        selectedDemand,
        teachBackInput
      }),
    [restrictionsText, selectedDemand, selectedPatient, selectedPatientEntries, teachBackInput]
  );

  function updateTeachBack<K extends keyof TeachBackAnalyzerInput>(
    key: K,
    value: TeachBackAnalyzerInput[K]
  ) {
    setTeachBackInput((current) => ({ ...current, [key]: value }));
  }

  return (
    <main className="brief-page min-h-screen overflow-hidden">
      <section className="no-print border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-16">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
              <FileText aria-hidden="true" size={17} />
              <span>Consultation Brief</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-4xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Generator de brief pentru consultație
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
              Construiește un rezumat educațional printabil din profil fictiv, jurnal, teach-back,
              cerințe muncă/sport și restricții deja comunicate de clinician.
            </p>
          </div>

          <aside className="rounded-panel border border-signal/20 bg-white p-5 shadow-soft">
            <p className="text-sm font-black uppercase text-signal">Limită obligatorie</p>
            <p className="mt-3 text-xl font-black leading-7 text-ink">
              {consultationBriefSafetyStatement}
            </p>
          </aside>
        </div>
      </section>

      <section className="no-print mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                <UserRound aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-clinical">Profil fictiv</p>
                <h2 className="text-xl font-black text-ink">Selectează pacientul</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {demoPatients.map((patient) => {
                const selected = patient.id === selectedPatient.id;
                return (
                  <button
                    className={cn(
                      "focus-ring rounded-panel border p-4 text-left transition",
                      selected
                        ? "border-clinical bg-clinical/10"
                        : "border-ink/10 bg-white hover:border-clinical/30"
                    )}
                    key={patient.id}
                    onClick={() => setSelectedPatientId(patient.id)}
                    type="button"
                  >
                    <p className="font-black text-ink">
                      {patient.fictionalName}, {patient.age} ani
                    </p>
                    <p className="mt-1 text-sm leading-6 text-muted">{patient.scenarioLabel}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-panel border border-ink bg-ink px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
            onClick={() => window.print()}
            type="button"
          >
            <Printer aria-hidden="true" size={18} />
            Print / Save as PDF
          </button>
        </aside>

        <div className="grid gap-5">
          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clay/10 text-clay">
                <BriefcaseBusiness aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-clay">Selecții pentru brief</p>
                <h2 className="text-2xl font-black text-ink">Cerință muncă / sport</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {demandProfiles.map((demand) => (
                <button
                  className={cn(
                    "focus-ring rounded-panel border p-3 text-left text-sm font-bold transition",
                    demand.id === selectedDemand.id
                      ? "border-clinical bg-clinical/10 text-clinical"
                      : "border-ink/10 bg-paper text-ink hover:border-clinical/30"
                  )}
                  key={demand.id}
                  onClick={() => setSelectedDemandId(demand.id)}
                  type="button"
                >
                  {demand.label}
                </button>
              ))}
            </div>
          </section>

          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <label className="block">
              <span className="text-sm font-black text-ink">
                Restricții comunicate de clinician
              </span>
              <textarea
                className="focus-ring mt-2 min-h-24 w-full resize-none rounded-panel border border-ink/10 bg-paper/70 p-4 text-sm font-semibold leading-7 text-ink"
                onChange={(event) => setRestrictionsText(event.target.value)}
                value={restrictionsText}
              />
            </label>
            <p className="mt-3 text-sm font-semibold leading-6 text-muted">
              Acest câmp este tratat ca text deja comunicat de clinician. Aplicația nu îl calculează
              și nu îl transformă în instrucțiuni noi.
            </p>
          </section>

          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-saffron/10 text-saffron">
                <ListChecks aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-saffron">Teach-back inclus</p>
                <h2 className="text-2xl font-black text-ink">Text pentru neclarități</h2>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <label className="block">
                <span className="text-sm font-black text-ink">Ce a înțeles pacientul</span>
                <textarea
                  className="focus-ring mt-2 min-h-28 w-full resize-none rounded-panel border border-ink/10 bg-paper/70 p-4 text-sm font-semibold leading-7 text-ink"
                  onChange={(event) => updateTeachBack("fractureUnderstanding", event.target.value)}
                  value={teachBackInput.fractureUnderstanding}
                />
              </label>
              <label className="block">
                <span className="text-sm font-black text-ink">Diferența muncă / sport</span>
                <textarea
                  className="focus-ring mt-2 min-h-28 w-full resize-none rounded-panel border border-ink/10 bg-paper/70 p-4 text-sm font-semibold leading-7 text-ink"
                  onChange={(event) => updateTeachBack("workSportDifference", event.target.value)}
                  value={teachBackInput.workSportDifference}
                />
              </label>
            </div>
          </section>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-20 sm:px-6 lg:px-8">
        <article className="print-surface rounded-panel border border-ink/10 bg-white p-6 shadow-soft sm:p-8">
          <header className="print-section border-b border-ink/10 pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-sm font-black uppercase text-clinical">SpineBridge Live</p>
                <h1 className="text-safe-wrap mt-2 text-3xl font-black text-ink">
                  Brief pentru consultație
                </h1>
              </div>
              <div className="rounded-panel border border-signal/25 bg-signal/5 p-4 text-sm font-black leading-6 text-signal sm:max-w-sm">
                {generatedBrief.safetyStatement}
              </div>
            </div>
          </header>

          <div className="mt-6 grid gap-5">
            <SectionBlock number={1} title="Profil fictiv pacient">
              <TextList items={generatedBrief.patientProfile} />
            </SectionBlock>

            <SectionBlock number={2} title="Context clinic deja stabilit de specialist">
              <TextList items={generatedBrief.specialistContext} />
            </SectionBlock>

            <SectionBlock number={3} title="Restricții comunicate">
              <TextList items={generatedBrief.restrictions} />
            </SectionBlock>

            <SectionBlock number={4} title="Obiective funcționale">
              <TextList items={generatedBrief.functionalGoals} />
            </SectionBlock>

            <SectionBlock number={5} title="Jurnal simptome și activitate">
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="border-b border-ink/10 text-xs uppercase text-muted">
                      <th className="py-2 pr-3">Data</th>
                      <th className="py-2 pr-3">Țintă</th>
                      <th className="py-2 pr-3">Durere</th>
                      <th className="py-2 pr-3">Mers</th>
                      <th className="py-2 pr-3">Ședere</th>
                      <th className="py-2 pr-3">Oboseală</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedBrief.journalRows.map((entry) => (
                      <tr className="border-b border-ink/5" key={`${entry.date}-${entry.notes}`}>
                        <td className="py-3 pr-3 font-bold text-ink">{entry.date}</td>
                        <td className="py-3 pr-3 text-ink">
                          {formatTargetActivityLabel(entry.targetActivityType)}
                        </td>
                        <td className="py-3 pr-3 text-ink">
                          {entry.painBeforeActivity} → {entry.painAfterActivity}
                        </td>
                        <td className="py-3 pr-3 text-ink">{entry.walkingMinutes} min</td>
                        <td className="py-3 pr-3 text-ink">{entry.sittingMinutes} min</td>
                        <td className="py-3 pr-3 text-ink">{entry.fatigue}/10</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 grid gap-2">
                {generatedBrief.journalRows.map((entry) => (
                  <p className="rounded-panel bg-paper p-3 text-sm leading-6 text-ink" key={entry.notes}>
                    <span className="font-black">{entry.date}:</span> {entry.notes}
                  </p>
                ))}
              </div>
            </SectionBlock>

            <SectionBlock number={6} title="Semne de alarmă bifate">
              <div className="mb-4 rounded-panel border border-signal/20 bg-signal/5 p-4">
                <div className="flex gap-3">
                  <AlertTriangle aria-hidden="true" className="mt-1 shrink-0 text-signal" size={20} />
                  <p className="text-sm font-bold leading-6 text-ink">
                    {generatedBrief.safetyResult?.title ?? "Status educațional fără intrare curentă"}
                    {generatedBrief.safetyResult ? `: ${generatedBrief.safetyResult.explanation}` : ""}
                  </p>
                </div>
              </div>
              <TextList items={generatedBrief.redFlagStatus} />
            </SectionBlock>

            <SectionBlock number={7} title="Neclarități identificate prin teach-back">
              <div className="mb-4 rounded-panel border border-saffron/30 bg-saffron/10 p-4">
                <p className="text-sm font-black uppercase text-saffron">
                  Scor claritate: {generatedBrief.teachBackAnalysis.clarityScore}/100
                </p>
                <p className="mt-2 text-sm font-bold leading-6 text-ink">
                  {generatedBrief.teachBackAnalysis.saferRephrasing}
                </p>
              </div>
              <TextList items={generatedBrief.teachBackMisunderstandings} />
            </SectionBlock>

            <SectionBlock
              number={8}
              title="Întrebări pentru medic / medic de recuperare / kinetoterapeut"
            >
              <ol className="space-y-2">
                {generatedBrief.clinicianQuestions.map((question, index) => (
                  <li className="text-sm font-semibold leading-6 text-ink" key={question}>
                    <span className="mr-2 font-black text-clinical">{index + 1}.</span>
                    {question}
                  </li>
                ))}
              </ol>
            </SectionBlock>

            <SectionBlock number={9} title="Ce nu decide aplicația">
              <div className="mb-4 rounded-panel border border-clinical/20 bg-clinical/10 p-4">
                <div className="flex gap-3">
                  <ShieldCheck aria-hidden="true" className="mt-1 shrink-0 text-clinical" size={20} />
                  <p className="text-sm font-bold leading-6 text-ink">
                    Acest brief organizează date fictive și observații educaționale pentru dialog.
                  </p>
                </div>
              </div>
              <TextList items={generatedBrief.appNonDecisions} />
            </SectionBlock>

            <EvidenceBoundaryLayer compact surface="consultation-brief" />
          </div>
        </article>
      </section>
    </main>
  );
}
