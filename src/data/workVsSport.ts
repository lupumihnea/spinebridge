export type ComparisonColumnId = "daily" | "work" | "sport";

export interface WorkVsSportColumn {
  id: ComparisonColumnId;
  title: string;
  subtitle: string;
  typicalDemands: string[];
  clinicianClarifications: string[];
  selfMonitoring: string[];
  appCannotDecide: string[];
  accent: "clinical" | "clay" | "saffron";
}

export interface DemandProfile {
  id: string;
  label: string;
  shortLabel: string;
  columnId: ComparisonColumnId;
  description: string;
  clinicianQuestions: string[];
  journalMetrics: string[];
  safetyBoundary: string;
}

export const comparisonColumns: WorkVsSportColumn[] = [
  {
    id: "daily",
    title: "Activități zilnice",
    subtitle: "Autonomie de bază și rutină cotidiană",
    typicalDemands: [
      "mers scurt în locuință sau afară",
      "schimbări de poziție",
      "igienă, îmbrăcare și activități casnice ușoare",
      "pauze și ritm controlat"
    ],
    clinicianClarifications: [
      "ce restricții comunicate se aplică în rutina zilnică",
      "ce semnale noi trebuie raportate",
      "cum se interpretează scăderea toleranței funcționale"
    ],
    selfMonitoring: [
      "durere înainte și după activitate",
      "toleranță la mers și ședere",
      "oboseală și deteriorări repetate",
      "note despre contextul simptomelor"
    ],
    appCannotDecide: [
      "stabilitatea leziunii",
      "modificarea restricțiilor",
      "momentul pentru sarcini mai solicitante"
    ],
    accent: "clinical"
  },
  {
    id: "work",
    title: "Muncă",
    subtitle: "Cerințe profesionale și mediu de lucru",
    typicalDemands: [
      "ședere sau stat în picioare prelungit",
      "condus sau navetă",
      "ridicare, transport, rotații sau ritm impus",
      "program, pauze și adaptări organizaționale"
    ],
    clinicianClarifications: [
      "ce sarcini de muncă sunt relevante pentru discuție",
      "ce restricții deja comunicate ating munca",
      "dacă sunt necesare documente sau recomandări administrative de la clinician"
    ],
    selfMonitoring: [
      "toleranță la ședere",
      "toleranță la mers",
      "durere după activitate profesională",
      "oboseală după intervale de lucru"
    ],
    appCannotDecide: [
      "capacitatea profesională",
      "adaptări obligatorii la locul de muncă",
      "revenirea la sarcini fizice"
    ],
    accent: "clay"
  },
  {
    id: "sport",
    title: "Sport / sală / activitate solicitantă",
    subtitle: "Efort intens, repetitiv sau imprevizibil",
    typicalDemands: [
      "impact, alergare sau schimbări rapide de direcție",
      "încărcare axială, ridicare sau exerciții cu greutăți",
      "oboseală acumulată și presiune de performanță",
      "contact, cădere sau mișcări neprevăzute"
    ],
    clinicianClarifications: [
      "dacă obiectivul sportiv intră într-o discuție separată",
      "ce criterii clinice sunt relevante",
      "ce restricții rămân active pentru efort solicitant"
    ],
    selfMonitoring: [
      "durere înainte și după activitate",
      "oboseală în ziua activității și după",
      "toleranță la mers după efort",
      "note despre impulsul de a forța când durerea lipsește"
    ],
    appCannotDecide: [
      "revenirea la sport",
      "încărcarea, intensitatea sau exercițiile",
      "participarea la contact sau competiție"
    ],
    accent: "saffron"
  }
];

export const demandProfiles: DemandProfile[] = [
  {
    id: "office-work",
    label: "Muncă de birou",
    shortLabel: "birou",
    columnId: "work",
    description: "Sarcini cognitive cu ședere, posturi menținute, pauze și ritm de lucru.",
    clinicianQuestions: [
      "Ce intervale de ședere ar trebui discutate în raport cu restricțiile primite?",
      "Ce adaptări de postură, pauze sau program trebuie clarificate cu clinicianul?",
      "Ce semne ar trebui să oprească discuția de muncă și să declanșeze contact medical?"
    ],
    journalMetrics: [
      "minute de ședere tolerate",
      "durere înainte și după intervalul de lucru",
      "oboseală după ziua de lucru",
      "note despre pauze și schimbări de poziție"
    ],
    safetyBoundary:
      "Datele despre birou ajută discuția clinică, dar nu stabilesc capacitatea profesională sau schimbarea restricțiilor."
  },
  {
    id: "driving",
    label: "Condus",
    shortLabel: "condus",
    columnId: "work",
    description: "Poziție fixă, vibrații, atenție susținută și tranziții intrare-ieșire din mașină.",
    clinicianQuestions: [
      "Ce restricții comunicate ating condusul sau naveta?",
      "Ce durată, pauze sau context de condus trebuie clarificate?",
      "Ce simptome ar face condusul o temă de contact medical?"
    ],
    journalMetrics: [
      "minute de ședere",
      "durere după poziție fixă",
      "oboseală și concentrare",
      "note despre intrarea și ieșirea din mașină"
    ],
    safetyBoundary:
      "Aplicația nu decide condusul. Condusul trebuie discutat în contextul restricțiilor și al responsabilităților clinice."
  },
  {
    id: "prolonged-sitting",
    label: "Ședere prelungită",
    shortLabel: "ședere",
    columnId: "daily",
    description: "Toleranță la poziții statice pentru activități cotidiene, transport sau muncă ușoară.",
    clinicianQuestions: [
      "Ce înseamnă o scădere a toleranței la ședere în cazul meu?",
      "Ce observații despre pauze sunt relevante pentru consult?",
      "Cum se separă disconfortul obișnuit de semnalele care trebuie comunicate?"
    ],
    journalMetrics: [
      "minute de ședere tolerate",
      "durere înainte și după ședere",
      "oboseală",
      "note despre poziție și pauze"
    ],
    safetyBoundary:
      "Toleranța la ședere este un indicator educațional, nu o concluzie despre pregătirea pentru sarcini solicitante."
  },
  {
    id: "lifting-carrying",
    label: "Ridicare / transport",
    shortLabel: "ridicare",
    columnId: "work",
    description: "Manipulare de greutăți, transferuri, posturi variabile și cerințe repetate.",
    clinicianQuestions: [
      "Ce limite comunicate se referă la ridicare sau transport?",
      "Ce sarcini concrete de muncă trebuie descrise la consult?",
      "Ce diferență există între o activitate casnică și o sarcină profesională repetată?"
    ],
    journalMetrics: [
      "durere după activitate",
      "oboseală după sarcini repetate",
      "toleranță la mers după activitate",
      "note despre greutate, durată și context"
    ],
    safetyBoundary:
      "Aplicația nu stabilește greutăți, limite sau tehnici. Acestea rămân în spațiul deciziei clinice."
  },
  {
    id: "gym-training",
    label: "Antrenament la sală",
    shortLabel: "sală",
    columnId: "sport",
    description: "Efort planificat, încărcare, repetiții și risc de a confunda lipsa durerii cu pregătirea.",
    clinicianQuestions: [
      "Ce obiective de sală trebuie discutate separat de activitățile zilnice?",
      "Ce restricții rămân active pentru efort solicitant?",
      "Ce criterii clinice trebuie clarificate înainte de antrenament?"
    ],
    journalMetrics: [
      "durere înainte și după activitate",
      "oboseală în ziua următoare",
      "note despre dorința de a forța",
      "semnale de alarmă selectate"
    ],
    safetyBoundary:
      "Lipsa durerii nu înseamnă autorizare pentru efort complet. Aplicația nu prescrie exerciții sau intensitate."
  },
  {
    id: "running",
    label: "Alergare",
    shortLabel: "alergare",
    columnId: "sport",
    description: "Impact repetitiv, ritm, oboseală și obiectiv sportiv diferit de mersul cotidian.",
    clinicianQuestions: [
      "Cum trebuie separată alergarea de mersul zilnic?",
      "Ce criterii clinice sunt relevante pentru impact repetitiv?",
      "Ce semnale după activitate ar trebui comunicate?"
    ],
    journalMetrics: [
      "toleranță la mers",
      "durere înainte și după activitate",
      "oboseală",
      "note despre activități cu impact"
    ],
    safetyBoundary:
      "Mersul și alergarea nu sunt echivalente. Jurnalul sprijină întrebările, nu autorizează revenirea la alergare."
  },
  {
    id: "contact-sport",
    label: "Sport de contact",
    shortLabel: "contact",
    columnId: "sport",
    description: "Contact, căderi, rotații rapide și situații imprevizibile.",
    clinicianQuestions: [
      "Ce riscuri specifice sportului de contact trebuie discutate?",
      "Ce follow-up sau context lezional contează pentru această discuție?",
      "Ce diferență există între condiționare generală și contact?"
    ],
    journalMetrics: [
      "red flags",
      "durere progresivă",
      "deteriorări funcționale",
      "oboseală și toleranță la mers"
    ],
    safetyBoundary:
      "Aplicația nu poate decide participarea la contact, competiție sau efort imprevizibil."
  },
  {
    id: "mixed-physical-work",
    label: "Muncă fizică mixtă",
    shortLabel: "muncă mixtă",
    columnId: "work",
    description: "Combinație de mers, stat în picioare, ridicare, transport, ritm și oboseală acumulată.",
    clinicianQuestions: [
      "Care sarcini de muncă sunt cele mai solicitante și trebuie descrise separat?",
      "Ce restricții comunicate se aplică ritmului și repetitivității?",
      "Ce observații din jurnal ar trebui prezentate pentru decizia clinică?"
    ],
    journalMetrics: [
      "minute de mers",
      "durere după activitate",
      "oboseală",
      "note despre sarcini repetate și pauze"
    ],
    safetyBoundary:
      "Jurnalul poate organiza discuția despre muncă fizică, dar nu stabilește capacitatea sau sarcinile permise."
  }
];
