import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8000';
const QUIZ_ENDPOINTS = [
  `${API_BASE}/api/verification/test/javascript`,
  `${API_BASE}/api/verification/test/JavaScript`,
];

const StandaloneJavaScriptQuizPage = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadQuestions = async () => {
      setLoading(true);
      setError('');

      try {
        let response = null;
        let payload = null;

        for (const endpoint of QUIZ_ENDPOINTS) {
          response = await fetch(endpoint);

          if (response.ok) {
            payload = await response.json();
            break;
          }
        }

        if (!response?.ok || !payload) {
          throw new Error('Failed to load JavaScript quiz questions.');
        }

        if (!isMounted) {
          return;
        }

        setQuestions(Array.isArray(payload.questions) ? payload.questions : []);
      } catch (fetchError) {
        if (!isMounted) {
          return;
        }

        setError(fetchError.message || 'Unable to fetch quiz questions.');
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      isMounted = false;
    };
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const currentAnswer = currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectAnswer = (optionIndex) => {
    if (!currentQuestion) {
      return;
    }

    setSelectedAnswers((currentAnswers) => ({
      ...currentAnswers,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (!currentQuestion) {
      return;
    }

    if (isLastQuestion) {
      setDone(true);
      return;
    }

    setCurrentQuestionIndex((index) => index + 1);
  };

  if (loading) {
    return (
      <section className="mx-auto max-w-3xl rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow-panel)]">
        <p className="text-sm font-medium text-[var(--text-secondary)]">Loading JavaScript quiz...</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className="mx-auto max-w-3xl rounded-[28px] border border-[rgba(239,68,68,0.24)] bg-[rgba(239,68,68,0.08)] p-8">
        <p className="text-sm font-medium text-[#fecaca]">{error}</p>
      </section>
    );
  }

  if (!currentQuestion) {
    return (
      <section className="mx-auto max-w-3xl rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow-panel)]">
        <p className="text-sm font-medium text-[var(--text-secondary)]">No questions available.</p>
      </section>
    );
  }

  if (done) {
    return (
      <section className="mx-auto max-w-3xl rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow-panel)]">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
          Standalone Quiz
        </p>
        <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">Quiz complete</h2>
        <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
          Answers are stored locally in component state only. This page is not connected to the main app flow yet.
        </p>

        <div className="mt-6 rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-5">
          <p className="text-sm text-[var(--text-secondary)]">
            Stored answers: <span className="font-semibold text-[var(--text-primary)]">{Object.keys(selectedAnswers).length}</span> / {questions.length}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-3xl rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-primary)] p-8 shadow-[var(--shadow-panel)]">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
            Standalone Quiz
          </p>
          <h2 className="mt-3 text-3xl font-semibold text-[var(--text-primary)]">JavaScript Quiz</h2>
        </div>
        <p className="text-sm text-[var(--text-secondary)]">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="mt-6 h-3 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#22C55E)] transition-all duration-300"
          style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold leading-8 text-[var(--text-primary)]">
          {currentQuestion.question}
        </h3>

        <div className="mt-6 grid gap-3">
          {currentQuestion.options.map((option, index) => {
            const isSelected = currentAnswer === index;

            return (
              <button
                key={`${currentQuestion.id}-${index}`}
                type="button"
                onClick={() => handleSelectAnswer(index)}
                className={`w-full rounded-[20px] border px-5 py-4 text-left text-sm transition ${
                  isSelected
                    ? 'border-[rgba(99,102,241,0.4)] bg-[rgba(99,102,241,0.14)] text-[var(--text-primary)]'
                    : 'border-[var(--border-soft)] bg-[var(--surface-secondary)] text-[var(--text-secondary)] hover:border-[var(--border-strong)]'
                }`}
              >
                <span className="font-medium">{option}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <p className="text-sm text-[var(--text-secondary)]">
          Selected: {currentAnswer !== undefined ? `Option ${currentAnswer + 1}` : 'None'}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={currentAnswer === undefined}
          className="button-primary inline-flex items-center justify-center rounded-[18px] px-5 py-3 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isLastQuestion ? 'Finish' : 'Next'}
        </button>
      </div>
    </section>
  );
};

export default StandaloneJavaScriptQuizPage;
