import { useState, useCallback } from "react";
import type { LessonDefinition, ProgressData } from "./data/types";
import {
  loadProgress,
  saveProgress,
  resetProgress,
  completeLessonProgress,
} from "./lib/storage";
import { HomeScreen } from "./components/HomeScreen";
import { LessonIntro } from "./components/LessonIntro";
import { LessonQuiz } from "./components/LessonQuiz";
import { LessonComplete } from "./components/LessonComplete";
import "./App.css";

type Screen =
  | { kind: "home" }
  | { kind: "intro"; lesson: LessonDefinition }
  | { kind: "quiz"; lesson: LessonDefinition }
  | { kind: "complete"; lesson: LessonDefinition; score: number };

export default function App() {
  const [progress, setProgress] = useState<ProgressData>(loadProgress);
  const [screen, setScreen] = useState<Screen>({ kind: "home" });

  const updateProgress = useCallback((newProgress: ProgressData) => {
    setProgress(newProgress);
    saveProgress(newProgress);
  }, []);

  const handleReset = useCallback(() => {
    resetProgress();
    setProgress({});
  }, []);

  function goHome() {
    setScreen({ kind: "home" });
  }

  function startLesson(lesson: LessonDefinition) {
    setScreen({ kind: "intro", lesson });
  }

  function startQuiz(lesson: LessonDefinition) {
    setScreen({ kind: "quiz", lesson });
  }

  function completeQuiz(lesson: LessonDefinition, score: number) {
    const newProgress = completeLessonProgress(progress, lesson.id, score);
    updateProgress(newProgress);
    setScreen({ kind: "complete", lesson, score });
  }

  switch (screen.kind) {
    case "home":
      return (
        <HomeScreen
          progress={progress}
          onSelectLesson={startLesson}
          onReset={handleReset}
        />
      );

    case "intro":
      return (
        <LessonIntro
          lesson={screen.lesson}
          onStartQuiz={() => startQuiz(screen.lesson)}
          onBack={goHome}
        />
      );

    case "quiz":
      return (
        <LessonQuiz
          lesson={screen.lesson}
          onComplete={(score) => completeQuiz(screen.lesson, score)}
          onBack={goHome}
        />
      );

    case "complete":
      return (
        <LessonComplete
          lesson={screen.lesson}
          score={screen.score}
          onRetry={() => startQuiz(screen.lesson)}
          onContinue={goHome}
        />
      );
  }
}
