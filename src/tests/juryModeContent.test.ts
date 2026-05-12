import { describe, expect, it } from "vitest";

import { jurySteps, validationLadder } from "@/data/juryMode";

describe("jury mode demo script", () => {
  it("defines the guided ten-step jury flow", () => {
    expect(jurySteps).toHaveLength(10);
    expect(jurySteps.map((step) => step.id)).toEqual([
      "problem",
      "framework",
      "patient",
      "journal",
      "red-flag",
      "teach-back",
      "work-sport",
      "brief",
      "research",
      "closing"
    ]);
  });

  it("keeps the required opening and closing messages exact", () => {
    expect(jurySteps[0].statement).toBe(
      "După o fractură lombară/toracolombară fără deficit neurologic, pacientul nu are nevoie doar de controlul durerii, ci de înțelegere, automonitorizare și dialog clinic."
    );
    expect(jurySteps[9].statement).toBe(
      "Aplicația nu înlocuiește clinicianul. Îl ajută pe pacient să înțeleagă, să monitorizeze și să comunice mai bine."
    );
  });

  it("includes the requested live-demo moments", () => {
    const corpus = jurySteps.map((step) => `${step.title} ${step.statement}`).join(" ");

    expect(corpus).toContain("no pain = safe");
    expect(corpus).toContain("amorțeală nouă");
    expect(corpus).toContain("Dacă nu mă doare, pot merge la sală.");
    expect(corpus).toContain("printabil");
  });

  it("defines the future validation ladder", () => {
    expect(validationLadder).toEqual([
      "Delphi",
      "studiu calitativ pacient",
      "pilot de fezabilitate",
      "cohortă prospectivă",
      "studiu pragmatic / randomizat",
      "implementare digitală"
    ]);
  });
});
