import type { LearnableCharacter, LessonDefinition } from "./types";
import { consonantAudio, vowelAudio } from "./audio-urls";
import { classLessons } from "./class-lessons";
import { finalSoundLessons } from "./final-sounds";

// Helper to create consonant characters
function con(
  id: string,
  thai: string,
  sound: string,
  soundHint: string,
  memoryAid: string,
): LearnableCharacter {
  return { id, thai, sound, soundHint, memoryAid, type: "consonant", audioUrl: consonantAudio[thai] };
}

// Helper to create vowel characters
function vow(
  id: string,
  thai: string,
  sound: string,
  soundHint: string,
  memoryAid: string,
): LearnableCharacter {
  return { id, thai, sound, soundHint, memoryAid, type: "vowel", audioUrl: vowelAudio[id] };
}

// ─── CONSONANT LESSONS ──────────────────────────────────────

export const consonantLessons: LessonDefinition[] = [
  {
    id: "c1",
    title: "Easy Starts",
    subtitle: "5 common consonants with familiar sounds",
    type: "consonant",
    order: 1,
    characters: [
      con("c-ก", "ก", "k", "Like 'k' in 'sky' (no puff of air)", "ก is for ไก่ (kai) — chicken"),
      con("c-จ", "จ", "ch", "Between 'j' and 'ch' — softer than 'church'", "จ is for จาน (chan) — plate"),
      con("c-ด", "ด", "d", "Like 'd' in 'dog'", "ด is for เด็ก (dek) — child"),
      con("c-ต", "ต", "t", "Like 't' in 'stop' (no puff of air)", "ต is for เต่า (tao) — turtle"),
      con("c-บ", "บ", "b", "Like 'b' in 'bat'", "บ is for ใบไม้ (bai-mai) — leaf"),
    ],
  },
  {
    id: "c2",
    title: "Familiar Faces",
    subtitle: "More everyday sounds you already know",
    type: "consonant",
    order: 2,
    characters: [
      con("c-ป", "ป", "p", "Like 'p' in 'spot' (no puff of air)", "ป is for ปลา (pla) — fish"),
      con("c-อ", "อ", "o", "Like 'o' in 'oh'", "อ is for อ่าง (ang) — basin"),
      con("c-ง", "ง", "ng", "Like 'ng' in 'sing'", "ง is for งู (ngu) — snake"),
      con("c-น", "น", "n", "Like 'n' in 'nice'", "น is for หนู (nu) — mouse"),
      con("c-ม", "ม", "m", "Like 'm' in 'mom'", "ม is for ม้า (ma) — horse"),
    ],
  },
  {
    id: "c3",
    title: "The K-Family",
    subtitle: "Three characters that all sound like 'kh'",
    type: "consonant",
    order: 3,
    characters: [
      con("c-ข", "ข", "kh", "Like 'k' in 'king' (with a puff of air)", "ข is for ไข่ (khai) — egg"),
      con("c-ค", "ค", "kh", "Like 'k' in 'king' (with a puff of air)", "ค is for ควาย (khwai) — buffalo"),
      con("c-ฆ", "ฆ", "kh", "Like 'k' in 'king' (with a puff of air)", "ฆ is for ระฆัง (ra-khang) — bell"),
    ],
  },
  {
    id: "c4",
    title: "Daily Sounds",
    subtitle: "Common consonants you'll use every day",
    type: "consonant",
    order: 4,
    characters: [
      con("c-ช", "ช", "ch", "Like 'ch' in 'chair'", "ช is for ช้าง (chang) — elephant"),
      con("c-ซ", "ซ", "s", "Like 's' in 'sun'", "ซ is for โซ่ (so) — chain"),
      con("c-ย", "ย", "y", "Like 'y' in 'yes'", "ย is for ยักษ์ (yak) — giant"),
      con("c-ร", "ร", "r", "Like 'r' in 'run'", "ร is for เรือ (ruea) — boat"),
      con("c-ล", "ล", "l", "Like 'l' in 'love'", "ล is for ลิง (ling) — monkey"),
    ],
  },
  {
    id: "c5",
    title: "The T-Family",
    subtitle: "Four characters that all sound like 'th'",
    type: "consonant",
    order: 5,
    characters: [
      con("c-ท", "ท", "th", "Like 't' in 'top' (with a puff of air)", "ท is for ทหาร (tha-han) — soldier"),
      con("c-ธ", "ธ", "th", "Like 't' in 'top' (with a puff of air)", "ธ is for ธง (thong) — flag"),
      con("c-ถ", "ถ", "th", "Like 't' in 'top' (with a puff of air)", "ถ is for ถุง (thung) — bag"),
      con("c-ฐ", "ฐ", "th", "Like 't' in 'top' (with a puff of air)", "ฐ is for ฐาน (than) — pedestal"),
    ],
  },
  {
    id: "c6",
    title: "P and F",
    subtitle: "The 'ph' and 'f' sound family",
    type: "consonant",
    order: 6,
    characters: [
      con("c-พ", "พ", "ph", "Like 'p' in 'put' (with a puff of air)", "พ is for พาน (phan) — tray"),
      con("c-ภ", "ภ", "ph", "Like 'p' in 'put' (with a puff of air)", "ภ is for สำเภา (sam-phao) — sailboat"),
      con("c-ผ", "ผ", "ph", "Like 'p' in 'put' (with a puff of air)", "ผ is for ผึ้ง (phueng) — bee"),
      con("c-ฝ", "ฝ", "f", "Like 'f' in 'fun'", "ฝ is for ฝา (fa) — lid"),
      con("c-ฟ", "ฟ", "f", "Like 'f' in 'fun'", "ฟ is for ฟัน (fan) — teeth"),
    ],
  },
  {
    id: "c7",
    title: "S and H",
    subtitle: "Sibilants and aspirates",
    type: "consonant",
    order: 7,
    characters: [
      con("c-ศ", "ศ", "s", "Like 's' in 'sun'", "ศ is for ศาลา (sala) — pavilion"),
      con("c-ษ", "ษ", "s", "Like 's' in 'sun'", "ษ is for ฤๅษี (rue-si) — hermit"),
      con("c-ส", "ส", "s", "Like 's' in 'sun'", "ส is for เสือ (suea) — tiger"),
      con("c-ห", "ห", "h", "Like 'h' in 'hat'", "ห is for หีบ (hip) — chest"),
      con("c-ฮ", "ฮ", "h", "Like 'h' in 'hat'", "ฮ is for นกฮูก (nok-huk) — owl"),
    ],
  },
  {
    id: "c8",
    title: "Rare Characters",
    subtitle: "Less common but still important",
    type: "consonant",
    order: 8,
    characters: [
      con("c-ว", "ว", "w", "Like 'w' in 'win'", "ว is for แหวน (waen) — ring"),
      con("c-ญ", "ญ", "y", "Like 'y' in 'yes'", "ญ is for หญิง (ying) — woman"),
      con("c-ณ", "ณ", "n", "Like 'n' in 'nice'", "ณ is for เณร (nen) — novice monk"),
      con("c-ฎ", "ฎ", "d", "Like 'd' in 'dog'", "ฎ is for ชฎา (cha-da) — headdress"),
      con("c-ฏ", "ฏ", "t", "Like 't' in 'stop' (no puff of air)", "ฏ is for ปฏัก (pa-tak) — goad"),
    ],
  },
  {
    id: "c9",
    title: "The Final Four",
    subtitle: "The last consonants to master",
    type: "consonant",
    order: 9,
    characters: [
      con("c-ฑ", "ฑ", "th", "Like 't' in 'top' (with a puff of air)", "ฑ is for มณโฑ (montho) — a character from legend"),
      con("c-ฒ", "ฒ", "th", "Like 't' in 'top' (with a puff of air)", "ฒ is for ผู้เฒ่า (phu-thao) — elder"),
      con("c-ฌ", "ฌ", "ch", "Like 'ch' in 'chair'", "ฌ is for เฌอ (choe) — tree"),
      con("c-ฬ", "ฬ", "l", "Like 'l' in 'love'", "ฬ is for จุฬา (chu-la) — kite"),
    ],
  },
];

// ─── VOWEL LESSONS ──────────────────────────────────────────

export const vowelLessons: LessonDefinition[] = [
  {
    id: "v1",
    title: "A Sounds",
    subtitle: "Short and long 'a' vowels",
    type: "vowel",
    order: 1,
    characters: [
      vow("v-ะ", "–ะ", "a", "Like 'a' in 'father' (short)", "Short 'a' — quick and snappy"),
      vow("v-า", "–า", "aa", "Like 'a' in 'father' (long)", "Long 'a' — stretch it out"),
      vow("v-ำ", "–ำ", "am", "Like 'um' in 'sum'", "Ends with an 'm' sound"),
      vow("v-ใ", "ใ–", "ai", "Like 'i' in 'Thai'", "The 'ai' sound — think 'Thai!'"),
      vow("v-ไ", "ไ–", "ai", "Like 'i' in 'Thai'", "Another way to write the 'ai' sound"),
    ],
  },
  {
    id: "v2",
    title: "I Sounds",
    subtitle: "Short and long 'i' vowels",
    type: "vowel",
    order: 2,
    characters: [
      vow("v-ิ", "–ิ", "i", "Like 'i' in 'bit' (short)", "Short 'i' — quick"),
      vow("v-ี", "–ี", "ii", "Like 'ee' in 'see' (long)", "Long 'ee' — stretch it out"),
      vow("v-ึ", "–ึ", "ue", "Short 'eu' — no English match", "A unique Thai sound, round your lips"),
      vow("v-ื", "–ื", "uee", "Long 'eu' — no English match", "Like the short version but longer"),
    ],
  },
  {
    id: "v3",
    title: "U Sounds",
    subtitle: "Short and long 'u' vowels",
    type: "vowel",
    order: 3,
    characters: [
      vow("v-ุ", "–ุ", "u", "Like 'oo' in 'look' (short)", "Short 'oo' — quick"),
      vow("v-ู", "–ู", "uu", "Like 'oo' in 'moon' (long)", "Long 'oo' — hold it"),
      vow("v-เา", "เ–า", "ao", "Like 'ow' in 'cow'", "The 'ow' sound"),
    ],
  },
  {
    id: "v4",
    title: "E Sounds",
    subtitle: "The 'e' and 'ae' vowel pairs",
    type: "vowel",
    order: 4,
    characters: [
      vow("v-เะ", "เ–ะ", "e", "Like 'e' in 'bet' (short)", "Short 'e' — quick"),
      vow("v-เ", "เ–", "ee", "Like 'ay' in 'say' (long)", "Long 'ay' — stretch it"),
      vow("v-แะ", "แ–ะ", "ae", "Like 'a' in 'cat' (short)", "Short 'a' as in 'cat'"),
      vow("v-แ", "แ–", "aee", "Like 'a' in 'cat' (long)", "Long version of the 'cat' sound"),
    ],
  },
  {
    id: "v5",
    title: "O Sounds",
    subtitle: "The 'o' and 'or' vowel pairs",
    type: "vowel",
    order: 5,
    characters: [
      vow("v-โะ", "โ–ะ", "o", "Like 'o' in 'go' (short)", "Short 'o' — quick"),
      vow("v-โ", "โ–", "oo", "Like 'o' in 'go' (long)", "Long 'o' — hold it"),
      vow("v-เาะ", "เ–าะ", "or", "Like 'o' in 'not'", "Open 'o' sound — think 'not'"),
      vow("v-อ", "–อ", "oor", "Like 'aw' in 'saw' (long)", "Long 'aw' — hold it"),
    ],
  },
  {
    id: "v6",
    title: "Oe Sounds",
    subtitle: "The 'oe' vowels and diphthongs",
    type: "vowel",
    order: 6,
    characters: [
      vow("v-เอะ", "เ–อะ", "oe", "Like 'u' in 'fur' (short)", "Short version of the 'fur' sound"),
      vow("v-เอ", "เ–อ", "oee", "Like 'u' in 'fur' (long)", "Long version — hold it"),
      vow("v-เียะ", "เ–ียะ", "ia", "Like 'ea' in 'ear' (short)", "Short 'ear' sound"),
      vow("v-เีย", "เ–ีย", "ia", "Like 'ea' in 'ear' (long)", "Long 'ear' sound — hold it"),
    ],
  },
  {
    id: "v7",
    title: "Complex Vowels",
    subtitle: "Diphthongs and special vowels",
    type: "vowel",
    order: 7,
    characters: [
      vow("v-เือะ", "เ–ือะ", "uea", "'eu' + 'a' (short)", "Combine 'eu' and 'a' quickly"),
      vow("v-เือ", "เ–ือ", "uea", "'eu' + 'a' (long)", "Combine 'eu' and 'a' — hold it"),
      vow("v-ัวะ", "–ัวะ", "ua", "Like 'ua' in 'truant' (short)", "Short 'ua' — quick"),
      vow("v-ัว", "–ัว", "ua", "Like 'ua' in 'truant' (long)", "Long 'ua' — hold it"),
      vow("v-ฤ", "ฤ", "rue", "Like 'ri' in 'rit'", "A special Sanskrit vowel"),
      vow("v-ฤๅ", "ฤๅ", "ruee", "Like 'ree' (long)", "Long version of the special vowel"),
    ],
  },
];

export { classLessons, finalSoundLessons };

export const allLessons: LessonDefinition[] = [
  ...consonantLessons,
  ...vowelLessons,
  ...classLessons,
  ...finalSoundLessons,
];
