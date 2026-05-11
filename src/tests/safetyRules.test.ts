import { describe, expect, it } from "vitest";

import {
  evaluateSafetyRules,
  explainWhyNotClearance,
  type SafetyEngineResult,
  type SafetyRuleJournalEntry,
  type TargetActivityType
} from "@/lib/safetyRules";

const baselineEntry: SafetyRuleJournalEntry = {
  id: "current",
  painBeforeActivity: 1,
  painAfterActivity: 1,
  fatigueLevel: 2,
  walkingToleranceMinutes: 25,
  sittingToleranceMinutes: 30,
  notes: "Observație educațională fără semnale noi."
};

const safeRestrictionsText =
  "Restricții textuale deja comunicate de specialist pentru activități cotidiene. Nu sunt generate de aplicație.";

function evaluateWith(overrides: {
  currentJournalEntry?: SafetyRuleJournalEntry;
  previousJournalEntries?: SafetyRuleJournalEntry[];
  selectedRedFlagSymptoms?: string[];
  patientRestrictionsText?: string;
  targetActivityType?: TargetActivityType;
} = {}) {
  return evaluateSafetyRules({
    currentJournalEntry: overrides.currentJournalEntry ?? baselineEntry,
    previousJournalEntries: overrides.previousJournalEntries ?? [],
    selectedRedFlagSymptoms: overrides.selectedRedFlagSymptoms ?? [],
    patientRestrictionsText: overrides.patientRestrictionsText ?? safeRestrictionsText,
    targetActivityType: overrides.targetActivityType ?? "daily_activity"
  });
}

function collectStrings(value: unknown): string[] {
  if (typeof value === "string") {
    return [value];
  }

  if (Array.isArray(value)) {
    return value.flatMap(collectStrings);
  }

  if (value && typeof value === "object") {
    return Object.values(value).flatMap(collectStrings);
  }

  return [];
}

function expectNoBannedGeneratedPhrases(result: SafetyEngineResult) {
  const bannedPhrases = [
    ["clea", "red"].join(""),
    ["app", "roved"].join(""),
    ["safe", " to ", "progress"].join(""),
    ["medically", " safe"].join(""),
    ["return", " authorized"].join(""),
    ["treatment", " plan"].join(""),
    ["exercise", " prescription"].join("")
  ];
  const generatedText = collectStrings(result).join(" ").toLocaleLowerCase("ro-RO");

  for (const phrase of bannedPhrases) {
    expect(generatedText).not.toContain(phrase);
  }
}

describe("deterministic safety engine", () => {
  it.each([
    "new weakness",
    "numbness",
    "paresthesia",
    "new severe radicular pain",
    "urinary or bowel changes",
    "perineal anesthesia",
    "gait deterioration",
    "severe progressive pain",
    "repeated functional deterioration"
  ])("returns RED for red flag: %s", (redFlag) => {
    const result = evaluateWith({ selectedRedFlagSymptoms: [redFlag] });

    expect(result.status).toBe("RED");
    expect(result.triggeredRules[0]?.status).toBe("RED");
    expect(result.title).toContain("Semnal de alarmă");
  });

  it("returns YELLOW for sport when restrictions do not mention clinician discussion for sport", () => {
    const result = evaluateWith({
      targetActivityType: "sport",
      patientRestrictionsText:
        "Restricții textuale pentru activități zilnice, deja comunicate în scenariul fictiv."
    });

    expect(result.status).toBe("YELLOW");
    expect(result.triggeredRules.map((rule) => rule.id)).toContain(
      "sport-needs-clinical-dialogue"
    );
  });

  it("returns GREEN_EDUCATIONAL_ONLY without red flags or worsening trend, without clearance wording", () => {
    const result = evaluateWith({
      targetActivityType: "work",
      previousJournalEntries: [
        {
          ...baselineEntry,
          id: "previous",
          painBeforeActivity: 1,
          painAfterActivity: 1,
          fatigueLevel: 2,
          walkingToleranceMinutes: 20,
          sittingToleranceMinutes: 25
        }
      ]
    });

    expect(result.status).toBe("GREEN_EDUCATIONAL_ONLY");
    expect(result.triggeredRules).toHaveLength(0);
    expect(result.recommendedNextStepText).toContain(explainWhyNotClearance());
    expectNoBannedGeneratedPhrases(result);
  });

  it("never returns banned generated phrases for RED, YELLOW, or GREEN outputs", () => {
    const red = evaluateWith({ selectedRedFlagSymptoms: ["new weakness"] });
    const yellow = evaluateWith({
      targetActivityType: "sport",
      patientRestrictionsText: "Restricții textuale pentru activități zilnice."
    });
    const green = evaluateWith();

    expectNoBannedGeneratedPhrases(red);
    expectNoBannedGeneratedPhrases(yellow);
    expectNoBannedGeneratedPhrases(green);
  });

  it("returns YELLOW when trends worsen across entries", () => {
    const result = evaluateWith({
      previousJournalEntries: [
        {
          id: "previous-1",
          painBeforeActivity: 1,
          painAfterActivity: 3,
          fatigueLevel: 2,
          walkingToleranceMinutes: 30,
          sittingToleranceMinutes: 40,
          notes: ""
        }
      ],
      currentJournalEntry: {
        id: "current",
        painBeforeActivity: 2,
        painAfterActivity: 5,
        fatigueLevel: 5,
        walkingToleranceMinutes: 15,
        sittingToleranceMinutes: 20,
        notes: ""
      }
    });

    expect(result.status).toBe("YELLOW");
    expect(result.triggeredRules.map((rule) => rule.id)).toEqual(
      expect.arrayContaining([
        "repeated-pain-after-activity",
        "worsening-fatigue",
        "tolerance-drop"
      ])
    );
  });

  it("returns the fixed Romanian explanation for why the app is not a clearance tool", () => {
    expect(explainWhyNotClearance()).toBe(
      "Aplicația nu poate autoriza progresia deoarece stabilitatea leziunii, restricțiile și revenirea la sarcini solicitante rămân decizii clinice."
    );
  });
});
