import React from 'react';

const ResultCard = ({ result, onStartNewQuiz }) => {
  if (!result) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-secondary)]">
        <p className="text-sm font-medium text-[var(--text-secondary)]">Loading results...</p>
      </div>
    );
  }

  const percentage = result.totalQuestions ? Math.round((result.score / result.totalQuestions) * 100) : 0;

  return (
    <div className="mx-auto max-w-4xl animate-fade-in">
      <div className="panel-surface rounded-[32px] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
          <div className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-6">
            <div className="flex items-center gap-4">
              <div
                className={`flex h-16 w-16 items-center justify-center rounded-[20px] text-3xl ${
                  result.passed ? 'bg-[rgba(34,197,94,0.14)] text-[#22C55E]' : 'bg-[rgba(239,68,68,0.14)] text-[#EF4444]'
                }`}
              >
                {result.passed ? '✓' : '✕'}
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Quiz Result</p>
                <h3 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
                  {result.passed ? 'Verification passed' : 'Verification not passed'}
                </h3>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-[var(--text-secondary)]">{result.message}</p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span
                className={`rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] ${
                  result.passed ? 'badge-success-soft' : 'badge-danger-soft'
                }`}
              >
                {result.passed ? 'Pass' : 'Fail'}
              </span>

              {result.passed && result.verifiedSkills?.length > 0 && (
                <span className="badge-brand-soft rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  Verified skill tag earned
                </span>
              )}
            </div>
          </div>

          <div className="rounded-[28px] border border-[var(--border-soft)] bg-[linear-gradient(180deg,rgba(99,102,241,0.16),rgba(15,23,42,0.12))] p-6 text-center">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Score</p>
            <div className="mt-5 text-6xl font-semibold text-[var(--text-primary)]">{percentage}%</div>
            <p className="mt-3 text-base text-[var(--text-secondary)]">
              {result.score} / {result.totalQuestions} correct answers
            </p>
            <div className="mt-6 h-3 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
              <div
                className={`h-full rounded-full ${result.passed ? 'bg-[linear-gradient(90deg,#22C55E,#16A34A)]' : 'bg-[linear-gradient(90deg,#EF4444,#F97316)]'}`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        </div>

        {result.verifiedSkills && result.verifiedSkills.length > 0 && (
          <div className="mt-6 rounded-[28px] border border-[rgba(34,197,94,0.2)] bg-[rgba(34,197,94,0.08)] p-6">
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Verified Skills</p>
            <div className="mt-4 flex flex-wrap gap-3">
              {result.verifiedSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.25)] bg-[rgba(34,197,94,0.12)] px-4 py-2 text-sm font-semibold text-[#BBF7D0]"
                >
                  <span>✓</span>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={onStartNewQuiz}
            className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
          >
            {result.passed ? 'Test Another Skill' : 'Try Another Quiz'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultCard;
