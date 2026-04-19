import React from 'react';

const VerifiedTags = ({ skills }) => {
  if (!skills || skills.length === 0) {
    return (
      <div className="rounded-[28px] border border-dashed border-[var(--border-soft)] bg-[var(--surface-secondary)] px-6 py-8 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Verified Skills</p>
        <p className="mt-3 text-lg font-semibold text-[var(--text-primary)]">No badges earned yet</p>
        <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
          Start a topic quiz to collect verified skill tags.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[28px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Verified Skills</p>
          <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Badge collection</h3>
        </div>
        <span className="badge-success-soft inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
          {skills.length} earned
        </span>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        {skills.map((skill, index) => {
          const staggerClass = index % 4 === 0 ? 'stagger-1' : index % 4 === 1 ? 'stagger-2' : index % 4 === 2 ? 'stagger-3' : 'stagger-4';
          return (
            <div
              key={`${skill}-${index}`}
              className={`inline-flex items-center gap-2 rounded-full border border-[rgba(34,197,94,0.24)] bg-[rgba(34,197,94,0.12)] px-4 py-2 text-sm font-semibold text-[#BBF7D0] animate-fade-in ${staggerClass}`}
            >
              <span>✓</span>
              <span>Verified {skill}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VerifiedTags;
