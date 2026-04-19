import React from 'react';

const RoadmapViewer = ({ roadmapData }) => {
  if (!roadmapData || !roadmapData.roadmap || roadmapData.roadmap.length === 0) {
    return (
      <div className="p-8 text-center bg-[var(--surface-secondary)] rounded-[24px] border border-[var(--border-soft)]">
        <p className="text-[var(--text-secondary)]">No roadmap data available. Please generate one first.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[var(--text-primary)]">Your 90-Day Learning Roadmap</h2>
        <p className="text-[var(--text-secondary)] mt-2">Personalized based on your skill analysis.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {roadmapData.roadmap.map((week) => (
          <div key={week.week} className="bg-[var(--surface-secondary)] border border-[var(--border-soft)] rounded-[24px] p-6 shadow-sm hover:border-[var(--border-strong)] transition duration-300">
            <div className="flex justify-between items-start mb-4">
              <span className="bg-brand text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">Week {week.week}</span>
            </div>
            
            <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">{week.topic}</h3>
            
            <div className="mb-4 p-3 bg-[rgba(99,102,241,0.08)] rounded-xl border border-[rgba(99,102,241,0.2)]">
              <p className="text-sm text-brand font-medium italic">"{week.rationale}"</p>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Tasks</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-[var(--text-secondary)]">
                  {week.tasks.map((task, i) => (
                    <li key={i}>{task}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Mini Project</h4>
                <p className="text-sm text-[var(--text-secondary)]">{week.miniProject}</p>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">Practice</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                  {week.practiceLinks.map((link, i) => (
                    <a key={i} href={link} target="_blank" rel="noreferrer" className="text-xs text-brand hover:underline bg-[rgba(99,102,241,0.1)] px-2 py-1 rounded-md">
                      Resource {i + 1}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoadmapViewer;
