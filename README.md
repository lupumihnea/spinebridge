# SpineBridge Live

SpineBridge Live is a high-impact Romanian educational demo app for an academic framework about functional recovery communication after traumatic lumbar or thoracolumbar fractures without spinal cord injury or objective neurological deficit.

The application is a polished Next.js TypeScript demo with Romanian UI, fictional seeded patient profiles, visible safety boundaries, localStorage-only demo state, and a printable consultation brief.

## Core Boundary

SpineBridge Live is not a medical diagnosis app, treatment app, exercise prescription app, or return-to-sport clearance app. It is an educational and communication-support simulator.

Required visible Romanian boundary for future UI:

> Simulator educational. Nu stabileste diagnostic, tratament, exercitii sau autorizare pentru progres. Deciziile clinice raman la echipa medicala.

## Repository Structure

```text
.
|-- AGENTS.md
|-- README.md
|-- docs/
|   |-- build_log.md
|   |-- demo_script.md
|   |-- evaluation_rubric.md
|   |-- product_spec.md
|   |-- repository_plan.md
|   `-- safety_boundaries.md
|-- src/
|   |-- app/
|   |-- components/
|   |-- data/
|   |-- lib/
|   |-- styles/
|   |-- tests/
|   `-- types/
|-- package.json
|-- tailwind.config.ts
|-- tsconfig.json
`-- vitest.config.ts
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
- Application shell: complete
- Build/test pipeline: complete
- GitHub remote: `lupumihnea/spinebridge`

## Local Development

```bash
npm install
npm run dev
npm test
npm run build
```

The local demo runs at `http://127.0.0.1:3000` when started with the current dev command.

## Next Implementation Step

Expand the guided simulator interactions while preserving deterministic logic, Romanian UI, fictional data, and visible safety boundaries.

## License

MIT.
