import { useState } from 'react';
import SkillVerificationQuizPage from './SkillVerificationQuizPage';

const TOPICS = ['JavaScript', 'React', 'Python', 'Node.js', 'SQL', 'CSS'];

const SkillVerificationSection = () => {
  const [selectedTopic, setSelectedTopic] = useState('');

  if (selectedTopic) {
    return (
      <SkillVerificationQuizPage
        topic={selectedTopic}
        onBack={() => setSelectedTopic('')}
      />
    );
  }

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Skill Verification
        </p>
        <h2 className="mt-3 text-2xl font-semibold text-slate-900">
          Choose a topic
        </h2>
        <p className="mt-2 text-sm text-slate-600">
          Click a topic button to open its quiz page.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        {TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => setSelectedTopic(topic)}
            className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium text-slate-700 transition hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700"
          >
            {topic}
          </button>
        ))}
      </div>
    </section>
  );
};

export default SkillVerificationSection;
