import React from 'react';

const ROLES = [
  'Software Engineer',
  'AI Engineer',
  'DevOps',
  'Data Science',
  'Gen AI Engineer',
  'Cybersecurity'
];

const RoleSelector = ({ githubUsername, setGithubUsername, targetRole, setTargetRole, onGenerate, loading }) => {
  return (
    <div className="bg-[var(--surface-secondary)] border border-[var(--border-soft)] rounded-[24px] p-6 sm:p-8 shadow-sm mb-8">
      <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Setup Your Roadmap</h2>
      
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="block text-sm font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
            GitHub Username
          </label>
          <input 
            type="text" 
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value)}
            placeholder="e.g. torvalds"
            className="w-full bg-[var(--app-bg)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-brand transition"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-2">
            Target Career Role
          </label>
          <select
            value={targetRole}
            onChange={(e) => setTargetRole(e.target.value)}
            className="w-full bg-[var(--app-bg)] border border-[var(--border-strong)] rounded-xl px-4 py-3 text-[var(--text-primary)] focus:outline-none focus:border-brand transition appearance-none"
          >
            {ROLES.map(role => (
              <option key={role} value={role}>{role}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={onGenerate}
          disabled={loading || !githubUsername}
          className="button-primary px-8 py-3 rounded-[16px] font-semibold transition disabled:opacity-50"
        >
          {loading ? 'Generating 90-Day Plan...' : 'Generate Roadmap'}
        </button>
      </div>
    </div>
  );
};

export default RoleSelector;
