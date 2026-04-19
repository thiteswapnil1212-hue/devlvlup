import sqlite3
import os
from datetime import datetime
from typing import List, Dict

DB_PATH = os.path.join(os.path.dirname(__file__), "..", "skill_verification.db")


def init_db():
    """Initialize the database with required tables."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # Users verified skills
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user_skills (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            verified_skills TEXT DEFAULT '[]',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Quiz attempts
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            topic TEXT NOT NULL,
            score INTEGER NOT NULL,
            passed BOOLEAN NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def get_verified_skills(username: str) -> List[str]:
    """Get list of verified skills for a user."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("SELECT verified_skills FROM user_skills WHERE username = ?", (username,))
    result = cursor.fetchone()
    conn.close()
    
    if result:
        import json
        return json.loads(result[0])
    return []


def add_verified_skill(username: str, topic: str) -> bool:
    """Add a verified skill to user profile."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        import json
        skills = get_verified_skills(username)
        
        # Avoid duplicates
        if topic not in skills:
            skills.append(topic)
        
        cursor.execute("SELECT id FROM user_skills WHERE username = ?", (username,))
        result = cursor.fetchone()
        
        if result:
            cursor.execute("UPDATE user_skills SET verified_skills = ? WHERE username = ?", 
                         (json.dumps(skills), username))
        else:
            cursor.execute("INSERT INTO user_skills (username, verified_skills) VALUES (?, ?)",
                         (username, json.dumps(skills)))
        
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error adding skill: {e}")
        conn.close()
        return False


def save_attempt(username: str, topic: str, score: int, passed: bool) -> bool:
    """Save a quiz attempt."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    try:
        cursor.execute(
            "INSERT INTO quiz_attempts (username, topic, score, passed) VALUES (?, ?, ?, ?)",
            (username, topic, score, passed)
        )
        conn.commit()
        conn.close()
        return True
    except Exception as e:
        print(f"Error saving attempt: {e}")
        conn.close()
        return False


def get_attempts(username: str, topic: str = None) -> List[Dict]:
    """Get quiz attempts for a user."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    
    if topic:
        cursor.execute(
            "SELECT * FROM quiz_attempts WHERE username = ? AND topic = ? ORDER BY created_at DESC",
            (username, topic)
        )
    else:
        cursor.execute(
            "SELECT * FROM quiz_attempts WHERE username = ? ORDER BY created_at DESC",
            (username,)
        )
    
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


# Initialize DB on import
init_db()
