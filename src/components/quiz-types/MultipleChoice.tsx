import { useState } from "react";
import type { MultipleChoiceQuestion } from "../../data/types";
import { PlayButton } from "../PlayButton";

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion;
  onAnswer: (correct: boolean) => void;
}

export function MultipleChoice({ question, onAnswer }: MultipleChoiceProps) {
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
      <div className="quiz-char-audio">
        <div className="quiz-display-char">{question.displayChar}</div>
        {question.audioUrl && <PlayButton audioUrl={question.audioUrl} />}
      </div>
      <div className="quiz-options">
        {question.options.map((opt, i) => {
          let cls = "quiz-option";
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
