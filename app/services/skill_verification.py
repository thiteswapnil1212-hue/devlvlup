"""
Skill Verification Service
Handles quiz logic, scoring, and verified skill management
"""

from app.quiz_data import get_questions_by_topic, get_correct_answers, get_topics
from app.database import (
    save_attempt,
    add_verified_skill,
    get_verified_skills,
    get_attempts,
)


PASS_SCORE_THRESHOLD = 7  # 7 out of 10 to pass


def get_available_topics():
    """Get all available topics for skill verification."""
    return get_topics()


def fetch_quiz_questions(topic: str):
    """Fetch 10 random MCQ questions for a topic."""
    if topic not in get_topics():
        return None
    
    return get_questions_by_topic(topic, count=10)


def evaluate_quiz(username: str, topic: str, answers: dict) -> dict:
    """
    Evaluate quiz submission and calculate score.
    
    Args:
        username: User identifier
        topic: Topic being tested
        answers: Dict of {question_id: selected_option_index}
    
    Returns:
        Dict with score, passed status, message, and verified skills
    """
    if topic not in get_topics():
        return {
            "score": 0,
            "passed": False,
            "message": "Invalid topic",
            "verifiedSkills": []
        }
    
    # Get correct answers
    question_ids = list(answers.keys())
    correct_answers = get_correct_answers(topic, question_ids)
    
    # Calculate score
    score = 0
    for q_id, selected_option in answers.items():
        if q_id in correct_answers:
            if correct_answers[q_id] == selected_option:
                score += 1
    
    # Determine pass/fail
    passed = score >= PASS_SCORE_THRESHOLD
    
    # Add verified skill if passed
    if passed:
        add_verified_skill(username, topic)
    
    # Save attempt
    save_attempt(username, topic, score, passed)
    
    # Get all verified skills
    verified_skills = get_verified_skills(username)
    
    percentage = score * 10
    pass_percentage = PASS_SCORE_THRESHOLD * 10

    # Generate message
    if passed:
        ai_feedback = f"Strong fundamentals shown in {topic}."
        message = f"🎉 Congratulations! You passed {topic} with a score of {percentage}%. '{topic}' has been added to your verified skills!\n\nAI Feedback: {ai_feedback}"
    else:
        ai_feedback = "You need improvement in arrays and logic building."
        message = f"Score: {percentage}%. You need {pass_percentage}% to pass. Try again to master {topic}!\n\nAI Feedback: {ai_feedback}"
    
    return {
        "score": score,
        "passed": passed,
        "message": message,
        "verifiedSkills": verified_skills
    }


def get_user_verified_skills(username: str):
    """Get list of user's verified skills."""
    return get_verified_skills(username)


def get_user_attempt_history(username: str, topic: str = None):
    """Get user's quiz attempt history."""
    return get_attempts(username, topic)
