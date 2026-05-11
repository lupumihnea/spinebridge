# SpineBridge Live Product Spec

## Product Summary

SpineBridge Live is a polished Romanian web application for a high-impact academic live demo. It translates an educational framework about functional recovery after traumatic lumbar or thoracolumbar fractures into a clear, safe, non-technical simulator.

The app is not a medical diagnosis app, treatment app, exercise prescription app, or return-to-sport clearance app. It is an educational and communication-support simulator designed to help a medical or academic audience understand how staged education, journaling, symptom communication, and structured clinical dialogue can support functional confidence.

## Audience

- Medical and academic jury members
- Non-technical participants
- Evaluators watching a live demo
- Young active adult patient personas represented only through fictional examples

## Academic Context

The underlying framework concerns young active adults, ages 18-40, with traumatic lumbar or thoracolumbar fractures, operationally T10-L5, without spinal cord injury and without objective motor, sensory, or sphincter deficit, after the therapeutic pathway has already been established by a specialist.

The app must never generalize beyond this educational context.

## Core Positioning

SpineBridge Live supports:

- educational orientation
- patient-clinician communication
- fictional journaling simulations
- symptom language rehearsal
- structured discussion preparation
- functional confidence framing

SpineBridge Live does not support:

- diagnosis
- treatment decisions
- exercise prescription
- clinical progression authorization
- return-to-sport clearance
- universal recovery calendars

## Conceptual Model

The demo should communicate this chain:

medical lesion-specific assessment -> education -> self-monitoring -> clinical dialogue -> graded activity discussion -> functional confidence

The app may visualize this model as a central flow, timeline, or guided dashboard, but it must keep clinical decisions outside the app.

## Five Educational Domains

1. Diagnostic orientation and vertebral safety
2. Basic mobilization and autonomy
3. Trunk control, walking and reconditioning
4. Structured discussion about return to work, activity and sport
5. Long-term self-management and risk reduction

Each domain should be presented in Romanian with plain-language explanations and clearly marked educational boundaries.

## Key Messages To Preserve

- Absence of neurological deficit is favorable, but does not mean the patient can force activity.
- Absence of pain at rest does not automatically mean readiness for demanding tasks.
- Return to work and return to sport are different discussions.
- Digital tools may support journaling, reminders, and symptom communication, but must not authorize progression.
- The framework is educational, not therapeutic, not clinically validated, and not a universal calendar.
- Clinical decisions remain with the medical team.

## Demo Experience Vision

The first screen should feel serious, intelligent, and visually impressive. It should not feel like a generic health app or a playful fitness tracker.

Recommended structure:

- A refined Romanian dashboard titled "SpineBridge Live"
- A visible safety boundary banner on every screen
- A five-domain educational map
- A fictional patient journey panel
- A red-flag awareness panel
- A communication summary that helps prepare questions for the medical team
- A distinction panel for "munca", "activitate cotidiana", and "sport"

## Tone And Visual Direction

Use a calm clinical-academic tone. The interface should feel premium and credible, with high contrast, careful spacing, restrained motion, and strong information hierarchy.

Avoid:

- playful gamification
- badges that imply approval
- green "go" states for recovery progression
- countdowns to return to sport
- exercise plans
- diagnosis-like risk scores
- sensational medical imagery

Prefer:

- structured cards
- domain progression as education, not clearance
- neutral status language
- "de discutat cu echipa medicala"
- timeline or map metaphors that show learning stages
- red-flag visibility without alarmist styling

## Fictional Demo Data

Use fictional personas only. Example:

- "Andrei M., 27 ani, caz demonstrativ fictiv"
- "fractura toracolombara in context traumatic, fara deficit neurologic obiectiv mentionat in scenariul educational"
- "parcurs terapeutic deja stabilit de specialist"

Do not use real patient data, real hospital records, or identifiable clinical details.

## Safety Requirements

Every page must include a visible Romanian boundary statement:

"Simulator educational. Nu stabileste diagnostic, tratament, exercitii sau autorizare pentru progres. Deciziile clinice raman la echipa medicala."

Red flags must be prominent and phrased as reasons to contact the medical team:

- slabiciune nou aparuta
- amorteala sau parestezii noi
- durere radiculara severa nou aparuta
- deteriorarea mersului
- modificari urinare sau intestinale
- anestezie perineala
- durere severa progresiva
- deteriorari functionale repetate

## Deterministic Logic

The app may use deterministic educational logic such as:

- selected domain controls the displayed explanation
- checked fictional symptoms populate a communication summary
- red-flag selections show "contactati echipa medicala" messaging
- work and sport selections produce separate discussion prompts

The app must not produce:

- readiness scores
- return-to-sport approval
- medical recommendations
- risk stratification that appears diagnostic
- dynamic advice that implies clinical judgment

## Implementation Plan

### Phase 1: Project Foundation

- Choose the simplest web stack already present in the repository, or create a minimal static/Vite app if no app exists.
- Establish Romanian copy constants for safety boundaries, red flags, domains, and demo personas.
- Create a layout that keeps the safety boundary visible on every route or major view.

### Phase 2: Core Demo Interface

- Build the main dashboard with:
  - product title and educational positioning
  - visible safety boundary
  - five-domain educational framework
  - conceptual model visualization
  - fictional patient scenario
  - red-flag communication panel
  - work/activity/sport discussion separation

### Phase 3: Guided Simulator

- Add deterministic interactions:
  - select one of five educational domains
  - mark fictional observations for journaling
  - select whether a red flag appears in the fictional scenario
  - generate a non-clinical "intrebari pentru echipa medicala" summary

### Phase 4: Demo Polish

- Tune visual hierarchy for projector and laptop use.
- Add responsive layout for desktop and tablet.
- Add subtle motion only where it clarifies transitions.
- Verify that no text implies medical authorization.

### Phase 5: Reliability

- Add smoke tests or simple build checks.
- Run available build/tests.
- Review all Romanian UI text against the safety boundary list.
- Update `docs/build_log.md` after implementation milestones.

## Acceptance Criteria

- The app is entirely in Romanian for user-facing text.
- Safety boundary text is visible on every page.
- No clinical authorization language appears.
- All patient data is fictional.
- The five educational domains are represented clearly.
- The conceptual model is visible and understandable to a non-technical audience.
- Red flags are visible and prompt medical contact language.
- Work, activity, and sport are treated as separate discussions.
- The demo can be run reliably for a live presentation.

