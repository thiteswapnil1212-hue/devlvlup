/**
 * Calculates the score of a quiz submission based on arrays.
 * 
 * @param {Array} userAnswers - Array of user's selected answers
 * @param {Array} correctAnswers - Array of correct answers matching the indices
 * @returns {Object} { correctCount, scorePercentage, passed }
 */
const calculateQuizScore = (userAnswers, correctAnswers) => {
  if (!userAnswers || !correctAnswers) {
    return { correctCount: 0, scorePercentage: 0, passed: false };
  }

  let correctCount = 0;
  
  for (let i = 0; i < Math.min(userAnswers.length, correctAnswers.length); i++) {
    if (userAnswers[i] === correctAnswers[i]) {
      correctCount += 1;
    }
  }

  const totalQuestions = 10;
  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);
  
  // Pass condition: >= 70%
  const passed = scorePercentage >= 70;

  return {
    correctCount,
    scorePercentage,
    passed
  };
};

module.exports = {
  calculateQuizScore
};
