import { redFlags } from "@/data/safety";
import type { DemoJournalEntry } from "@/data/seededJournalEntries";
import type { DemandProfile } from "@/data/workVsSport";
import {
  analyzeTeachBack,
  type TeachBackAnalysis,
  type TeachBackAnalyzerInput
} from "@/lib/teachBackAnalyzer";
import {
  evaluateSafetyRules,
  type SafetyEngineResult,
  type TargetActivityType
} from "@/lib/safetyRules";
import type { PatientScenario } from "@/types/demo";

export const consultationBriefSafetyStatement =
  "Acest document este un rezumat educațional pentru discuția clinică. Nu este plan de tratament și nu autorizează revenirea la muncă, sport sau efort solicitant.";

export interface ConsultationBriefGeneratorInput {
  patient: PatientScenario;
  journalEntries: DemoJournalEntry[];
  restrictionsText: string;
  selectedDemand: DemandProfile;
  teachBackInput: TeachBackAnalyzerInput;
}

export interface GeneratedBriefJournalRow {
  date: string;
  targetActivityType: TargetActivityType;
  painBeforeActivity: number;
  painAfterActivity: number;
  walkingMinutes: number;
  sittingMinutes: number;
  fatigue: number;
  notes: string;
}

export interface GeneratedConsultationBrief {
  safetyStatement: string;
  patientProfile: string[];
  specialistContext: string[];
  restrictions: string[];
  functionalGoals: string[];
  journalRows: GeneratedBriefJournalRow[];
  redFlagStatus: string[];
  teachBackMisunderstandings: string[];
  clinicianQuestions: string[];
  appNonDecisions: string[];
  teachBackAnalysis: TeachBackAnalysis;
  safetyResult?: SafetyEngineResult;
}

const targetActivityLabels: Record<TargetActivityType, string> = {
  daily_activity: "activitate zilnică",
  work: "muncă",
  physical_activity: "activitate fizică",
  sport: "sport"
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

function unique(items: string[]) {
  return Array.from(new Set(items.filter(Boolean)));
}

function getRedFlagLabels(redFlagIds: string[]) {
  return redFlagIds.map((id) => redFlags.find((flag) => flag.id === id)?.label ?? id);
}

export function formatTargetActivityLabel(targetActivityType: TargetActivityType) {
  return targetActivityLabels[targetActivityType];
}

export function generateConsultationBrief({
  patient,
  journalEntries,
  restrictionsText,
  selectedDemand,
  teachBackInput
}: ConsultationBriefGeneratorInput): GeneratedConsultationBrief {
  const sortedEntries = [...journalEntries].sort((a, b) => a.date.localeCompare(b.date));
  const latestEntries = sortedEntries.slice(-4);
  const latestEntry = sortedEntries[sortedEntries.length - 1];
  const selectedRedFlagLabels = latestEntries.flatMap((entry) =>
    getRedFlagLabels(entry.redFlagSymptoms)
  );
  const teachBackAnalysis = analyzeTeachBack(teachBackInput);
  const safetyResult = latestEntry
    ? evaluateSafetyRules({
        currentJournalEntry: toSafetyEntry(latestEntry),
        previousJournalEntries: sortedEntries.slice(0, -1).map(toSafetyEntry),
        selectedRedFlagSymptoms: [
          ...latestEntry.redFlagSymptoms,
          ...getRedFlagLabels(latestEntry.redFlagSymptoms)
        ],
        patientRestrictionsText: restrictionsText,
        targetActivityType: latestEntry.targetActivityType
      })
    : undefined;

  const clinicianQuestions = unique([
    ...(safetyResult?.clinicianQuestions ?? []),
    ...teachBackAnalysis.suggestedClinicianQuestions,
    ...selectedDemand.clinicianQuestions,
    "Ce restricții comunicate anterior trebuie păstrate, clarificate sau reformulate pentru pacient?",
    "Ce observații din jurnal sunt utile pentru medicul de recuperare sau kinetoterapeut?"
  ]).slice(0, 10);

  return {
    safetyStatement: consultationBriefSafetyStatement,
    patientProfile: [
      `${patient.fictionalName}, ${patient.age} ani`,
      patient.scenarioLabel,
      patient.injuryDescription,
      patient.fictionalDataNotice
    ],
    specialistContext: [
      `Traseu terapeutic deja stabilit de specialist: ${patient.treatmentPathway.label}.`,
      patient.treatmentPathway.note,
      "Documentul pornește de la premisa că evaluarea leziunii și statusul neurologic aparțin echipei medicale."
    ],
    restrictions: [
      restrictionsText || "Nu a fost introdus text de restricții comunicate.",
      "Textul este tratat ca informație comunicată anterior de clinician, nu ca rezultat generat de aplicație."
    ],
    functionalGoals: [
      `Activități zilnice: ${patient.functionalGoals.dailyActivity}`,
      `Muncă: ${patient.functionalGoals.work}`,
      `Sport / fitness: ${patient.functionalGoals.sportOrFitness}`,
      `Cerință selectată pentru discuție: ${selectedDemand.label}. ${selectedDemand.description}`
    ],
    journalRows: latestEntries.map((entry) => ({
      date: entry.date,
      targetActivityType: entry.targetActivityType,
      painBeforeActivity: entry.painBeforeActivity,
      painAfterActivity: entry.painAfterActivity,
      walkingMinutes: entry.walkingMinutes,
      sittingMinutes: entry.sittingMinutes,
      fatigue: entry.fatigue,
      notes: entry.notes
    })),
    redFlagStatus:
      selectedRedFlagLabels.length > 0
        ? unique(selectedRedFlagLabels)
        : ["Nu sunt semne de alarmă bifate în cele mai recente intrări incluse."],
    teachBackMisunderstandings:
      teachBackAnalysis.riskMisconceptions.length > 0
        ? teachBackAnalysis.riskMisconceptions
        : ["Nu apar neclarități majore în regulile teach-back demonstrative."],
    clinicianQuestions,
    appNonDecisions: [
      "Nu stabilește diagnostic sau clasificarea leziunii.",
      "Nu modifică restricțiile comunicate de clinician.",
      "Nu prescrie exerciții, intensitate sau calendar de progresie.",
      "Nu autorizează revenirea la muncă, sport sau efort solicitant.",
      "Nu înlocuiește consultul medical, medicul de recuperare sau kinetoterapeutul."
    ],
    teachBackAnalysis,
    safetyResult
  };
}
