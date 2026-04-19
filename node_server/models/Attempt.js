// In-memory storage for attempts (in production, use a database)
let attempts = [];
let users = []; // Simple user storage with verifiedSkills

class Attempt {
  constructor(username, topic, score, passed) {
    this.id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    this.username = username;
    this.topic = topic;
    this.score = score;
    this.passed = passed;
    this.createdAt = new Date().toISOString();
  }

  static create(username, topic, score, passed) {
    const attempt = new Attempt(username, topic, score, passed);
    attempts.push(attempt);

    // Update user's verified skills if passed
    if (passed) {
      let user = users.find(u => u.username === username);
      if (!user) {
        user = { username, verifiedSkills: [] };
        users.push(user);
      }
      if (!user.verifiedSkills.includes(topic)) {
        user.verifiedSkills.push(topic);
      }
    }

    return attempt;
  }

  static getAttemptsByUser(username) {
    return attempts.filter(attempt => attempt.username === username);
  }

  static getUserVerifiedSkills(username) {
    const user = users.find(u => u.username === username);
    return user ? user.verifiedSkills : [];
  }

  static getAllAttempts() {
    return attempts;
  }

  static getAllUsers() {
    return users;
  }
}

module.exports = Attempt;