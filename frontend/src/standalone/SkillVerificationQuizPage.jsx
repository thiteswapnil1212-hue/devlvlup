import { useEffect, useState } from 'react';

const API_BASE = 'http://localhost:8000';

const SkillVerificationQuizPage = ({ topic, onBack }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const loadQuestions = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(
          `${API_BASE}/api/verification/test/${encodeURIComponent(topic)}`
        );
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.detail || data.error || 'Failed to load quiz.');
        }

        if (!active) {
          return;
        }

        setQuestions(Array.isArray(data.questions) ? data.questions : []);
        setCurrentQuestionIndex(0);
        setSelectedAnswers({});
      } catch (fetchError) {
        if (active) {
          setError(fetchError.message || 'Unable to load quiz questions.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    loadQuestions();

    return () => {
      active = false;
    };
  }, [topic]);

  const currentQuestion = questions[currentQuestionIndex];
  const selectedAnswer =
    currentQuestion ? selectedAnswers[currentQuestion.id] : undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectAnswer = (optionIndex) => {
    if (!currentQuestion) {
      return;
    }

    setSelectedAnswers((current) => ({
      ...current,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      return;
    }

    setCurrentQuestionIndex((current) => current + 1);
  };

  if (loading) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">Loading quiz...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
        <p className="text-sm text-red-600">{error}</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">No questions available for this topic.</p>
        <button
          type="button"
          onClick={onBack}
          className="mt-4 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white"
        >
          Back to Topics
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700"
        >
          Back
        </button>
        <p className="text-sm text-slate-500">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          {topic} Quiz
        </p>
        <h3 className="mt-3 text-xl font-semibold text-slate-900">
          {currentQuestion.question}
        </h3>
      </div>

      <div className="grid gap-3">
        {currentQuestion.options.map((option, index) => {
          const isSelected = selectedAnswer === index;

          return (
            <button
              key={`${currentQuestion.id}-${index}`}
              type="button"
              onClick={() => handleSelectAnswer(index)}
              className={`rounded-xl border px-4 py-3 text-left text-sm transition ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          Selected: {selectedAnswer !== undefined ? `Option ${selectedAnswer + 1}` : 'None'}
        </p>

        <button
          type="button"
          onClick={handleNext}
          disabled={selectedAnswer === undefined || isLastQuestion}
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isLastQuestion ? 'Last Question' : 'Next'}
        </button>
      </div>
    </div>
  );
};

export default SkillVerificationQuizPage;
