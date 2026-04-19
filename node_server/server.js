const path = require('path');
const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const fetch = require('node-fetch');
const verificationRoutes = require('./routes/verificationRoutes');

// Load env from the server folder first, then fall back to the repo root.
dotenv.config({ path: path.resolve(__dirname, '.env') });
dotenv.config({ path: path.resolve(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 5000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/generate';

app.use(cors());
app.use(express.json());

// Verification routes
app.use('/api/verification', verificationRoutes);

console.log(`GITHUB_TOKEN loaded: ${Boolean(GITHUB_TOKEN)}`);

if (!GITHUB_TOKEN) {
  console.warn('Warning: GITHUB_TOKEN is not set. Add it to .env and restart the server.');
}

app.get('/analyze/:username', async (req, res) => {
  const username = req.params.username;

  if (!username) {
    return res.status(400).json({ error: 'Username is required.' });
  }

  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'GITHUB_TOKEN is missing. Set it in .env and restart the server.' });
  }

  const githubHeaders = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'devcareer-node-server',
    ...(GITHUB_TOKEN ? { Authorization: `token ${GITHUB_TOKEN}` } : {}),
  };

  try {
    const userResponse = await fetch(`https://api.github.com/users/${encodeURIComponent(username)}`, {
      headers: githubHeaders,
    });

    if (!userResponse.ok) {
      const message = await userResponse.text();
      return res.status(userResponse.status).json({ error: message || 'GitHub user fetch failed.' });
    }

    const userData = await userResponse.json();

    const repoResponse = await fetch(
      `https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated`,
      { headers: githubHeaders }
    );

    if (!repoResponse.ok) {
      const message = await repoResponse.text();
      return res.status(repoResponse.status).json({ error: message || 'GitHub repos fetch failed.' });
    }

    const allRepos = await repoResponse.json();
    const topRepos = (Array.isArray(allRepos) ? allRepos : [])
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 5)
      .map((repo) => ({
        name: repo.name,
        language: repo.language,
        stars: repo.stargazers_count,
      }));

    const prompt = `
You are a strict interviewer.

Analyze this GitHub user:

Username: ${userData.login}
Repos:
${topRepos.map(r => `- ${r.name} (${r.language})`).join("\n")}

Return ONLY JSON:

{
  "skillScore": number,
  "skillLevel": "Beginner | Intermediate | Advanced",
  "strongSkills": ["..."],
  "weakAreas": ["..."],
  "suggestions": ["..."]
}
`;


    const ollamaResponse = await axios.post("http://localhost:11434/api/generate", {
      model: "phi3",
      prompt: prompt,
      stream: false
    }, {
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 30000,
    });

    const analysis = ollamaResponse.data.response;

    return res.json({
      github: {
        login: userData.login,
        name: userData.name,
        public_repos: userData.public_repos,
        followers: userData.followers,
        bio: userData.bio,
        html_url: userData.html_url,
      },
      repos: topRepos,
      analysis,
    });
  } catch (error) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.error || error.message || 'Internal server error.';
    return res.status(status).json({ error: message });
  }
});

app.get('/', (req, res) => {
  res.send('GitHub Analyzer Node server is running. Use GET /analyze/:username');
});

app.listen(PORT, () => {
  console.log(`GitHub Analyzer server listening on http://localhost:${PORT}`);
});
