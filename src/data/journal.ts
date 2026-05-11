import type { JournalItem } from "@/types/demo";

export const journalItems: JournalItem[] = [
  {
    id: "rest-pain",
    label: "durere absentă în repaus",
    detail:
      "Se notează ca observație, fără a o transforma în concluzie despre sarcini solicitante."
  },
  {
    id: "walking-fatigue",
    label: "oboseală la mers prelungit",
    detail: "Ajută la formularea unei întrebări despre toleranță funcțională."
  },
  {
    id: "position-change",
    label: "nevoie de schimbări dese de poziție",
    detail: "Poate fi comunicată în discuția despre muncă și autonomie."
  },
  {
    id: "stairs",
    label: "ezitare la urcat scări",
    detail: "Rămâne o observație de jurnal pentru conversația clinică."
  }
];
