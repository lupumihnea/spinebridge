import { describe, expect, it } from "vitest";

import { frameworkDomains } from "@/data/framework";
import { journalItems } from "@/data/journal";
import { demoPatients } from "@/data/demoPatients";
import { redFlags, strongDisclaimer } from "@/data/safety";
import { createConsultationBrief } from "@/lib/brief";
import { defaultDemoState } from "@/lib/demo-state";

describe("SpineBridge Live content", () => {
  it("keeps the requested Romanian landing disclaimer", () => {
    expect(strongDisclaimer).toBe(
      "Instrument educațional. Nu stabilește tratament. Nu autorizează progresia."
    );
  });

  it("defines the five educational domains with the core paper fields", () => {
    expect(frameworkDomains).toHaveLength(5);

    for (const domain of frameworkDomains) {
      expect(domain.id).toBeTruthy();
      expect(domain.title).toBeTruthy();
      expect(domain.academicLabel).toBeTruthy();
      expect(domain.patientFriendlyMessage).toBeTruthy();
      expect(domain.educationalObjective).toBeTruthy();
      expect(domain.selfMonitoringItems.length).toBeGreaterThan(0);
      expect(domain.appMustNotClaim.length).toBeGreaterThan(0);
      expect(domain.suggestedQuestionsForClinician.length).toBeGreaterThan(0);
      expect(domain.visualStyleKey).toBeTruthy();
    }
  });

  it("defines four fictional patient scenarios with clinician-decided pathways", () => {
    expect(demoPatients).toHaveLength(4);

    for (const patient of demoPatients) {
      expect(patient.fictionalDataNotice).toMatch(/fictiv|ficțional|demo/i);
      expect(patient.treatmentPathway.decidedByClinician).toBe(true);
      expect(patient.restrictionsText).toMatch(/nu generate|nu le calculează|nu produce/i);
      expect(patient.functionalGoals.work).toBeTruthy();
      expect(patient.workDemandProfile.discussionFocus.length).toBeGreaterThan(0);
      expect(patient.sportActivityProfile.discussionFocus.length).toBeGreaterThan(0);
    }
  });

  it("creates a consultation brief without clinical approval phrasing", () => {
    const brief = createConsultationBrief({
      patient: demoPatients[0],
      domain: frameworkDomains[0],
      state: {
        ...defaultDemoState,
        journalItemIds: journalItems.slice(0, 2).map((item) => item.id),
        redFlagIds: [redFlags[0].id]
      },
      redFlags
    });

    const corpus = JSON.stringify(brief).toLowerCase();
    expect(corpus).toContain("date fictive");
    expect(corpus).toContain("echipei medicale");
    const disallowedPhrases = [
      ["clea", "red"].join(""),
      ["safe", " to ", "progress"].join(""),
      ["approved", " for ", "sport"].join(""),
      ["apt", " pentru ", "sport"].join(""),
      ["aprobat", " pentru ", "sport"].join(""),
      ["recomandare", " de ", "tratament"].join("")
    ];

    for (const phrase of disallowedPhrases) {
      expect(corpus).not.toContain(phrase);
    }
  });
});
