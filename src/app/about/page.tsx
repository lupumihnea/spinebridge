import type { Metadata } from "next";
import { ArrowRight, BookOpenCheck, FlaskConical, ShieldCheck } from "lucide-react";

import { ActionLink } from "@/components/ActionLink";
import { ResearchMaturityLadder } from "@/components/research/ResearchMaturityLadder";

export const metadata: Metadata = {
  title: "Despre cercetare | SpineBridge Live",
  description:
    "Maturitatea științifică a prototipului SpineBridge Live și pașii necesari pentru validare viitoare."
};

export default function AboutPage() {
  return (
    <main className="min-h-screen overflow-hidden">
      <section className="border-b border-ink/10">
        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[minmax(0,1fr)_24rem] lg:px-8 lg:py-18">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 rounded-panel border border-clinical/20 bg-white/80 px-3 py-2 text-sm font-semibold text-clinical shadow-panel">
              <FlaskConical aria-hidden="true" size={16} />
              <span>Despre prototip și validare</span>
            </div>
            <h1 className="text-safe-wrap mt-6 max-w-5xl text-4xl font-black leading-tight text-ink sm:text-6xl">
              O aplicație educațională trebuie să fie clară și onestă despre dovezi.
            </h1>
            <p className="mt-5 max-w-3xl text-lg font-semibold leading-8 text-muted">
              SpineBridge Live prezintă un cadru educațional pentru comunicare, automonitorizare și
              pregătirea dialogului clinic. Nu pretinde validare clinică și nu transformă datele
              raportate de pacient în decizii medicale.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <ActionLink href="/jury" icon={<ArrowRight aria-hidden="true" size={18} />}>
                Deschide Jury Mode
              </ActionLink>
              <ActionLink
                href="/recovery-map"
                icon={<BookOpenCheck aria-hidden="true" size={18} />}
                variant="secondary"
              >
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
              Prototipul nu stabilește tratament, nu interpretează leziuni și nu autorizează revenirea la
              muncă, sport sau efort solicitant.
            </p>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <ResearchMaturityLadder />
      </section>
    </main>
  );
}
