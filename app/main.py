from pathlib import Path

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

load_dotenv()

from app.models import (
    AnalyzeRequest,
    AnalyzeResponse,
    DomainScore,
    EvidenceItem,
    GapItem,
    JobFit,
    LiveAudit,
    RoadmapWeek,
    SkillAudit,
)
from app.routes.verification import router as verification_router
from app.services.career_engine import (
    build_gap_actions,
    build_job_fits,
    build_roadmap,
    claim_gap,
    percentile_from_overall,
    rewrite_resume_bullets,
)
from app.services.github_analyzer import analyze_github_profile
from app.services.live_audit import audit_live_url

BASE_DIR = Path(__file__).resolve().parent.parent

app = FastAPI(title="DevLevelUp", version="0.1.0")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.mount("/static", StaticFiles(directory=str(BASE_DIR / "static")), name="static")
templates = Jinja2Templates(directory=str(BASE_DIR / "templates"))
app.include_router(verification_router)


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    return templates.TemplateResponse(request=request, name="index.html")


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze(payload: AnalyzeRequest):
    try:
        profile, scores, evidence = await analyze_github_profile(payload.github_username)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"GitHub analysis failed: {exc}") from exc

    live = await audit_live_url(str(payload.live_url) if payload.live_url else None)
    overall = scores["overall"]
    demonstrated_level = scores["demonstrated_level"]
    numeric_scores = {
        "code_quality": scores["code_quality"],
        "architecture": scores["architecture"],
        "testing": scores["testing"],
        "security": scores["security"],
        "documentation": scores["documentation"],
        "delivery": scores["delivery"],
    }

    skill_audit = SkillAudit(
        code_quality=DomainScore(
            value=scores["code_quality"],
            rationale="Based on repository structure, naming consistency, and modular layout signals.",
        ),
        architecture=DomainScore(
            value=scores["architecture"],
            rationale="Estimated from project decomposition and folder boundaries.",
        ),
        testing=DomainScore(
            value=scores["testing"],
            rationale="Inferred from test/spec file presence across active repositories.",
        ),
        security=DomainScore(
            value=scores["security"],
            rationale="Lowered by potential sensitive-file patterns and unsafe project conventions.",
        ),
        documentation=DomainScore(
            value=scores["documentation"],
            rationale="Measured via README/architecture-document presence.",
        ),
        delivery=DomainScore(
            value=scores["delivery"],
            rationale="Repository activity and sustained public shipping cadence.",
        ),
        overall=overall,
        demonstrated_level=demonstrated_level,
    )

    gaps = build_gap_actions(numeric_scores)
    evidence_items = [EvidenceItem(**item) for item in evidence]
    live_audit = LiveAudit(**live)
    job_fits = [JobFit(**item) for item in build_job_fits(payload.target_role, payload.location, overall, demonstrated_level)]
    gap_items = [GapItem(**item) for item in gaps]
    roadmap_weeks = [RoadmapWeek(**item) for item in build_roadmap(gaps)]

    response = AnalyzeResponse(
        profile=profile,
        skill_audit=skill_audit,
        evidence=evidence_items,
        live_audit=live_audit,
        claim_gap=claim_gap(payload.claimed_level, demonstrated_level),
        job_fits=job_fits,
        percentile=percentile_from_overall(overall),
        next_salary_bracket_gap=gap_items,
        roadmap_90_days=roadmap_weeks,
        resume_rewrites=rewrite_resume_bullets(numeric_scores, payload.target_role),
    )
    return response
