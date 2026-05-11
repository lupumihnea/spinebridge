export type StageVisualStyleKey = "clinical" | "clay" | "saffron" | "graphite" | "signal";

export type TreatmentPathwayKind = "conservative" | "surgical";

export interface EducationalDomain {
  id: string;
  order: number;
  title: string;
  academicLabel: string;
  patientFriendlyMessage: string;
  educationalObjective: string;
  selfMonitoringItems: string[];
  appMustNotClaim: string[];
  suggestedQuestionsForClinician: string[];
  visualStyleKey: StageVisualStyleKey;
  visualWeight: number;
}

export interface WorkDemandProfile {
  id: string;
  label: string;
  sittingLoad: "scăzută" | "moderată" | "ridicată";
  standingWalkingLoad: "scăzută" | "moderată" | "ridicată";
  liftingExposure: "minimă" | "ocazională" | "frecventă";
  drivingOrCommute: string;
  discussionFocus: string[];
}

export interface SportActivityProfile {
  id: string;
  label: string;
  activityType: string;
  intensityContext: string;
  misconceptionRisk: string;
  discussionFocus: string[];
}

export interface PatientScenario {
  id: string;
  age: number;
  fictionalName: string;
  scenarioLabel: string;
  injuryDescription: string;
  treatmentPathway: {
    kind: TreatmentPathwayKind;
    label: string;
    decidedByClinician: true;
    note: string;
  };
  restrictionsText: string;
  functionalGoals: {
    work: string;
    dailyActivity: string;
    sportOrFitness: string;
  };
  workDemandProfile: WorkDemandProfile;
  sportActivityProfile: SportActivityProfile;
  potentialMisconception: string;
  demoNarrative: string;
  fictionalDataNotice: string;
}

export interface JournalEntry {
  id: string;
  patientScenarioId: string;
  domainId: string;
  createdAtLabel: string;
  observations: string[];
  redFlagStatusIds: string[];
  freeTextNote: string;
  isFictional: true;
}

export interface RedFlag {
  id: string;
  label: string;
}

export interface RedFlagStatus {
  id: string;
  redFlagId: string;
  label: string;
  status: "not-discussed" | "present-in-fictional-scenario" | "absent-in-fictional-scenario";
  escalationMessage: string;
}

export interface SafetyAssessment {
  id: string;
  patientScenarioId: string;
  scope: "educational-boundary-check";
  boundaryStatement: string;
  redFlagStatuses: RedFlagStatus[];
  appConclusion: "communication-support-only";
  clinicianDecisionRequired: true;
}

export interface TeachBackResponse {
  id: string;
  patientScenarioId: string;
  domainId: string;
  prompt: string;
  response: string;
  reviewerNote: string;
  status: "demo-draft" | "ready-for-clinician-discussion";
}

export interface ConsultationBrief {
  title: string;
  boundary: string;
  patientLine: string;
  focusLine: string;
  observations: string[];
  redFlags: string[];
  questions: string[];
  workDemandProfile?: WorkDemandProfile;
  sportActivityProfile?: SportActivityProfile;
  teachBackResponses?: TeachBackResponse[];
}

export interface ConceptStep {
  id: string;
  label: string;
  description: string;
}

export interface JournalItem {
  id: string;
  label: string;
  detail: string;
}

export interface DemoState {
  patientId: string;
  domainId: string;
  journalItemIds: string[];
  redFlagIds: string[];
  briefNote: string;
}

export type FrameworkDomain = EducationalDomain;
export type SeededPatient = PatientScenario;
export type DomainAccent = StageVisualStyleKey;
