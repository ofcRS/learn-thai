import type { LessonProgress, ProgressData } from "../data/types";

const STORAGE_KEY = "learn-thai-lessons";

export function loadProgress(): ProgressData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as ProgressData;
  } catch {
    return {};
  }
}

export function saveProgress(progress: ProgressData): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function resetProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function completeLessonProgress(
  progress: ProgressData,
  lessonId: string,
  score: number,
): ProgressData {
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;
  const existing = progress[lessonId];

  return {
    ...progress,
    [lessonId]: {
      completed: true,
      stars: existing ? Math.max(existing.stars, stars) : stars,
      bestScore: existing ? Math.max(existing.bestScore, score) : score,
    },
  };
}

export function isLessonUnlocked(
  progress: ProgressData,
  lessonId: string,
  lessonOrder: number,
  lessonType: "consonant" | "vowel",
  allLessons: { id: string; order: number; type: "consonant" | "vowel"; track?: string }[],
  track?: string,
): boolean {
  // First lesson of each type/track is always unlocked
  if (lessonOrder === 1) return true;

  // Find the previous lesson in the same category (type + track)
  const sameCategoryLessons = allLessons
    .filter((l) => l.type === lessonType && (l.track ?? undefined) === track)
    .sort((a, b) => a.order - b.order);

  const currentIndex = sameCategoryLessons.findIndex(
    (l) => l.id === lessonId,
  );
  if (currentIndex <= 0) return true;

  const prevLesson = sameCategoryLessons[currentIndex - 1];
  return progress[prevLesson.id]?.completed ?? false;
}

export function getLessonProgress(
  progress: ProgressData,
  lessonId: string,
): LessonProgress | undefined {
  return progress[lessonId];
}
