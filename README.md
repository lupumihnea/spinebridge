# SpineBridge Live

SpineBridge Live is a high-impact Romanian educational demo app concept for an academic framework about functional recovery communication after traumatic lumbar or thoracolumbar fractures without spinal cord injury or objective neurological deficit.

This repository currently contains the product documentation, safety boundaries, live demo script, evaluation rubric, and implementation plan. The app itself has not been built yet.

## Core Boundary

SpineBridge Live is not a medical diagnosis app, treatment app, exercise prescription app, or return-to-sport clearance app. It is an educational and communication-support simulator.

Required visible Romanian boundary for future UI:

> Simulator educational. Nu stabileste diagnostic, tratament, exercitii sau autorizare pentru progres. Deciziile clinice raman la echipa medicala.

## Repository Structure

```text
.
├── AGENTS.md
├── README.md
├── docs/
│   ├── build_log.md
│   ├── demo_script.md
│   ├── evaluation_rubric.md
│   ├── product_spec.md
│   ├── repository_plan.md
│   └── safety_boundaries.md
├── .editorconfig
├── .gitattributes
└── .gitignore
```

## Documentation Map

- `docs/product_spec.md`: product scope, target audience, framework summary, and implementation plan
- `docs/safety_boundaries.md`: forbidden claims, forbidden language, red flags, and safety checklist
- `docs/demo_script.md`: live presentation flow and Romanian presenter language
- `docs/evaluation_rubric.md`: 0-100 scoring rubric for demo readiness
- `docs/repository_plan.md`: recommended project growth path
- `docs/build_log.md`: short progress log for future Codex tasks
- `AGENTS.md`: instructions future Codex agents must follow

## Current Status

- Documentation scaffold: complete
- Application code: not started
- Build/test pipeline: not started
- GitHub remote: pending

## Next Implementation Step

Create the app skeleton only after the documentation is accepted. The first implementation should prioritize a deterministic Romanian dashboard with visible safety boundaries on every page.

## License

No license has been selected yet.
