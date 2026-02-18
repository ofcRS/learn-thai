import { useState } from "react";
import type { MatchPairsQuestion } from "../../data/types";

interface MatchPairsProps {
  question: MatchPairsQuestion;
  onAnswer: (correct: boolean) => void;
}

type Selection = { side: "char" | "sound"; index: number };

export function MatchPairs({ question, onAnswer }: MatchPairsProps) {
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [selected, setSelected] = useState<Selection | null>(null);
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);
  const [mistakes, setMistakes] = useState(0);

  const totalPairs = question.chars.length;
  const allMatched = matched.size === totalPairs;

  function handleTap(side: "char" | "sound", index: number) {
    if (allMatched) return;

    if (matched.has(`char-${index}`) && side === "char") return;
    if (matched.has(`sound-${index}`) && side === "sound") return;

    if (!selected) {
      setSelected({ side, index });
      return;
    }

    // Same side — switch selection
    if (selected.side === side) {
      setSelected({ side, index });
      return;
    }

    // Different sides — check if correct pair
    const charIdx = side === "char" ? index : selected.index;
    const soundIdx = side === "sound" ? index : selected.index;

    const isCorrect = question.correctPairs.some(
      ([c, s]) => c === charIdx && s === soundIdx,
    );

    if (isCorrect) {
      const newMatched = new Set(matched);
      newMatched.add(`char-${charIdx}`);
      newMatched.add(`sound-${soundIdx}`);
      setMatched(newMatched);
      setSelected(null);

      if (newMatched.size === totalPairs * 2) {
        // Wait a beat then report — count as correct if ≤1 mistake
        setTimeout(() => onAnswer(mistakes === 0), 600);
      }
    } else {
      setMistakes((m) => m + 1);
      setWrongPair([`char-${charIdx}`, `sound-${soundIdx}`]);
      setSelected(null);
      setTimeout(() => setWrongPair(null), 500);
    }
  }

  function getClass(side: "char" | "sound", index: number) {
    const key = `${side}-${index}`;
    let cls = "match-item";
    if (side === "char") cls += " match-char";
    else cls += " match-sound";

    if (matched.has(key)) cls += " matched";
    if (selected?.side === side && selected?.index === index)
      cls += " selected";
    if (wrongPair?.includes(key)) cls += " wrong";

    return cls;
  }

  return (
    <div className="quiz-question">
      <p className="quiz-prompt">{question.prompt}</p>
      <div className="match-container">
        <div className="match-column">
          {question.chars.map((char, i) => (
            <button
              key={i}
              className={getClass("char", i)}
              onClick={() => handleTap("char", i)}
            >
              {char}
            </button>
          ))}
        </div>
        <div className="match-column">
          {question.sounds.map((sound, i) => (
            <button
              key={i}
              className={getClass("sound", i)}
              onClick={() => handleTap("sound", i)}
            >
              {sound}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
