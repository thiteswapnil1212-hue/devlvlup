const { getRandomQuestions, getQuestionsWithIds } = require('../models/Question');
const Attempt = require('../models/Attempt');

const TOPICS = [
  'C', 'C++', 'Java', 'HTML', 'CSS', 'JavaScript',
  'React', 'Node.js', 'Python', 'SQL', 'DSA',
  'Frontend', 'Backend', 'DevOps', 'Data Scientist'
];

const PASS_SCORE_THRESHOLD = 7; // 7 out of 10 to pass

class VerificationController {
  // GET /api/verification/topics
  static getTopics(req, res) {
    try {
      res.json({
        topics: TOPICS,
        count: TOPICS.length
      });
    } catch (error) {
      console.error('Error getting topics:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /api/verification/test/:topic
  static getQuizQuestions(req, res) {
    try {
      const { topic } = req.params;

      if (!TOPICS.includes(topic)) {
        return res.status(400).json({ error: 'Invalid topic' });
      }

      const questions = getRandomQuestions(topic, 10);

      if (questions.length === 0) {
        return res.status(404).json({ error: 'No questions available for this topic' });
      }

      // Remove correct answers from response for security, keep stable ids
      const sanitizedQuestions = questions.map(q => ({
        id: q.id,
        question: q.question,
        options: q.options
      }));

      res.json({
        topic,
        questions: sanitizedQuestions,
        totalQuestions: sanitizedQuestions.length
      });
    } catch (error) {
      console.error('Error getting quiz questions:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // POST /api/verification/submit
  static submitQuiz(req, res) {
    try {
      const { topic, answers } = req.body;

      // Basic validation
      if (!topic || !answers || !Array.isArray(answers)) {
        return res.status(400).json({ error: 'Invalid request data' });
      }

      if (!TOPICS.includes(topic)) {
        return res.status(400).json({ error: 'Invalid topic' });
      }

      // For demo purposes, we'll use a mock username
      // In production, get from authentication
      const username = req.body.username || 'demo_user';

      // Reconstruct the question bank with stable ids
      const allQuestions = getQuestionsWithIds(topic);
      const questionMap = new Map(allQuestions.map((question) => [question.id, question]));

      if (answers.length === 0) {
        return res.status(400).json({ error: 'No answers provided' });
      }

      let correctAnswers = 0;
      const results = answers.map((answerEntry) => {
        const { questionId, answer } = answerEntry;
        const question = questionMap.get(questionId);

        if (!question) {
          return {
            questionId,
            userAnswer: answer,
            correctAnswer: null,
            isCorrect: false,
            error: 'Question not found'
          };
        }

        const isCorrect = answer === question.answer;
        if (isCorrect) correctAnswers++;

        return {
          questionId,
          question: question.question,
          userAnswer: answer,
          correctAnswer: question.answer,
          isCorrect
        };
      });

      const score = correctAnswers;
      const passed = score >= PASS_SCORE_THRESHOLD;

      // Save attempt
      const attempt = Attempt.create(username, topic, score, passed);

      // Prepare response
      const response = {
        topic,
        score,
        totalQuestions: answers.length,
        passed,
        message: passed
          ? `Congratulations! You passed with ${score}/${answers.length}. Verified skill badge earned!`
          : `Score: ${score}/${answers.length}. You need ${PASS_SCORE_THRESHOLD} points to pass. Try again to master ${topic}!`,
        verifiedSkills: Attempt.getUserVerifiedSkills(username),
        attemptId: attempt.id,
        details: results
      };

      res.json(response);
    } catch (error) {
      console.error('Error submitting quiz:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /api/verification/history
  static getHistory(req, res) {
    try {
      // For demo purposes, return all attempts
      // In production, filter by authenticated user
      const username = req.query.username || 'demo_user';

      const userAttempts = Attempt.getAttemptsByUser(username);

      res.json({
        username,
        attempts: userAttempts,
        totalAttempts: userAttempts.length,
        verifiedSkills: Attempt.getUserVerifiedSkills(username)
      });
    } catch (error) {
      console.error('Error getting history:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }

  // GET /api/verification/skills
  static getVerifiedSkills(req, res) {
    try {
      const username = req.query.username || 'demo_user';
      const verifiedSkills = Attempt.getUserVerifiedSkills(username);

      res.json({
        username,
        verifiedSkills,
        count: verifiedSkills.length
      });
    } catch (error) {
      console.error('Error getting verified skills:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
}

module.exports = VerificationController;