export type EvidenceBoundarySurface =
  | "recovery-map"
  | "journal"
  | "teach-back"
  | "work-vs-sport"
  | "consultation-brief";

export type EvidenceBoundaryCategory =
  | "direct_clinical_evidence"
  | "indirect_educational_evidence"
  | "expert_opinion_limited_evidence"
  | "future_validation_needed"
  | "not_claimed_by_app";

export interface EvidenceBoundaryItem {
  id: string;
  surfaces: EvidenceBoundarySurface[];
  claim: string;
  category: EvidenceBoundaryCategory;
  evidenceLabel: string;
  explanation: string;
  whyItMatters: string;
}

export const evidenceCategoryLabels: Record<EvidenceBoundaryCategory, string> = {
  direct_clinical_evidence: "Dovezi clinice directe",
  indirect_educational_evidence: "Dovezi educaționale indirecte",
  expert_opinion_limited_evidence: "Opinie expert / dovezi limitate",
  future_validation_needed: "Validare viitoare necesară",
  not_claimed_by_app: "Nerevendicat de aplicație"
};

export const evidenceBoundaryItems: EvidenceBoundaryItem[] = [
  {
    id: "lesion-neurology-central",
    surfaces: ["recovery-map", "work-vs-sport", "consultation-brief"],
    claim: "Clasificarea leziunii și statusul neurologic sunt centrale.",
    category: "direct_clinical_evidence",
    evidenceLabel: "cadru clinic direct",
    explanation:
      "Contextul lezional și examinarea neurologică aparțin evaluării clinice, nu simulării educaționale.",
    whyItMatters:
      "Menține aplicația în rolul corect: organizează comunicarea după ce traseul terapeutic este stabilit de specialist."
  },
  {
    id: "teach-back-understanding",
    surfaces: ["teach-back", "consultation-brief"],
    claim: "Teach-back poate sprijini înțelegerea pacientului.",
    category: "indirect_educational_evidence",
    evidenceLabel: "educație pacient",
    explanation:
      "Reformularea în cuvintele pacientului este folosită educațional pentru a identifica neclarități.",
    whyItMatters:
      "Scopul este claritatea conversației, nu măsurarea clinică validată a recuperării."
  },
  {
    id: "digital-journal-communication",
    surfaces: ["journal", "consultation-brief"],
    claim: "Jurnalul digital poate sprijini comunicarea.",
    category: "indirect_educational_evidence",
    evidenceLabel: "educație și digital health",
    explanation:
      "Trendurile și notele pot pregăti o discuție mai structurată cu echipa medicală.",
    whyItMatters:
      "Datele raportate de pacient pot fi utile conversațional, dar nu devin interpretare clinică automată."
  },
  {
    id: "red-flags-communication",
    surfaces: ["journal", "recovery-map"],
    claim: "Semnalele de alarmă trebuie comunicate prompt echipei medicale.",
    category: "direct_clinical_evidence",
    evidenceLabel: "siguranță clinică",
    explanation:
      "Simptomele noi neurologice, sfincteriene sau deteriorările funcționale sunt tratate ca limite de siguranță.",
    whyItMatters:
      "Experiența demo trebuie să fie fermă fără limbaj de panică, diagnostic sau instrucțiuni de tratament."
  },
  {
    id: "staged-education-framework",
    surfaces: ["recovery-map"],
    claim: "Cadrul pe etape organizează educația și dialogul clinic.",
    category: "expert_opinion_limited_evidence",
    evidenceLabel: "cadru academic propus",
    explanation:
      "Structura în cinci domenii este o propunere educațională, nu un calendar clinic universal.",
    whyItMatters:
      "Publicul vede logica frameworkului fără a-l confunda cu un protocol terapeutic validat."
  },
  {
    id: "journal-trend-interpretation",
    surfaces: ["journal"],
    claim: "Trendurile din jurnal pot orienta întrebări pentru consult.",
    category: "future_validation_needed",
    evidenceLabel: "utilitate demo de validat",
    explanation:
      "Regulile deterministe arată patternuri educaționale, dar nu au fost validate ca instrument clinic.",
    whyItMatters:
      "Protejează demo-ul de promisiuni excesive despre acuratețe, predicție sau progresie."
  },
  {
    id: "teach-back-score",
    surfaces: ["teach-back"],
    claim: "Scorul de claritate este o măsură educațională demonstrativă.",
    category: "future_validation_needed",
    evidenceLabel: "scor nevalidat clinic",
    explanation:
      "Scorul folosește reguli transparente pentru claritate, nu psihometrie validată sau evaluare medicală.",
    whyItMatters:
      "Ajută juriul să vadă explicația fără a supraestima semnificația numerică."
  },
  {
    id: "work-sport-separate-dialogues",
    surfaces: ["work-vs-sport", "recovery-map"],
    claim: "Revenirea la muncă și revenirea la sport sunt discuții diferite.",
    category: "expert_opinion_limited_evidence",
    evidenceLabel: "raționament clinic-educațional",
    explanation:
      "Munca, sportul și activitățile zilnice au cerințe diferite și trebuie discutate separat.",
    whyItMatters:
      "Împiedică transferul simplist de la o activitate tolerată la o sarcină mai solicitantă."
  },
  {
    id: "sport-universal-criteria",
    surfaces: ["work-vs-sport"],
    claim: "Revenirea la sport are criterii universale validate pentru acest demo.",
    category: "not_claimed_by_app",
    evidenceLabel: "nerevendicat / dovezi limitate",
    explanation:
      "Aplicația nu afirmă existența unor criterii universale validate pentru revenirea la sport în acest cadru.",
    whyItMatters:
      "Separă discuția educațională de deciziile individuale ale echipei medicale."
  },
  {
    id: "app-decides-progression",
    surfaces: ["recovery-map", "journal", "teach-back", "work-vs-sport", "consultation-brief"],
    claim: "Aplicația poate decide progresia.",
    category: "not_claimed_by_app",
    evidenceLabel: "interzis în aplicație",
    explanation:
      "SpineBridge Live nu autorizează progresia, tratamentul, exercițiile sau revenirea la sport.",
    whyItMatters:
      "Aceasta este limita centrală de siguranță și credibilitate pentru întregul demo."
  },
  {
    id: "brief-communication-support",
    surfaces: ["consultation-brief"],
    claim: "Brief-ul poate structura întrebări pentru consultație.",
    category: "indirect_educational_evidence",
    evidenceLabel: "suport de comunicare",
    explanation:
      "Rezumatul transformă observații fictive în întrebări și puncte de discuție, fără concluzii clinice.",
    whyItMatters:
      "Face valoarea demo-ului vizibilă pentru juriu: comunicare mai clară, nu automatizare medicală."
  }
];

export function getEvidenceBoundariesForSurface(surface: EvidenceBoundarySurface) {
  return evidenceBoundaryItems.filter((item) => item.surfaces.includes(surface));
}
