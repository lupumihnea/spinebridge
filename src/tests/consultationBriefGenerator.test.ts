import { describe, expect, it } from "vitest";

import { demoPatients } from "@/data/demoPatients";
import { seededJournalEntries } from "@/data/seededJournalEntries";
import { demandProfiles } from "@/data/workVsSport";
import {
  consultationBriefSafetyStatement,
  generateConsultationBrief
} from "@/lib/consultationBriefGenerator";
import { teachBackDemoExample } from "@/lib/teachBackAnalyzer";

describe("consultation brief generator", () => {
  it("uses the required safety statement exactly", () => {
    expect(consultationBriefSafetyStatement).toBe(
      "Acest document este un rezumat educațional pentru discuția clinică. Nu este plan de tratament și nu autorizează revenirea la muncă, sport sau efort solicitant."
    );
  });

  it("generates a complete educational summary from fictional patient data", () => {
    const patient = demoPatients.find((item) => item.id === "gym-no-pain") ?? demoPatients[0];
    const selectedDemand =
      demandProfiles.find((demand) => demand.id === "gym-training") ?? demandProfiles[0];
    const journalEntries = seededJournalEntries.filter(
      (entry) => entry.patientScenarioId === patient.id
    );

    const brief = generateConsultationBrief({
      patient,
      journalEntries,
      restrictionsText: patient.restrictionsText,
      selectedDemand,
      teachBackInput: {
        fractureUnderstanding: teachBackDemoExample.input,
        restrictions: patient.restrictionsText,
        redFlagSymptoms: "Aș contacta medicul pentru slăbiciune nouă sau amorțeală.",
        workSportDifference: "Munca și sportul sunt discuții diferite."
      }
    });

    expect(brief.patientProfile.join(" ")).toContain("Radu N.");
    expect(brief.specialistContext.join(" ")).toContain("deja stabilit");
    expect(brief.restrictions.join(" ")).toContain("clinician");
    expect(brief.functionalGoals.join(" ")).toContain("Antrenament la sală");
    expect(brief.journalRows).toHaveLength(2);
    expect(brief.teachBackMisunderstandings.join(" ")).toContain("Lipsa durerii");
    expect(brief.clinicianQuestions.length).toBeGreaterThanOrEqual(5);
    expect(brief.appNonDecisions.join(" ")).toContain(
      "Nu autorizează revenirea la muncă, sport sau efort solicitant."
    );
  });

  it("keeps red flag status explicit without inventing treatment instructions", () => {
    const patient = demoPatients[0];
    const selectedDemand = demandProfiles[0];
    const brief = generateConsultationBrief({
      patient,
      journalEntries: [
        {
          id: "red-flag-entry",
          patientScenarioId: patient.id,
          date: "2026-05-12",
          painBeforeActivity: 2,
          painAfterActivity: 4,
          walkingMinutes: 15,
          sittingMinutes: 25,
          fatigue: 6,
          notes: "Semnal notat pentru discuție clinică.",
          targetActivityType: "daily_activity",
          redFlagSymptoms: ["weakness"]
        }
      ],
      restrictionsText: patient.restrictionsText,
      selectedDemand,
      teachBackInput: {
        fractureUnderstanding: "Am înțeles că trebuie să discut cu medicul.",
        restrictions: patient.restrictionsText,
        redFlagSymptoms: "Slăbiciune nouă.",
        workSportDifference: "Munca și sportul sunt separate."
      }
    });

    const corpus = JSON.stringify(brief).toLocaleLowerCase("ro-RO");

    expect(brief.redFlagStatus.join(" ")).toContain("slăbiciune");
    expect(brief.safetyResult?.status).toBe("RED");
    expect(corpus).not.toContain("începe exerciții");
    expect(corpus).not.toContain("crește efortul");
    expect(corpus).not.toContain("program de antrenament");
  });
});
