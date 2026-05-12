export interface ResearchMaturityStep {
  id: string;
  order: number;
  title: string;
  shortLabel: string;
  academicLabel: string;
  whatWouldBeTested: string;
  whyItMatters: string;
  currentAppDoesNotProve: string;
}

export const researchMaturitySteps: ResearchMaturityStep[] = [
  {
    id: "expert-consensus-delphi",
    order: 1,
    title: "Consens experți / Delphi",
    shortLabel: "Delphi",
    academicLabel: "Expert consensus / Delphi",
    whatWouldBeTested:
      "Dacă domeniile educaționale, limitele de siguranță și formulările sunt acceptabile pentru experți.",
    whyItMatters:
      "Un prototip educațional trebuie să fie aliniat cu limbajul și prioritățile clinice înainte de testarea cu pacienți.",
    currentAppDoesNotProve:
      "Nu dovedește consens profesional, validitate clinică sau potrivire pentru toate tipurile de fracturi."
  },
  {
    id: "qualitative-patient-experience",
    order: 2,
    title: "Studiu calitativ al experienței pacientului",
    shortLabel: "studiu calitativ pacient",
    academicLabel: "Qualitative patient experience study",
    whatWouldBeTested:
      "Cum înțeleg pacienții mesajele, ce le este neclar și dacă aplicația îi ajută să formuleze întrebări.",
    whyItMatters:
      "Valoarea educațională depinde de claritate, încredere și capacitatea pacientului de a comunica mai bine.",
    currentAppDoesNotProve:
      "Nu dovedește încă acceptabilitate, utilitate reală în consultații sau schimbare de comportament."
  },
  {
    id: "feasibility-pilot",
    order: 3,
    title: "Pilot de fezabilitate",
    shortLabel: "pilot de fezabilitate",
    academicLabel: "Feasibility pilot",
    whatWouldBeTested:
      "Dacă pacienții pot folosi jurnalul, teach-back-ul și brief-ul fără blocaje într-un flux realist.",
    whyItMatters:
      "Un demo impresionant trebuie să devină practic, stabil și ușor de folosit în contexte medicale reale.",
    currentAppDoesNotProve:
      "Nu dovedește eficacitate, aderență pe termen lung sau impact asupra deciziilor medicale."
  },
  {
    id: "prospective-cohort",
    order: 4,
    title: "Cohortă prospectivă",
    shortLabel: "cohortă prospectivă",
    academicLabel: "Prospective cohort",
    whatWouldBeTested:
      "Relația dintre folosirea instrumentului, calitatea comunicării și evoluția raportată în timp.",
    whyItMatters:
      "Observarea prospectivă poate arăta dacă instrumentul surprinde nevoi educaționale relevante pe parcurs.",
    currentAppDoesNotProve:
      "Nu dovedește cauzalitate, predicție clinică sau criterii pentru revenirea la sarcini solicitante."
  },
  {
    id: "pragmatic-randomized-study",
    order: 5,
    title: "Studiu pragmatic sau randomizat",
    shortLabel: "studiu pragmatic / randomizat",
    academicLabel: "Pragmatic or randomized study",
    whatWouldBeTested:
      "Dacă utilizarea aplicației îmbunătățește rezultate educaționale sau de comunicare față de îngrijirea obișnuită.",
    whyItMatters:
      "Acesta ar fi pasul necesar pentru a discuta efecte comparative, nu doar impresia unui demo.",
    currentAppDoesNotProve:
      "Nu dovedește superioritate, reducerea riscurilor sau beneficii clinice măsurabile."
  },
  {
    id: "digital-implementation-study",
    order: 6,
    title: "Studiu de implementare digitală",
    shortLabel: "implementare digitală",
    academicLabel: "Digital implementation study",
    whatWouldBeTested:
      "Integrarea în fluxuri reale, confidențialitatea datelor, mentenanța și utilizarea responsabilă.",
    whyItMatters:
      "Un instrument digital matur trebuie să funcționeze sigur, previzibil și etic în afara scenei de demo.",
    currentAppDoesNotProve:
      "Nu dovedește scalabilitate, integrare instituțională sau pregătire pentru date reale de pacient."
  }
];

export const researchPrototypeBoundary =
  "SpineBridge Live este un prototip educațional derivat dintr-un cadru academic. Nu este validat clinic și nu dovedește că poate ghida decizii medicale.";
