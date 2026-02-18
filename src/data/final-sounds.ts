import type { LearnableCharacter, LessonDefinition } from "./types";
import { consonants } from "./consonants";

interface FinalSoundGroup {
  sound: string;
  label: string;
  hint: string;
  thaiChars: string[];
}

const finalSoundGroups: FinalSoundGroup[] = [
  {
    sound: "-k",
    label: "Ending -k",
    hint: "Stops abruptly with a 'k' sound",
    thaiChars: ["ก", "ข", "ค", "ฆ"],
  },
  {
    sound: "-t",
    label: "Ending -t",
    hint: "Stops abruptly with a 't' sound",
    thaiChars: ["จ", "ฉ", "ช", "ซ", "ฌ", "ญ", "ฎ", "ฏ", "ฐ", "ฑ", "ฒ", "ด", "ต", "ถ", "ท", "ธ", "ศ", "ษ", "ส"],
  },
  {
    sound: "-p",
    label: "Ending -p",
    hint: "Stops abruptly with a 'p' sound (lips close)",
    thaiChars: ["บ", "ป", "พ", "ฟ", "ภ"],
  },
  {
    sound: "-n",
    label: "Ending -n",
    hint: "Rings out with an 'n' sound (tongue touches roof)",
    thaiChars: ["น", "ณ", "ร", "ล", "ฬ"],
  },
  {
    sound: "-m",
    label: "Ending -m",
    hint: "Rings out with an 'm' sound (lips close gently)",
    thaiChars: ["ม"],
  },
  {
    sound: "-ng",
    label: "Ending -ng",
    hint: "Rings out with an 'ng' sound (nasal, open mouth)",
    thaiChars: ["ง"],
  },
];

const consonantMap = new Map(consonants.filter((c) => !c.obsolete).map((c) => [c.thai, c]));

function buildCharacters(group: FinalSoundGroup): LearnableCharacter[] {
  const result: LearnableCharacter[] = [];
  for (const thai of group.thaiChars) {
    const raw = consonantMap.get(thai);
    if (!raw) continue;
    result.push({
      id: `fs-${thai}`,
      thai,
      sound: group.sound,
      soundHint: `At the end of a syllable, ${thai} sounds like '${group.sound.slice(1)}'`,
      memoryAid: `${raw.thaiName} — initial: ${raw.rtgs}, final: ${group.sound}`,
      type: "consonant",
    });
  }
  return result;
}

export const finalSoundLessons: LessonDefinition[] = finalSoundGroups.map((group, i) => ({
  id: `fs${i + 1}`,
  title: group.label,
  subtitle: `${group.thaiChars.length} consonant${group.thaiChars.length === 1 ? "" : "s"} — ${group.hint.toLowerCase()}`,
  type: "consonant" as const,
  track: "finals",
  order: i + 1,
  characters: buildCharacters(group),
}));

export const allFinalSounds = finalSoundGroups.map((g) => g.sound);
