"use client";

import { useEffect, useMemo, useState } from "react";

import { frameworkDomains } from "@/data/framework";
import { seededPatients } from "@/data/patients";
import type { DemoState } from "@/types/demo";

const storageKey = "spinebridge-live-demo-state-v1";

export const defaultDemoState: DemoState = {
  patientId: seededPatients[0].id,
  domainId: frameworkDomains[0].id,
  journalItemIds: ["rest-pain"],
  redFlagIds: [],
  briefNote: ""
};

function normalizeDemoState(value: Partial<DemoState>): DemoState {
  const patientExists = seededPatients.some((patient) => patient.id === value.patientId);
  const domainExists = frameworkDomains.some((domain) => domain.id === value.domainId);

  return {
    patientId: patientExists ? String(value.patientId) : defaultDemoState.patientId,
    domainId: domainExists ? String(value.domainId) : defaultDemoState.domainId,
    journalItemIds: Array.isArray(value.journalItemIds) ? value.journalItemIds : [],
    redFlagIds: Array.isArray(value.redFlagIds) ? value.redFlagIds : [],
    briefNote: typeof value.briefNote === "string" ? value.briefNote.slice(0, 280) : ""
  };
}

export function useDemoState() {
  const [state, setState] = useState<DemoState>(defaultDemoState);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(storageKey);
      if (stored) {
        setState(normalizeDemoState(JSON.parse(stored) as Partial<DemoState>));
      }
    } catch {
      setState(defaultDemoState);
    } finally {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (!loaded) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [loaded, state]);

  return useMemo(
    () => ({
      state,
      setState,
      resetState: () => setState(defaultDemoState)
    }),
    [state]
  );
}
