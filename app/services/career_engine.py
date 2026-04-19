from typing import Dict, List, Tuple


LEVEL_ORDER = {"junior": 1, "mid": 2, "senior": 3}


def claim_gap(claimed: str, demonstrated: str) -> str:
    delta = LEVEL_ORDER.get(claimed, 2) - LEVEL_ORDER.get(demonstrated, 2)
    if delta <= -1:
        return f"You may be underselling yourself. Demonstrated level trends toward {demonstrated}."
    if delta == 0:
        return f"Claim and demonstrated level both align around {demonstrated}."
    return (
        f"Claimed level ({claimed}) appears above demonstrated output ({demonstrated}). "
        "Focus on concrete improvements before targeting higher-level interviews."
    )


def percentile_from_overall(overall: float) -> int:
    return max(5, min(99, int(overall)))


def build_job_fits(target_role: str, location: str, overall: float, demonstrated_level: str) -> List[Dict]:
    base = overall
    level_modifier = {"junior": -8, "mid": 0, "senior": 7}[demonstrated_level]
    role_bonus = 5 if target_role.lower() in {"full-stack", "backend", "frontend", "ai-ml-engineer", "software-engineer", "devops-engineer", "frontend-engineer", "backend-engineer", "data-scientist"} else 0
    score = max(0.0, min(100.0, base + level_modifier + role_bonus))

    return [
        {
            "role": f"{target_role.title()} Engineer",
            "company_type": "Growth-stage startup",
            "location": location,
            "match_score": round(score, 2),
            "why": "Breadth across public repos and delivery consistency aligns with practical hiring filters.",
        },
        {
            "role": f"Product Engineer ({demonstrated_level.title()})",
            "company_type": "SMB SaaS company",
            "location": "remote",
            "match_score": round(max(0.0, score - 6), 2),
            "why": "Solid generalist baseline; raise testing/security signals for stronger conversion.",
        },
        {
            "role": "Software Engineer II",
            "company_type": "Enterprise",
            "location": location,
            "match_score": round(max(0.0, score - 12), 2),
            "why": "Enterprise interviews usually require stronger architecture and reliability narratives.",
        },
    ]


def build_gap_actions(scores: Dict[str, float]) -> List[Dict]:
    ordered = sorted(
        [
            ("Testing depth", scores["testing"]),
            ("Security hygiene", scores["security"]),
            ("Architecture clarity", scores["architecture"]),
            ("Documentation quality", scores["documentation"]),
        ],
        key=lambda x: x[1],
    )
    items = []
    for name, score in ordered[:3]:
        items.append(
            {
                "skill": name,
                "why_it_matters": f"Current signal is {score:.1f}/100, below typical mid-to-senior hiring bar.",
                "action": f"Ship one visible improvement project proving {name.lower()} with tests and docs.",
                "roi": "High",
            }
        )
    return items


def build_roadmap(gaps: List[Dict]) -> List[Dict]:
    weeks = []
    week = 1
    for gap in gaps:
        for i in range(4):
            weeks.append(
                {
                    "week": week,
                    "objective": f"{gap['skill']} sprint - phase {i + 1}",
                    "deliverable": f"Commit-backed milestone proving {gap['skill'].lower()} progress.",
                    "success_check": "Merged code + README note + at least one test artifact.",
                }
            )
            week += 1
    return weeks[:12]


def rewrite_resume_bullets(scores: Dict[str, float], target_role: str) -> List[str]:
    return [
        (
            f"Audited and improved {target_role} repositories to raise maintainability, "
            f"lifting code-quality indicators to {scores['code_quality']:.1f}/100 through modular refactors."
        ),
        (
            f"Increased engineering reliability by prioritizing testing and security hardening, "
            f"achieving measured signals of {scores['testing']:.1f}/100 (testing) and {scores['security']:.1f}/100 (security)."
        ),
        "Established evidence-based engineering documentation patterns across projects to improve team onboarding and review speed.",
    ]
