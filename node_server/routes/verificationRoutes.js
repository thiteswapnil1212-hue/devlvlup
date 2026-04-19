const express = require('express');
const router = express.Router();
const VerificationController = require('../controllers/verificationController');

// GET /api/verification/topics - Get all available topics
router.get('/topics', VerificationController.getTopics);

// GET /api/verification/test/:topic - Get quiz questions for a topic
router.get('/test/:topic', VerificationController.getQuizQuestions);

// POST /api/verification/submit - Submit quiz answers
router.post('/submit', VerificationController.submitQuiz);

// GET /api/verification/history - Get user's quiz attempt history
router.get('/history', VerificationController.getHistory);

// GET /api/verification/skills - Get user's verified skills
router.get('/skills', VerificationController.getVerifiedSkills);

module.exports = router;