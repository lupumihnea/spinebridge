import { frameworkDomains } from "@/data/framework";

const colorByStyle = {
  clinical: "#0f766e",
  clay: "#b85c38",
  saffron: "#c78b1c",
  graphite: "#24302c",
  signal: "#b42318"
};

export function FrameworkChart() {
  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
        <div>
          <p className="text-sm font-black uppercase text-clinical">Vizualizare pentru juriu</p>
          <h3 className="mt-2 text-2xl font-black text-ink">Pondere educațională în demo</h3>
        </div>
        <p className="max-w-sm text-sm font-semibold leading-6 text-muted">
          Valorile sunt arbitrare și servesc doar compoziției vizuale a demonstrației.
        </p>
      </div>
      <div
        aria-label="Pondere educațională demonstrativă pe domenii"
        className="mt-6 grid gap-4"
        role="list"
      >
        {frameworkDomains.map((domain) => (
          <div
            className="grid gap-2 rounded-panel border border-ink/10 bg-surface-muted p-3 sm:grid-cols-[8.5rem_minmax(0,1fr)_3rem] sm:items-center sm:gap-4"
            key={domain.id}
            role="listitem"
          >
            <div className="min-w-0">
              <p className="text-sm font-black leading-5 text-ink">{domain.academicLabel}</p>
              <p className="text-xs font-bold leading-5 text-muted">Domeniul {domain.order}</p>
            </div>
            <div
              aria-hidden="true"
              className="h-9 overflow-hidden rounded-panel border border-ink/10 bg-white shadow-inset"
            >
              <div
                className="h-full rounded-panel"
                style={{
                  width: `${domain.visualWeight}%`,
                  backgroundColor: colorByStyle[domain.visualStyleKey]
                }}
              />
            </div>
            <p className="text-right text-base font-black text-ink">{domain.visualWeight}%</p>
          </div>
        ))}
      </div>
    </div>
  );
}
