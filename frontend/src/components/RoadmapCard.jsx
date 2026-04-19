import React from 'react';

const RoadmapCard = ({ weekData }) => {
  const { week, focus, topics, tasks, project } = weekData;

  return (
    <div className="bg-[var(--surface-secondary)] border border-[var(--border-soft)] rounded-[24px] p-6 shadow-sm hover:border-[var(--border-strong)] transition duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <span className="bg-[linear-gradient(135deg,#6366F1,#8B5CF6)] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-md">
          Week {week}
        </span>
      </div>
      
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-5">{focus}</h3>

      <div className="flex-grow space-y-5">
        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Topics to Learn</h4>
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, i) => (
              <span key={i} className="text-xs font-medium text-brand bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] px-2 py-1 rounded-md">
                {topic}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Action Items</h4>
          <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--text-secondary)]">
            {tasks.map((task, i) => (
              <li key={i}>{task}</li>
            ))}
          </ul>
        </div>

        <div className="pt-2 border-t border-[var(--border-soft)]">
          <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2 flex items-center gap-2">
            🏆 Mini Project
          </h4>
          <p className="text-sm font-medium text-[var(--text-primary)]">{project}</p>
        </div>
      </div>
    </div>
  );
};

export default RoadmapCard;
