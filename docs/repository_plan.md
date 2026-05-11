# Repository Plan

## Purpose

This repository should stay focused on SpineBridge Live only. It should not include unrelated personal files from the parent Documents folder.

## Recommended Growth Path

1. Keep the current documentation as the source of truth.
2. Add a minimal app scaffold when implementation starts.
3. Keep Romanian UI copy in a single structured place.
4. Add deterministic interaction tests once the first dashboard exists.
5. Add visual verification screenshots before any live presentation milestone.

## Future App Layout

Recommended once implementation begins:

```text
src/
├── app/
├── components/
├── content/
├── data/
├── styles/
└── tests/
```

Suggested responsibilities:

- `src/content/`: Romanian UI copy, safety text, red flags, domain labels
- `src/data/`: fictional demo cases only
- `src/components/`: reusable presentation components
- `src/app/`: route or view composition
- `src/styles/`: visual system and responsive layout
- `src/tests/`: deterministic checks for forbidden language and visible safety copy

## GitHub Recommendation

Recommended repository name: `spinebridge-live`

Recommended description:

Romanian educational demo simulator for communicating staged functional recovery concepts after traumatic lumbar or thoracolumbar fractures.

Recommended visibility:

- Private during early development
- Public only after safety copy, demo data, and licensing are reviewed
