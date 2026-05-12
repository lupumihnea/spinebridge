"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  BarChart3,
  CalendarDays,
  ClipboardList,
  MessageSquareText,
  RotateCcw,
  Save,
  UserRound
} from "lucide-react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

import { demoPatients } from "@/data/demoPatients";
import { type DemoJournalEntry, seededJournalEntries } from "@/data/seededJournalEntries";
import { redFlags } from "@/data/safety";
import { RedFlagTriggerPanel } from "@/components/journal/RedFlagTriggerPanel";
import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import {
  evaluateSafetyRules,
  type SafetyEngineResult,
  type TargetActivityType
} from "@/lib/safetyRules";
import { cn } from "@/lib/utils";

const storageKey = "spinebridge-live-journal-v1";

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

function getStatusStyles(status: SafetyEngineResult["status"]) {
  if (status === "RED") {
    return "border-signal/30 bg-signal/10 text-signal";
  }

  if (status === "YELLOW") {
    return "border-saffron/40 bg-saffron/10 text-saffron";
  }

  return "border-clinical/30 bg-clinical/10 text-clinical";
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
  lines: Array<{ dataKey: keyof DemoJournalEntry; label: string; color: string }>;
  title: string;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <BarChart3 aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="text-xs font-black uppercase text-clinical">Trend educațional</p>
          <h3 className="text-lg font-black text-ink">{title}</h3>
        </div>
      </div>
      <div className="h-64">
        {mounted ? (
          <ResponsiveContainer height="100%" width="100%">
            <LineChart data={data} margin={{ left: -18, right: 12, top: 10 }}>
              <CartesianGrid stroke="#d9dedb" strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#5a6762", fontSize: 12 }} />
              <YAxis allowDecimals={false} tick={{ fill: "#5a6762", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  border: "1px solid rgba(23,32,29,0.12)",
                  borderRadius: 8,
                  boxShadow: "0 12px 34px rgba(23,32,29,0.12)"
                }}
              />
              <Legend />
              {lines.map((line) => (
                <Line
                  dataKey={line.dataKey}
                  dot={{ r: 4 }}
                  key={String(line.dataKey)}
                  name={line.label}
                  stroke={line.color}
                  strokeWidth={3}
                  type="monotone"
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full flex-col justify-center gap-4 rounded-panel bg-mist p-5">
            {lines.map((line, index) => (
              <div className="space-y-2" key={String(line.dataKey)}>
                <div className="flex items-center justify-between text-xs font-bold text-muted">
                  <span>{line.label}</span>
                  <span>{data[data.length - 1]?.[line.dataKey] ?? 0}</span>
                </div>
                <div className="h-3 rounded-panel bg-white">
                  <div
                    className="h-3 rounded-panel"
                    style={{
                      backgroundColor: line.color,
                      width: `${Math.min(100, 42 + index * 18)}%`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="mt-4 text-sm font-semibold leading-6 text-muted">
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
          setEntries(parsed);
        }
      }
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

  const latestSafety = useMemo(() => {
    const latest = selectedEntries[selectedEntries.length - 1];
    if (!latest) {
      return undefined;
    }

    const previous = selectedEntries.slice(0, -1).map(toSafetyEntry);
    const selectedRedFlagSymptoms = latest.redFlagSymptoms.flatMap((flagId) => {
      const flag = redFlags.find((item) => item.id === flagId);
      return flag ? [flag.id, flag.label] : [flagId];
    });

    return evaluateSafetyRules({
      currentJournalEntry: toSafetyEntry(latest),
      previousJournalEntries: previous,
      selectedRedFlagSymptoms,
      patientRestrictionsText: selectedPatient.restrictionsText,
      targetActivityType: latest.targetActivityType
    });
  }, [selectedEntries, selectedPatient.restrictionsText]);

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
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_24rem] lg:items-end">
            <div className="min-w-0">
              <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-bold text-clinical shadow-panel">
                <ClipboardList aria-hidden="true" size={16} />
                <span>Jurnal pacient</span>
              </div>
              <h1 className="text-safe-wrap mt-6 text-4xl font-black leading-tight text-ink sm:text-6xl">
                Jurnal educațional pentru dialog clinic
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">
                Notează observații funcționale fictive, urmărește trenduri educaționale și
                pregătește întrebări pentru clinician. Nu reprezintă autorizare medicală.
              </p>
            </div>
            <aside className="rounded-panel border border-signal/20 bg-white p-5 shadow-soft">
              <p className="text-sm font-black uppercase text-signal">Limită vizibilă</p>
              <p className="mt-3 text-xl font-black leading-7 text-ink">
                Dashboard-ul organizează informații. Nu decide progresia, tratamentul sau revenirea
                la sport.
              </p>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 pt-10 sm:px-6 lg:px-8">
        <EvidenceBoundaryLayer surface="journal" />
      </section>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[22rem_minmax(0,1fr)] lg:px-8">
        <aside className="space-y-5">
          <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                <UserRound aria-hidden="true" size={20} />
              </span>
              <div>
                <p className="text-xs font-black uppercase text-clinical">Scenariu fictiv</p>
                <h2 className="text-xl font-black text-ink">Selectează pacientul</h2>
              </div>
            </div>
            <div className="mt-5 grid gap-3">
              {demoPatients.map((patient) => {
                const selected = patient.id === selectedPatientId;
                return (
                  <button
                    className={cn(
                      "focus-ring rounded-panel border p-4 text-left transition",
                      selected
                        ? "border-clinical bg-clinical/10"
                        : "border-ink/10 bg-white hover:border-clinical/30"
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
          <section className="rounded-panel border border-ink/10 bg-white p-5 shadow-soft">
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

          {latestSafety ? (
            <section
              className={cn(
                "grid gap-5 transition duration-300 lg:grid-cols-[1fr_1fr]",
                redFlagMode && "opacity-30 grayscale"
              )}
              data-testid="journal-latest-safety"
            >
              <div
                className={cn(
                  "rounded-panel border p-5 shadow-panel",
                  getStatusStyles(latestSafety.status)
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-white/80">
                    {latestSafety.status === "RED" ? (
                      <AlertTriangle aria-hidden="true" size={22} />
                    ) : (
                      <Activity aria-hidden="true" size={22} />
                    )}
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase">Ultimul status educațional</p>
                    <h2 className="text-2xl font-black text-ink">{latestSafety.title}</h2>
                  </div>
                </div>
                <p className="mt-4 text-base font-semibold leading-7 text-ink">
                  {latestSafety.explanation}
                </p>
                <p className="mt-4 rounded-panel bg-white/80 p-4 text-sm font-bold leading-6 text-ink">
                  {latestSafety.recommendedNextStepText}
                </p>
                <div className="mt-4">
                  <p className="text-sm font-black uppercase">Reguli declanșate</p>
                  <ul className="mt-2 space-y-2 text-sm leading-6 text-ink">
                    {latestSafety.triggeredRules.length > 0 ? (
                      latestSafety.triggeredRules.map((rule) => (
                        <li key={rule.id}>• {rule.label}</li>
                      ))
                    ) : (
                      <li>• Nicio regulă de escaladare în scenariul curent.</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                    <MessageSquareText aria-hidden="true" size={22} />
                  </span>
                  <div>
                    <p className="text-xs font-black uppercase text-clinical">
                      Ce discut cu clinicianul?
                    </p>
                    <h2 className="text-2xl font-black text-ink">Întrebări pentru consult</h2>
                  </div>
                </div>
                <ul className="mt-5 space-y-3 text-sm leading-6 text-ink">
                  {latestSafety.clinicianQuestions.map((question) => (
                    <li className="rounded-panel bg-paper p-3 font-semibold" key={question}>
                      {question}
                    </li>
                  ))}
                </ul>
                <div className="mt-5 rounded-panel border border-signal/20 bg-signal/5 p-4 text-sm font-black leading-6 text-signal">
                  Nu reprezintă autorizare medicală. Date pentru discuția clinică.
                </div>
              </div>
            </section>
          ) : null}
        </div>
      </section>
    </main>
  );
}
