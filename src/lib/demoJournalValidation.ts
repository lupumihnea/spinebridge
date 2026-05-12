import type { DemoJournalEntry } from "@/data/seededJournalEntries";
import type { TargetActivityType } from "@/lib/safetyRules";

export function isTargetActivityType(value: unknown): value is TargetActivityType {
  return (
    value === "daily_activity" ||
    value === "work" ||
    value === "physical_activity" ||
    value === "sport"
  );
}

function isFiniteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value);
}

export function isDemoJournalEntry(value: unknown): value is DemoJournalEntry {
  if (!value || typeof value !== "object") {
    return false;
  }

  const entry = value as Partial<DemoJournalEntry>;

  return (
    typeof entry.id === "string" &&
    typeof entry.patientScenarioId === "string" &&
    typeof entry.date === "string" &&
    isFiniteNumber(entry.painBeforeActivity) &&
    isFiniteNumber(entry.painAfterActivity) &&
    isFiniteNumber(entry.walkingMinutes) &&
    isFiniteNumber(entry.sittingMinutes) &&
    isFiniteNumber(entry.fatigue) &&
    typeof entry.notes === "string" &&
    isTargetActivityType(entry.targetActivityType) &&
    Array.isArray(entry.redFlagSymptoms) &&
    entry.redFlagSymptoms.every((flag) => typeof flag === "string")
  );
}
