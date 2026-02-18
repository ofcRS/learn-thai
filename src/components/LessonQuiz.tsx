import { useState, useMemo } from "react";
import type { LessonDefinition } from "../data/types";
import { generateQuiz } from "../data/quiz-generator";
import { generateClassQuiz } from "../data/class-quiz-generator";
import { generateFinalQuiz } from "../data/final-quiz-generator";
import { ProgressBar } from "./ProgressBar";
import { MultipleChoice } from "./quiz-types/MultipleChoice";
import { PickCharacter } from "./quiz-types/PickCharacter";
import { MatchPairs } from "./quiz-types/MatchPairs";
import { ClassSort } from "./quiz-types/ClassSort";
import { FinalSound } from "./quiz-types/FinalSound";

interface LessonQuizProps {
  lesson: LessonDefinition;
  onComplete: (score: number) => void;
  onBack: () => void;
}

export function LessonQuiz({ lesson, onComplete, onBack }: LessonQuizProps) {
  const questions = useMemo(() => {
    if (lesson.track === "classes") return generateClassQuiz(lesson);
    if (lesson.track === "finals") return generateFinalQuiz(lesson);
    return generateQuiz(lesson);
  }, [lesson]);
  const [current, setCurrent] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const question = questions[current];
  const total = questions.length;

  function handleAnswer(correct: boolean) {
    const newCorrect = correct ? correctCount + 1 : correctCount;
    setCorrectCount(newCorrect);

    if (current + 1 >= total) {
      const score = Math.round((newCorrect / total) * 100);
      onComplete(score);
    } else {
      setCurrent(current + 1);
    }
  }

  return (
    <div className="lesson-quiz">
      <div className="quiz-header">
        <button className="back-link" onClick={onBack}>
          ✕
        </button>
        <ProgressBar current={current} total={total} />
      </div>

      {/* Key forces re-mount when question changes, resetting internal state */}
      <div key={current} className="quiz-body">
        {question.kind === "multiple-choice" && (
          <MultipleChoice question={question} onAnswer={handleAnswer} />
        )}
        {question.kind === "pick-character" && (
          <PickCharacter question={question} onAnswer={handleAnswer} />
        )}
        {question.kind === "match-pairs" && (
          <MatchPairs question={question} onAnswer={handleAnswer} />
        )}
        {question.kind === "class-sort" && (
          <ClassSort question={question} onAnswer={handleAnswer} />
        )}
        {question.kind === "final-sound" && (
          <FinalSound question={question} onAnswer={handleAnswer} />
        )}
      </div>
    </div>
  );
}
