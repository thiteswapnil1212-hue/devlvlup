from __future__ import annotations

import os
import re
from dataclasses import dataclass
from typing import Any, Dict, List, Tuple, TypedDict

import httpx


GITHUB_API = "https://api.github.com"
TEST_FILE_PATTERN = re.compile(r"(test|spec)\.(ts|tsx|js|jsx|py|java|go|rb)$", re.IGNORECASE)
DOC_FILE_PATTERN = re.compile(r"(README|CONTRIBUTING|ARCHITECTURE)", re.IGNORECASE)


@dataclass
class RepoSignals:
    name: str
    has_tests: bool
    has_docs: bool
    modularity_signal: float
    naming_signal: float
    security_signal: float
    evidence: List[str]


class ScoreBreakdown(TypedDict):
    code_quality: float
    architecture: float
    testing: float
    security: float
    documentation: float
    delivery: float
    overall: float
    demonstrated_level: str


async def _get_json(client: httpx.AsyncClient, url: str) -> Any:
    response = await client.get(url, timeout=20)
    response.raise_for_status()
    return response.json()


def _score_level(overall: float) -> str:
    if overall < 45:
        return "junior"
    if overall < 72:
        return "mid"
    return "senior"


async def analyze_github_profile(
    username: str,
) -> Tuple[Dict[str, str], ScoreBreakdown, List[Dict[str, str]]]:
    headers = {"Accept": "application/vnd.github+json", "User-Agent": "devcareer-intel-mvp"}
    github_token = os.getenv("GITHUB_TOKEN")
    if github_token:
        headers["Authorization"] = f"token {github_token}"

    async with httpx.AsyncClient(headers=headers) as client:
        user = await _get_json(client, f"{GITHUB_API}/users/{username}")
        repos = await _get_json(
            client, f"{GITHUB_API}/users/{username}/repos?per_page=100&sort=updated"
        )

        repo_signals: List[RepoSignals] = []
        for repo in repos[:12]:
            repo_name = repo["name"]
            tree_url = f"{GITHUB_API}/repos/{username}/{repo_name}/git/trees/{repo.get('default_branch', 'main')}?recursive=1"
            try:
                tree = await _get_json(client, tree_url)
                file_paths = [node["path"] for node in tree.get("tree", []) if node.get("type") == "blob"]
            except Exception:
                file_paths = []

            has_tests = any(TEST_FILE_PATTERN.search(p) for p in file_paths)
            has_docs = any(DOC_FILE_PATTERN.search(p) for p in file_paths)
            src_dirs = {p.split("/")[0] for p in file_paths if "/" in p}
            modularity = min(len(src_dirs) / 8, 1.0) if src_dirs else 0.2

            snake_or_camel = sum(1 for p in file_paths if re.search(r"[a-z0-9]+(_[a-z0-9]+|[A-Z][a-z0-9]+)", p))
            naming = min((snake_or_camel / max(len(file_paths), 1)) * 2, 1.0)

            insecure_hits = sum(
                1
                for p in file_paths
                if any(x in p.lower() for x in ["secret", "password", ".env", "private_key"])
            )
            security = 1.0 if insecure_hits == 0 else max(0.2, 1 - insecure_hits / 8)

            evidence: List[str] = []
            if not has_tests:
                evidence.append("No obvious test files detected.")
            if not has_docs:
                evidence.append("Missing README/architecture docs signal.")
            if insecure_hits:
                evidence.append("Potential sensitive-file naming patterns found.")

            repo_signals.append(
                RepoSignals(
                    name=repo_name,
                    has_tests=has_tests,
                    has_docs=has_docs,
                    modularity_signal=modularity,
                    naming_signal=naming,
                    security_signal=security,
                    evidence=evidence,
                )
            )

    if not repo_signals:
        raise ValueError("No analyzable public repositories found.")

    test_ratio = sum(1 for r in repo_signals if r.has_tests) / len(repo_signals)
    docs_ratio = sum(1 for r in repo_signals if r.has_docs) / len(repo_signals)
    modularity_avg = sum(r.modularity_signal for r in repo_signals) / len(repo_signals)
    naming_avg = sum(r.naming_signal for r in repo_signals) / len(repo_signals)
    security_avg = sum(r.security_signal for r in repo_signals) / len(repo_signals)

    base_scores = {
        "code_quality": round((modularity_avg * 55 + naming_avg * 45), 2),
        "architecture": round(modularity_avg * 100, 2),
        "testing": round(test_ratio * 100, 2),
        "security": round(security_avg * 100, 2),
        "documentation": round(docs_ratio * 100, 2),
        "delivery": min(100.0, max(20.0, len(repo_signals) * 7.5)),
    }
    overall = round(sum(base_scores.values()) / len(base_scores), 2)
    score_breakdown: ScoreBreakdown = {
        "code_quality": base_scores["code_quality"],
        "architecture": base_scores["architecture"],
        "testing": base_scores["testing"],
        "security": base_scores["security"],
        "documentation": base_scores["documentation"],
        "delivery": base_scores["delivery"],
        "overall": overall,
        "demonstrated_level": _score_level(overall),
    }

    evidence_rows: List[Dict[str, str]] = []
    for repo in repo_signals:
        for note in repo.evidence:
            evidence_rows.append(
                {
                    "repository": repo.name,
                    "finding": note,
                    "impact": "Can reduce hiring confidence during code review.",
                }
            )

    profile = {
        "username": username,
        "public_repos": str(user.get("public_repos", 0)),
        "followers": str(user.get("followers", 0)),
    }

    return profile, score_breakdown, evidence_rows
