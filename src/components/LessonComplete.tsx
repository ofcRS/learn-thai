import type { LessonDefinition } from "../data/types";

interface LessonCompleteProps {
  lesson: LessonDefinition;
  score: number;
  onRetry: () => void;
  onContinue: () => void;
}

export function LessonComplete({
  lesson,
  score,
  onRetry,
  onContinue,
}: LessonCompleteProps) {
  const stars = score >= 90 ? 3 : score >= 70 ? 2 : 1;

  const messages = [
    "Keep practicing!",
    "Good job!",
    "Great work!",
    "Perfect!",
  ];
  const message = score === 100 ? messages[3] : messages[stars];

  return (
    <div className="lesson-complete">
      <div className="complete-card">
        <h2>Lesson Complete!</h2>
        <p className="complete-lesson-name">{lesson.title}</p>

        <div className="complete-stars">
          {[1, 2, 3].map((n) => (
            <span key={n} className={`star ${n <= stars ? "filled" : ""}`}>
              ★
            </span>
          ))}
        </div>

        <p className="complete-score">{score}%</p>
        <p className="complete-message">{message}</p>
      </div>

      <div className="complete-actions">
        <button className="btn btn-secondary" onClick={onRetry}>
          Try Again
        </button>
        <button className="btn btn-primary" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  );
}
