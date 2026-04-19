import React from 'react';

const TOPICS = [
  { id: 'C', name: 'C Programming', short: 'C', description: 'Memory, pointers, and systems fundamentals' },
  { id: 'C++', name: 'C++', short: 'C++', description: 'Object-oriented and low-level performance work' },
  { id: 'Java', name: 'Java', short: 'JV', description: 'Enterprise backend and core language fluency' },
  { id: 'HTML', name: 'HTML', short: 'HT', description: 'Semantic structure and document foundations' },
  { id: 'CSS', name: 'CSS', short: 'CS', description: 'Layouts, responsiveness, and visual systems' },
  { id: 'JavaScript', name: 'JavaScript', short: 'JS', description: 'Language fundamentals and browser logic' },
  { id: 'React', name: 'React', short: 'RE', description: 'Component architecture and state management' },
  { id: 'Node.js', name: 'Node.js', short: 'ND', description: 'Server-side runtime and API development' },
  { id: 'Python', name: 'Python', short: 'PY', description: 'General-purpose programming and tooling' },
  { id: 'SQL', name: 'SQL', short: 'SQL', description: 'Database querying and data modeling basics' },
  { id: 'DSA', name: 'Data Structures & Algorithms', short: 'DSA', description: 'Problem solving and algorithmic depth' },
  { id: 'Frontend', name: 'Frontend Development', short: 'FE', description: 'Client-side engineering skills' },
  { id: 'Backend', name: 'Backend Development', short: 'BE', description: 'APIs, services, and infrastructure logic' },
  { id: 'DevOps', name: 'DevOps', short: 'DO', description: 'Deployment, automation, and CI/CD workflow' },
  { id: 'Data Scientist', name: 'Data Science', short: 'DS', description: 'Analysis, statistics, and ML foundations' },
];

const TopicGrid = ({ onSelectTopic, loading, verifiedSkills }) => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Topics</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Choose a skill to test</h3>
        </div>
        <p className="max-w-xl text-sm leading-6 text-[var(--text-secondary)]">
          Each card loads the existing quiz endpoint without changing the verification workflow.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {TOPICS.map((topic, index) => {
          const isVerified = verifiedSkills.includes(topic.id);
          const staggerClass = index % 3 === 0 ? 'stagger-1' : index % 3 === 1 ? 'stagger-2' : 'stagger-3';

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => !loading && onSelectTopic(topic.id)}
              disabled={loading}
              className={`group rounded-[28px] border p-5 text-left transition duration-300 animate-fade-in ${staggerClass} ${
                isVerified
                  ? 'border-[rgba(34,197,94,0.35)] bg-[rgba(34,197,94,0.08)]'
                  : 'border-[var(--border-soft)] bg-[var(--surface-secondary)]'
              } ${loading ? 'cursor-not-allowed opacity-60' : 'hover:-translate-y-1 hover:border-[var(--border-strong)] hover:shadow-[0_20px_40px_rgba(15,23,42,0.24)]'}`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-[18px] bg-[linear-gradient(135deg,#6366F1,#8B5CF6)] text-sm font-semibold tracking-[0.16em] text-white">
                  {topic.short}
                </div>
                {isVerified ? (
                  <span className="badge-success-soft rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em]">
                    Verified
                  </span>
                ) : (
                  <span className="rounded-full border border-[var(--border-soft)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                    Quiz
                  </span>
                )}
              </div>

              <div className="mt-5">
                <h4 className="text-lg font-semibold text-[var(--text-primary)]">{topic.name}</h4>
                <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{topic.description}</p>
              </div>

              <div className="mt-5 flex items-center justify-between text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">
                <span>{isVerified ? 'Badge earned' : 'Start test'}</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </div>
            </button>
          );
        })}
      </div>

      {loading && (
        <div className="flex items-center justify-center gap-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-4">
          <div className="loader-ring" />
          <p className="text-sm font-medium text-[var(--text-secondary)]">Loading quiz questions...</p>
        </div>
      )}
    </div>
  );
};

export default TopicGrid;
