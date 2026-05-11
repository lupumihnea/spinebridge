import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import {
  RedFlagTriggerPanel,
  redFlagConsultationQuestions
} from "@/components/journal/RedFlagTriggerPanel";

describe("RedFlagTriggerPanel", () => {
  it("shows the required red flag message, exact flags, questions, and brief button", () => {
    const onGenerateBrief = vi.fn();

    render(
      <RedFlagTriggerPanel
        activityLabel="activitate fizică"
        briefVisible={false}
        entryDate="2026-05-12"
        onGenerateBrief={onGenerateBrief}
        patientLabel="Alex D., 29 ani"
        triggeredFlags={["slăbiciune nou apărută", "deteriorarea mersului"]}
      />
    );

    const panel = screen.getByTestId("red-flag-trigger-panel");

    expect(panel).toHaveTextContent(
      "Semn de alarmă detectat. Nu ajusta exercițiile singur. Contactează echipa medicală sau solicită evaluare medicală."
    );
    expect(panel).toHaveTextContent("slăbiciune nou apărută");
    expect(panel).toHaveTextContent("deteriorarea mersului");
    expect(panel).toHaveTextContent("De ce?");
    expect(panel).toHaveTextContent("Ce pregătesc pentru consultație?");
    expect(redFlagConsultationQuestions).toHaveLength(5);

    fireEvent.click(screen.getByRole("button", { name: "Generează brief pentru consultație" }));

    expect(onGenerateBrief).toHaveBeenCalledTimes(1);
  });

  it("shows a generated consultation brief without diagnosis or treatment wording", () => {
    render(
      <RedFlagTriggerPanel
        activityLabel="muncă"
        briefVisible
        entryDate="2026-05-12"
        onGenerateBrief={() => undefined}
        patientLabel="Ioana S., 34 ani"
        triggeredFlags={["modificări urinare sau intestinale"]}
      />
    );

    const panelText = screen
      .getByTestId("red-flag-trigger-panel")
      .textContent?.toLocaleLowerCase("ro-RO") ?? "";

    expect(screen.getByTestId("red-flag-brief")).toHaveTextContent(
      "Brief demonstrativ generat"
    );
    expect(panelText).not.toContain("diagnostic");
    expect(panelText).not.toContain("tratament");
    expect(panelText).not.toContain("panică");
  });
});
