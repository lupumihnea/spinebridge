"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BarChart3,
  CalendarDays,
  ClipboardList,
  RotateCcw,
  Save,
  UserRound
} from "lucide-react";

import { demoPatients } from "@/data/demoPatients";
import { type DemoJournalEntry, seededJournalEntries } from "@/data/seededJournalEntries";
import { redFlags } from "@/data/safety";
import { RedFlagTriggerPanel } from "@/components/journal/RedFlagTriggerPanel";
import {
  evaluateSafetyRules,
  type SafetyEngineResult,
  type TargetActivityType
} from "@/lib/safetyRules";
import { isDemoJournalEntry } from "@/lib/demoJournalValidation";
import { cn } from "@/lib/utils";

const storageKey = "spinebridge-live-journal-v1";

type NumericJournalKey =
  | "painBeforeActivity"
  | "painAfterActivity"
  | "walkingMinutes"
  | "sittingMinutes"
  | "fatigue";

const activityLabels: Record<TargetActivityType, string> = {
  daily_activity: "activitate zilnică",
  work: "muncă",
  physical_activity: "activitate fizică",
  sport: "sport"
};

const emptyForm = {
  date: new Date().toISOString().slice(0, 10),
  painBeforeActivity: 1,
  painAfterActivity: 1,
  walkingMinutes: 20,
  sittingMinutes: 30,
  fatigue: 3,
  notes: "",
  targetActivityType: "daily_activity" as TargetActivityType,
  redFlagSymptoms: [] as string[]
};

function toSafetyEntry(entry: DemoJournalEntry) {
  return {
    id: entry.id,
    painBeforeActivity: entry.painBeforeActivity,
    painAfterActivity: entry.painAfterActivity,
    fatigueLevel: entry.fatigue,
    walkingToleranceMinutes: entry.walkingMinutes,
    sittingToleranceMinutes: entry.sittingMinutes,
    notes: entry.notes
  };
}

function numberInputValue(value: number) {
  return Number.isFinite(value) ? String(value) : "0";
}

function clampNumber(value: string, min: number, max: number) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed)) {
    return min;
  }

  return Math.min(max, Math.max(min, parsed));
}

function MetricInput({
  label,
  max,
  min = 0,
  onChange,
  suffix,
  value
}: {
  label: string;
  max: number;
  min?: number;
  onChange: (value: number) => void;
  suffix?: string;
  value: number;
}) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-ink">{label}</span>
      <div className="mt-2 flex items-center gap-2 rounded-panel border border-ink/10 bg-white px-3 py-2">
        <input
          className="focus-ring w-full bg-transparent text-base font-semibold text-ink"
          max={max}
          min={min}
          onChange={(event) => onChange(clampNumber(event.target.value, min, max))}
          type="number"
          value={numberInputValue(value)}
        />
        {suffix ? <span className="text-sm font-semibold text-muted">{suffix}</span> : null}
      </div>
    </label>
  );
}

function TrendChart({
  data,
  lines,
  title
}: {
  data: DemoJournalEntry[];
  lines: Array<{ dataKey: NumericJournalKey; label: string; color: string }>;
  title: string;
}) {
  const hasData = data.length > 0;
  const visibleData = data.slice(-6);
  const maxValue = Math.max(
    1,
    ...visibleData.flatMap((entry) => lines.map((line) => Number(entry[line.dataKey]) || 0))
  );
  const barHeightClass = lines.length > 1 ? "h-16" : "h-36";

  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <BarChart3 aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="text-xs font-black uppercase text-clinical">Trend educațional</p>
          <h3 className="text-xl font-black text-ink">{title}</h3>
        </div>
      </div>
      <div className="h-72">
        {!hasData ? (
          <div className="flex h-full flex-col justify-center rounded-panel border border-dashed border-ink/20 bg-surface-muted p-5">
            <p className="text-sm font-black uppercase text-clinical">Stare goală</p>
            <p className="mt-2 text-base font-black leading-7 text-ink">
              Nu există încă intrări pentru acest scenariu fictiv.
            </p>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Adaugă o intrare de jurnal pentru a vedea trenduri educaționale. Graficul nu
              generează concluzii clinice.
            </p>
          </div>
        ) : (
          <div className="flex h-full flex-col justify-between gap-4 rounded-panel border border-ink/10 bg-surface-muted p-4">
            <div className="grid flex-1 gap-4">
              {lines.map((line) => {
                const latestValue = visibleData[visibleData.length - 1]?.[line.dataKey] ?? 0;

                return (
                  <div className="min-w-0" key={line.dataKey}>
                    <div className="mb-2 flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-2">
                        <span
                          aria-hidden="true"
                          className="h-3 w-3 shrink-0 rounded-full"
                          style={{ backgroundColor: line.color }}
                        />
                        <p className="truncate text-xs font-black uppercase text-ink">
                          {line.label}
                        </p>
                      </div>
                      <p className="text-sm font-black text-muted">{latestValue}</p>
                    </div>
                    <div
                      aria-label={`Trend ${line.label}`}
                      className="grid grid-cols-6 items-end gap-2"
                      role="list"
                    >
                      {visibleData.map((entry) => {
                        const value = Number(entry[line.dataKey]) || 0;
                        const height = Math.max(8, Math.round((value / maxValue) * 100));

                        return (
                          <div
                            className={cn(
                              "flex flex-col justify-end rounded-panel bg-white px-1 py-1",
                              barHeightClass
                            )}
                            key={`${entry.id}-${line.dataKey}`}
                            role="listitem"
                          >
                            <div
                              className="rounded-panel transition-all duration-300"
                              style={{
                                backgroundColor: line.color,
                                height: `${height}%`
                              }}
                              title={`${line.label}: ${value} (${entry.date})`}
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="grid grid-cols-6 gap-2 border-t border-ink/10 pt-2">
              {visibleData.map((entry) => (
                <span
                  className="truncate text-center text-[10px] font-black uppercase text-muted"
                  key={`${entry.id}-date`}
                >
                  {entry.date.slice(5)}
                </span>
              ))}
            </div>
            <div className="rounded-panel bg-white px-3 py-2 text-xs font-bold leading-5 text-muted">
              Scalare vizuală locală pe ultimele {visibleData.length} intrări. Valorile nu sunt
              interpretări clinice.
            </div>
          </div>
        )}
      </div>
      <p className="mt-4 text-sm font-black leading-6 text-muted">
        Date pentru discuția clinică. Nu reprezintă autorizare medicală.
      </p>
    </div>
  );
}

export function PatientJournalPage() {
  const [selectedPatientId, setSelectedPatientId] = useState(demoPatients[0].id);
  const [entries, setEntries] = useState<DemoJournalEntry[]>(seededJournalEntries);
  const [form, setForm] = useState(emptyForm);
  const [loaded, setLoaded] = useState(false);
  const [redFlagBriefVisible, setRedFlagBriefVisible] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        const parsed = JSON.parse(stored) as DemoJournalEntry[];
        if (Array.isArray(parsed)) {
          const validatedEntries = parsed.filter(isDemoJournalEntry);
          setEntries(validatedEntries.length > 0 ? validatedEntries : seededJournalEntries);
        }
      }
    } catch {
      setEntries(seededJournalEntries);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (loaded) {
      window.localStorage.setItem(storageKey, JSON.stringify(entries));
    }
  }, [entries, loaded]);

  const selectedPatient = useMemo(
    () => demoPatients.find((patient) => patient.id === selectedPatientId) ?? demoPatients[0],
    [selectedPatientId]
  );

  const selectedEntries = useMemo(
    () =>
      entries
        .filter((entry) => entry.patientScenarioId === selectedPatientId)
        .sort((a, b) => a.date.localeCompare(b.date)),
    [entries, selectedPatientId]
  );

  const selectedFormRedFlags = useMemo(
    () => redFlags.filter((flag) => form.redFlagSymptoms.includes(flag.id)),
    [form.redFlagSymptoms]
  );

  const redFlagExperienceSafety = useMemo(() => {
    if (selectedFormRedFlags.length === 0) {
      return undefined;
    }

    return evaluateSafetyRules({
      currentJournalEntry: {
        id: "current-form-entry",
        painBeforeActivity: form.painBeforeActivity,
        painAfterActivity: form.painAfterActivity,
        fatigueLevel: form.fatigue,
        walkingToleranceMinutes: form.walkingMinutes,
        sittingToleranceMinutes: form.sittingMinutes,
        notes: form.notes
      },
      previousJournalEntries: selectedEntries.map(toSafetyEntry),
      selectedRedFlagSymptoms: selectedFormRedFlags.flatMap((flag) => [flag.id, flag.label]),
      patientRestrictionsText: selectedPatient.restrictionsText,
      targetActivityType: form.targetActivityType
    });
  }, [form, selectedEntries, selectedFormRedFlags, selectedPatient.restrictionsText]);

  const redFlagMode = Boolean(redFlagExperienceSafety);

  function updateForm<T extends keyof typeof form>(key: T, value: (typeof form)[T]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function toggleRedFlag(flagId: string) {
    setRedFlagBriefVisible(false);
    setForm((current) => ({
      ...current,
      redFlagSymptoms: current.redFlagSymptoms.includes(flagId)
        ? current.redFlagSymptoms.filter((id) => id !== flagId)
        : [...current.redFlagSymptoms, flagId]
    }));
  }

  function addEntry() {
    const entry: DemoJournalEntry = {
      id: `${selectedPatientId}-${Date.now()}`,
      patientScenarioId: selectedPatientId,
      ...form
    };

    setEntries((current) => [...current, entry]);
    setForm({ ...emptyForm, date: form.date });
    setRedFlagBriefVisible(false);
  }

  function resetDemoData() {
    setEntries(seededJournalEntries);
    setForm(emptyForm);
    setRedFlagBriefVisible(false);
  }

  return (
    <main className="min-h-screen overflow-hidden">
      <section className="border-b border-ink/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)] lg:items-end">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
                <ClipboardList aria-hidden="true" size={16} />
                <span>Jurnal pacient</span>
              </div>
              <h1 className="text-safe-wrap mt-6 text-4xl font-black leading-tight text-ink sm:text-6xl">
                Alege pacientul și construiește jurnalul demo
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Selectează un scenariu fictiv, adaugă observații simple și vezi imediat ce întrebări
                se pot pregăti pentru discuția clinică.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[24rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded-panel border border-clinical/20 bg-white p-5 shadow-soft">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                <UserRound aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-clinical">Scenariu fictiv</p>
                <h2 className="text-xl font-black text-ink">Selectează pacientul</h2>
              </div>
            </div>
            <div className="mt-5 rounded-panel border border-clinical/20 bg-clinical/10 p-4">
              <p className="text-xs font-black uppercase text-clinical">Profil curent</p>
              <h3 className="mt-1 text-2xl font-black text-ink">
                {selectedPatient.fictionalName}, {selectedPatient.age} ani
              </h3>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                {selectedPatient.demoNarrative}
              </p>
            </div>
            <div className="mt-5 grid gap-3">
              {demoPatients.map((patient) => {
                const selected = patient.id === selectedPatientId;
                return (
                  <button
                    className={cn(
                      "focus-ring rounded-panel border p-4 text-left transition",
                      selected
                        ? "border-clinical bg-clinical/10 shadow-panel"
                        : "border-ink/10 bg-white hover:-translate-y-0.5 hover:border-clinical/30 hover:shadow-panel"
                    )}
                    key={patient.id}
                    onClick={() => {
                      setSelectedPatientId(patient.id);
                      setRedFlagBriefVisible(false);
                    }}
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
            className="focus-ring flex w-full items-center justify-center gap-2 rounded-panel border border-ink bg-ink px-4 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5"
            onClick={resetDemoData}
            type="button"
          >
            <RotateCcw aria-hidden="true" size={17} />
            Resetează datele demo
          </button>
        </aside>

        <div className="grid gap-6">
          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft sm:p-6">
            <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <p className="text-xs font-black uppercase text-clinical">Înregistrare nouă</p>
                <h2 className="text-2xl font-black text-ink">Adaugă intrare în jurnal</h2>
              </div>
              <p className="rounded-panel bg-paper px-3 py-2 text-sm font-bold text-muted">
                {selectedPatient.fictionalDataNotice}
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              <label className="block">
                <span className="text-sm font-bold text-ink">Data</span>
                <div className="mt-2 flex items-center gap-2 rounded-panel border border-ink/10 bg-white px-3 py-2">
                  <CalendarDays aria-hidden="true" className="text-muted" size={18} />
                  <input
                    className="focus-ring w-full bg-transparent text-base font-semibold text-ink"
                    onChange={(event) => updateForm("date", event.target.value)}
                    type="date"
                    value={form.date}
                  />
                </div>
              </label>
              <MetricInput
                label="Durere înainte"
                max={10}
                onChange={(value) => updateForm("painBeforeActivity", value)}
                value={form.painBeforeActivity}
              />
              <MetricInput
                label="Durere după"
                max={10}
                onChange={(value) => updateForm("painAfterActivity", value)}
                value={form.painAfterActivity}
              />
              <MetricInput
                label="Oboseală"
                max={10}
                onChange={(value) => updateForm("fatigue", value)}
                value={form.fatigue}
              />
              <MetricInput
                label="Mers"
                max={240}
                onChange={(value) => updateForm("walkingMinutes", value)}
                suffix="min"
                value={form.walkingMinutes}
              />
              <MetricInput
                label="Ședere"
                max={240}
                onChange={(value) => updateForm("sittingMinutes", value)}
                suffix="min"
                value={form.sittingMinutes}
              />
              <label className="block md:col-span-2">
                <span className="text-sm font-bold text-ink">Activitate țintă</span>
                <select
                  className="focus-ring mt-2 w-full rounded-panel border border-ink/10 bg-white px-3 py-3 text-base font-semibold text-ink"
                  onChange={(event) =>
                    updateForm("targetActivityType", event.target.value as TargetActivityType)
                  }
                  value={form.targetActivityType}
                >
                  {Object.entries(activityLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="mt-4 block">
              <span className="text-sm font-bold text-ink">Note</span>
              <textarea
                className="focus-ring mt-2 min-h-24 w-full resize-none rounded-panel border border-ink/10 bg-paper/70 p-3 text-sm leading-6 text-ink"
                onChange={(event) => updateForm("notes", event.target.value)}
                placeholder="Exemplu: date pentru discuția clinică, fără concluzii medicale."
                value={form.notes}
              />
            </label>

            <div className="mt-5">
              <p className="text-sm font-black uppercase text-signal">Semnale de alarmă</p>
              <div className="mt-3 grid gap-2 md:grid-cols-2">
                {redFlags.map((flag) => (
                  <label
                    className={cn(
                      "flex cursor-pointer gap-3 rounded-panel border p-3 text-sm font-semibold transition",
                      form.redFlagSymptoms.includes(flag.id)
                        ? "border-signal/40 bg-signal/10 text-signal"
                        : "border-ink/10 text-ink hover:border-signal/25"
                    )}
                    key={flag.id}
                  >
                    <input
                      checked={form.redFlagSymptoms.includes(flag.id)}
                      className="mt-1 h-4 w-4 accent-signal"
                      onChange={() => toggleRedFlag(flag.id)}
                      type="checkbox"
                    />
                    <span>{flag.label}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              className="focus-ring mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-panel border border-clinical bg-clinical px-5 py-3 text-sm font-black text-white transition hover:-translate-y-0.5"
              onClick={addEntry}
              type="button"
            >
              <Save aria-hidden="true" size={17} />
              Adaugă în jurnal
            </button>
          </section>

          {redFlagExperienceSafety ? (
            <RedFlagTriggerPanel
              activityLabel={activityLabels[form.targetActivityType]}
              briefVisible={redFlagBriefVisible}
              entryDate={form.date}
              onGenerateBrief={() => setRedFlagBriefVisible(true)}
              patientLabel={`${selectedPatient.fictionalName}, ${selectedPatient.age} ani`}
              triggeredFlags={selectedFormRedFlags.map((flag) => flag.label)}
            />
          ) : null}

          <section
            className={cn(
              "grid gap-5 transition duration-300 xl:grid-cols-2",
              redFlagMode && "opacity-30 grayscale"
            )}
            data-testid="journal-trend-dashboard"
          >
            <TrendChart
              data={selectedEntries}
              lines={[
                { dataKey: "painBeforeActivity", label: "durere înainte", color: "#0f766e" },
                { dataKey: "painAfterActivity", label: "durere după", color: "#b85c38" }
              ]}
              title="Durere înainte vs după activitate"
            />
            <TrendChart
              data={selectedEntries}
              lines={[{ dataKey: "walkingMinutes", label: "mers", color: "#0f766e" }]}
              title="Toleranță la mers"
            />
            <TrendChart
              data={selectedEntries}
              lines={[{ dataKey: "sittingMinutes", label: "ședere", color: "#24302c" }]}
              title="Toleranță la ședere"
            />
            <TrendChart
              data={selectedEntries}
              lines={[{ dataKey: "fatigue", label: "oboseală", color: "#c78b1c" }]}
              title="Trend de oboseală"
            />
          </section>

        </div>
      </section>
    </main>
  );
}
