import type { LearnableCharacter, LessonDefinition } from "./types";
import { consonants } from "./consonants";

const classHints: Record<string, string> = {
  mid: "Mid class — gives mid tone by default",
  high: "High class — gives rising tone with mai ek",
  low: "Low class — gives falling tone with mai ek",
};

const activeConsonants = consonants.filter((c) => !c.obsolete);

function toClassCharacter(c: (typeof activeConsonants)[number]): LearnableCharacter {
  return {
    id: `cls-${c.thai}`,
    thai: c.thai,
    sound: c.class,
    soundHint: classHints[c.class],
    memoryAid: `${c.thaiName} — ${c.meaning}`,
    type: "consonant",
  };
}

const midChars = activeConsonants.filter((c) => c.class === "mid").map(toClassCharacter);
const highChars = activeConsonants.filter((c) => c.class === "high").map(toClassCharacter);
const lowChars = activeConsonants.filter((c) => c.class === "low").map(toClassCharacter);

export const classLessons: LessonDefinition[] = [
  {
    id: "cls1",
    title: "Mid Class",
    subtitle: `${midChars.length} unaspirated stops — the foundation`,
    type: "consonant",
    track: "classes",
    order: 1,
    characters: midChars,
  },
  {
    id: "cls2",
    title: "High Class",
    subtitle: `${highChars.length} aspirated consonants`,
    type: "consonant",
    track: "classes",
    order: 2,
    characters: highChars,
  },
  {
    id: "cls3",
    title: "Low Class",
    subtitle: `${lowChars.length} consonants — the largest group`,
    type: "consonant",
    track: "classes",
    order: 3,
    characters: lowChars,
  },
];
