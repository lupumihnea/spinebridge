import { Activity, BriefcaseBusiness, Footprints } from "lucide-react";

import { seededPatients } from "@/data/patients";
import { cn } from "@/lib/utils";

interface PatientSelectorProps {
  selectedPatientId: string;
  onSelectPatient: (patientId: string) => void;
}

const patientIconById = {
  "runner-recreational": Footprints,
  "office-driving": BriefcaseBusiness,
  "physical-worker": BriefcaseBusiness,
  "gym-no-pain": Activity
};

export function PatientSelector({ selectedPatientId, onSelectPatient }: PatientSelectorProps) {
  const SelectedPatientIcon =
    patientIconById[selectedPatientId as keyof typeof patientIconById] ?? Activity;

  return (
    <div className="rounded-panel border border-ink/10 bg-white p-5 shadow-panel sm:p-6">
      <div className="flex items-center gap-3">
        <span className="flex h-12 w-12 items-center justify-center rounded-panel bg-clinical/10 text-clinical">
          <SelectedPatientIcon aria-hidden="true" size={20} />
        </span>
        <div>
          <p className="text-sm font-black uppercase text-clinical">Exemple de caz</p>
          <h3 className="text-xl font-black text-ink">Alege o poveste pentru demonstrație</h3>
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
        {seededPatients.map((patient) => {
          const selected = patient.id === selectedPatientId;

          return (
            <button
              aria-pressed={selected}
              className={cn(
                "focus-ring premium-transition rounded-panel border p-3 text-left",
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
              </div>
              <p className="mt-2 line-clamp-2 text-sm font-semibold leading-6 text-muted">
                {patient.injuryDescription}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
