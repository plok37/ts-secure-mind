"use client";

import React, { useState } from "react";
import type { QuizQuestion } from "@/quiz-data-constants";

interface QuizProps {
  questions: QuizQuestion[];
}

export default function Quiz({ questions }: QuizProps) {
  const [selected, setSelected] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult] = useState(false);
  const [current, setCurrent] = useState(0);

  const handleSelect = (optIdx: number) => {
    if (!showResult) {
      const updated = [...selected];
      updated[current] = optIdx;
      setSelected(updated);
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const handleReset = () => {
    setSelected(Array(questions.length).fill(null));
    setShowResult(false);
    setCurrent(0);
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(current + 1);
  };

  const handlePrev = () => {
    if (current > 0) setCurrent(current - 1);
  };

  const q = questions[current];
  const isSelected = (optIdx: number) => selected[current] === optIdx;
  const isCorrect = (optIdx: number) => showResult && q.answer === optIdx;
  const isWrong = (optIdx: number) => showResult && isSelected(optIdx) && q.answer !== optIdx;

  return (
    <div className="space-y-5">
      <div className="p-4 border rounded-lg bg-white shadow">
        <div className="font-semibold text-lg mb-2 font-h2">{current + 1}. {q.question}</div>
        <div className="space-y-2">
          {q.options.map((opt, optIdx) => (
            <button
              key={optIdx}
              className={`block w-full text-left px-4 py-2 rounded border font-h3 transition
                ${isSelected(optIdx) ? "border-[#35485e] bg-e-900" : "border-gray-300"}
                ${isCorrect(optIdx) ? "border-green-600 bg-green-50" : ""}
                ${isWrong(optIdx) ? "border-red-600 bg-red-50" : ""}
              `}
              onClick={() => handleSelect(optIdx)}
              disabled={showResult}
            >
              {opt}
              {isCorrect(optIdx) && <span className="ml-2 text-green-600 font-bold">✓</span>}
              {isWrong(optIdx) && <span className="ml-2 text-red-600 font-bold">✗</span>}
            </button>
          ))}
        </div>
        {showResult && selected[current] !== null && (
          <div className={`mt-2 text-sm ${selected[current] === q.answer ? "text-green-700" : "text-red-700"}`}>
            {selected[current] === q.answer ? "Correct!" : "Incorrect."} {q.explanation && <span className="block mt-1">Explanation: {q.explanation}</span>}
          </div>
        )}
      </div>
      <div className="flex gap-4 mt-4 px-9 justify-between">
        <button
          className="px-6 py-2 rounded bg-d text-white font-semibold shadow hover:bg-d-400 transition disabled:opacity-70 border border-black/30"
          onClick={handlePrev}
          disabled={current === 0}
        >
          Previous
        </button>
        {current < questions.length - 1 && !showResult && (
          <button
            className="px-6 py-2 rounded bg-e text-white font-semibold shadow hover:bg-e-400 transition disabled:opacity-70 border border-black/30"
            onClick={handleNext}
            disabled={selected[current] === null}
          >
            Next
          </button>
        )}
        {showResult && current < questions.length - 1 && (
          <button
            className="px-6 py-2 rounded bg-e text-white font-semibold shadow hover:bg-e-400 transition disabled:opacity-70 border border-black/30"
            onClick={handleNext}
          >
            Next
          </button>
        )}
        {!showResult && (
          <button
            className="px-6 py-2 rounded bg-a text-white font-bold shadow hover:bg-a-400 transition disabled:opacity-70 border border-black/30 "
            onClick={handleSubmit}
            disabled={current !== questions.length - 1 || selected[current] === null}
          >
            Submit
          </button>
        )}
        {showResult && (
          <button
            className="px-6 py-2 rounded bg-gray-400 text-white font-semibold shadow hover:bg-gray-500 transition border border-black/30" 
            onClick={handleReset}
          >
            Reset
          </button>
        )}
      </div>
      {showResult && (
        <div className="mt-4 text-center text-lg font-bold">
          You got {selected.filter((ans, idx) => ans === questions[idx].answer).length} out of {questions.length} correct!
        </div>
      )}
    </div>
  );
}
