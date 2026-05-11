import type { ConceptStep, EducationalDomain } from "@/types/demo";

export const frameworkDomains: EducationalDomain[] = [
  {
    id: "diagnostic-safety",
    order: 1,
    title: "Orientare diagnostică și siguranță vertebrală",
    academicLabel: "Orientare",
    patientFriendlyMessage:
      "Înțelegi termenii principali ai situației tale și ce semnale trebuie comunicate echipei medicale.",
    educationalObjective:
      "Separă informația medicală stabilită de specialist de explicațiile educaționale oferite în demo.",
    selfMonitoringItems: [
      "notarea termenilor neclari din consult",
      "observarea schimbărilor noi de sensibilitate sau forță",
      "clarificarea restricțiilor deja comunicate de clinician"
    ],
    appMustNotClaim: [
      "nu confirmă stabilitatea vertebrală",
      "nu interpretează imagini sau investigații",
      "nu schimbă parcursul decis de echipa medicală"
    ],
    suggestedQuestionsForClinician: [
      "Ce termeni despre leziune ar trebui să înțeleg mai bine?",
      "Ce semnale ar trebui comunicate rapid echipei medicale?",
      "Cum ar trebui să formulez întrebările despre restricțiile deja primite?"
    ],
    visualStyleKey: "clinical",
    visualWeight: 88
  },
  {
    id: "basic-mobilization",
    order: 2,
    title: "Mobilizare și autonomie de bază",
    academicLabel: "Autonomie",
    patientFriendlyMessage:
      "Descrii mai clar cum te miști în activități simple și ce sprijin practic apare în rutina zilnică.",
    educationalObjective:
      "Ajută la organizarea observațiilor despre autonomie fără a transforma aplicația într-un plan de exerciții.",
    selfMonitoringItems: [
      "toleranța la schimbări de poziție",
      "dificultăți în activități domestice de bază",
      "momentele în care apare nevoia de ajutor"
    ],
    appMustNotClaim: [
      "nu prescrie exerciții",
      "nu stabilește niveluri de efort",
      "nu autorizează trecerea la sarcini mai solicitante"
    ],
    suggestedQuestionsForClinician: [
      "Ce activități cotidiene ar trebui să descriu mai atent la consult?",
      "Ce restricții deja primite sunt relevante pentru autonomie?",
      "Cum pot comunica mai clar dificultățile de mobilizare de bază?"
    ],
    visualStyleKey: "clay",
    visualWeight: 74
  },
  {
    id: "trunk-walking-reconditioning",
    order: 3,
    title: "Controlul trunchiului, mers și recondiționare",
    academicLabel: "Control",
    patientFriendlyMessage:
      "Urmărești mersul, oboseala și controlul trunchiului ca observații de comunicat, nu ca rezultate clinice.",
    educationalObjective:
      "Leagă auto-monitorizarea funcțională de dialogul clinic, fără scoruri de pregătire sau prescripții.",
    selfMonitoringItems: [
      "schimbări observabile ale mersului",
      "oboseală la mers sau stat în picioare",
      "încredere funcțională descrisă în cuvinte simple"
    ],
    appMustNotClaim: [
      "nu măsoară recuperarea clinică",
      "nu validează controlul trunchiului",
      "nu transformă absența durerii în concluzie despre efort"
    ],
    suggestedQuestionsForClinician: [
      "Ce schimbări de mers merită comunicate?",
      "Cum ar trebui descrisă oboseala în jurnal?",
      "Ce întrebări despre recondiționare apar pentru următorul consult?"
    ],
    visualStyleKey: "saffron",
    visualWeight: 69
  },
  {
    id: "work-activity-sport-dialogue",
    order: 4,
    title: "Revenire la muncă, activitate și sport",
    academicLabel: "Discuție",
    patientFriendlyMessage:
      "Separi întrebările despre muncă, activități cotidiene și sport, pentru că nu sunt aceeași conversație.",
    educationalObjective:
      "Construiește un cadru de întrebări pentru clinician despre cerințe funcționale diferite.",
    selfMonitoringItems: [
      "durata statului pe scaun sau în picioare",
      "cerințe de transport, navetă sau condus",
      "diferența dintre obiective profesionale și obiective sportive"
    ],
    appMustNotClaim: [
      "nu stabilește revenirea la muncă",
      "nu stabilește revenirea la sport",
      "nu compară sportul cu activitățile cotidiene"
    ],
    suggestedQuestionsForClinician: [
      "Ce aspecte despre muncă ar trebui discutate separat?",
      "Ce diferențiază activitatea cotidiană de sport în cazul meu?",
      "Ce informații despre cerințele jobului sau sportului ajută consultația?"
    ],
    visualStyleKey: "graphite",
    visualWeight: 82
  },
  {
    id: "long-term-self-management",
    order: 5,
    title: "Auto-management pe termen lung și reducerea riscului",
    academicLabel: "Auto-management",
    patientFriendlyMessage:
      "Folosești jurnalizarea și întrebările recurente pentru comunicare mai bună pe termen lung.",
    educationalObjective:
      "Menține rolul instrumentului digital la nivel de educație, memento și comunicare a simptomelor.",
    selfMonitoringItems: [
      "întrebări repetate pentru consult",
      "observații despre deteriorări funcționale repetate",
      "mementouri pentru comunicarea simptomelor relevante"
    ],
    appMustNotClaim: [
      "nu este protocol clinic validat",
      "nu este calendar universal",
      "nu înlocuiește monitorizarea echipei medicale"
    ],
    suggestedQuestionsForClinician: [
      "Ce informații ar trebui urmărite pe termen lung?",
      "Cum pot comunica eficient episoadele de deteriorare funcțională?",
      "Ce limite are jurnalizarea digitală în cazul meu?"
    ],
    visualStyleKey: "clinical",
    visualWeight: 77
  }
];

export const conceptSteps: ConceptStep[] = [
  {
    id: "assessment",
    label: "Evaluare medicală specifică leziunii",
    description: "Punctul de pornire rămâne consultul și parcursul stabilit de specialist."
  },
  {
    id: "education",
    label: "Educație clară",
    description: "Pacientul înțelege cadrul, termenii și limitele aplicației."
  },
  {
    id: "self-monitoring",
    label: "Auto-monitorizare",
    description: "Observațiile sunt notate pentru conversații mai clare."
  },
  {
    id: "clinical-dialogue",
    label: "Dialog clinic",
    description: "Întrebările sunt aduse către echipa medicală."
  },
  {
    id: "graded-discussion",
    label: "Discuție despre activitate gradată",
    description: "Munca, activitatea cotidiană și sportul sunt separate."
  },
  {
    id: "confidence",
    label: "Încredere funcțională",
    description: "Încrederea este prezentată ca rezultat educațional, nu ca decizie medicală."
  }
];
