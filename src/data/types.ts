// --- Raw data types (used by consonants.ts / vowels.ts) ---

export type ConsonantClass = "low" | "mid" | "high";
export type VowelLength = "short" | "long";

export interface Consonant {
  thai: string;
  rtgs: string;
  thaiName: string;
  nameRomanized: string;
  meaning: string;
  class: ConsonantClass;
  obsolete?: boolean;
}

export interface Vowel {
  thai: string;
  sound: string;
  length: VowelLength;
  exampleSound: string;
}

// --- Learnable types (used by lessons & quiz) ---

export type CharacterType = "consonant" | "vowel";

export interface LearnableCharacter {
  id: string;
  thai: string;
  sound: string;
  soundHint: string;
  memoryAid: string;
  type: CharacterType;
  audioUrl?: string;
}

export interface LessonDefinition {
  id: string;
  title: string;
  subtitle: string;
  type: CharacterType;
  track?: string;
  order: number;
  characters: LearnableCharacter[];
}

// --- Quiz types ---

export interface MultipleChoiceQuestion {
  kind: "multiple-choice";
  prompt: string;
  displayChar: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
}

export interface PickCharacterQuestion {
  kind: "pick-character";
  prompt: string;
  displaySound: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
}

export interface MatchPairsQuestion {
  kind: "match-pairs";
  prompt: string;
  chars: string[];
  sounds: string[];
  correctPairs: [number, number][];
}

export interface ClassSortQuestion {
  kind: "class-sort";
  prompt: string;
  displayChar: string;
  audioUrl?: string;
  correctClass: ConsonantClass;
}

export interface FinalSoundQuestion {
  kind: "final-sound";
  prompt: string;
  displayChar: string;
  audioUrl?: string;
  options: string[];
  correctIndex: number;
}

export type QuizQuestion =
  | MultipleChoiceQuestion
  | PickCharacterQuestion
  | MatchPairsQuestion
  | ClassSortQuestion
  | FinalSoundQuestion;

// --- Progress ---

export interface LessonProgress {
  completed: boolean;
  stars: number;
  bestScore: number;
}

export type ProgressData = Record<string, LessonProgress>;
