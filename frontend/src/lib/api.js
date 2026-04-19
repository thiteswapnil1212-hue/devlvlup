const normalizeBase = (value) => value?.replace(/\/+$/, '') || '';

const configuredBase = normalizeBase(import.meta.env.VITE_API_BASE_URL);

const getCandidateBases = () => {
  const runtimeOrigin =
    typeof window !== 'undefined' ? normalizeBase(window.location.origin) : '';

  return [...new Set([
    configuredBase,
    'http://localhost:5000',
    'http://localhost:8000',
    runtimeOrigin,
  ].filter(Boolean))];
};

const readJson = async (response) => {
  const text = await response.text();

  if (!text) {
    return {};
  }

  try {
    return JSON.parse(text);
  } catch {
    return { error: text };
  }
};

const buildPythonAnalysis = (payload, username) => {
  const domainScores = payload.skill_audit
    ? [
        ['Code Quality', payload.skill_audit.code_quality?.value],
        ['Architecture', payload.skill_audit.architecture?.value],
        ['Testing', payload.skill_audit.testing?.value],
        ['Security', payload.skill_audit.security?.value],
        ['Documentation', payload.skill_audit.documentation?.value],
        ['Delivery', payload.skill_audit.delivery?.value],
      ]
    : [];

  const strongSkills = domainScores
    .filter(([, value]) => Number(value) >= 70)
    .map(([label]) => label);

  const weakAreas = domainScores
    .filter(([, value]) => Number(value) > 0 && Number(value) < 60)
    .map(([label]) => label);

  const suggestions = Array.isArray(payload.next_salary_bracket_gap)
    ? payload.next_salary_bracket_gap.map((item) => `${item.skill}: ${item.action}`)
    : [];

  const evidenceRepos = Array.isArray(payload.evidence)
    ? [...new Set(payload.evidence.map((item) => item.repository).filter(Boolean))]
    : [];

  return {
    github: {
      login: payload.profile?.username || username,
      name: payload.profile?.username || username,
      public_repos: payload.profile?.public_repos || '0',
      followers: payload.profile?.followers || '0',
      bio: payload.claim_gap || 'Career audit generated from public GitHub evidence.',
      html_url: `https://github.com/${payload.profile?.username || username}`,
      avatar_url: `https://github.com/${payload.profile?.username || username}.png`,
    },
    repos: evidenceRepos.slice(0, 6).map((repository) => ({
      name: repository,
      language: 'Analyzed repository',
      stars: 0,
    })),
    analysis: {
      skillScore: payload.skill_audit?.overall ?? null,
      skillLevel: payload.skill_audit?.demonstrated_level ?? null,
      strongSkills,
      weakAreas,
      suggestions,
    },
  };
};

const toErrorMessage = (payload, fallback) =>
  payload?.detail || payload?.error || fallback;

export const getApiBaseLabel = () =>
  configuredBase || 'Auto-detects http://localhost:5000 or http://localhost:8000';

export const analyzeProfile = async (username) => {
  const failures = [];

  for (const base of getCandidateBases()) {
    try {
      const nodeResponse = await fetch(`${base}/analyze/${encodeURIComponent(username)}`);
      const nodePayload = await readJson(nodeResponse);

      if (nodeResponse.ok) {
        return nodePayload;
      }

      failures.push(toErrorMessage(nodePayload, `Analysis failed on ${base}.`));
    } catch (error) {
      failures.push(error.message || `Unable to reach ${base}.`);
    }

    try {
      const pythonResponse = await fetch(`${base}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          github_username: username,
          claimed_level: 'mid',
          target_role: 'full-stack',
          location: 'remote',
        }),
      });
      const pythonPayload = await readJson(pythonResponse);

      if (pythonResponse.ok) {
        return buildPythonAnalysis(pythonPayload, username);
      }

      failures.push(toErrorMessage(pythonPayload, `Analysis failed on ${base}.`));
    } catch (error) {
      failures.push(error.message || `Unable to reach ${base}.`);
    }
  }

  throw new Error(
    failures[0]
      || 'Start the Node API on port 5000 or the FastAPI app on port 8000, then try again.'
  );
};

const verificationRequest = async (path, options = {}) => {
  const failures = [];

  for (const base of getCandidateBases()) {
    try {
      const response = await fetch(`${base}${path}`, options);
      const payload = await readJson(response);

      if (response.ok) {
        return payload;
      }

      failures.push(toErrorMessage(payload, `Request failed on ${base}${path}.`));
    } catch (error) {
      failures.push(error.message || `Unable to reach ${base}${path}.`);
    }
  }

  throw new Error(
    failures[0]
      || 'Verification service is unavailable. Start the backend and try again.'
  );
};

export const fetchVerifiedSkills = async () =>
  verificationRequest('/api/verification/skills');

export const fetchQuizQuestions = async (topic) =>
  verificationRequest(`/api/verification/test/${encodeURIComponent(topic)}`);

export const submitQuizAnswers = async (topic, answers, username = 'demo_user') => {
  const answerMap = Array.isArray(answers)
    ? Object.fromEntries(
        answers.map((entry) => [entry.questionId, entry.answer])
      )
    : answers;

  try {
    return await verificationRequest('/api/verification/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        topic,
        answers: answerMap,
      }),
    });
  } catch (pythonError) {
    const answersArray = Object.entries(answerMap).map(([questionId, answer]) => ({
      questionId: Number(questionId),
      answer,
    }));

    try {
      return await verificationRequest('/api/verification/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          answers: answersArray,
          username,
        }),
      });
    } catch {
      throw pythonError;
    }
  }
};
