import { useState } from "react";
import type { ClassSortQuestion } from "../../data/types";
import { PlayButton } from "../PlayButton";

interface ClassSortProps {
  question: ClassSortQuestion;
  onAnswer: (correct: boolean) => void;
}

const classButtons = [
  { value: "mid", label: "Mid", className: "class-btn-mid" },
  { value: "high", label: "High", className: "class-btn-high" },
  { value: "low", label: "Low", className: "class-btn-low" },
] as const;

export function ClassSort({ question, onAnswer }: ClassSortProps) {
  const [selected, setSelected] = useState<string | null>(null);
  const answered = selected !== null;

  function handleSelect(value: string) {
    if (answered) return;
    setSelected(value);
    setTimeout(() => {
      onAnswer(value === question.correctClass);
    }, 800);
  }

  return (
    <div className="quiz-question">
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="quiz-char-audio">
        <div className="quiz-display-char">{question.displayChar}</div>
        {question.audioUrl && <PlayButton audioUrl={question.audioUrl} />}
      </div>
      <div className="class-sort-options">
        {classButtons.map((btn) => {
          let cls = `class-sort-btn ${btn.className}`;
          if (answered) {
            if (btn.value === question.correctClass) cls += " correct";
            else if (btn.value === selected) cls += " wrong";
          }
          return (
            <button
              key={btn.value}
              className={cls}
              onClick={() => handleSelect(btn.value)}
            >
              {btn.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
