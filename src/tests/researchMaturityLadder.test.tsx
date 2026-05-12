import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ResearchMaturityLadder } from "@/components/research/ResearchMaturityLadder";
import {
  researchMaturitySteps,
  researchPrototypeBoundary
} from "@/data/researchMaturity";

describe("ResearchMaturityLadder", () => {
  it("defines the six required future validation steps", () => {
    expect(researchMaturitySteps.map((step) => step.academicLabel)).toEqual([
      "Expert consensus / Delphi",
      "Qualitative patient experience study",
      "Feasibility pilot",
      "Prospective cohort",
      "Pragmatic or randomized study",
      "Digital implementation study"
    ]);
  });

  it("keeps every step explicit about testing, value, and non-proof", () => {
    for (const step of researchMaturitySteps) {
      expect(step.whatWouldBeTested.length).toBeGreaterThan(24);
      expect(step.whyItMatters.length).toBeGreaterThan(24);
      expect(step.currentAppDoesNotProve).toContain("Nu dovedește");
    }
  });

  it("renders the prototype boundary and each non-proof section", () => {
    render(<ResearchMaturityLadder />);

    expect(screen.getByText("Research Maturity Ladder")).toBeInTheDocument();
    expect(screen.getByText(researchPrototypeBoundary)).toBeInTheDocument();
    expect(screen.getAllByText(/Ce NU dovedește aplicația:/)).toHaveLength(6);
    expect(screen.getByText("Consens experți / Delphi")).toBeInTheDocument();
    expect(screen.getByText("Studiu de implementare digitală")).toBeInTheDocument();
  });
});
