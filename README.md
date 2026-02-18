# Learn Thai Script

A Duolingo-style Thai script learning app — practice reading consonants, vowels, consonant classes, and final sounds through interactive quizzes.

**Live demo:** https://ofcrs.github.io/learn-thai/

## Features

- **4 learning tracks** covering the full Thai script:
  - Consonants (44 chars across 9 lessons)
  - Vowels (32 chars across 7 lessons)
  - Consonant classes (mid / high / low — 3 lessons)
  - Final sounds (-k / -t / -p / -n / -m / -ng — 6 lessons)
- **26 lessons total**, unlocking progressively within each track
- **5 quiz question types**: multiple choice, pick the character, match pairs, class sort, final sound
- Theory cards before each quiz — learn before you're tested
- Star ratings (1–3) based on score, stored locally in the browser
- Mobile-first layout, works on any screen size

## Tech Stack

- React 19 + TypeScript 5.9
- Vite 7
- No routing library, no state management library — pure React state

## Local Development

```bash
bun install
bun run dev       # dev server at http://localhost:5173
bun run build     # type check + production build
bun run lint      # ESLint
```

Requires [Bun](https://bun.sh/).
