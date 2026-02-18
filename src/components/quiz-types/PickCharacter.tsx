import { useState } from "react";
import type { PickCharacterQuestion } from "../../data/types";

interface PickCharacterProps {
  question: PickCharacterQuestion;
  onAnswer: (correct: boolean) => void;
}

export function PickCharacter({ question, onAnswer }: PickCharacterProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const answered = selected !== null;

  function handleSelect(index: number) {
    if (answered) return;
    setSelected(index);
    setTimeout(() => {
      onAnswer(index === question.correctIndex);
    }, 800);
  }

  return (
    <div className="quiz-question">
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="quiz-display-sound">{question.displaySound}</div>
      <div className="quiz-options quiz-options-chars">
        {question.options.map((opt, i) => {
          let cls = "quiz-option quiz-option-char";
          if (answered) {
            if (i === question.correctIndex) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={i} className={cls} onClick={() => handleSelect(i)}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
