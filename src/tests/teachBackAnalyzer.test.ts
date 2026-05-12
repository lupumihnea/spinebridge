import { describe, expect, it } from "vitest";

import {
  analyzeTeachBack,
  teachBackDemoExample,
  type TeachBackAnalysis
} from "@/lib/teachBackAnalyzer";

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

function expectNoProgressionOrTreatmentAdvice(result: TeachBackAnalysis) {
  const generatedText = collectStrings(result).join(" ").toLocaleLowerCase("ro-RO");
  const bannedAdviceFragments = [
    "recomandare de tratament",
    "plan de tratament",
    "începe exerciții",
    "crește efortul",
    "poți progresa",
    "poți reveni complet",
    "ești pregătit"
  ];

  for (const phrase of bannedAdviceFragments) {
    expect(generatedText).not.toContain(phrase);
  }
}

describe("teachBackAnalyzer", () => {
  it("returns the requested demo output for the no-pain gym misconception", () => {
    const result = analyzeTeachBack({
      fractureUnderstanding: teachBackDemoExample.input,
      restrictions: "",
      redFlagSymptoms: "",
      workSportDifference: ""
    });

    expect(result.saferRephrasing).toBe(teachBackDemoExample.output);
    expect(result.saferRephrasing).toContain("limite trebuie clarificate");
    expect(result.saferRephrasing).not.toContain("sarcini permise");
    expect(result.riskMisconceptions).toEqual(
      expect.arrayContaining([
        "Lipsa durerii este confundată cu permisiunea de a forța sau de a face efort complet."
      ])
    );
    expect(result.clarityScore).toBeLessThan(50);
    expectNoProgressionOrTreatmentAdvice(result);
  });

  it("scores a clear answer higher when restrictions, red flags, clinician dialogue, work and sport are separated", () => {
    const result = analyzeTeachBack({
      fractureUnderstanding:
        "Am înțeles că fractura cere atenție la simptome și că aplicația mă ajută doar să explic ce observ.",
      restrictions:
        "Medicul mi-a comunicat restricții despre ridicare, efort și condus, iar aceste limite trebuie discutate la consult.",
      redFlagSymptoms:
        "Aș contacta medicul pentru slăbiciune nouă, amorțeală, modificări ale mersului sau probleme urinare.",
      workSportDifference:
        "Munca și sportul sunt discuții separate, cu sarcini diferite și solicitări diferite pentru corp."
    });

    expect(result.clarityScore).toBeGreaterThanOrEqual(90);
    expect(result.riskMisconceptions).toHaveLength(0);
    expectNoProgressionOrTreatmentAdvice(result);
  });

  it("detects confusion between work and sport", () => {
    const result = analyzeTeachBack({
      fractureUnderstanding: "Înțeleg că trebuie să notez simptomele.",
      restrictions: "Specialistul mi-a spus să evit efortul mare.",
      redFlagSymptoms: "Aș suna medicul pentru amorțeală sau slăbiciune nouă.",
      workSportDifference: "Nu e diferență: dacă pot lucra pot face sport."
    });

    expect(result.riskMisconceptions).toEqual(
      expect.arrayContaining([
        "Revenirea la muncă și revenirea la sport sunt amestecate într-o singură concluzie."
      ])
    );
  });

  it("detects missing clinician dialogue and overly confident phrasing", () => {
    const result = analyzeTeachBack({
      fractureUnderstanding: "Pot reveni complet dacă mă simt bine.",
      restrictions: "Nu știu exact restricțiile.",
      redFlagSymptoms: "Nu știu.",
      workSportDifference: "Cred că decid după cum mă simt."
    });

    expect(result.riskMisconceptions.join(" ")).toContain("clinicianul");
    expect(result.riskMisconceptions).toEqual(
      expect.arrayContaining([
        "Formularea este prea sigură pe revenirea completă doar pe baza stării subiective."
      ])
    );
    expect(result.clarityScore).toBeLessThan(45);
    expectNoProgressionOrTreatmentAdvice(result);
  });
});
