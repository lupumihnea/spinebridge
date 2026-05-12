import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { EvidenceBoundaryLayer } from "@/components/safety/EvidenceBoundaryLayer";
import {
  evidenceBoundaryItems,
  evidenceCategoryLabels,
  getEvidenceBoundariesForSurface,
  type EvidenceBoundarySurface
} from "@/data/evidenceBoundaries";

const requiredSurfaces: EvidenceBoundarySurface[] = [
  "recovery-map",
  "journal",
  "teach-back",
  "work-vs-sport",
  "consultation-brief"
];

describe("evidence boundary layer content", () => {
  it("covers every required app surface", () => {
    for (const surface of requiredSurfaces) {
      expect(getEvidenceBoundariesForSurface(surface).length).toBeGreaterThanOrEqual(2);
    }
  });

  it("includes the requested example claims with correct boundary categories", () => {
    expect(evidenceBoundaryItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          claim: "Clasificarea leziunii și statusul neurologic sunt centrale.",
          category: "direct_clinical_evidence"
        }),
        expect.objectContaining({
          claim: "Teach-back poate sprijini înțelegerea pacientului.",
          category: "indirect_educational_evidence"
        }),
        expect.objectContaining({
          claim: "Jurnalul digital poate sprijini comunicarea.",
          category: "indirect_educational_evidence"
        }),
        expect.objectContaining({
          claim: "Aplicația poate decide progresia.",
          category: "not_claimed_by_app"
        }),
        expect.objectContaining({
          claim: "Revenirea la sport are criterii universale validate pentru acest demo.",
          category: "not_claimed_by_app"
        })
      ])
    );
  });

  it("defines all five evidence categories requested for the app", () => {
    expect(Object.values(evidenceCategoryLabels)).toEqual(
      expect.arrayContaining([
        "Dovezi clinice directe",
        "Dovezi educaționale indirecte",
        "Opinie expert / dovezi limitate",
        "Validare viitoare necesară",
        "Nerevendicat de aplicație"
      ])
    );
  });

  it("renders badges and expandable why-it-matters copy", () => {
    render(<EvidenceBoundaryLayer surface="journal" />);

    expect(screen.getByTestId("evidence-boundary-journal")).toHaveTextContent(
      "Evidence Boundary Layer"
    );
    expect(screen.getByText("Dovezi educaționale indirecte")).toBeInTheDocument();
    expect(screen.getAllByText("De ce contează?").length).toBeGreaterThan(0);
    expect(screen.getByText("Aplicația poate decide progresia.")).toBeInTheDocument();
  });
});
