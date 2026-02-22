import type {
  LessonDefinition,
  QuizQuestion,
  FinalSoundQuestion,
  MultipleChoiceQuestion,
  MatchPairsQuestion,
} from "./types";
import { finalSoundLessons, allFinalSounds } from "./final-sounds";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const allFinalChars = finalSoundLessons.flatMap((l) => l.characters);

export function generateFinalQuiz(lesson: LessonDefinition): QuizQuestion[] {
  const chars = lesson.characters;
  const questions: QuizQuestion[] = [];

  // Round 1: FinalSound for each character
  for (const char of chars) {
    const correctIndex = allFinalSounds.indexOf(char.sound);
    const q: FinalSoundQuestion = {
      kind: "final-sound",
      prompt: "What sound does this make at the END of a syllable?",
      displayChar: char.thai,
      audioUrl: char.audioUrl,
      options: [...allFinalSounds],
      correctIndex,
    };
    questions.push(q);
  }

  // Round 2: Multiple choice — pick the consonant that makes a given ending sound
  const targetSound = chars[0].sound;
  const distractors = allFinalChars.filter((c) => c.sound !== targetSound);
  for (let i = 0; i < Math.min(chars.length, 5); i++) {
    const correct = chars[i];
    const wrongPool = shuffle(distractors).slice(0, 3);
    const options = shuffle([correct, ...wrongPool]);
    const correctIndex = options.findIndex((o) => o.id === correct.id);
    const q: MultipleChoiceQuestion = {
      kind: "multiple-choice",
      prompt: `Which consonant makes the '${targetSound}' ending sound?`,
      displayChar: "",
      options: options.map((o) => o.thai),
      correctIndex,
    };
    questions.push(q);
  }

  // Round 3: Match pairs (consonant ↔ final sound) — mix from different groups
  if (chars.length >= 2) {
    const otherSounds = allFinalChars.filter((c) => c.sound !== targetSound);
    const fromLesson = shuffle(chars).slice(0, 2);
    const fromOther = shuffle(otherSounds).slice(0, 1);
    const mixedChars = shuffle([...fromLesson, ...fromOther]);
    const shuffledSounds = shuffle([...mixedChars.map((_, i) => i)]);
    const correctPairs: [number, number][] = mixedChars.map((_, charIdx) => {
      const soundIdx = shuffledSounds.indexOf(charIdx);
      return [charIdx, soundIdx];
    });
    const q: MatchPairsQuestion = {
      kind: "match-pairs",
      prompt: "Match each consonant to its final sound",
      chars: mixedChars.map((c) => c.thai),
      sounds: shuffledSounds.map((i) => mixedChars[i].sound),
      correctPairs,
    };
    questions.push(q);
  }

  return questions;
}
