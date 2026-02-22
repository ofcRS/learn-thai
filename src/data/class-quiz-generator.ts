import type {
  LessonDefinition,
  QuizQuestion,
  ClassSortQuestion,
  MultipleChoiceQuestion,
  MatchPairsQuestion,
} from "./types";
import { classLessons } from "./class-lessons";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allClassChars = classLessons.flatMap((l) => l.characters);

export function generateClassQuiz(lesson: LessonDefinition): QuizQuestion[] {
  const chars = lesson.characters;
  const questions: QuizQuestion[] = [];

  // Round 1: ClassSort for each character
  for (const char of chars) {
    const q: ClassSortQuestion = {
      kind: "class-sort",
      prompt: "What class is this consonant?",
      displayChar: char.thai,
      audioUrl: char.audioUrl,
      correctClass: char.sound as "low" | "mid" | "high",
    };
    questions.push(q);
  }

  // Round 2: Multiple choice — "Which of these is a [class] consonant?"
  const targetClass = chars[0].sound; // All chars in a class lesson share the same class
  const distractors = allClassChars.filter((c) => c.sound !== targetClass);
  for (let i = 0; i < Math.min(chars.length, 5); i++) {
    const correct = chars[i];
    const wrongPool = shuffle(distractors).slice(0, 3);
    const options = shuffle([correct, ...wrongPool]);
    const correctIndex = options.findIndex((o) => o.id === correct.id);
    const q: MultipleChoiceQuestion = {
      kind: "multiple-choice",
      prompt: `Which is a ${targetClass} class consonant?`,
      displayChar: "",
      options: options.map((o) => o.thai),
      correctIndex,
    };
    questions.push(q);
  }

  // Round 3: Match pairs (character ↔ class name) — mix with other classes
  if (chars.length >= 3) {
    const otherClasses = allClassChars.filter((c) => c.sound !== targetClass);
    const mixedChars = shuffle([
      ...shuffle(chars).slice(0, 2),
      ...shuffle(otherClasses).slice(0, 1),
    ]);
    const shuffledSounds = shuffle([...mixedChars.map((_, i) => i)]);
    const correctPairs: [number, number][] = mixedChars.map((_, charIdx) => {
      const soundIdx = shuffledSounds.indexOf(charIdx);
      return [charIdx, soundIdx];
    });
    const q: MatchPairsQuestion = {
      kind: "match-pairs",
      prompt: "Match each consonant to its class",
      chars: mixedChars.map((c) => c.thai),
      sounds: shuffledSounds.map((i) => mixedChars[i].sound),
      correctPairs,
    };
    questions.push(q);
  }

  return questions;
}
