import { describe, expect, it } from "vitest";

import { seededJournalEntries } from "@/data/seededJournalEntries";
import { isDemoJournalEntry } from "@/lib/demoJournalValidation";

describe("demo journal validation", () => {
  it("accepts every seeded journal entry", () => {
    expect(seededJournalEntries.every(isDemoJournalEntry)).toBe(true);
  });

  it("rejects corrupt localStorage-like entries before they reach demo screens", () => {
    expect(
      isDemoJournalEntry({
        id: "bad",
        patientScenarioId: "gym-no-pain",
        date: "2026-05-12",
        painBeforeActivity: "0",
        painAfterActivity: 0,
        walkingMinutes: 20,
        sittingMinutes: 40,
        fatigue: 2,
        notes: "text",
        targetActivityType: "sport",
        redFlagSymptoms: []
      })
    ).toBe(false);

    expect(
      isDemoJournalEntry({
        id: "bad-target",
        patientScenarioId: "gym-no-pain",
        date: "2026-05-12",
        painBeforeActivity: 0,
        painAfterActivity: 0,
        walkingMinutes: 20,
        sittingMinutes: 40,
        fatigue: 2,
        notes: "text",
        targetActivityType: "clearance",
        redFlagSymptoms: []
      })
    ).toBe(false);
  });
});
