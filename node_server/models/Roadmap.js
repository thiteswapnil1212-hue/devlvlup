const mongoose = require('mongoose');

const roadmapSchema = new mongoose.Schema({
  githubUsername: {
    type: String,
    required: true,
    index: true
  },
  targetRole: {
    type: String,
    required: true
  },
  skillsSnapshot: {
    frontend: Number,
    backend: Number,
    dsa: Number,
    python: Number,
    devops: Number
  },
  quizScore: {
    type: Number,
    default: 0
  },
  reason: {
    type: String
  },
  roadmap: [{
    week: Number,
    focus: String,
    topics: [String],
    tasks: [String],
    project: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Roadmap', roadmapSchema);
