export interface TeachBackAnalyzerInput {
  fractureUnderstanding: string;
  restrictions: string;
  redFlagSymptoms: string;
  workSportDifference: string;
}

export interface TeachBackAnalysis {
  clarityScore: number;
  riskMisconceptions: string[];
  suggestedClinicianQuestions: string[];
  saferRephrasing: string;
}

const demoRiskRephrasing =
  "Formulare potențial riscantă: lipsa durerii nu înseamnă automat autorizare pentru efort complet. Întreabă clinicianul ce restricții, criterii și limite trebuie clarificate înainte de sarcini solicitante.";

const defaultQuestions = [
  "Ce restricții mi-au fost comunicate și ce ar trebui clarificat?",
  "Ce simptome trebuie comunicate prompt echipei medicale?",
  "Cum separ întrebările despre muncă de cele despre sport?",
  "Ce criterii clinice trebuie discutate înainte de sarcini solicitante?"
];

function normalizeText(value: string) {
  return value
    .toLocaleLowerCase("ro-RO")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function includesAny(text: string, terms: string[]) {
  const normalized = normalizeText(text);
  return terms.some((term) => normalized.includes(normalizeText(term)));
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)));
}

function hasGoodRestrictionUnderstanding(restrictions: string) {
  const text = normalizeText(restrictions);
  const mentionsBoundary = includesAny(text, [
    "restrict",
    "limita",
    "nu am voie",
    "evit",
    "ridicare",
    "aplecare",
    "condus",
    "efort",
    "sarcini"
  ]);
  const mentionsClinicalSource = includesAny(text, [
    "medic",
    "clinician",
    "specialist",
    "echipa medicala",
    "chirurg",
    "ortoped"
  ]);

  return restrictions.trim().length > 20 && mentionsBoundary && mentionsClinicalSource;
}

function mentionsRedFlags(redFlagSymptoms: string) {
  return includesAny(redFlagSymptoms, [
    "slabiciune",
    "amorteala",
    "parestez",
    "durere radiculara",
    "mers",
    "urinar",
    "intestinal",
    "perine",
    "durere severa",
    "durere progresiva",
    "deteriorare"
  ]);
}

function hasNoPainConfusion(text: string) {
  const normalized = normalizeText(text);
  const mentionsNoPain =
    normalized.includes("nu ma mai doare") ||
    normalized.includes("nu doare") ||
    normalized.includes("fara durere") ||
    normalized.includes("lipsa durerii");
  const mentionsForceOrDemand =
    normalized.includes("pot forta") ||
    normalized.includes("pot merge la sala") ||
    normalized.includes("pot reveni") ||
    normalized.includes("pot face sport") ||
    normalized.includes("efort complet") ||
    normalized.includes("antrenament");

  return mentionsNoPain && mentionsForceOrDemand;
}

function hasWorkSportConfusion(workSportDifference: string) {
  return includesAny(workSportDifference, [
    "nu este diferenta",
    "nu e diferenta",
    "sunt la fel",
    "tot aia",
    "munca si sportul sunt acelasi",
    "daca pot munci pot face sport",
    "daca pot lucra pot face sport"
  ]);
}

function separatesWorkAndSport(workSportDifference: string) {
  const text = normalizeText(workSportDifference);
  const mentionsWork = includesAny(text, ["munca", "serviciu", "birou", "lucru", "job"]);
  const mentionsSport = includesAny(text, ["sport", "sala", "alergare", "antrenament", "fitness"]);
  const mentionsSeparateDiscussion = includesAny(text, [
    "diferit",
    "separat",
    "discutii diferite",
    "sarcini diferite",
    "solicitari diferite"
  ]);

  return mentionsWork && mentionsSport && mentionsSeparateDiscussion;
}

function mentionsClinician(text: string) {
  return includesAny(text, [
    "medic",
    "clinician",
    "specialist",
    "echipa medicala",
    "consult",
    "chirurg",
    "ortoped"
  ]);
}

function hasOverconfidentPhrase(text: string) {
  return includesAny(text, [
    "pot reveni complet daca ma simt bine",
    "revin complet daca ma simt bine",
    "pot face orice daca ma simt bine",
    "sunt vindecat daca nu doare",
    "nu am nevoie de consult daca ma simt bine",
    "ma simt bine deci pot reveni complet"
  ]);
}

function uniqueQuestions(questions: string[]) {
  return Array.from(new Set(questions)).slice(0, 5);
}

export function analyzeTeachBack(input: TeachBackAnalyzerInput): TeachBackAnalysis {
  const combinedText = [
    input.fractureUnderstanding,
    input.restrictions,
    input.redFlagSymptoms,
    input.workSportDifference
  ].join(" ");
  const riskMisconceptions: string[] = [];
  const questions = [...defaultQuestions];
  let score = 40;

  if (hasGoodRestrictionUnderstanding(input.restrictions)) {
    score += 20;
  } else {
    riskMisconceptions.push("Restricțiile comunicate nu sunt descrise suficient de clar.");
    questions.push("Poți reformula restricțiile primite în termeni concreți pentru activitatea zilnică?");
  }

  if (mentionsRedFlags(input.redFlagSymptoms)) {
    score += 20;
  } else {
    riskMisconceptions.push("Lipsesc simptomele care ar trebui comunicate prompt medicului.");
    questions.push("Ce semnale noi ar trebui să te facă să contactezi echipa medicală?");
  }

  if (separatesWorkAndSport(input.workSportDifference)) {
    score += 10;
  }

  if (mentionsClinician(combinedText)) {
    score += 10;
  } else {
    riskMisconceptions.push("Lipsește menționarea dialogului cu clinicianul pentru deciziile solicitante.");
    questions.push("Ce obiectiv trebuie discutat explicit cu clinicianul înainte de sarcini solicitante?");
  }

  if (hasNoPainConfusion(combinedText)) {
    score -= 30;
    riskMisconceptions.push("Lipsa durerii este confundată cu permisiunea de a forța sau de a face efort complet.");
    questions.push("Cum diferențiezi absența durerii de criteriile clinice pentru sarcini solicitante?");
  }

  if (hasWorkSportConfusion(input.workSportDifference) || hasWorkSportConfusion(combinedText)) {
    score -= 20;
    riskMisconceptions.push("Revenirea la muncă și revenirea la sport sunt amestecate într-o singură concluzie.");
    questions.push("Ce diferențe există între cerințele muncii și cerințele sportului tău?");
  }

  if (hasOverconfidentPhrase(combinedText)) {
    score -= 20;
    riskMisconceptions.push("Formularea este prea sigură pe revenirea completă doar pe baza stării subiective.");
    questions.push("Ce informații clinice lipsesc din concluzia ta?");
  }

  const saferRephrasing = hasNoPainConfusion(combinedText)
    ? demoRiskRephrasing
    : riskMisconceptions.length > 0
      ? "Formulare mai prudentă: am înțeles că jurnalul mă ajută să explic ce observ, iar restricțiile, semnalele de alarmă și obiectivele solicitante trebuie clarificate cu clinicianul."
      : "Formulare clară pentru dialog: am înțeles restricțiile comunicate, urmăresc semnalele de alarmă și separ întrebările despre muncă de cele despre sport în discuția cu clinicianul.";

  return {
    clarityScore: clampScore(score),
    riskMisconceptions,
    suggestedClinicianQuestions: uniqueQuestions(questions),
    saferRephrasing
  };
}

export const teachBackDemoExample = {
  input: "Dacă nu mă mai doare, pot merge la sală.",
  output: demoRiskRephrasing
};
