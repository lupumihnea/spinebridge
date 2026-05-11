import { journalItems } from "@/data/journal";
import { redFlagEscalation } from "@/data/safety";
import type {
  ConsultationBrief,
  DemoState,
  EducationalDomain,
  RedFlag,
  PatientScenario
} from "@/types/demo";

interface BriefInput {
  patient: PatientScenario;
  domain: EducationalDomain;
  state: DemoState;
  redFlags: RedFlag[];
}

export function createConsultationBrief({
  patient,
  domain,
  state,
  redFlags
}: BriefInput): ConsultationBrief {
  const selectedObservations = journalItems
    .filter((item) => state.journalItemIds.includes(item.id))
    .map((item) => `${item.label}: ${item.detail}`);

  const selectedRedFlags = redFlags
    .filter((flag) => state.redFlagIds.includes(flag.id))
    .map((flag) => flag.label);

  return {
    title: "Rezumat demonstrativ pentru consult",
    boundary:
      "Material educațional generat din date fictive. Nu stabilește diagnostic, tratament, exerciții sau autorizare pentru progres.",
    patientLine: `${patient.fictionalName}, ${patient.age} ani, ${patient.scenarioLabel}. ${patient.injuryDescription}`,
    focusLine: `Domeniu educațional selectat: ${domain.order}. ${domain.title}.`,
    observations:
      selectedObservations.length > 0
        ? selectedObservations
        : ["Nu a fost selectată nicio observație de jurnal în scenariul demonstrativ."],
    redFlags:
      selectedRedFlags.length > 0
        ? selectedRedFlags.map((flag) => `${flag}. ${redFlagEscalation}`)
        : ["Nu a fost selectat niciun semnal de alarmă în scenariul demonstrativ."],
    questions: [
      domain.suggestedQuestionsForClinician[0],
      "Ce observații din jurnal merită comunicate la următorul consult?",
      "Cum trebuie separate întrebările despre muncă, activități cotidiene și sport?"
    ],
    workDemandProfile: patient.workDemandProfile,
    sportActivityProfile: patient.sportActivityProfile
  };
}
