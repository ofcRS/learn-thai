import type {
  LearnableCharacter,
  LessonDefinition,
  QuizQuestion,
  MultipleChoiceQuestion,
  PickCharacterQuestion,
  MatchPairsQuestion,
} from "./types";
import { allLessons } from "./lessons";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickRandom<T>(arr: T[], count: number, exclude?: T[]): T[] {
  const pool = exclude ? arr.filter((x) => !exclude.includes(x)) : [...arr];
  return shuffle(pool).slice(0, count);
}

// Get all characters of the same type for distractor selection
// Exclude class/final lessons whose "sound" field is a class name or final sound, not a phoneme
function getDistractorPool(char: LearnableCharacter): LearnableCharacter[] {
  return allLessons
    .filter((l) => l.type === char.type && !l.track)
    .flatMap((l) => l.characters)
    .filter((c) => c.id !== char.id);
}

// Get distractors with different sounds (better quiz questions)
function getSoundDistractors(
  char: LearnableCharacter,
  count: number,
): LearnableCharacter[] {
  const pool = getDistractorPool(char);
  const differentSound = pool.filter((c) => c.sound !== char.sound);
  const selected = pickRandom(differentSound, count);
  // If not enough with different sounds, fill from full pool
  if (selected.length < count) {
    const remaining = pool.filter(
      (c) => !selected.includes(c) && c.id !== char.id,
    );
    selected.push(...pickRandom(remaining, count - selected.length));
  }
  return selected;
}

function makeMultipleChoice(char: LearnableCharacter): MultipleChoiceQuestion {
  const distractors = getSoundDistractors(char, 3);
  const options = shuffle([char, ...distractors]);
  const correctIndex = options.findIndex((o) => o.id === char.id);

  return {
    kind: "multiple-choice",
    prompt: "What sound does this character make?",
    displayChar: char.thai,
    audioUrl: char.audioUrl,
    options: options.map((o) => o.sound),
    correctIndex,
  };
}

function makePickCharacter(char: LearnableCharacter): PickCharacterQuestion {
  const distractors = getSoundDistractors(char, 3);
  const options = shuffle([char, ...distractors]);
  const correctIndex = options.findIndex((o) => o.id === char.id);

  return {
    kind: "pick-character",
    prompt: `Which character makes the "${char.sound}" sound?`,
    displaySound: char.soundHint,
    audioUrl: char.audioUrl,
    options: options.map((o) => o.thai),
    correctIndex,
  };
}

function makeMatchPairs(chars: LearnableCharacter[]): MatchPairsQuestion {
  const selected = shuffle(chars).slice(0, 3);
  const shuffledSounds = shuffle([...selected.map((_, i) => i)]);

  const correctPairs: [number, number][] = selected.map((_, charIdx) => {
    const soundIdx = shuffledSounds.indexOf(charIdx);
    return [charIdx, soundIdx];
  });

  return {
    kind: "match-pairs",
    prompt: "Match each character to its sound",
    chars: selected.map((c) => c.thai),
    sounds: shuffledSounds.map((i) => selected[i].sound),
    correctPairs,
  };
}

export function generateQuiz(lesson: LessonDefinition): QuizQuestion[] {
  const chars = lesson.characters;
  const questions: QuizQuestion[] = [];

  // Round 1: Multiple choice for each character
  for (const char of chars) {
    questions.push(makeMultipleChoice(char));
  }

  // Round 2: Pick character for each character
  for (const char of chars) {
    questions.push(makePickCharacter(char));
  }

  // Round 3: Match pairs (use all chars, split into groups of 3)
  if (chars.length >= 3) {
    const shuffled = shuffle(chars);
    for (let i = 0; i + 2 < shuffled.length; i += 3) {
      questions.push(makeMatchPairs(shuffled.slice(i, i + 3)));
    }
    // If there are leftover chars, make one more match with last 3
    if (shuffled.length % 3 !== 0 && shuffled.length > 3) {
      questions.push(makeMatchPairs(shuffled.slice(-3)));
    }
  }

  return questions;
}
