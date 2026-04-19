# Product Requirements Document (PRD)

## Product
**DevCareer Intelligence MVP**

A developer career audit tool that evaluates a GitHub profile, produces evidence-based insights, and recommends actionable career improvements.

---

## 1. Vision

Enable developers to quickly assess how their public GitHub work aligns with claimed experience and role goals, and provide concrete improvement recommendations for hiring readiness.

---

## 2. Target Users

- Individual developers preparing for job applications
- Engineers wanting evidence-based resume bullets
- Career coaches evaluating public portfolio readiness
- Hiring managers interested in objective skill signals

---

## 3. Current Workspace Summary

### Backend
- `app/main.py`
  - FastAPI app exposing:
    - `GET /` → HTML dashboard
    - `POST /api/analyze` → analysis API
  - Uses environment variable `GITHUB_TOKEN` via `dotenv`

### Models
- `app/models.py`
  - `AnalyzeRequest`
  - `AnalyzeResponse`
  - `SkillAudit`
  - `LiveAudit`
  - `JobFit`
  - `GapItem`
  - `RoadmapWeek`
  - `EvidenceItem`

### Services
- `app/services/github_analyzer.py`
  - Fetches GitHub user and repos via GitHub REST API
  - Inspects repo tree for:
    - test files
    - docs
    - modularity
    - naming conventions
    - insecure file patterns
  - Scores:
    - code_quality
    - architecture
    - testing
    - security
    - documentation
    - delivery

- `app/services/live_audit.py`
  - Optionally audits live URL
  - Checks:
    - response time
    - viewport meta
    - semantic landmarks
    - form labels
  - Produces a baseline runtime UX/accessibility score

- `app/services/career_engine.py`
  - Creates gap actions and roadmap
  - Calculates job fit recommendations
  - Builds claim-gap summary
  - Generates resume rewrite bullets

### Frontend
- `templates/index.html`
  - Form-based dashboard UI
  - Fetches `/api/analyze`
  - Renders scores, evidence, roadmap, live audit summary

- `static/style.css`
  - Dashboard styling

### Node Server
- `node_server/server.js`
  - Separate Node API service
  - Exposes `GET /api/github/:username`
  - Uses `.env` for `GITHUB_TOKEN`

---

## 4. Functional Requirements

### 4.1 GitHub Profile Audit
- Input: GitHub username
- Output:
  - profile metadata
  - per-domain skill scores
  - overall score
  - demonstrated level (`junior`, `mid`, `senior`)
  - evidence findings per repo

### 4.2 Live App Audit
- Optional input: deployed app URL
- Output:
  - response time
  - viewport meta detection
  - landmark presence
  - form label checks
  - notes + score

### 4.3 Career Insights
- Claim vs demonstrated level gap summary
- Role fit recommendations by:
  - target role
  - target location
  - demonstrated level
- Percentile estimate
- Salary-bracket gap actions
- 90-day roadmap based on weakest signals
- Resume bullet rewrite suggestions

---

## 5. API Requirements

### POST `/api/analyze`
Request body:
```json
{
  "github_username": "octocat",
  "live_url": "https://example.com",
  "claimed_level": "mid",
  "target_role": "full-stack",
  "location": "remote"
}
```

Response includes:
- `profile`
- `skill_audit`
- `evidence`
- `live_audit`
- `claim_gap`
- `job_fits`
- `percentile`
- `next_salary_bracket_gap`
- `roadmap_90_days`
- `resume_rewrites`

### GET `/`
- Returns HTML dashboard with client-side form and visualization

### Node API (separate service)
- `GET /api/github/:username`
- Returns profile + repo list for GitHub lookup

---

## 6. Data Model / Scoring Logic

### GitHub scoring
- `code_quality` = modularity + naming
- `architecture` = modularity
- `testing` = test file ratio
- `security` = sensitive path detection
- `documentation` = docs file ratio
- `delivery` = number of repos analyzed

### Level mapping
- overall < 45 → `junior`
- 45 ≤ overall < 72 → `mid`
- overall ≥ 72 → `senior`

---

## 7. Technical Architecture

### Python app
- FastAPI backend
- Jinja2 frontend
- Static CSS
- `httpx` async GitHub API calls
- `dotenv` environment loading

### Node server
- Express + Axios
- optional GitHub PAT via `.env`
- separate service for GitHub profile retrieval

---

## 8. Non-functional Requirements

- Must handle GitHub API rate limits using `GITHUB_TOKEN`
- Should return clear user-facing errors on failed GitHub fetch
- UI must render gracefully on desktop and mobile
- Data should be presented as actionable insights, not just raw scores

---

## 9. Known Limitations / Risks

- Current GitHub analysis uses only public repo tree data
- No authentication or user sessions
- Job fit logic is heuristic-only, not market-validated
- Live audit is shallow and only checks simple HTML features
- Rate limit errors are currently surfaced as `400` from backend

---

## 10. Recommended Next Steps

- Add better GitHub error handling and retry using token
- Build stronger repo/activity analysis (commit history, languages)
- Add real user onboarding and auth
- Improve UI to show personal roadmap progress and saved reports
- Integrate Node service into main app if needed or document as separate microservice

---

## 11. Delivery Checklist

- [x] GitHub username analysis
- [x] Live URL audit
- [x] Evidence and gap reporting
- [x] Resume bullet generation
- [x] Dashboard UI
- [x] Node server for GitHub fetch
- [x] `.env` token config support

---

**Version:** 0.1.0  
**Last Updated:** April 18, 2026  
**Status:** MVP Complete, Running
