import { describe, expect, it } from "vitest";

import { comparisonColumns, demandProfiles } from "@/data/workVsSport";

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

describe("work versus sport comparison content", () => {
  it("defines the three required comparison columns with all sections", () => {
    expect(comparisonColumns.map((column) => column.title)).toEqual([
      "Activități zilnice",
      "Muncă",
      "Sport / sală / activitate solicitantă"
    ]);

    for (const column of comparisonColumns) {
      expect(column.typicalDemands.length).toBeGreaterThanOrEqual(3);
      expect(column.clinicianClarifications.length).toBeGreaterThanOrEqual(3);
      expect(column.selfMonitoring.length).toBeGreaterThanOrEqual(3);
      expect(column.appCannotDecide.length).toBeGreaterThanOrEqual(3);
    }
  });

  it("defines all eight selector demand profiles", () => {
    expect(demandProfiles.map((profile) => profile.id)).toEqual([
      "office-work",
      "driving",
      "prolonged-sitting",
      "lifting-carrying",
      "gym-training",
      "running",
      "contact-sport",
      "mixed-physical-work"
    ]);

    for (const profile of demandProfiles) {
      expect(profile.clinicianQuestions.length).toBeGreaterThanOrEqual(3);
      expect(profile.journalMetrics.length).toBeGreaterThanOrEqual(3);
      expect(profile.safetyBoundary).toBeTruthy();
    }
  });

  it("keeps selected-demand boundaries educational and non-authorizing", () => {
    const corpus = collectStrings(demandProfiles).join(" ").toLocaleLowerCase("ro-RO");
    const bannedPhrases = [
      ["clea", "red"].join(""),
      ["safe", " to ", "progress"].join(""),
      ["approved", " for ", "sport"].join(""),
      ["treatment", " recommendation"].join(""),
      ["plan", " de ", "tratament"].join(""),
      ["recomandare", " de ", "tratament"].join("")
    ];

    expect(corpus).toContain("nu autorizează");
    expect(corpus).toContain("nu stabilește");

    for (const phrase of bannedPhrases) {
      expect(corpus).not.toContain(phrase);
    }
  });
});
