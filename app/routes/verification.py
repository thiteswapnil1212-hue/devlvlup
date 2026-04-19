from fastapi import APIRouter, HTTPException

from app.models import SubmitAnswerRequest, VerificationResponse
from app.services.skill_verification import (
    evaluate_quiz,
    fetch_quiz_questions,
    get_available_topics,
    get_user_verified_skills,
)

router = APIRouter(prefix="/api/verification", tags=["skill-verification"])

DEFAULT_USERNAME = "anonymous"


@router.get("/topics")
async def get_topics():
    """Get all available topics for skill verification."""
    topics = get_available_topics()
    return {"topics": topics, "count": len(topics)}


@router.get("/test/{topic}")
async def get_quiz(topic: str):
    """Get 10 random MCQ questions for a specific topic."""
    questions = fetch_quiz_questions(topic)
    if questions is None:
        raise HTTPException(status_code=404, detail=f"Topic '{topic}' not found")
    return {"topic": topic, "questions": questions, "total": len(questions)}


@router.post("/submit", response_model=VerificationResponse)
async def submit_quiz(payload: SubmitAnswerRequest):
    """
    Submit quiz answers and get results.
    Requires: topic and answers dict with question_id: selected_option_index
    """
    try:
        result = evaluate_quiz(DEFAULT_USERNAME, payload.topic, payload.answers)
        return VerificationResponse(**result)
    except Exception as exc:
        raise HTTPException(status_code=400, detail=f"Quiz submission failed: {exc}") from exc


@router.get("/skills")
async def get_verified_skills():
    """Get user's verified skills."""
    skills = get_user_verified_skills(DEFAULT_USERNAME)
    return {"verifiedSkills": skills, "count": len(skills)}


@router.get("/history")
async def get_history():
    """Get user's quiz attempt history."""
    from app.services.skill_verification import get_user_attempt_history
    history = get_user_attempt_history(DEFAULT_USERNAME)
    return {"history": history, "count": len(history)}
