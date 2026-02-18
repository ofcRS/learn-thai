import { useState } from "react";
import type { LessonDefinition, ProgressData } from "../data/types";
import {
  consonantLessons,
  vowelLessons,
  classLessons,
  finalSoundLessons,
  allLessons,
} from "../data/lessons";
import { isLessonUnlocked } from "../lib/storage";

type Tab = "consonants" | "vowels" | "classes" | "finals";

interface HomeScreenProps {
  progress: ProgressData;
  onSelectLesson: (lesson: LessonDefinition) => void;
  onReset: () => void;
}

export function HomeScreen({
  progress,
  onSelectLesson,
  onReset,
}: HomeScreenProps) {
  const [tab, setTab] = useState<Tab>("consonants");
  const tabLessons: Record<Tab, LessonDefinition[]> = {
    consonants: consonantLessons,
    vowels: vowelLessons,
    classes: classLessons,
    finals: finalSoundLessons,
  };
  const lessons = tabLessons[tab];

  const totalCompleted = Object.values(progress).filter(
    (p) => p.completed,
  ).length;
  const totalLessons = allLessons.length;

  return (
    <div className="home-screen">
      <div className="home-header">
        <h1>Learn Thai</h1>
        <p className="home-subtitle">
          {totalCompleted} / {totalLessons} lessons completed
        </p>
      </div>

      <div className="tab-bar">
        {([
          ["consonants", "Consonants"],
          ["vowels", "Vowels"],
          ["classes", "Classes"],
          ["finals", "Finals"],
        ] as const).map(([key, label]) => (
          <button
            key={key}
            className={`tab-btn ${tab === key ? "active" : ""}`}
            onClick={() => setTab(key)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="lesson-map">
        {lessons.map((lesson) => {
          const unlocked = isLessonUnlocked(
            progress,
            lesson.id,
            lesson.order,
            lesson.type,
            allLessons,
            lesson.track,
          );
          const lessonProgress = progress[lesson.id];
          const completed = lessonProgress?.completed ?? false;
          const stars = lessonProgress?.stars ?? 0;

          return (
            <button
              key={lesson.id}
              className={`lesson-card ${completed ? "completed" : ""} ${!unlocked ? "locked" : ""}`}
              onClick={() => unlocked && onSelectLesson(lesson)}
              disabled={!unlocked}
            >
              <div className="lesson-card-left">
                <span className="lesson-number">{lesson.order}</span>
                <div className="lesson-info">
                  <span className="lesson-title">{lesson.title}</span>
                  <span className="lesson-subtitle">{lesson.subtitle}</span>
                </div>
              </div>
              <div className="lesson-card-right">
                {!unlocked && <span className="lock-icon">🔒</span>}
                {completed && (
                  <span className="stars">{"★".repeat(stars)}{"☆".repeat(3 - stars)}</span>
                )}
                {unlocked && !completed && (
                  <span className="play-icon">▶</span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      {totalCompleted > 0 && (
        <button className="reset-link" onClick={onReset}>
          Reset Progress
        </button>
      )}
    </div>
  );
}
