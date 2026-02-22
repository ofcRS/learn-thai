import { useState } from "react";
import type { LessonDefinition } from "../data/types";
import { PlayButton } from "./PlayButton";

interface LessonIntroProps {
  lesson: LessonDefinition;
  onStartQuiz: () => void;
  onBack: () => void;
}

export function LessonIntro({ lesson, onStartQuiz, onBack }: LessonIntroProps) {
  const [index, setIndex] = useState(0);
  const chars = lesson.characters;
  const char = chars[index];
  const isLast = index === chars.length - 1;

  return (
    <div className="lesson-intro">
      <div className="intro-header">
        <button className="back-link" onClick={onBack}>
          ← Back
        </button>
        <span className="intro-counter">
          {index + 1} / {chars.length}
        </span>
      </div>

      <div className="intro-card">
        <div className="intro-audio">
          <div className="intro-thai">{char.thai}</div>
          {char.audioUrl && <PlayButton audioUrl={char.audioUrl} />}
        </div>
        <div className="intro-sound">{char.sound}</div>
        <div className="intro-hint">{char.soundHint}</div>
        <div className="intro-memory">{char.memoryAid}</div>
      </div>

      <div className="intro-nav">
        {index > 0 && (
          <button
            className="btn btn-secondary"
            onClick={() => setIndex(index - 1)}
          >
            Previous
          </button>
        )}
        {!isLast ? (
          <button
            className="btn btn-primary"
            onClick={() => setIndex(index + 1)}
          >
            Next
          </button>
        ) : (
          <button className="btn btn-primary" onClick={onStartQuiz}>
            Start Quiz
          </button>
        )}
      </div>
    </div>
  );
}
