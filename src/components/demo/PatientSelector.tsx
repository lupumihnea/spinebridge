import { UserRound } from "lucide-react";

import { seededPatients } from "@/data/patients";
import { cn } from "@/lib/utils";

interface PatientSelectorProps {
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
}

export function PatientSelector({ selectedPatientId, onSelectPatient }: PatientSelectorProps) {
  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <UserRound aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="text-sm font-black uppercase text-clinical">Profiluri demonstrative</p>
          <h3 className="text-xl font-black text-ink">Date fictive pentru demo</h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {seededPatients.map((patient) => {
          const selected = patient.id === selectedPatientId;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "focus-ring premium-transition rounded-panel border p-4 text-left",
                selected
                  ? "border-clinical bg-clinical/10 shadow-panel"
                  : "border-ink/10 bg-white hover:-translate-y-0.5 hover:border-clinical/30 hover:shadow-panel"
              )}
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-black text-ink">
                  {patient.fictionalName}, {patient.age} ani
                </p>
                <span className="rounded-panel bg-ink px-2.5 py-1 text-xs font-black text-white">
                  fictiv
                </span>
              </div>
              <p className="mt-2 text-sm font-semibold leading-6 text-muted">
                {patient.injuryDescription}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
