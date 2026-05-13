# SpineBridge Live Demo Checklist

## Setup Steps

1. Open the project folder:

```powershell
cd X:\spinebridge
```

2. Confirm dependencies are installed:

```powershell
npm install
```

3. Run the quality gate, tests, and production build:

```powershell
npm run demo:check
npm test
npm run build
```

4. Start the production server:

```powershell
npm start -- --hostname 127.0.0.1 --port 3000
```

5. Open the demo:

```text
http://127.0.0.1:3000/jury
```

6. Prepare backup tabs before the presentation:

```text
http://127.0.0.1:3000/
http://127.0.0.1:3000/journal
http://127.0.0.1:3000/teach-back
http://127.0.0.1:3000/work-vs-sport
http://127.0.0.1:3000/brief
http://127.0.0.1:3000/about
```

## Commands Before Presentation

Run these in order on the presentation machine:

```powershell
cd X:\spinebridge
npm run demo:check
npm test
npm run build
npm start -- --hostname 127.0.0.1 --port 3000
```

Expected results:

- `npm run demo:check` shows `Score: 100/100`.
- `npm test` passes all tests.
- `npm run build` completes successfully.
- `npm start` shows the local URL.

If time is short, the minimum required command is:

```powershell
npm run demo:check
```

## Exact 7-Minute Script

### 0:00-0:35 - Opening

Click: open `/jury`, step 1.

Say:

“SpineBridge Live is an educational digital health prototype for young active adults after traumatic lumbar or thoracolumbar fracture, without spinal cord injury or objective neurological deficit. The goal is not to replace clinical decision-making, but to make patient understanding, self-monitoring, and clinical communication clearer.”

Do not say:

- “The app evaluates recovery.”
- “The app decides when the patient can progress.”
- “The patient is cleared.”

### 0:35-1:15 - Five Educational Domains

Click: `Next` to step 2.

Say:

“The academic framework is organized into five educational domains: orientation to the injury and pathway, autonomy and daily activity, walking and endurance, work versus sport, and self-management with red flags. These are education domains, not treatment stages.”

Point to:

- The five cards.
- The visible safety boundary.

Do not say:

- “This is a protocol.”
- “These are universal recovery stages.”

### 1:15-1:55 - Fictional Patient

Click: `Next` to step 3.

Say:

“The demo uses fictional patients only. Radu is the memorable case: he feels no pain at rest and assumes that means he can go back to the gym. The app treats that as an educational misconception, not as a clinical conclusion.”

Point to:

- Patient name.
- “no pain = safe” misconception.

Do not say:

- “The app knows he is unsafe.”
- “The app blocks him medically.”

### 1:55-2:35 - Journal

Click: `Next` to step 4.

Say:

“The journal captures simple patient-reported observations: pain before and after activity, walking tolerance, sitting tolerance, fatigue, and notes. These data are used to prepare a conversation. They do not authorize progression.”

Point to:

- Metrics.
- Journal note.

Do not say:

- “The chart proves improvement.”
- “The trend means he can progress.”

### 2:35-3:20 - Red Flag Moment

Click: `Next` to step 5, then click `Selectează amorțeală nouă`.

Say:

“This is the safety moment. A new sensory symptom is selected, and the app changes tone immediately. It does not diagnose the cause and does not prescribe a response. It tells the patient that the signal must be communicated promptly to the medical team.”

Point to:

- Red safety panel.
- “Semn de alarmă selectat.”
- Medical communication language.

Do not say:

- “The app detects a neurological deficit.”
- “The app triages severity.”
- “The app tells the patient what treatment to do.”

### 3:20-4:05 - Teach-Back

Click: `Next` to step 6.

Say:

“Teach-back makes patient understanding visible. The patient writes: ‘If it does not hurt, I can go to the gym.’ The app flags the wording as potentially risky and suggests a safer formulation for discussion with the clinician.”

Point to:

- Patient input.
- Safer rephrasing.
- Clarity score boundary.

Do not say:

- “The app gives advice.”
- “The app decides that gym is forbidden.”
- “The score is clinically validated.”

### 4:05-4:50 - Work Versus Sport

Click: `Next` to step 7.

Say:

“Return to work and return to sport are deliberately separated. Sitting, driving, carrying, impact, loading, and performance demands are different conversations. The app prevents a simple transfer from one tolerated activity to another.”

Point to:

- Activities.
- Work column.
- Sport/gym column.

Do not say:

- “If work is okay, sport is okay.”
- “The app approves return to work.”
- “The app approves return to sport.”

### 4:50-5:35 - Consultation Brief

Click: `Next` to step 8.

Say:

“The practical output is a consultation brief. It gathers the fictional profile, journal observations, red flags, teach-back issues, and work/sport questions. It is designed to improve the next conversation, not to replace it.”

Point to:

- Brief sections.
- Safety statement.

Do not say:

- “This is a medical report.”
- “This is a treatment plan.”
- “This can be used as clearance.”

### 5:35-6:20 - Validation Roadmap

Click: `Next` to step 9.

Say:

“The project is intentionally careful about evidence. The roadmap includes Delphi consensus, qualitative patient work, feasibility testing, prospective cohort work, and future pragmatic or randomized validation. The current app is a prototype, not a validated clinical tool.”

Point to:

- Research maturity ladder.
- Future validation language.

Do not say:

- “This is clinically validated.”
- “This proves improved outcomes.”

### 6:20-7:00 - Closing

Click: `Next` to step 10.

Say:

“The central idea is simple: understanding, self-monitoring, and better communication. The clinician remains the decision-maker. SpineBridge Live is educational, transparent, and bounded by safety.”

Close with:

“The app does not authorize diagnosis, treatment, return to work, return to sport, or progression. It helps the patient ask better questions.”

## What To Click

Final live click path:

1. Open `http://127.0.0.1:3000/`.
2. Click `Deschide Jury Mode`.
3. On `/jury`, click `Next` through:
   - `1 / Problemă`
   - `2 / Framework`
   - `3 / Pacient fictiv`
   - `4 / Jurnal`
4. On `5 / Semnal de alarmă`, click `Selectează amorțeală nouă`.
5. Pause for 5 seconds on the red panel and point to:
   - `Semn de alarmă selectat`
   - `Nu concluzie clinică`
   - `Nu conduită`
   - `Nu progresie`
6. Click `Next` through:
   - `6 / Teach-back`
   - `7 / Activități`
   - `8 / Brief`
   - `9 / Maturitate științifică`
   - `10 / Closing`
7. If the jury asks for the full product screens, open:
   - `/journal` for the full patient journal.
   - `/teach-back` for the teach-back analyzer.
   - `/work-vs-sport` for the activity selector.
   - `/brief` for printable consultation brief.
   - `/about` for academic rationale.

Direct backup path if the landing page is skipped:

1. Open `http://127.0.0.1:3000/jury`.
2. Follow steps 3-7 above.

Keyboard controls in Jury Mode:

- `ArrowRight`: next step.
- `ArrowLeft`: previous step.
- `R`: reset.
- `N`: presenter notes.

## What To Say

Use these phrases often:

- “educational prototype”
- “fictional patient”
- “supports understanding”
- “supports self-monitoring”
- “prepares clinical conversation”
- “does not diagnose”
- “does not prescribe”
- “does not authorize progression”
- “clinician remains the decision-maker”
- “future validation is required”

Strong safety phrasing:

“A red flag is not interpreted by the app. It is surfaced as information that should be communicated promptly to the medical team.”

Academic positioning:

“The app operationalizes the paper’s educational rationale in a bounded digital interface.”

## What Not To Say

Avoid these phrases completely:

- “diagnoses”
- “treats”
- “recommends treatment”
- “prescribes exercises”
- “clears the patient”
- “approves return to work”
- “approves return to sport”
- “safe to progress”
- “the app detects neurological deficit”
- “validated clinical outcome”
- “personalized medical advice”

Safer replacements:

- Instead of “the app detects”, say “the user selects”.
- Instead of “the app decides”, say “the app organizes information”.
- Instead of “safe to return”, say “a topic to discuss with the clinician”.
- Instead of “recommendation”, say “educational prompt” or “consultation question”.
- Instead of “treatment plan”, say “conversation brief”.

## Backup Plan If PDF Printing Fails

1. Stay calm and do not troubleshoot live for more than 15 seconds.
2. Say:

“The brief is designed to be printable, but for the live demo I will show the structured output directly on screen.”

3. Keep the `/brief` page open and scroll through the sections:

- Profil fictiv pacient
- Context clinic deja stabilit de specialist
- Restricții comunicate
- Obiective funcționale
- Jurnal simptome și activitate
- Semne de alarmă bifate
- Neclarități identificate prin teach-back
- Întrebări pentru clinician
- Ce nu decide aplicația

4. If the browser print dialog does not open:

```text
Use the on-screen brief as the backup artifact.
```

5. If a static artifact is needed, use a screenshot of the visible brief page instead of claiming a generated medical document.

Safe line:

“The important product behavior is the structure and safety boundary of the brief, not the PDF export itself.”
