import type { RedFlag } from "@/types/demo";

export const strongDisclaimer =
  "Instrument educațional. Nu stabilește tratament. Nu autorizează progresia.";

export const layoutSafetyStatement =
  "Simulator educațional. Nu stabilește diagnostic, tratament, exerciții sau autorizare pentru progres. Deciziile clinice rămân la echipa medicală.";

export const safetyMessages = [
  "Instrument educațional, nu medical.",
  "Nu înlocuiește consultul, evaluarea sau decizia echipei medicale.",
  "Absența deficitului neurologic este favorabilă, dar nu înseamnă că activitatea poate fi forțată.",
  "Absența durerii în repaus nu înseamnă automat pregătire pentru sarcini solicitante.",
  "Revenirea la muncă și revenirea la sport sunt discuții diferite."
];

export const redFlags: RedFlag[] = [
  { id: "weakness", label: "slăbiciune nou apărută" },
  { id: "numbness", label: "amorțeală, parestezii sau modificări senzitive noi" },
  { id: "radicular-pain", label: "durere radiculară severă nou apărută" },
  { id: "gait", label: "deteriorarea mersului" },
  { id: "urinary-bowel", label: "modificări urinare sau intestinale" },
  { id: "perineal", label: "anestezie perineală" },
  { id: "progressive-pain", label: "durere severă progresivă" },
  { id: "repeated-decline", label: "deteriorări funcționale repetate" }
];

export const redFlagEscalation =
  "Acest semnal trebuie comunicat prompt echipei medicale. Aplicația nu interpretează cauza și nu stabilește conduita.";
