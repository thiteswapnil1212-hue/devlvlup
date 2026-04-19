import React, { useEffect, useState } from 'react';

const DEFAULT_API_BASE = 'http://localhost:8000';

const QuizPage = ({
  topic = 'JavaScript',
  questions: providedQuestions = [],
  onSubmit,
  onBack,
  loading: controlledLoading = false,
  apiBase = DEFAULT_API_BASE,
}) => {
  const isControlled = typeof onSubmit === 'function';

  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [fetchedQuestions, setFetchedQuestions] = useState([]);
  const [internalLoading, setInternalLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);

  const questions = isControlled ? providedQuestions : fetchedQuestions;
  const loading = isControlled ? controlledLoading : internalLoading;

  useEffect(() => {
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
    setError('');
  }, [topic, isControlled]);

  useEffect(() => {
    if (isControlled || !topic) {
      return;
    }

    let active = true;

    const fetchQuestions = async () => {
      setInternalLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${apiBase}/api/verification/test/${encodeURIComponent(topic)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.error || 'Failed to load quiz questions.');
        }

        if (!active) {
          return;
        }

        setFetchedQuestions(Array.isArray(data.questions) ? data.questions.slice(0, 10) : []);
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message || 'Unable to load quiz questions.');
        }
      } finally {
        if (active) {
          setInternalLoading(false);
        }
      }
    };

    fetchQuestions();

    return () => {
      active = false;
    };
  }, [apiBase, isControlled, topic]);

  const handleSelectAnswer = (questionId, optionIndex) => {
    setAnswers((currentAnswers) => ({
      ...currentAnswers,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = async () => {
    const answeredCount = questions.filter((question) => answers[question.id] !== undefined).length;

    if (answeredCount < questions.length) {
      const confirmed = window.confirm(
        `You have only answered ${answeredCount} out of ${questions.length} questions. Submit anyway?`
      );

      if (!confirmed) {
        return;
      }
    }

    if (isControlled) {
      const answerMap = questions.reduce((accumulator, question) => {
        accumulator[question.id] =
          answers[question.id] !== undefined ? answers[question.id] : -1;
        return accumulator;
      }, {});

      onSubmit(answerMap);
      return;
    }

    const payload = {
      topic,
      answers: questions.reduce((accumulator, question) => {
        accumulator[question.id] =
          answers[question.id] !== undefined ? answers[question.id] : -1;
        return accumulator;
      }, {}),
    };

    setInternalLoading(true);
    setError('');

    try {
      const response = await fetch(`${apiBase}/api/verification/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || data.error || 'Failed to submit quiz.');
      }

      setResult({
        ...data,
        totalQuestions: questions.length,
      });
    } catch (submitError) {
      setError(submitError.message || 'Unable to submit quiz.');
    } finally {
      setInternalLoading(false);
    }
  };

  const handleRestart = () => {
    setAnswers({});
    setCurrentQuestion(0);
    setResult(null);
    setError('');
  };

  if (error) {
    return (
      <div className="rounded-[28px] border border-[rgba(239,68,68,0.24)] bg-[rgba(239,68,68,0.08)] p-6">
        <p className="text-sm font-medium text-[#fecaca]">{error}</p>
        {!isControlled && (
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={handleRestart}
              className="button-secondary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
            >
              Try Again
            </button>
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
              >
                Back
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  if (result && !isControlled) {
    return (
      <div className="panel-surface rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
              Quiz Result
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
              {result.passed ? 'You passed the test' : 'Quiz completed'}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
              {result.message}
            </p>
          </div>

          <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-6 py-5 text-center">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Score</p>
            <p className="mt-2 text-4xl font-semibold text-[var(--text-primary)]">
              {result.score}/{result.totalQuestions}
            </p>
          </div>
        </div>

        {Array.isArray(result.verifiedSkills) && result.verifiedSkills.length > 0 && (
          <div className="mt-6 rounded-[24px] border border-[rgba(34,197,94,0.22)] bg-[rgba(34,197,94,0.08)] p-5">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
              Verified Skills
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              {result.verifiedSkills.map((skill, index) => (
                <span
                  key={`${skill}-${index}`}
                  className="badge-success-soft rounded-full px-4 py-2 text-sm font-semibold"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleRestart}
            className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
          >
            Retake Quiz
          </button>
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="button-secondary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
            >
              Back
            </button>
          )}
        </div>
      </div>
    );
  }

  if (loading || questions.length === 0) {
    return (
      <div className="flex min-h-[280px] items-center justify-center rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-secondary)]">
        <div className="flex items-center gap-4">
          <div className="loader-ring" />
          <p className="text-sm font-medium text-[var(--text-secondary)]">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const answeredCount = Object.keys(answers).length;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="grid gap-6 xl:grid-cols-[260px_minmax(0,1fr)] animate-fade-in">
      <aside className="panel-subtle rounded-[28px] p-5">
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="button-secondary inline-flex w-full items-center justify-center rounded-[18px] px-4 py-3 text-sm font-semibold"
          >
            ← Back to Topics
          </button>
        )}

        <div className={`${onBack ? 'mt-6' : ''} space-y-4`}>
          <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Testing Topic</p>
            <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{topic}</p>
          </div>

          <div className="rounded-[22px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-4">
            <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Progress</p>
            <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">
              {currentQuestion + 1} / {questions.length}
            </p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{answeredCount} answered so far</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-5 gap-2 xl:grid-cols-4">
          {questions.map((entry, index) => {
            const isCurrent = index === currentQuestion;
            const isAnswered = answers[entry.id] !== undefined;

            return (
              <button
                key={entry.id}
                type="button"
                onClick={() => setCurrentQuestion(index)}
                className={`flex h-10 items-center justify-center rounded-2xl border text-xs font-semibold transition ${
                  isCurrent
                    ? 'border-[rgba(99,102,241,0.5)] bg-[rgba(99,102,241,0.16)] text-[#C7D2FE]'
                    : isAnswered
                      ? 'border-[rgba(34,197,94,0.35)] bg-[rgba(34,197,94,0.1)] text-[#BBF7D0]'
                      : 'border-[var(--border-soft)] bg-[var(--surface-secondary)] text-[var(--text-secondary)]'
                }`}
              >
                {index + 1}
              </button>
            );
          })}
        </div>
      </aside>

      <section className="panel-surface rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Question</p>
            <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">
              {currentQuestion + 1}. {question.question}
            </h3>
          </div>
          <span className="badge-brand-soft inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em]">
            {Math.round(progress)}% complete
          </span>
        </div>

        <div className="mt-6 h-3 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
          <div
            className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#22C55E)] transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="mt-8 grid gap-4">
          {question.options.map((option, index) => {
            const isSelected = answers[question.id] === index;

            return (
              <button
                key={index}
                type="button"
                onClick={() => handleSelectAnswer(question.id, index)}
                className={`w-full rounded-[24px] border px-5 py-4 text-left transition ${
                  isSelected
                    ? 'border-[rgba(99,102,241,0.45)] bg-[rgba(99,102,241,0.14)] shadow-[0_16px_32px_rgba(99,102,241,0.14)]'
                    : 'border-[var(--border-soft)] bg-[var(--surface-secondary)] hover:border-[var(--border-strong)] hover:-translate-y-0.5'
                }`}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-sm font-semibold ${
                      isSelected
                        ? 'border-[rgba(99,102,241,0.55)] bg-[rgba(99,102,241,0.18)] text-[#C7D2FE]'
                        : 'border-[var(--border-soft)] text-[var(--text-tertiary)]'
                    }`}
                  >
                    {String.fromCharCode(65 + index)}
                  </div>
                  <span className="text-sm leading-6 text-[var(--text-primary)]">{option}</span>
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-col gap-4 border-t border-[var(--border-soft)] pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm text-[var(--text-secondary)]">
            Answered: <span className="font-semibold text-[var(--text-primary)]">{answeredCount}</span> / {questions.length}
          </div>

          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setCurrentQuestion((current) => Math.max(0, current - 1))}
              disabled={currentQuestion === 0}
              className="button-secondary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-50"
            >
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={loading}
                className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-70"
              >
                {loading ? 'Submitting...' : 'Submit Quiz'}
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setCurrentQuestion((current) => Math.min(questions.length - 1, current + 1))}
                className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold"
              >
                Next Question
              </button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuizPage;
