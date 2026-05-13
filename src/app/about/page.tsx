import type { Metadata } from "next";
import type { LucideIcon } from "lucide-react";
import React from "react";
import {
  BookOpenCheck,
  ClipboardList,
  FileWarning,
  FlaskConical,
  GraduationCap,
  MessageSquareText,
  Route,
  ShieldAlert,
  ShieldCheck,
  Stethoscope,
  Target,
  Users
} from "lucide-react";

import { ActionLink } from "@/components/ActionLink";
import { ResearchMaturityLadder } from "@/components/research/ResearchMaturityLadder";
import { frameworkDomains } from "@/data/framework";

export const metadata: Metadata = {
  title: "Despre / raționament academic | SpineBridge Live",
  description:
    "Raționamentul academic al aplicației SpineBridge Live, limitele populației vizate și agenda de validare viitoare."
};

interface SummaryCard {
  title: string;
  icon: LucideIcon;
  body: string;
  points: string[];
}

interface RationaleBlock {
  title: string;
  icon: LucideIcon;
  body: string;
}

const summaryCards: SummaryCard[] = [
  {
    title: "Ce face aplicația",
    icon: ClipboardList,
    body:
      "Transformă cadrul academic într-un spațiu educațional pentru orientare, automonitorizare și pregătirea dialogului cu echipa medicală.",
    points: [
      "organizează întrebări pentru consultație",
      "explică cele cinci domenii educaționale",
      "folosește doar scenarii demonstrative fictive"
    ]
  },
  {
    title: "Ce nu face aplicația",
    icon: FileWarning,
    body:
      "Nu stabilește diagnostic, tratament, exerciții, restricții, încărcare sau validare clinică a progresiei funcționale.",
    points: [
      "nu interpretează imagini sau stabilitatea fracturii",
      "nu produce scoruri de pregătire",
      "nu decide revenirea la muncă, sport sau efort solicitant"
    ]
  },
  {
    title: "De ce contează",
    icon: Target,
    body:
      "Recuperarea funcțională după fracturi lombare sau toracolombare depășește controlul durerii și cere comunicare clară despre obiective diferite.",
    points: [
      "durerea redusă nu echivalează cu efort complet",
      "munca și sportul au cerințe diferite",
      "semnalele de alarmă trebuie comunicate prompt"
    ]
  }
];

const scopeInclusions = [
  "adulți tineri activi, 18-40 ani",
  "fracturi lombare sau toracolombare traumatice, operațional T10-L5",
  "fără leziune medulară",
  "fără deficit motor, senzitiv sau sfincterian obiectiv",
  "parcurs terapeutic deja stabilit de medicul specialist"
];

const exclusionBoundaries = [
  "leziune medulară, deficit neurologic obiectiv sau sindrom de coadă de cal",
  "simptome neurologice noi sau progresive care impun evaluare medicală",
  "fracturi patologice, metastatice, infecțioase, osteoporotice sau de stres sportiv",
  "populații pediatrice, adolescenți, vârstnici fragili sau contexte geriatrice dominante",
  "cazuri fără diagnostic final, fără conduită terapeutică sau fără restricții comunicate clinic"
];

const rationaleBlocks: RationaleBlock[] = [
  {
    title: "De ce este educațională, nu prescriptivă",
    icon: GraduationCap,
    body:
      "Lucrarea propune o traducere educațională a informațiilor: diagnostic, restricții, semnale de alarmă, automonitorizare și întrebări pentru consult. Aplicația păstrează decizia medicală în afara interfeței și nu transformă observațiile utilizatorului în conduită clinică."
  },
  {
    title: "De ce trebuie tratate separat mai multe activități",
    icon: Route,
    body:
      "Șederea prelungită, condusul, mersul, ridicarea, sala, alergarea și sportul de contact solicită corpul în moduri diferite. De aceea aplicația separă activitățile în conversații distincte, cu întrebări și observații potrivite fiecărui tip de cerință."
  },
  {
    title: "De ce contează teach-back și automonitorizarea",
    icon: MessageSquareText,
    body:
      "Teach-back-ul verifică dacă pacientul poate reformula în cuvintele proprii informațiile importante. Automonitorizarea pune în ordine durerea, mersul, șederea, oboseala și schimbările neurologice, astfel încât consultația să pornească de la observații clare, nu de la presupuneri."
  },
  {
    title: "De ce instrumentele digitale nu decid progresia",
    icon: ShieldAlert,
    body:
      "Pașii, somnul, frecvența cardiacă, jurnalul de simptome sau scorurile auto-raportate sunt date contextuale. Fără validare pentru acest scop și fără evaluarea leziunii, ele nu pot înlocui examenul clinic, imagistica, restricțiile individuale și judecata echipei medicale."
  }
];

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-semibold text-clinical shadow-panel">
              <FlaskConical aria-hidden="true" size={16} />
              <span>Despre / raționament academic</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-5xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              Un cadru educațional pentru recuperarea funcțională, nu un protocol clinic.
            </h1>
            <p className="mt-5 max-w-4xl text-lg font-semibold leading-8 text-muted">
              Articolul propune o recenzie narativă structurată și un cadru în cinci domenii pentru
              adulți tineri activi cu fracturi lombare sau toracolombare traumatice, fără leziune
              medulară și fără deficit neurologic obiectiv. SpineBridge Live traduce acest cadru
              într-o experiență digitală demonstrativă, cu limite explicite și fără promisiuni
              clinice.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/recovery-map" icon={<BookOpenCheck aria-hidden="true" size={18} />}>
                Vezi cadrul educațional
              </ActionLink>
            </div>
          </div>

          <aside className="rounded-panel border border-signal/20 bg-white p-5 shadow-soft">
            <div className="flex h-12 w-12 items-center justify-center rounded-panel bg-signal/10 text-signal">
              <ShieldCheck aria-hidden="true" size={24} />
            </div>
            <p className="mt-4 text-sm font-black uppercase text-signal">Limită vizibilă</p>
            <p className="mt-3 text-xl font-black leading-8 text-ink">
              Aplicația explică și structurează comunicarea. Deciziile despre diagnostic,
              tratament, restricții, muncă, sport sau efort solicitant rămân la echipa medicală.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-4 lg:grid-cols-3">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel"
                key={card.title}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
                    <Icon aria-hidden="true" size={22} />
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-safe-wrap text-xl font-black leading-7 text-ink">
                      {card.title}
                    </h2>
                    <p className="mt-2 text-sm font-semibold leading-6 text-muted">{card.body}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 border-t border-ink/10 pt-4">
                  {card.points.map((point) => (
                    <li className="flex gap-2 text-sm font-semibold leading-6 text-ink" key={point}>
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-clinical" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-white/55">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 py-12 sm:px-6 lg:grid-cols-[0.95fr_1.05fr] lg:px-8">
          <div className="min-w-0">
            <div className="flex h-12 w-12 items-center justify-center rounded-panel bg-ink text-white">
              <Users aria-hidden="true" size={23} />
            </div>
            <h2 className="text-safe-wrap mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
              Populația vizată este îngustă prin design.
            </h2>
            <p className="mt-4 text-base font-semibold leading-7 text-muted">
              Cadrul nu este o schemă universală pentru durere de spate sau pentru orice fractură
              vertebrală. El este formulat pentru o populație activă, neurologic intactă, după ce
              specialistul a stabilit conduita terapeutică.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <article className="rounded-panel border border-clinical/20 bg-white p-5 shadow-panel">
              <p className="text-sm font-black uppercase text-clinical">Include</p>
              <ul className="mt-4 space-y-3">
                {scopeInclusions.map((item) => (
                  <li className="flex gap-2 text-sm font-semibold leading-6 text-ink" key={item}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-clinical" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-panel border border-signal/20 bg-white p-5 shadow-panel">
              <p className="text-sm font-black uppercase text-signal">Exclude</p>
              <ul className="mt-4 space-y-3">
                {exclusionBoundaries.map((item) => (
                  <li className="flex gap-2 text-sm font-semibold leading-6 text-ink" key={item}>
                    <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-signal" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <p className="text-sm font-black uppercase text-clinical">Cinci domenii educaționale</p>
          <h2 className="text-safe-wrap mt-3 text-3xl font-black leading-tight text-ink sm:text-4xl">
            Domeniile sunt repere de înțelegere și comunicare, nu etape cu durată fixă.
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-muted">
            Fiecare domeniu ajută pacientul să formuleze observații și întrebări mai bune pentru
            consultație. Niciun domeniu nu funcționează ca prag independent de progresie.
          </p>
        </div>

        <div className="mt-7 grid gap-3 lg:grid-cols-5">
          {frameworkDomains.map((domain) => (
            <article
              className="rounded-panel border border-ink/10 bg-white p-4 shadow-panel"
              key={domain.id}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-panel bg-ink text-sm font-black text-white">
                {domain.order}
              </span>
              <p className="mt-4 text-[11px] font-black uppercase text-clinical">
                {domain.academicLabel}
              </p>
              <h3 className="text-safe-wrap mt-1 text-base font-black leading-6 text-ink">
                {domain.title}
              </h3>
              <p className="mt-3 text-sm font-semibold leading-6 text-muted">
                {domain.educationalObjective}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-ink/10 bg-graphite text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-4 lg:grid-cols-4">
            {rationaleBlocks.map((block) => {
              const Icon = block.icon;

              return (
                <article
                  className="rounded-panel border border-white/12 bg-white/8 p-5"
                  key={block.title}
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-panel bg-white/12 text-clinical">
                    <Icon aria-hidden="true" size={22} />
                  </div>
                  <h2 className="text-safe-wrap mt-4 text-lg font-black leading-7 text-white">
                    {block.title}
                  </h2>
                  <p className="mt-3 text-sm font-semibold leading-6 text-white/72">{block.body}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-6 max-w-4xl">
          <div className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
            <Stethoscope aria-hidden="true" size={23} />
          </div>
          <h2 className="text-safe-wrap mt-4 text-3xl font-black leading-tight text-ink sm:text-4xl">
            Agenda de validare viitoare păstrează prototipul onest.
          </h2>
          <p className="mt-4 text-base font-semibold leading-7 text-muted">
            Pentru a deveni intervenție clinică, cadrul ar avea nevoie de validare prospectivă:
            consens de experți, experiență a pacientului, pilot de fezabilitate, cohortă
            prospectivă, studiu pragmatic sau randomizat și studiu de implementare digitală.
          </p>
        </div>
        <ResearchMaturityLadder />
      </section>
    </main>
  );
}
