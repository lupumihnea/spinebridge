import type { TargetActivityType } from "@/lib/safetyRules";

export interface DemoJournalEntry {
  id: string;
  patientScenarioId: string;
  date: string;
  painBeforeActivity: number;
  painAfterActivity: number;
  walkingMinutes: number;
  sittingMinutes: number;
  fatigue: number;
  notes: string;
  targetActivityType: TargetActivityType;
  redFlagSymptoms: string[];
}

export const seededJournalEntries: DemoJournalEntry[] = [
  {
    id: "runner-recreational-1",
    patientScenarioId: "runner-recreational",
    date: "2026-05-01",
    painBeforeActivity: 1,
    painAfterActivity: 2,
    walkingMinutes: 18,
    sittingMinutes: 35,
    fatigue: 3,
    notes: "Mers lejer, întrebări despre diferența dintre mers și alergare.",
    targetActivityType: "daily_activity",
    redFlagSymptoms: []
  },
  {
    id: "runner-recreational-2",
    patientScenarioId: "runner-recreational",
    date: "2026-05-04",
    painBeforeActivity: 1,
    painAfterActivity: 2,
    walkingMinutes: 22,
    sittingMinutes: 40,
    fatigue: 3,
    notes: "Vrea să discute alergarea recreațională, fără concluzii ale aplicației.",
    targetActivityType: "sport",
    redFlagSymptoms: []
  },
  {
    id: "office-driving-1",
    patientScenarioId: "office-driving",
    date: "2026-05-01",
    painBeforeActivity: 2,
    painAfterActivity: 3,
    walkingMinutes: 12,
    sittingMinutes: 25,
    fatigue: 4,
    notes: "Șederea prelungită și condusul sunt notate ca teme pentru consult.",
    targetActivityType: "work",
    redFlagSymptoms: []
  },
  {
    id: "office-driving-2",
    patientScenarioId: "office-driving",
    date: "2026-05-05",
    painBeforeActivity: 2,
    painAfterActivity: 2,
    walkingMinutes: 16,
    sittingMinutes: 32,
    fatigue: 3,
    notes: "A urmărit pauzele și schimbările de poziție.",
    targetActivityType: "work",
    redFlagSymptoms: []
  },
  {
    id: "physical-worker-1",
    patientScenarioId: "physical-worker",
    date: "2026-05-02",
    painBeforeActivity: 2,
    painAfterActivity: 4,
    walkingMinutes: 20,
    sittingMinutes: 20,
    fatigue: 5,
    notes: "Întrebări despre diferența dintre activități casnice și muncă fizică.",
    targetActivityType: "work",
    redFlagSymptoms: []
  },
  {
    id: "physical-worker-2",
    patientScenarioId: "physical-worker",
    date: "2026-05-06",
    painBeforeActivity: 3,
    painAfterActivity: 5,
    walkingMinutes: 16,
    sittingMinutes: 18,
    fatigue: 6,
    notes: "Oboseală mai mare după activități domestice; de discutat cu clinicianul.",
    targetActivityType: "physical_activity",
    redFlagSymptoms: []
  },
  {
    id: "gym-no-pain-1",
    patientScenarioId: "gym-no-pain",
    date: "2026-05-03",
    painBeforeActivity: 0,
    painAfterActivity: 1,
    walkingMinutes: 20,
    sittingMinutes: 35,
    fatigue: 3,
    notes: "Întrebare despre sală, fără a transforma absența durerii în permisiune.",
    targetActivityType: "sport",
    redFlagSymptoms: []
  },
  {
    id: "gym-no-pain-2",
    patientScenarioId: "gym-no-pain",
    date: "2026-05-07",
    painBeforeActivity: 0,
    painAfterActivity: 0,
    walkingMinutes: 24,
    sittingMinutes: 40,
    fatigue: 3,
    notes: "Dacă nu doare, pot forța? Această confuzie trebuie discutată.",
    targetActivityType: "sport",
    redFlagSymptoms: []
  }
];
