import { useEffect, useState } from 'react';
import SkillVerificationSection from './components/SkillVerificationSection';
import RoadmapPage from './pages/RoadmapPage';
import QuizResult from './components/QuizResult';
import OrbitProgress from './components/OrbitProgress';
import { analyzeProfile, getApiBaseLabel } from './lib/api';

const BACKEND_URL = getApiBaseLabel();

const navigationItems = [
  { label: 'Dashboard', href: '#dashboard' },
  { label: 'Skill Verification', href: '#verification' },
  { label: 'Profile', href: '#profile' },
];

const emptyAnalysis = {
  score: null,
  level: null,
  strongSkills: [],
  weakAreas: [],
  suggestions: [],
};

const parseAnalysis = (analysis) => {
  if (!analysis) {
    return emptyAnalysis;
  }

  if (typeof analysis !== 'string') {
    return {
      score: analysis.skillScore || analysis.SkillScore || null,
      level: analysis.skillLevel || analysis.SkillLevel || null,
      strongSkills: analysis.strongSkills || analysis.StrongSkills || [],
      weakAreas: analysis.weakAreas || analysis.WeakAreas || [],
      suggestions: analysis.suggestions || analysis.Suggestions || [],
    };
  }

  try {
    const jsonCandidate = JSON.parse(analysis);
    return {
      score: jsonCandidate.skillScore || jsonCandidate.SkillScore || null,
      level: jsonCandidate.skillLevel || jsonCandidate.SkillLevel || null,
      strongSkills: jsonCandidate.strongSkills || jsonCandidate.StrongSkills || [],
      weakAreas: jsonCandidate.weakAreas || jsonCandidate.WeakAreas || [],
      suggestions: jsonCandidate.suggestions || jsonCandidate.Suggestions || [],
    };
  } catch {
    const lines = analysis.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);
    const result = { ...emptyAnalysis };

    lines.forEach((line) => {
      const [key, ...rest] = line.split(':');
      if (!key || rest.length === 0) {
        return;
      }

      const value = rest.join(':').trim();

      if (/skill score/i.test(key)) {
        result.score = Number(value.replace(/[^0-9.]/g, '')) || null;
      } else if (/skill level/i.test(key)) {
        result.level = value;
      } else if (/strong skills/i.test(key)) {
        result.strongSkills = value.split(/[,;•]/).map((item) => item.trim()).filter(Boolean);
      } else if (/weak areas/i.test(key)) {
        result.weakAreas = value.split(/[,;•]/).map((item) => item.trim()).filter(Boolean);
      } else if (/suggestions/i.test(key)) {
        result.suggestions = value.split(/[,;•]/).map((item) => item.trim()).filter(Boolean);
      }
    });

    return result;
  }
};

const formatScore = (score) => {
  const numericScore = Number(score);
  if (Number.isNaN(numericScore)) {
    return 0;
  }

  return Math.max(0, Math.min(100, numericScore));
};

const getInitials = (value) => {
  if (!value) {
    return 'DL';
  }

  const cleaned = value.replace(/[^a-zA-Z0-9 ]/g, ' ').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return value.slice(0, 2).toUpperCase();
  }

  return parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('');
};

const AnalysisListCard = ({ title, items, tone, emptyCopy }) => {
  const toneClass =
    tone === 'success'
      ? 'badge-success-soft'
      : tone === 'danger'
        ? 'badge-danger-soft'
        : 'badge-brand-soft';

  return (
    <article className="panel-surface panel-hover rounded-[24px] p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>
        <span className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ${toneClass}`}>
          {tone}
        </span>
      </div>

      {items.length > 0 ? (
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li
              key={`${title}-${index}`}
              className="flex items-start gap-3 rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-3 text-sm text-[var(--text-secondary)]"
            >
              <span
                className={`mt-1 h-2.5 w-2.5 rounded-full ${
                  tone === 'success'
                    ? 'bg-[#22C55E]'
                    : tone === 'danger'
                      ? 'bg-[#EF4444]'
                      : 'bg-[#6366F1]'
                }`}
              />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <div className="rounded-2xl border border-dashed border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-6 text-sm text-[var(--text-tertiary)]">
          {emptyCopy}
        </div>
      )}
    </article>
  );
};

function App() {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    document.documentElement.dataset.theme = darkMode ? 'dark' : 'light';
  }, [darkMode]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!username.trim()) {
      setError('Please enter a GitHub username.');
      return;
    }

    setError(null);
    setLoading(true);
    setResult(null);

    try {
      const data = await analyzeProfile(username.trim());
      setResult(data);
    } catch (fetchError) {
      setError(fetchError.message || 'Unable to fetch data.');
    } finally {
      setLoading(false);
    }
  };

  const analysis = result ? parseAnalysis(result.analysis) : emptyAnalysis;
  const score = formatScore(analysis.score);
  const avatarUrl = result?.github?.avatar_url;
  const displayName = result?.github?.name || result?.github?.login || 'DevLevelUp';
  const strongSkills = analysis.strongSkills || [];
  const weakAreas = analysis.weakAreas || [];
  const suggestions = analysis.suggestions || [];
  const repos = result?.repos || [];
  const readinessCards = [
    {
      label: 'Overall Readiness',
      value: result ? `${score}/100` : 'Pending',
      detail: result ? `${analysis.level || 'Unknown level'} profile signal` : 'Run an analysis to populate score signals.',
    },
    {
      label: 'Repositories Reviewed',
      value: result ? `${repos.length}` : '0',
      detail: result ? 'Top repos ranked by recent activity.' : 'Your repositories will appear here.',
    },
    {
      label: 'AI Suggestions',
      value: result ? `${suggestions.length}` : '0',
      detail: result ? 'Actionable improvements from the analysis engine.' : 'Recommendations unlock after the first scan.',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div className="page-glow page-glow-top" />
      <div className="page-glow page-glow-bottom" />

      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <nav className="panel-surface section-offset sticky top-4 z-30 mb-8 flex items-center justify-between gap-4 rounded-[28px] px-5 py-4 backdrop-blur-xl sm:px-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#6366F1,#8B5CF6)] text-sm font-bold text-white shadow-[0_16px_32px_rgba(99,102,241,0.35)]">
              DL
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.24em] text-[var(--text-tertiary)]">DevLevelUp</p>
              <h1 className="text-base font-semibold text-[var(--text-primary)] sm:text-lg">Developer growth dashboard</h1>
            </div>
          </div>

          <div className="hidden items-center gap-2 rounded-full border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-1 md:flex">
            {navigationItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-tertiary)] hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode((prev) => !prev)}
              className="hidden rounded-full border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)] transition hover:border-[var(--border-strong)] hover:text-[var(--text-primary)] sm:inline-flex"
            >
              {darkMode ? 'Light mode' : 'Dark mode'}
            </button>
            <div className="flex items-center gap-3 rounded-full border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-2 py-2">
              <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-sm font-semibold text-white">
                {avatarUrl ? (
                  <img src={avatarUrl} alt={`${displayName} avatar`} className="h-full w-full object-cover" />
                ) : (
                  getInitials(displayName)
                )}
              </div>
              <div className="hidden pr-3 sm:block">
                <p className="text-xs text-[var(--text-tertiary)]">Signed in as</p>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{displayName}</p>
              </div>
            </div>
          </div>
        </nav>

        <main className="space-y-8 pb-10">
          <section id="dashboard" className="section-offset grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(320px,0.9fr)] animate-fade-in stagger-1">
            <article className="panel-surface panel-hover relative overflow-hidden rounded-[32px] px-6 py-8 sm:px-8 lg:px-10">
              <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.18),transparent_65%)] lg:block" />
              <div className="relative max-w-2xl">
                <span className="badge-brand-soft mb-5 inline-flex rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                  SaaS Developer Intelligence
                </span>
                <h2 className="max-w-xl text-4xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-5xl">
                  Turn GitHub activity into a polished career readiness dashboard.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--text-secondary)] sm:text-lg">
                  Analyze repositories, surface strengths and risk areas, and unlock skill verification tests without changing any of the backend integration already powering DevLevelUp.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {readinessCards.map((card) => (
                    <div key={card.label} className="metric-tile rounded-[24px] p-5">
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">
                        {card.label}
                      </p>
                      <p className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">{card.value}</p>
                      <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">{card.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <aside className="grid gap-6">
              <article className="panel-surface panel-hover rounded-[28px] p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Quick Start</p>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Analyze any public GitHub profile</h3>
                  </div>
                  <span className="badge-brand-soft rounded-full px-3 py-1 text-xs font-semibold">Live</span>
                </div>
                <p className="mt-4 text-sm leading-6 text-[var(--text-secondary)]">
                  Enter a username to generate a structured AI summary, top repository snapshot, and skill verification follow-up tests.
                </p>
                <div className="mt-6 space-y-3">
                  <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Backend</p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">{BACKEND_URL}/analyze/:username</p>
                  </div>
                  <div className="rounded-2xl border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-3">
                    <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Verification</p>
                    <p className="mt-1 text-sm font-medium text-[var(--text-primary)]">Unlocked after a successful profile analysis</p>
                  </div>
                </div>
              </article>

              <article className="panel-surface panel-hover rounded-[28px] p-6">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">What you get</p>
                <ul className="mt-4 space-y-4 text-sm text-[var(--text-secondary)]">
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#6366F1]" />
                    AI-generated skill score with a clean dashboard summary.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#22C55E]" />
                    Strong-skill highlights and verified skill badges.
                  </li>
                  <li className="flex gap-3">
                    <span className="mt-1 h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
                    Weak-area detection and actionable next steps.
                  </li>
                </ul>
              </article>
            </aside>
          </section>

          <section className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(300px,0.85fr)] animate-fade-in stagger-2">
            <article className="panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
              <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Profile Search</p>
                  <h3 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Launch a fresh analysis</h3>
                </div>
                <p className="max-w-md text-sm leading-6 text-[var(--text-secondary)]">
                  The existing API integration stays unchanged. This is a dashboard refresh only.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto]">
                <label className="block">
                  <span className="mb-3 block text-sm font-medium text-[var(--text-secondary)]">GitHub username</span>
                  <input
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="octocat"
                    aria-label="GitHub username"
                    className="w-full rounded-[20px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-4 text-base text-[var(--text-primary)] outline-none transition placeholder:text-[var(--text-tertiary)] focus:border-[var(--border-strong)] focus:ring-2 focus:ring-[rgba(99,102,241,0.2)]"
                  />
                </label>

                <button
                  className="button-primary mt-auto inline-flex h-[58px] items-center justify-center rounded-[20px] px-6 text-sm font-semibold"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Profile'}
                </button>
              </form>

              {error && (
                <div className="mt-4 rounded-[20px] border border-[rgba(239,68,68,0.25)] bg-[rgba(239,68,68,0.12)] px-4 py-3 text-sm text-[#FCA5A5]">
                  {error}
                </div>
              )}
            </article>

            <article className="panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-[var(--text-tertiary)]">Status</p>
              {loading ? (
                <div className="mt-6 flex items-center gap-4 rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-5">
                  <div className="loader-ring" />
                  <div>
                    <p className="text-sm font-semibold text-[var(--text-primary)]">Analyzing profile data</p>
                    <p className="mt-1 text-sm text-[var(--text-secondary)]">
                      Pulling repositories, GitHub metadata, and AI-generated recommendations.
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-6 rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-5 py-5">
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    {result ? 'Latest analysis complete' : 'Ready for the next profile'}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--text-secondary)]">
                    {result
                      ? `Dashboard synced for ${result.github?.login || displayName}.`
                      : 'Submit a GitHub username to populate the dashboard and unlock skill verification.'}
                  </p>
                </div>
              )}
            </article>
          </section>

          {result ? (
            <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)] animate-fade-in stagger-3">
              <div className="grid gap-6">
                <article id="profile" className="section-offset panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                    <div className="flex items-start gap-5">
                      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-[24px] bg-[linear-gradient(135deg,#0EA5E9,#6366F1)] text-2xl font-semibold text-white">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={`${displayName} avatar`} className="h-full w-full object-cover" />
                        ) : (
                          getInitials(displayName)
                        )}
                      </div>
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Developer Profile</p>
                        <h3 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">
                          {result.github?.login || 'GitHub developer'}
                        </h3>
                        <p className="mt-2 text-base text-[var(--text-secondary)]">{result.github?.name || 'Public GitHub profile'}</p>
                        <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                          {result.github?.bio || 'No bio available. The analysis is based on repository activity and GitHub metadata.'}
                        </p>
                      </div>
                    </div>

                    {result.github?.html_url && (
                      <a
                        href={result.github.html_url}
                        target="_blank"
                        rel="noreferrer"
                        className="button-secondary inline-flex items-center justify-center rounded-[18px] px-4 py-3 text-sm font-semibold"
                      >
                        Open GitHub Profile
                      </a>
                    )}
                  </div>

                  <div className="mt-8 grid gap-4 sm:grid-cols-3">
                    <div className="metric-tile rounded-[24px] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Public Repos</p>
                      <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{result.github?.public_repos ?? 'N/A'}</p>
                    </div>
                    <div className="metric-tile rounded-[24px] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Followers</p>
                      <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{result.github?.followers ?? 'N/A'}</p>
                    </div>
                    <div className="metric-tile rounded-[24px] p-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Suggested Focus</p>
                      <p className="mt-2 text-xl font-semibold text-[var(--text-primary)]">{analysis.level || 'Unknown level'}</p>
                    </div>
                  </div>
                </article>

                <div className="grid gap-6 lg:grid-cols-2">
                  <AnalysisListCard
                    title="Strong Skills"
                    items={strongSkills}
                    tone="success"
                    emptyCopy="The AI response did not include strong-skill items for this profile."
                  />
                  <AnalysisListCard
                    title="Weak Areas"
                    items={weakAreas}
                    tone="danger"
                    emptyCopy="The AI response did not include weak-area items for this profile."
                  />
                </div>

                <AnalysisListCard
                  title="Suggestions"
                  items={suggestions}
                  tone="brand"
                  emptyCopy="The AI response did not include suggestions for this profile."
                />

                <article className="panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
                  <div className="mb-6 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Repository Snapshot</p>
                      <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">Your repositories</h3>
                    </div>
                    <span className="badge-brand-soft rounded-full px-3 py-1 text-xs font-semibold">{repos.length} repos</span>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    {repos.map((repo) => (
                      <div
                        key={repo.name}
                        className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-5 transition hover:-translate-y-1 hover:border-[var(--border-strong)]"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <p className="text-lg font-semibold text-[var(--text-primary)]">{repo.name}</p>
                            <p className="mt-2 text-sm text-[var(--text-secondary)]">
                              {repo.language || 'Language not detected'}
                            </p>
                          </div>
                          <span className="rounded-full bg-[rgba(99,102,241,0.16)] px-3 py-1 text-xs font-semibold text-[#C7D2FE]">
                            ★ {repo.stars}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </article>
              </div>

              <div className="grid gap-6">
                <article className="panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Skill Score</p>
                      <h3 className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">AI readiness score</h3>
                    </div>
                    <span className="badge-brand-soft rounded-full px-3 py-1 text-xs font-semibold">
                      {analysis.level || 'Unknown'}
                    </span>
                  </div>

                  <div className="mt-8 flex items-center justify-between gap-4">
                    <div className="flex flex-col items-center">
                      <OrbitProgress percent={score} size={140} strokeWidth={10} orbitColor="#6366F1" />
                      <p className="mt-4 text-sm text-[var(--text-secondary)]">out of 100 based on GitHub signals</p>
                    </div>
                    <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-3 text-right self-end">
                      <p className="text-xs uppercase tracking-[0.16em] text-[var(--text-tertiary)]">Level</p>
                      <p className="mt-1 text-lg font-semibold text-[var(--text-primary)]">{analysis.level || 'Pending'}</p>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flex items-center justify-between text-sm text-[var(--text-secondary)]">
                      <span>Profile confidence</span>
                      <span>{score}%</span>
                    </div>
                    <div className="mt-3 h-4 overflow-hidden rounded-full bg-[var(--surface-secondary)]">
                      <div
                        className="h-full rounded-full bg-[linear-gradient(90deg,#6366F1,#22C55E)] transition-all duration-500"
                        style={{ width: `${score}%` }}
                      />
                    </div>
                  </div>
                </article>

                <article className="panel-surface panel-hover rounded-[32px] p-6">
                  <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Summary</p>
                  <div className="mt-4 space-y-3">
                    <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">Strength Count</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{strongSkills.length}</p>
                    </div>
                    <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">Weak Area Count</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{weakAreas.length}</p>
                    </div>
                    <div className="rounded-[24px] border border-[var(--border-soft)] bg-[var(--surface-secondary)] p-4">
                      <p className="text-sm font-medium text-[var(--text-primary)]">Improvement Actions</p>
                      <p className="mt-2 text-2xl font-semibold text-[var(--text-primary)]">{suggestions.length}</p>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          ) : (
            <section className="grid gap-6 lg:grid-cols-3 animate-fade-in stagger-3">
              <article className="panel-surface panel-hover rounded-[28px] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Skill Score</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">Waiting for analysis</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  The score card, progress bar, and AI level summary will appear here once you submit a GitHub username.
                </p>
              </article>
              <article className="panel-surface panel-hover rounded-[28px] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Strong Skills</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">Highlights pending</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  DevLevelUp will populate green-signal skills based on repository evidence and the AI analysis payload.
                </p>
              </article>
              <article className="panel-surface panel-hover rounded-[28px] p-6">
                <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Suggestions</p>
                <h3 className="mt-3 text-2xl font-semibold text-[var(--text-primary)]">Guidance unlocks next</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--text-secondary)]">
                  Suggestions and weak areas stay empty until the first profile analysis finishes successfully.
                </p>
              </article>
            </section>
          )}

          <section id="verification" className="section-offset animate-fade-in stagger-4">
            {result ? (
              <SkillVerificationSection />
            ) : (
              <article className="panel-surface panel-hover rounded-[32px] p-6 sm:p-8">
                <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                  <div>
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)]">Skill Verification</p>
                    <h3 className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">Unlock interactive skill tests</h3>
                    <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--text-secondary)]">
                      Topic cards, quiz flow, and verified skill badges become available after you analyze a GitHub profile.
                    </p>
                  </div>
                  <span className="rounded-full border border-[var(--border-soft)] bg-[var(--surface-secondary)] px-4 py-2 text-sm font-medium text-[var(--text-secondary)]">
                    Analyze a profile first
                  </span>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {['Python', 'React', 'Node.js', 'SQL'].map((topic) => (
                    <div
                      key={topic}
                      className="rounded-[24px] border border-dashed border-[var(--border-soft)] bg-[var(--surface-secondary)] p-5"
                    >
                      <p className="text-sm font-semibold text-[var(--text-primary)]">{topic}</p>
                      <p className="mt-2 text-sm text-[var(--text-secondary)]">Interactive assessment card preview</p>
                    </div>
                  ))}
                </div>
              </article>
            )}
          </section>

          <section className="section-offset pt-10 border-t border-[var(--border-soft)]">
            <div className="mb-8">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[var(--text-tertiary)] mb-4">Live Previews</p>
              <h2 className="text-3xl font-bold text-[var(--text-primary)]">New Component Previews</h2>
              <p className="text-[var(--text-secondary)] mt-2">These are mounted here temporarily so you can preview them in your browser.</p>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">1. QuizResult (Standalone)</h3>
                <QuizResult correctAnswers={8} />
              </div>
              
              <div>
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-4">2. 90-Day Roadmap</h3>
                <div className="rounded-[32px] overflow-hidden border border-[var(--border-strong)] bg-[var(--surface-primary)] shadow-2xl">
                  <RoadmapPage />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
