import re
import time
from typing import Dict, Optional

import httpx


LANDMARK_TAGS = ("header", "main", "nav", "footer", "aside")


def _flag(pattern: str, text: str) -> bool:
    return bool(re.search(pattern, text, flags=re.IGNORECASE))


async def audit_live_url(url: Optional[str]) -> Dict:
    if not url:
        return {
            "url": None,
            "response_time_ms": None,
            "has_viewport_meta": None,
            "has_landmarks": None,
            "has_form_labels": None,
            "notes": ["No live URL provided. Skipped runtime UX audit."],
            "score": None,
        }

    notes = []
    started = time.perf_counter()
    try:
        async with httpx.AsyncClient(follow_redirects=True) as client:
            response = await client.get(url, timeout=20)
            html = response.text
    except Exception as exc:
        return {
            "url": url,
            "response_time_ms": None,
            "has_viewport_meta": False,
            "has_landmarks": False,
            "has_form_labels": False,
            "notes": [f"Live audit failed: {exc}"],
            "score": 0.0,
        }

    elapsed_ms = round((time.perf_counter() - started) * 1000, 2)

    has_viewport = _flag(r'<meta[^>]+name=["\']viewport["\']', html)
    has_landmarks = any(f"<{tag}" in html.lower() for tag in LANDMARK_TAGS)
    has_form_labels = _flag(r"<label[^>]*for=", html)

    if elapsed_ms > 1500:
        notes.append("Slow first response (>1.5s).")
    if not has_viewport:
        notes.append("Missing viewport meta; mobile responsiveness risk.")
    if not has_landmarks:
        notes.append("Semantic landmarks missing; accessibility navigation weak.")
    if not has_form_labels and "<form" in html.lower():
        notes.append("Forms detected with weak explicit label usage.")

    score = 100.0
    score -= 20 if elapsed_ms > 1500 else 0
    score -= 20 if not has_viewport else 0
    score -= 20 if not has_landmarks else 0
    score -= 20 if (not has_form_labels and "<form" in html.lower()) else 0
    score = max(0.0, score)

    if not notes:
        notes.append("Baseline runtime checks look healthy for MVP-level quality.")

    return {
        "url": url,
        "response_time_ms": elapsed_ms,
        "has_viewport_meta": has_viewport,
        "has_landmarks": has_landmarks,
        "has_form_labels": has_form_labels,
        "notes": notes,
        "score": score,
    }
