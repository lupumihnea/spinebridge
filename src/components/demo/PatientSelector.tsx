import { UserRound } from "lucide-react";

import { seededPatients } from "@/data/patients";
import { cn } from "@/lib/utils";

interface PatientSelectorProps {
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
}

export function PatientSelector({ selectedPatientId, onSelectPatient }: PatientSelectorProps) {
  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <UserRound aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="text-sm font-semibold uppercase text-clinical">Profiluri demonstrative</p>
          <h3 className="text-xl font-bold text-ink">Date fictive pentru demo</h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3">
        {seededPatients.map((patient) => {
          const selected = patient.id === selectedPatientId;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "focus-ring rounded-panel border p-4 text-left transition duration-200",
                selected
                  ? "border-clinical bg-clinical/10"
                  : "border-ink/10 bg-white hover:border-clinical/30"
              )}
              key={patient.id}
              onClick={() => onSelectPatient(patient.id)}
              type="button"
            >
              <div className="flex items-center justify-between gap-3">
                <p className="font-bold text-ink">
                  {patient.fictionalName}, {patient.age} ani
                </p>
                <span className="rounded-panel bg-ink px-2.5 py-1 text-xs font-semibold text-white">
                  fictiv
                </span>
              </div>
              <p className="mt-2 text-sm leading-6 text-muted">{patient.injuryDescription}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
