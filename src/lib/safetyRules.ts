export type TargetActivityType = "daily_activity" | "work" | "physical_activity" | "sport";

export type SafetyStatus = "RED" | "YELLOW" | "GREEN_EDUCATIONAL_ONLY";

export interface SafetyRuleJournalEntry {
  id: string;
  painBeforeActivity?: number;
  painAfterActivity?: number;
  fatigueLevel?: number;
  walkingToleranceMinutes?: number;
  sittingToleranceMinutes?: number;
  notes?: string;
}

export interface TriggeredSafetyRule {
  id: string;
  status: Exclude<SafetyStatus, "GREEN_EDUCATIONAL_ONLY">;
  label: string;
  evidence: string;
}

export interface SafetyEngineInput {
  currentJournalEntry: SafetyRuleJournalEntry;
  previousJournalEntries: SafetyRuleJournalEntry[];
  selectedRedFlagSymptoms: string[];
  patientRestrictionsText: string;
  targetActivityType: TargetActivityType;
}

export interface SafetyEngineResult {
  status: SafetyStatus;
  title: string;
  explanation: string;
  triggeredRules: TriggeredSafetyRule[];
  recommendedNextStepText: string;
  forbiddenClaims: string[];
  clinicianQuestions: string[];
}

const redFlagRules = [
  {
    id: "new-weakness",
    terms: ["new weakness", "weakness", "slabiciune", "slăbiciune"],
    label: "slăbiciune nou apărută"
  },
  {
    id: "numbness-paresthesia",
    terms: ["numbness", "paresthesia", "parestezie", "parestezii", "amorteala", "amorțeală"],
    label: "amorțeală sau parestezii"
  },
  {
    id: "new-severe-radicular-pain",
    terms: ["new severe radicular pain", "radicular", "durere radiculara", "durere radiculară"],
    label: "durere radiculară severă nou apărută"
  },
  {
    id: "urinary-bowel-changes",
    terms: ["urinary", "bowel", "urinar", "intestinal", "urinare", "intestinale"],
    label: "modificări urinare sau intestinale"
  },
  {
    id: "perineal-anesthesia",
    terms: ["perineal", "anesthesia", "anestezie perineala", "anestezie perineală"],
    label: "anestezie perineală"
  },
  {
    id: "gait-deterioration",
    terms: ["gait deterioration", "gait", "mers", "deteriorarea mersului"],
    label: "deteriorarea mersului"
  },
  {
    id: "severe-progressive-pain",
    terms: ["severe progressive pain", "progressive pain", "durere severa progresiva", "durere severă progresivă"],
    label: "durere severă progresivă"
  },
  {
    id: "repeated-functional-deterioration",
    terms: ["repeated functional deterioration", "functional deterioration", "deteriorari functionale", "deteriorări funcționale"],
    label: "deteriorări funcționale repetate"
  }
] as const;

const forbiddenClaims = [
  "Aplicația nu confirmă pregătirea pentru activități solicitante.",
  "Aplicația nu decide revenirea la muncă, activitate fizică sau sport.",
  "Aplicația nu oferă diagnostic, conduită clinică, program de exerciții sau validare a progresiei.",
  "Absența durerii în repaus nu devine permisiune pentru efort."
];

const defaultClinicianQuestions = [
  "Ce observații din jurnal sunt relevante pentru următorul consult?",
  "Ce restricții deja comunicate ar trebui clarificate?",
  "Cum trebuie separate întrebările despre activități zilnice, muncă și sport?"
];

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("ro-RO")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function hasRedFlag(selectedRedFlagSymptoms: string[], terms: readonly string[]) {
  const normalizedSymptoms = selectedRedFlagSymptoms.map(normalizeText);
  const normalizedTerms = terms.map(normalizeText);

  return normalizedSymptoms.some((symptom) =>
    normalizedTerms.some((term) => symptom.includes(term))
  );
}

function painAfterIsHigher(entry: SafetyRuleJournalEntry) {
  return (
    typeof entry.painBeforeActivity === "number" &&
    typeof entry.painAfterActivity === "number" &&
    entry.painAfterActivity > entry.painBeforeActivity
  );
}

function latestPreviousEntry(entries: SafetyRuleJournalEntry[]) {
  return entries.length > 0 ? entries[entries.length - 1] : undefined;
}

function hasRepeatedPainIncrease(
  currentJournalEntry: SafetyRuleJournalEntry,
  previousJournalEntries: SafetyRuleJournalEntry[]
) {
  const entries = [...previousJournalEntries, currentJournalEntry];
  return entries.filter(painAfterIsHigher).length >= 2;
}

function hasWorseningFatigue(
  currentJournalEntry: SafetyRuleJournalEntry,
  previousJournalEntries: SafetyRuleJournalEntry[]
) {
  const previous = latestPreviousEntry(previousJournalEntries);
  return (
    typeof previous?.fatigueLevel === "number" &&
    typeof currentJournalEntry.fatigueLevel === "number" &&
    currentJournalEntry.fatigueLevel > previous.fatigueLevel
  );
}

function hasToleranceDrop(
  currentJournalEntry: SafetyRuleJournalEntry,
  previousJournalEntries: SafetyRuleJournalEntry[]
) {
  const previous = latestPreviousEntry(previousJournalEntries);
  const walkingDrops =
    typeof previous?.walkingToleranceMinutes === "number" &&
    typeof currentJournalEntry.walkingToleranceMinutes === "number" &&
    currentJournalEntry.walkingToleranceMinutes < previous.walkingToleranceMinutes;
  const sittingDrops =
    typeof previous?.sittingToleranceMinutes === "number" &&
    typeof currentJournalEntry.sittingToleranceMinutes === "number" &&
    currentJournalEntry.sittingToleranceMinutes < previous.sittingToleranceMinutes;

  return walkingDrops || sittingDrops;
}

function hasConfusionNote(currentJournalEntry: SafetyRuleJournalEntry) {
  const note = normalizeText(currentJournalEntry.notes ?? "");
  const confusionPatterns = [
    "if it does not hurt i can force",
    "if it doesnt hurt i can force",
    "daca nu doare pot forta",
    "daca nu ma doare pot forta",
    "nu doare pot forta",
    "pot forta",
    "no pain",
    "fara durere"
  ];

  return confusionPatterns.some((pattern) => note.includes(normalizeText(pattern)));
}

function hasClinicianSportText(patientRestrictionsText: string) {
  const text = normalizeText(patientRestrictionsText);
  const mentionsClinicalSource =
    text.includes("clinician") ||
    text.includes("medic") ||
    text.includes("specialist") ||
    text.includes("echipa medicala");
  const mentionsSport = text.includes("sport") || text.includes("antrenament") || text.includes("efort");

  return mentionsClinicalSource && mentionsSport;
}

function createBaseResult(
  status: SafetyStatus,
  title: string,
  explanation: string,
  triggeredRules: TriggeredSafetyRule[],
  recommendedNextStepText: string,
  clinicianQuestions: string[]
): SafetyEngineResult {
  return {
    status,
    title,
    explanation,
    triggeredRules,
    recommendedNextStepText,
    forbiddenClaims,
    clinicianQuestions
  };
}

export function explainWhyNotClearance() {
  return "Aplicația nu poate autoriza progresia deoarece stabilitatea leziunii, restricțiile și revenirea la sarcini solicitante rămân decizii clinice.";
}

export function evaluateSafetyRules(input: SafetyEngineInput): SafetyEngineResult {
  const {
    currentJournalEntry,
    previousJournalEntries,
    selectedRedFlagSymptoms,
    patientRestrictionsText,
    targetActivityType
  } = input;
  const triggeredRules: TriggeredSafetyRule[] = [];

  for (const rule of redFlagRules) {
    if (hasRedFlag(selectedRedFlagSymptoms, rule.terms)) {
      triggeredRules.push({
        id: rule.id,
        status: "RED",
        label: rule.label,
        evidence: "Semnal de alarmă selectat în scenariul curent."
      });
    }
  }

  if (triggeredRules.some((rule) => rule.status === "RED")) {
    return createBaseResult(
      "RED",
      "Semnal de alarmă de comunicat prompt",
      "A fost selectat cel puțin un semnal de alarmă. Simulatorul nu interpretează cauza și nu stabilește conduita.",
      triggeredRules,
      "Comunică prompt semnalul către echipa medicală sau urmează instrucțiunile clinice deja primite.",
      [
        "Ce semnal nou trebuie comunicat imediat?",
        "Ce instrucțiuni clinice deja primite se aplică în această situație?",
        ...defaultClinicianQuestions
      ]
    );
  }

  if (hasRepeatedPainIncrease(currentJournalEntry, previousJournalEntries)) {
    triggeredRules.push({
      id: "repeated-pain-after-activity",
      status: "YELLOW",
      label: "durerea după activitate este repetat mai mare decât înainte",
      evidence: "Cel puțin două intrări indică durere mai mare după activitate decât înainte."
    });
  }

  if (hasWorseningFatigue(currentJournalEntry, previousJournalEntries)) {
    triggeredRules.push({
      id: "worsening-fatigue",
      status: "YELLOW",
      label: "tendință de oboseală în creștere",
      evidence: "Nivelul de oboseală din intrarea curentă este mai mare decât în intrarea precedentă."
    });
  }

  if (hasToleranceDrop(currentJournalEntry, previousJournalEntries)) {
    triggeredRules.push({
      id: "tolerance-drop",
      status: "YELLOW",
      label: "toleranța la mers sau ședere scade",
      evidence: "Toleranța raportată este mai mică decât în intrarea precedentă."
    });
  }

  if (hasConfusionNote(currentJournalEntry)) {
    triggeredRules.push({
      id: "misconception-note",
      status: "YELLOW",
      label: "notă care sugerează confuzie despre efort",
      evidence: "Textul liber sugerează că absența durerii ar putea fi confundată cu permisiunea de a forța."
    });
  }

  if (targetActivityType === "sport" && !hasClinicianSportText(patientRestrictionsText)) {
    triggeredRules.push({
      id: "sport-needs-clinical-dialogue",
      status: "YELLOW",
      label: "sportul cere discuție separată cu clinicianul",
      evidence: "Textul restricțiilor nu menționează explicit o discuție clinică despre sport sau efort."
    });
  }

  if (triggeredRules.length > 0) {
    return createBaseResult(
      "YELLOW",
      "Observații care merită discutate",
      "Nu există semnale de alarmă selectate, dar regulile educaționale indică elemente care trebuie clarificate înainte de sarcini mai solicitante.",
      triggeredRules,
      "Pregătește un rezumat al observațiilor și discută-l cu echipa medicală. " +
        explainWhyNotClearance(),
      [
        "Ce schimbare observată în jurnal este cea mai importantă pentru consult?",
        "Cum se raportează obiectivul ales la restricțiile deja primite?",
        ...defaultClinicianQuestions
      ]
    );
  }

  return createBaseResult(
    "GREEN_EDUCATIONAL_ONLY",
    "Nu apar semnale educaționale de escaladare",
    "Intrările analizate nu arată semnale de alarmă selectate sau tendințe de înrăutățire în regulile deterministe ale simulatorului.",
    [],
    "Continuă jurnalizarea educațională și folosește rezumatul pentru dialog clinic. " +
      explainWhyNotClearance(),
    defaultClinicianQuestions
  );
}
