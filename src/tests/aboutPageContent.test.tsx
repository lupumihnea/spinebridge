import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import AboutPage from "@/app/about/page";
import { frameworkDomains } from "@/data/framework";

describe("About academic rationale page", () => {
  it("renders the requested Romanian summary cards", () => {
    render(<AboutPage />);

    expect(screen.getByRole("heading", { name: "Ce face aplicația" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Ce nu face aplicația" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "De ce contează" })).toBeInTheDocument();
  });

  it("states the target population and exclusion boundaries", () => {
    render(<AboutPage />);

    expect(screen.getByText("adulți tineri activi, 18-40 ani")).toBeInTheDocument();
    expect(
      screen.getByText("fracturi lombare sau toracolombare traumatice, operațional T10-L5")
    ).toBeInTheDocument();
    expect(screen.getByText("fără leziune medulară")).toBeInTheDocument();
    expect(
      screen.getByText("fără deficit motor, senzitiv sau sfincterian obiectiv")
    ).toBeInTheDocument();
    expect(
      screen.getByText(/leziune medulară, deficit neurologic obiectiv sau sindrom de coadă de cal/)
    ).toBeInTheDocument();
    expect(screen.getByText(/fracturi patologice, metastatice/)).toBeInTheDocument();
  });

  it("renders all five educational domains and core rationale sections", () => {
    render(<AboutPage />);

    for (const domain of frameworkDomains) {
      expect(screen.getByRole("heading", { name: domain.title })).toBeInTheDocument();
    }

    expect(
      screen.getByRole("heading", { name: "De ce este educațională, nu prescriptivă" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "De ce trebuie tratate separat mai multe activități" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "De ce contează teach-back și automonitorizarea" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "De ce instrumentele digitale nu decid progresia" })
    ).toBeInTheDocument();
  });

  it("keeps the future validation roadmap visible", () => {
    render(<AboutPage />);

    expect(screen.getByText("Consens experți / Delphi")).toBeInTheDocument();
    expect(screen.getByText("Studiu calitativ al experienței pacientului")).toBeInTheDocument();
    expect(screen.getByText("Pilot de fezabilitate")).toBeInTheDocument();
    expect(screen.getByText("Cohortă prospectivă")).toBeInTheDocument();
    expect(screen.getByText("Studiu pragmatic sau randomizat")).toBeInTheDocument();
    expect(screen.getByText("Studiu de implementare digitală")).toBeInTheDocument();
  });
});
