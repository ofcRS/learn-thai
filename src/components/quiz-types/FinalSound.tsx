import { useState } from "react";
import type { FinalSoundQuestion } from "../../data/types";

interface FinalSoundProps {
  question: FinalSoundQuestion;
  onAnswer: (correct: boolean) => void;
}

export function FinalSound({ question, onAnswer }: FinalSoundProps) {
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
      <div className="quiz-display-char">{question.displayChar}</div>
      <div className="final-sound-options">
        {question.options.map((opt, i) => {
          let cls = "final-sound-btn";
          if (answered) {
            if (i === question.correctIndex) cls += " correct";
            else if (i === selected) cls += " wrong";
          }
          return (
            <button key={opt} className={cls} onClick={() => handleSelect(i)}>
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
