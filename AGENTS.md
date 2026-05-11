# SpineBridge Live Agent Instructions

SpineBridge Live is a Romanian educational and communication-support simulator for a live academic demo. It is not a medical diagnosis app, treatment app, exercise prescription app, or return-to-sport clearance tool.

## Non-Negotiable Product Rules

- Keep all user-facing UI text in Romanian.
- Use only fictional patient data, fictional cases, and fictional demo scenarios.
- Preserve visible safety boundaries on every page or screen.
- Never use clinical authorization language such as:
  - "cleared"
  - "safe to progress"
  - "approved for sport"
  - "treatment recommendation"
  - Romanian equivalents such as "apt", "autorizat", "sigur pentru progres", "aprobat pentru sport", "recomandare de tratament"
- Prefer simple deterministic logic over pretending to make clinical decisions.
- Do not imply that the app detects, diagnoses, treats, validates recovery, or authorizes progression.
- Clinical decisions must remain explicitly assigned to the medical team.

## Safety Language

Every page must visibly communicate:

- Instrument educational, nu medical.
- Nu inlocuieste consultul, evaluarea sau decizia echipei medicale.
- Absenta deficitului neurologic este favorabila, dar nu inseamna ca activitatea poate fi fortata.
- Absenta durerii in repaus nu inseamna automat pregatire pentru sarcini solicitante.
- Revenirea la munca si revenirea la sport sunt discutii diferite.

## Red Flags

Always preserve clear escalation language for:

- slabiciune nou aparuta
- amorteala, parestezii sau modificari senzitive noi
- durere radiculara severa nou aparuta
- deteriorarea mersului
- modificari urinare sau intestinale
- anestezie perineala
- durere severa progresiva
- deteriorari functionale repetate

When red flags are displayed in the app, the wording must direct the user toward medical contact, not app-based interpretation.

## Development Expectations

- Run build/tests after changes when a build or test command exists.
- Keep a short progress log in `docs/build_log.md` after meaningful changes.
- Keep the app deterministic, inspectable, and demo-stable.
- Do not add AI-style clinical inference unless it is clearly framed as non-clinical educational summarization.
- When in doubt, make the boundary safer and more explicit.

## Repository Hygiene

- Keep project work inside this repository, not in the parent Documents folder.
- Keep documentation under `docs/` unless a file has a standard root-level role such as `README.md`, `AGENTS.md`, or `.gitignore`.
- Do not add real patient documents, screenshots, datasets, or exported medical material to the repository.
