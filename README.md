# DevLevelUp

Evidence-first developer career audit tool.

## What this MVP does

- Ingests a GitHub username and inspects public repositories.
- Scores demonstrated skill signals across:
  - code quality
  - architecture
  - testing
  - security
  - documentation
  - delivery
- Optionally audits a live URL for baseline runtime UX/accessibility checks.
- Produces:
  - claimed vs demonstrated level gap
  - role fit recommendations
  - percentile estimate
  - next salary bracket skill gaps
  - 90-day roadmap
  - evidence-based resume bullets

## Run locally

```bash
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn app.main:app --reload
```

Open [http://127.0.0.1:8000](http://127.0.0.1:8000)

### GitHub authentication

Set a GitHub token locally to avoid API rate limits and keep credentials out of source control:

Windows PowerShell:
```powershell
$env:GITHUB_TOKEN = "your_token_here"
```

Windows CMD:
```cmd
set GITHUB_TOKEN=your_token_here
```

macOS / Linux:
```bash
export GITHUB_TOKEN=your_token_here
```

Then start the app normally.

## Node Server

A separate Node.js API server is available in `node_server/`.

To use it:

1. Install dependencies:
   ```bash
   cd node_server
   npm install
   ```
2. Copy `.env.example` to `.env` inside `node_server/` and add your GitHub token there.
3. Run the server:
   ```bash
   npm start
   ```

The Node server exposes a simple endpoint:

- `GET /analyze/:username`

Example:

```bash
curl http://localhost:5000/analyze/octocat
```

## API

`POST /api/analyze`

Example payload:

```json
{
  "github_username": "octocat",
  "live_url": "https://example.com",
  "claimed_level": "mid",
  "target_role": "full-stack",
  "location": "remote"
}
```
