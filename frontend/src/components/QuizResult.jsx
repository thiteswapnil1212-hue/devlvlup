import React from 'react';

const QuizResult = ({ correctAnswers, totalQuestions = 10 }) => {
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = scorePercentage >= 70;

  return (
    <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-6 sm:p-8 animate-fade-in shadow-lg">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-[var(--text-primary)]">Quiz Results</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-3 text-center">
        <div className="p-4 rounded-[16px] bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]">
          <p className="text-sm uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Correct</p>
          <p className="mt-2 text-3xl font-bold text-[var(--text-primary)]">
            {correctAnswers} <span className="text-lg text-[var(--text-secondary)]">/ {totalQuestions}</span>
          </p>
        </div>

        <div className="p-4 rounded-[16px] bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)]">
          <p className="text-sm uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Score</p>
          <p className="mt-2 text-3xl font-bold text-[#6366F1]">
            {scorePercentage}%
          </p>
        </div>

        <div className={`p-4 rounded-[16px] border ${passed ? 'bg-[rgba(34,197,94,0.08)] border-[rgba(34,197,94,0.2)]' : 'bg-[rgba(239,68,68,0.08)] border-[rgba(239,68,68,0.2)]'}`}>
          <p className="text-sm uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">Status</p>
          <p className={`mt-2 text-2xl font-bold uppercase tracking-widest ${passed ? 'text-[#22C55E]' : 'text-[#EF4444]'}`}>
            {passed ? 'Pass' : 'Fail'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuizResult;
