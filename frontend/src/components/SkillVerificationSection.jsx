import React, { useEffect, useState } from 'react';
import TopicGrid from './TopicGrid';
import QuizPage from './QuizPage';
import ResultCard from './ResultCard';
import { fetchQuizQuestions, fetchVerifiedSkills, submitQuizAnswers } from '../lib/api';

const SkillVerificationSection = () => {
  const [state, setState] = useState('topics');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [result, setResult] = useState(null);
  const [verifiedSkills, setVerifiedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadVerifiedSkills();
  }, []);

  const loadVerifiedSkills = async () => {
    try {
      const data = await fetchVerifiedSkills();
      setVerifiedSkills(data.verifiedSkills || []);
    } catch (error) {
      console.error('Error fetching verified skills:', error);
    }
  };

  const handleSelectTopic = async (topic) => {
    setLoading(true);

    try {
      const data = await fetchQuizQuestions(topic);
      setSelectedTopic(topic);
      setQuestions(data.questions || []);
      setState('quiz');
    } catch (error) {
      console.error('Error fetching quiz:', error);
      alert('Failed to load quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitQuiz = async (answers) => {
    setLoading(true);

    try {
      const data = await submitQuizAnswers(selectedTopic, answers, 'demo_user');
      setResult(data);
      setVerifiedSkills(data.verifiedSkills || []);
      setState('result');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      alert('Failed to submit quiz. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToTopics = () => {
    setState('topics');
    setSelectedTopic(null);
    setQuestions([]);
    setResult(null);
  };

  return (
    <div className="panel-surface rounded-[32px] p-6 sm:p-8 animate-fade-in">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <span className="badge-brand-soft inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
            Skill Verification
          </span>
          <h2 className="mt-4 text-3xl font-semibold text-[var(--text-primary)] sm:text-4xl">
            Validate knowledge with startup-grade assessments
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)] sm:text-base">
            Topic cards, guided quizzes, and verified skill tags all stay connected to the existing backend endpoints.
          </p>
        </div>

        <div className="grid gap-3 sm:min-w-[260px]">
          <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Current Step</p>
            <p className="mt-2 text-lg font-semibold capitalize text-[var(--text-primary)]">{state}</p>
          </div>
          <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-4">
            <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Verified Skills</p>
            <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">{verifiedSkills.length}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        {state === 'topics' && (
          <div className="space-y-6">
            <TopicGrid onSelectTopic={handleSelectTopic} loading={loading} verifiedSkills={verifiedSkills} />
          </div>
        )}

        {state === 'quiz' && (
          <QuizPage
            topic={selectedTopic}
            questions={questions}
            onSubmit={handleSubmitQuiz}
            onBack={handleBackToTopics}
            loading={loading}
          />
        )}

        {state === 'result' && <ResultCard result={result} onStartNewQuiz={handleBackToTopics} />}
      </div>
    </div>
  );
};

export default SkillVerificationSection;
