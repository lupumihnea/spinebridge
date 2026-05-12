"use client";

import React from "react";
import { ArrowRight, CheckCircle2, FlaskConical, HelpCircle, ShieldAlert } from "lucide-react";

import {
  researchMaturitySteps,
  researchPrototypeBoundary
} from "@/data/researchMaturity";
import { cn } from "@/lib/utils";

interface ResearchMaturityLadderProps {
  className?: string;
  compact?: boolean;
  stage?: boolean;
  variant?: "light" | "dark";
}

const tone = {
  light: {
    shell: "border-ink/10 bg-white text-ink shadow-panel",
    eyebrow: "text-clinical",
    title: "text-ink",
    body: "text-muted",
    card: "border-ink/10 bg-paper",
    cardOpen: "bg-white",
    number: "bg-ink text-white",
    divider: "border-ink/10",
    badge: "border-clinical/20 bg-clinical/10 text-clinical",
    warning: "border-signal/20 bg-signal/5 text-signal",
    arrow: "text-clinical"
  },
  dark: {
    shell: "border-white/12 bg-white/8 text-white",
    eyebrow: "text-clinical",
    title: "text-white",
    body: "text-white/68",
    card: "border-white/12 bg-white/8",
    cardOpen: "bg-white/10",
    number: "bg-clinical text-white",
    divider: "border-white/10",
    badge: "border-clinical/30 bg-clinical/15 text-clinical",
    warning: "border-signal/35 bg-signal/15 text-white",
    arrow: "text-clinical"
  }
};

export function ResearchMaturityLadder({
  className,
  compact = false,
  stage = false,
  variant = "light"
}: ResearchMaturityLadderProps) {
  const styles = tone[variant];

  return (
    <section
      className={cn(
        "rounded-panel border",
        styles.shell,
        stage ? "p-3" : "p-5",
        compact && !stage ? "p-4" : null,
        !compact && !stage ? "sm:p-6" : null,
        className
      )}
      data-testid="research-maturity-ladder"
    >
      <div
        className={cn(
          "flex gap-3",
          compact || stage ? "flex-col" : "flex-col lg:flex-row lg:items-start lg:justify-between"
        )}
      >
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "flex shrink-0 items-center justify-center rounded-panel",
                stage ? "h-8 w-8" : "h-10 w-10",
                styles.number
              )}
            >
              <FlaskConical aria-hidden="true" size={stage ? 16 : 20} />
            </span>
            <p className={cn("text-xs font-black uppercase", styles.eyebrow)}>
              Research Maturity Ladder
            </p>
          </div>
          <h2
            className={cn(
              "text-safe-wrap mt-3 font-black leading-tight",
              stage ? "text-lg" : compact ? "text-xl" : "text-3xl sm:text-4xl",
              styles.title
            )}
          >
            Prototip educațional acum. Validare riguroasă înainte de concluzii.
          </h2>
          <p
            className={cn(
              "mt-3 max-w-4xl font-semibold",
              stage ? "text-xs leading-5" : compact ? "text-sm leading-7" : "text-base leading-7",
              styles.body
            )}
          >
            {researchPrototypeBoundary}
          </p>
        </div>
        <div
          className={cn(
            "inline-flex w-fit items-center gap-2 rounded-panel border px-3 py-2 text-xs font-black uppercase",
            stage && "hidden",
            styles.badge
          )}
        >
          <ShieldAlert aria-hidden="true" size={15} />
          onestitate academică
        </div>
      </div>

      <div className={cn("mt-5 grid gap-3", stage ? "grid-cols-2 xl:grid-cols-3" : compact ? "lg:grid-cols-2" : "lg:grid-cols-3")}>
        {researchMaturitySteps.map((step, index) => (
          <article
            className={cn("relative rounded-panel border", stage ? "p-3" : "p-4", styles.card)}
            key={step.id}
          >
            <div className="flex items-start justify-between gap-3">
              <span
                className={cn(
                  "flex shrink-0 items-center justify-center rounded-panel font-black",
                  stage ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm",
                  styles.number
                )}
              >
                {step.order}
              </span>
              {index < researchMaturitySteps.length - 1 && !stage ? (
                <ArrowRight
                  aria-hidden="true"
                  className={cn("mt-2 hidden shrink-0 lg:block", styles.arrow)}
                  size={18}
                />
              ) : null}
            </div>

            <p className={cn(stage ? "mt-2 text-[9px]" : "mt-4 text-[11px]", "font-black uppercase", styles.eyebrow)}>
              {step.academicLabel}
            </p>
            <h3
              className={cn(
                "text-safe-wrap mt-1 font-black",
                stage ? "text-sm leading-5" : compact ? "text-base leading-6" : "text-lg leading-6",
                styles.title
              )}
            >
              {step.title}
            </h3>

            <div className={cn(stage ? "mt-2 space-y-1 border-t pt-2" : "mt-4 space-y-3 border-t pt-3", styles.divider)}>
              <div className="flex gap-2">
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-clinical"
                  size={stage ? 12 : 15}
                />
                <p
                  className={cn(
                    "font-semibold",
                    stage ? "line-clamp-2 text-[10px] leading-4" : "text-sm leading-6",
                    styles.body
                  )}
                >
                  <span className={cn("font-black", styles.title)}>Ce s-ar testa: </span>
                  {step.whatWouldBeTested}
                </p>
              </div>
              <div className="flex gap-2">
                <HelpCircle
                  aria-hidden="true"
                  className="mt-1 shrink-0 text-saffron"
                  size={stage ? 12 : 15}
                />
                <p
                  className={cn(
                    "font-semibold",
                    stage ? "line-clamp-2 text-[10px] leading-4" : "text-sm leading-6",
                    styles.body
                  )}
                >
                  <span className={cn("font-black", styles.title)}>De ce contează: </span>
                  {step.whyItMatters}
                </p>
              </div>
              <div
                className={cn(
                  "rounded-panel border font-bold",
                  stage ? "line-clamp-2 p-2 text-[10px] leading-4" : "p-3 text-sm leading-6",
                  styles.warning
                )}
              >
                <span className="font-black">Ce NU dovedește aplicația: </span>
                {step.currentAppDoesNotProve}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
