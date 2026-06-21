# Roadmap

## Phase 0: Project Identity

- Confirm project name and character nickname.
- Keep IP guidelines visible in the README.
- Decide license split for code and assets.
- Create initial concept mockup.

## Phase 1: Static Toy Shell

- Build single-page HTML layout.
- Draw paper-roll body with CSS.
- Add handle, LCD eye wells, status screen, and three buttons.
- Make mobile-first vertical layout.

## Phase 2: Toy State Machine

- Implement `SLEEP`, `BOOT`, `IDLE`, `GAME`, and `SCORE`.
- Add keyboard and touch input.
- Add eye expression system.
- Add LCD status messages.

## Phase 3: LCD Game

- Implement symbol spawning.
- Implement button matching.
- Add score, combo, miss count, and timer.
- Add difficulty ramp.

## Phase 4: Polish

- Add Web Audio beeps.
- Add LCD ghosting and scan-line effects.
- Add button press depth.
- Add subtle handle/body animation.
- Add accessibility labels and reduced-motion mode.

## Phase 5: Release

- Publish GitHub Pages demo.
- Add screenshots generated from original project assets.
- Add contribution guide.
- Tag v0.1.0.

## Technical Direction

Start with no framework:

- `index.html`
- `src/styles.css`
- `src/main.js`

This keeps the project easy to fork, remix, and publish through GitHub Pages.
