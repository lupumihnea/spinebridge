import type { PatientScenario } from "@/types/demo";

export const demoPatients: PatientScenario[] = [
  {
    id: "runner-recreational",
    age: 24,
    fictionalName: "Alex D.",
    scenarioLabel: "alergător recreațional",
    injuryDescription:
      "Scenariu educațional cu fractură toracolombară descrisă în termeni generali, fără deficit neurologic obiectiv în datele fictive.",
    treatmentPathway: {
      kind: "conservative",
      label: "parcurs conservator",
      decidedByClinician: true,
      note: "Parcursul este deja decis de clinician; aplicația nu îl stabilește și nu îl modifică."
    },
    restrictionsText:
      "Restricțiile sunt prezentate ca text primit anterior de la clinician în scenariul fictiv, nu generate de aplicație.",
    functionalGoals: {
      work: "menținerea rutinei de student și activități ușoare de birou",
      dailyActivity: "mers zilnic și autonomie în activități obișnuite",
      sportOrFitness: "discuție separată despre alergare recreațională"
    },
    workDemandProfile: {
      id: "student-desk",
      label: "studiu și birou ușor",
      sittingLoad: "moderată",
      standingWalkingLoad: "moderată",
      liftingExposure: "minimă",
      drivingOrCommute: "navetă scurtă cu transport urban",
      discussionFocus: [
        "toleranța la stat pe scaun",
        "pauze în activități academice",
        "separarea alergării de activitățile zilnice"
      ]
    },
    sportActivityProfile: {
      id: "recreational-running",
      label: "alergare recreațională",
      activityType: "alergare ușoară ca obiectiv de discuție",
      intensityContext: "activitate repetitivă, diferită de mersul cotidian",
      misconceptionRisk: "poate confunda mersul fără disconfort cu pregătirea pentru alergare",
      discussionFocus: [
        "diferența dintre mers și alergare",
        "întrebări despre impact și oboseală",
        "semnale care trebuie comunicate"
      ]
    },
    potentialMisconception:
      "Crede că mersul confortabil înseamnă automat pregătire pentru alergare.",
    demoNarrative:
      "Alex folosește aplicația ca să transforme dorința de a alerga într-o listă de întrebări pentru consult, nu într-o decizie de progres.",
    fictionalDataNotice: "Caz demonstrativ fictiv, fără date reale de pacient."
  },
  {
    id: "office-driving",
    age: 32,
    fictionalName: "Ioana S.",
    scenarioLabel: "lucru la birou și obiectiv de condus",
    injuryDescription:
      "Scenariu educațional cu fractură lombară descrisă non-diagnostic, fără deficit motor, senzitiv sau sfincterian obiectiv în povestea fictivă.",
    treatmentPathway: {
      kind: "conservative",
      label: "parcurs conservator",
      decidedByClinician: true,
      note: "Decizia aparține clinicianului și este deja stabilită înainte de folosirea simulatorului."
    },
    restrictionsText:
      "Restricțiile sunt redate ca informații textuale deja comunicate în scenariu; aplicația nu le calculează.",
    functionalGoals: {
      work: "revenirea la sarcini de birou cu perioade de ședere prelungită discutate clar",
      dailyActivity: "gestionarea navetei și a schimbărilor de poziție",
      sportOrFitness: "plimbări recreaționale ca subiect de comunicare, nu ca obiectiv sportiv"
    },
    workDemandProfile: {
      id: "office-driving-demand",
      label: "birou cu ședere prelungită și condus",
      sittingLoad: "ridicată",
      standingWalkingLoad: "scăzută",
      liftingExposure: "minimă",
      drivingOrCommute: "obiectiv de condus și navetă de aproximativ o oră în scenariul fictiv",
      discussionFocus: [
        "stat prelungit pe scaun",
        "pauze și schimbări de poziție",
        "întrebări despre condus și navetă"
      ]
    },
    sportActivityProfile: {
      id: "light-walking",
      label: "plimbări recreaționale",
      activityType: "activitate ușoară de timp liber",
      intensityContext: "scop de comunicare, fără parametri de efort generați",
      misconceptionRisk: "poate trata condusul ca echivalent cu activitățile zilnice obișnuite",
      discussionFocus: [
        "diferența dintre ședere la birou și condus",
        "oboseala după navetă",
        "întrebări pentru clinician despre toleranță"
      ]
    },
    potentialMisconception:
      "Presupune că munca la birou este simplă pentru că nu implică ridicare de greutăți.",
    demoNarrative:
      "Ioana folosește simulatorul pentru a pregăti o discuție despre ședere prelungită, condus și pauze, fără ca aplicația să stabilească limite.",
    fictionalDataNotice: "Profil ficțional pentru juriu, fără informații identificabile."
  },
  {
    id: "physical-worker",
    age: 38,
    fictionalName: "Marius C.",
    scenarioLabel: "lucrător cu solicitări fizice",
    injuryDescription:
      "Scenariu educațional cu leziune lombară traumatică descrisă în limbaj general, fără deficit neurologic obiectiv în datele de demo.",
    treatmentPathway: {
      kind: "surgical",
      label: "parcurs chirurgical",
      decidedByClinician: true,
      note: "Parcursul chirurgical este deja decis de echipa medicală în povestea fictivă."
    },
    restrictionsText:
      "Restricțiile profesionale apar ca text furnizat în scenariu de clinician; aplicația nu produce recomandări pentru muncă.",
    functionalGoals: {
      work: "discuție despre sarcini fizice, ridicare, transport și ritm de lucru",
      dailyActivity: "autonomie domestică și mers funcțional descrise în jurnal",
      sportOrFitness: "nu are obiectiv sportiv principal în demo"
    },
    workDemandProfile: {
      id: "physical-demand",
      label: "muncă fizic solicitantă",
      sittingLoad: "scăzută",
      standingWalkingLoad: "ridicată",
      liftingExposure: "frecventă",
      drivingOrCommute: "deplasări între puncte de lucru în scenariul fictiv",
      discussionFocus: [
        "ridicare și transport",
        "stat în picioare prelungit",
        "deteriorări funcționale repetate"
      ]
    },
    sportActivityProfile: {
      id: "no-primary-sport",
      label: "fără obiectiv sportiv principal",
      activityType: "activitate recreațională ocazională",
      intensityContext: "accentul demo este pe diferența dintre muncă fizică și autonomie zilnică",
      misconceptionRisk: "poate subestima diferența dintre activitățile casnice și cerințele jobului",
      discussionFocus: [
        "diferența dintre muncă și activitate cotidiană",
        "semnale de deteriorare funcțională",
        "întrebări despre cerințele reale ale locului de muncă"
      ]
    },
    potentialMisconception:
      "Crede că dacă poate gestiona activități casnice, poate descrie munca fizică în același fel.",
    demoNarrative:
      "Marius folosește aplicația pentru a separa autonomia zilnică de cerințele profesionale și pentru a pregăti întrebări concrete.",
    fictionalDataNotice: "Scenariu sintetic fictiv, fără pacient real."
  },
  {
    id: "gym-no-pain",
    age: 29,
    fictionalName: "Radu N.",
    scenarioLabel: "adult orientat spre sală",
    injuryDescription:
      "Scenariu educațional cu fractură toracolombară descrisă non-diagnostic, fără deficit neurologic obiectiv în datele fictive.",
    treatmentPathway: {
      kind: "surgical",
      label: "parcurs chirurgical",
      decidedByClinician: true,
      note: "Decizia este prezentată ca deja luată de clinician; aplicația nu evaluează indicația."
    },
    restrictionsText:
      "Restricțiile sunt text demonstrativ atribuit clinicianului în scenariu, nu generate de simulator.",
    functionalGoals: {
      work: "activitate profesională cu ședere și deplasări scurte",
      dailyActivity: "mers, somn și schimbări de poziție descrise fără scoruri",
      sportOrFitness: "discuție separată despre sală și exerciții cu încărcare"
    },
    workDemandProfile: {
      id: "mixed-office",
      label: "birou cu deplasări scurte",
      sittingLoad: "moderată",
      standingWalkingLoad: "moderată",
      liftingExposure: "ocazională",
      drivingOrCommute: "navetă scurtă cu mașina în scenariul fictiv",
      discussionFocus: [
        "ședere și schimbări de poziție",
        "diferența dintre muncă și antrenament",
        "comunicarea obiectivelor de fitness"
      ]
    },
    sportActivityProfile: {
      id: "gym-training",
      label: "sală de fitness",
      activityType: "antrenament cu încărcare ca obiectiv de discuție",
      intensityContext: "activitate solicitantă, separată de mers și autonomie",
      misconceptionRisk: "presupune greșit că absența durerii în repaus înseamnă pregătire pentru efort solicitant",
      discussionFocus: [
        "diferența dintre absența durerii și solicitare",
        "întrebări despre obiectivele de sală",
        "semnale de alarmă care trebuie comunicate"
      ]
    },
    potentialMisconception:
      "Presupune greșit că absența durerii în repaus înseamnă pregătire pentru efort solicitant.",
    demoNarrative:
      "Radu ilustrează mesajul cheie al aplicației: absența durerii nu devine permisiune pentru sarcini solicitante.",
    fictionalDataNotice: "Caz demonstrativ fictiv pentru educație și comunicare."
  }
];

export const seededPatients = demoPatients;
