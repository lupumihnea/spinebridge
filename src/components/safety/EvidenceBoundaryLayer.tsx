"use client";

import React from "react";
import { ChevronDown, Microscope, ShieldCheck } from "lucide-react";

import {
  evidenceCategoryLabels,
  getEvidenceBoundariesForSurface,
  type EvidenceBoundaryCategory,
  type EvidenceBoundarySurface
} from "@/data/evidenceBoundaries";
import { cn } from "@/lib/utils";

const categoryStyles: Record<EvidenceBoundaryCategory, string> = {
  direct_clinical_evidence: "border-clinical/25 bg-clinical/10 text-clinical",
  indirect_educational_evidence: "border-saffron/30 bg-saffron/10 text-saffron",
  expert_opinion_limited_evidence: "border-clay/25 bg-clay/10 text-clay",
  future_validation_needed: "border-graphite/20 bg-graphite/10 text-graphite",
  not_claimed_by_app: "border-signal/25 bg-signal/10 text-signal"
};

interface EvidenceBoundaryLayerProps {
  className?: string;
  compact?: boolean;
  surface: EvidenceBoundarySurface;
}

export function EvidenceBoundaryLayer({
  className,
  compact = false,
  surface
}: EvidenceBoundaryLayerProps) {
  const items = getEvidenceBoundariesForSurface(surface);

  if (items.length === 0) {
    return null;
  }

  return (
    <section
      className={cn(
        "rounded-panel border border-ink/10 bg-white p-5 shadow-panel",
        compact ? "print:bg-white" : "mx-auto max-w-7xl",
        className
      )}
      data-testid={`evidence-boundary-${surface}`}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex min-w-0 gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-panel bg-ink text-white">
            <Microscope aria-hidden="true" size={21} />
          </span>
          <div className="min-w-0">
            <p className="text-xs font-black uppercase text-clinical">
              Evidence Boundary Layer
            </p>
            <h2 className="text-safe-wrap mt-1 text-2xl font-black text-ink">
              Delimitarea matură a dovezilor
            </h2>
            <p className="mt-2 text-sm font-semibold leading-6 text-muted">
              Fiecare afirmație majoră este marcată după tipul de suport și după ce aplicația nu
              revendică.
            </p>
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-clinical/10 px-3 py-2 text-sm font-black text-clinical">
          <ShieldCheck aria-hidden="true" size={16} />
          onestitate științifică
        </div>
      </div>

      <div className={cn("mt-5 grid gap-3", compact ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
        {items.map((item) => (
          <details
            className="group rounded-panel border border-ink/10 bg-paper p-4 open:bg-white"
            key={item.id}
          >
            <summary className="flex cursor-pointer list-none flex-col gap-3">
              <span
                className={cn(
                  "inline-flex w-fit items-center rounded-panel border px-2.5 py-1 text-[11px] font-black uppercase",
                  categoryStyles[item.category]
                )}
              >
                {evidenceCategoryLabels[item.category]}
              </span>
              <span className="text-sm font-black leading-6 text-ink">{item.claim}</span>
              <span className="flex items-center justify-between gap-3 text-xs font-black uppercase text-muted">
                <span>{item.evidenceLabel}</span>
                <span className="inline-flex items-center gap-1 text-clinical">
                  De ce contează?
                  <ChevronDown
                    aria-hidden="true"
                    className="transition group-open:rotate-180"
                    size={15}
                  />
                </span>
              </span>
            </summary>
            <div className="mt-4 border-t border-ink/10 pt-3">
              <p className="text-sm font-semibold leading-6 text-ink">{item.explanation}</p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.whyItMatters}</p>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
