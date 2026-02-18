# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
bun run dev          # Start Vite dev server (localhost:5173)
bun run build        # Type check (tsc -b) + production build
bun run lint         # ESLint
bunx tsc --noEmit    # Type check only (no build output)
```

Package manager is **bun** — use `bunx` instead of `npx`.

## Architecture

Duolingo-style Thai language learning app. React 19 + TypeScript 5.9 + Vite 7. No routing library, no state management library, no testing framework.

### Screen flow (state machine in App.tsx)

```
HomeScreen → LessonIntro → LessonQuiz → LessonComplete → HomeScreen
```

`App.tsx` manages screen state as a discriminated union (`Screen` type) and progress via localStorage.

### Data layer (`src/data/`)

Raw character data (`consonants.ts`, `vowels.ts`) is never modified directly. Lesson definitions wrap raw data into `LearnableCharacter` objects organized into `LessonDefinition` arrays.

Four lesson tracks exist, each unlocking independently:
- **Consonants** (`c1`–`c9`): individual consonant recognition
- **Vowels** (`v1`–`v7`): vowel recognition
- **Classes** (`cls1`–`cls3`): consonant class identification (mid/high/low)
- **Finals** (`fs1`–`fs6`): final consonant sounds (-k/-t/-p/-n/-m/-ng)

Each track has its own quiz generator (`quiz-generator.ts`, `class-quiz-generator.ts`, `final-quiz-generator.ts`). The `track` field on `LessonDefinition` determines which generator `LessonQuiz.tsx` uses.

### Quiz system

`QuizQuestion` is a discriminated union (field: `kind`). Five question types:
- `multiple-choice` / `pick-character` / `match-pairs` — used by consonant & vowel tracks
- `class-sort` — 3-button class identification (classes track)
- `final-sound` — 6-button ending sound selection (finals track)

Quiz components live in `src/components/quiz-types/`. All follow the same pattern: receive a question prop + `onAnswer(correct: boolean)` callback, 800ms delay after selection.

### Progress (`src/lib/storage.ts`)

localStorage key: `learn-thai-lessons`. Data shape: `Record<lessonId, { completed, stars, bestScore }>`.

Unlock logic: first lesson per track always unlocked; subsequent lessons require previous lesson in same track (filtered by `type` + `track`) to be completed. Stars: ≥90% = 3, ≥70% = 2, else 1.

### Styling

All styles in `App.css` (no CSS modules, no Tailwind). Mobile-first, max-width 480px centered layout. Primary color: `#6c63ff`.

## TypeScript

Strict mode enabled. `noUnusedLocals` and `noUnusedParameters` are enforced in `tsc -b` builds (tsconfig.app.json). `bunx tsc --noEmit` uses the base tsconfig which is more lenient.
