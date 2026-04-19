from typing import Dict, List, Optional

from pydantic import BaseModel, Field, HttpUrl


class AnalyzeRequest(BaseModel):
    github_username: str = Field(..., min_length=1, description="GitHub username to audit")
    live_url: Optional[HttpUrl] = Field(None, description="Optional deployed app URL")
    claimed_level: str = Field(
        "mid",
        description="Self-reported level: junior, mid, senior",
        pattern="^(junior|mid|senior)$",
    )
    target_role: str = Field("full-stack", description="Target role for market-fit scoring")
    location: str = Field("remote", description="Preferred location")


class EvidenceItem(BaseModel):
    repository: str
    finding: str
    impact: str


class DomainScore(BaseModel):
    value: float
    rationale: str


class SkillAudit(BaseModel):
    code_quality: DomainScore
    architecture: DomainScore
    testing: DomainScore
    security: DomainScore
    documentation: DomainScore
    delivery: DomainScore
    overall: float
    demonstrated_level: str


class LiveAudit(BaseModel):
    url: Optional[str] = None
    response_time_ms: Optional[float] = None
    has_viewport_meta: Optional[bool] = None
    has_landmarks: Optional[bool] = None
    has_form_labels: Optional[bool] = None
    notes: List[str] = Field(default_factory=list)
    score: Optional[float] = None


class JobFit(BaseModel):
    role: str
    company_type: str
    location: str
    match_score: float
    why: str


class GapItem(BaseModel):
    skill: str
    why_it_matters: str
    action: str
    roi: str


class RoadmapWeek(BaseModel):
    week: int
    objective: str
    deliverable: str
    success_check: str


class AnalyzeResponse(BaseModel):
    profile: Dict[str, str]
    skill_audit: SkillAudit
    evidence: List[EvidenceItem]
    live_audit: LiveAudit
    claim_gap: str
    job_fits: List[JobFit]
    percentile: int
    next_salary_bracket_gap: List[GapItem]
    roadmap_90_days: List[RoadmapWeek]
    resume_rewrites: List[str]


# Skill Verification Models
class QuizQuestion(BaseModel):
    id: int
    topic: str
    question: str
    options: List[str]


class SubmitAnswerRequest(BaseModel):
    topic: str
    answers: Dict[int, int]  # question_id: selected_option_index


class QuizAttempt(BaseModel):
    id: Optional[int] = None
    topic: str
    score: int
    passed: bool
    createdAt: Optional[str] = None


class VerificationResponse(BaseModel):
    score: int
    passed: bool
    message: str
    verifiedSkills: List[str]
