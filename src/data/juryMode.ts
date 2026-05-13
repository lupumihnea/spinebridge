import { researchMaturitySteps } from "./researchMaturity";

export type JuryStepKind =
  | "problem"
  | "framework"
  | "patient"
  | "journal"
  | "red-flag"
  | "teach-back"
  | "work-sport"
  | "brief"
  | "research"
  | "closing";

export interface JuryStep {
  id: JuryStepKind;
  eyebrow: string;
  title: string;
  statement: string;
  presenterNote: string;
}

export const jurySteps: JuryStep[] = [
  {
    id: "problem",
    eyebrow: "1 / Problemă",
    title: "Nu este doar despre durere",
    statement:
      "După o fractură lombară/toracolombară fără deficit neurologic, pacientul nu are nevoie doar de controlul durerii, ci de înțelegere, automonitorizare și dialog clinic.",
    presenterNote:
      "Deschide cu diferența dintre absența deficitului neurologic și revenirea automată la efort."
  },
  {
    id: "framework",
    eyebrow: "2 / Framework",
    title: "Cinci domenii educaționale",
    statement:
      "Cadrul transformă recuperarea într-o conversație structurată: orientare, autonomie, mers, muncă/sport și auto-management.",
    presenterNote:
      "Spune explicit că harta organizează comunicarea, nu decide un traseu terapeutic."
  },
  {
    id: "patient",
    eyebrow: "3 / Pacient fictiv",
    title: "Radu: “no pain = safe”",
    statement:
      "Încărcăm un pacient fictiv orientat spre sală, care presupune greșit că lipsa durerii în repaus înseamnă pregătire pentru efort solicitant.",
    presenterNote:
      "Folosește cazul Radu ca moment memorabil: no pain nu devine decizie clinică."
  },
  {
    id: "journal",
    eyebrow: "4 / Jurnal",
    title: "Date pentru conversație, nu concluzii",
    statement:
      "Jurnalul arată durere înainte/după activitate, mers, ședere, oboseală și note de context pentru discuția clinică.",
    presenterNote:
      "Arată că datele sunt simple și explicabile, nu un scor medical opac."
  },
  {
    id: "red-flag",
    eyebrow: "5 / Semnal de alarmă",
    title: "Un click schimbă conversația",
    statement:
      "Selectăm amorțeală nouă și aplicația trece într-un mod de siguranță: comunicare medicală, fără panică și fără tratament.",
    presenterNote:
      "Demonstrează fermitatea limitei de siguranță: sistemul nu interpretează cauza."
  },
  {
    id: "teach-back",
    eyebrow: "6 / Teach-back",
    title: "Înțelegerea pacientului devine vizibilă",
    statement:
      "Pacientul scrie: “Dacă nu mă doare, pot merge la sală.” Sistemul marchează formularea ca potențial riscantă.",
    presenterNote:
      "Evidențiază că aplicația sprijină clarificarea limbajului, nu dă instrucțiuni de progres."
  },
  {
    id: "work-sport",
    eyebrow: "7 / Activități",
    title: "Activitățile se clarifică separat",
    statement:
      "Condusul, șederea, ridicarea, alergarea, sala și sportul de contact au cerințe diferite; tolerarea uneia nu transferă automat concluzii către alta.",
    presenterNote:
      "Folosește selectorul de activități: fiecare cerință produce întrebări diferite pentru consultație."
  },
  {
    id: "brief",
    eyebrow: "8 / Brief",
    title: "Rezumat printabil pentru consultație",
    statement:
      "Brief-ul adună profilul fictiv, jurnalul, semnalele, teach-back-ul, cerințele activităților selectate și întrebările pentru echipa medicală.",
    presenterNote:
      "Spune că acesta este livrabilul practic: o conversație mai bună la consult."
  },
  {
    id: "research",
    eyebrow: "9 / Maturitate științifică",
    title: "Validarea este un drum, nu o promisiune",
    statement:
      "Următorii pași sunt consens Delphi, studiu calitativ cu pacienți, pilot de fezabilitate, cohortă prospectivă, studiu pragmatic sau randomizat și implementare digitală.",
    presenterNote:
      "Aici aplicația pare serioasă: nu pretinde validare clinică înainte să o aibă."
  },
  {
    id: "closing",
    eyebrow: "10 / Closing",
    title: "Clinicianul rămâne în centru",
    statement:
      "Aplicația nu înlocuiește clinicianul. Îl ajută pe pacient să înțeleagă, să monitorizeze și să comunice mai bine.",
    presenterNote:
      "Închide calm: valoarea este educațională, de comunicare și siguranță."
  }
];

export const validationLadder = researchMaturitySteps.map((step) => step.shortLabel);
