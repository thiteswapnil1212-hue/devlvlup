const express = require('express');
const router = express.Router();
const Roadmap = require('../models/Roadmap');

const getRoleBaseRoadmap = (targetRole) => {
  switch (targetRole) {
    case 'AI Engineer':
      return [
        { focus: 'Python for AI', topics: ['NumPy arrays', 'Pandas basics'], tasks: ['Learn core libraries'], project: 'Data manipulation script' },
        { focus: 'Linear Algebra', topics: ['Matrix multiplication', 'Dot product'], tasks: ['Compute math operations'], project: 'Linear algebra visualizer' },
        { focus: 'Probability', topics: ['Distributions', 'Bayes theorem'], tasks: ['Calculate probabilities'], project: 'Naive Bayes classifier' },
        { focus: 'Regression', topics: ['Linear Regression', 'scikit-learn'], tasks: ['Implement Linear Regression'], project: 'Predictive model' },
        { focus: 'Classification', topics: ['Logistic Regression', 'Decision boundaries'], tasks: ['Build a classifier'], project: 'Spam filter' },
        { focus: 'Trees', topics: ['Decision Trees', 'Random Forests'], tasks: ['Train tree models'], project: 'Feature importance analyzer' },
        { focus: 'Neural Nets', topics: ['Perceptron', 'Activation functions'], tasks: ['Build basic neural network'], project: 'Simple feedforward net' },
        { focus: 'CNN basics', topics: ['Convolution', 'Pooling'], tasks: ['MNIST demo'], project: 'Digit recognizer' },
        { focus: 'NLP basics', topics: ['Tokenization', 'Word embeddings'], tasks: ['Process text data'], project: 'Sentiment analyzer' },
        { focus: 'Transformers', topics: ['Attention mechanism', 'BERT intro'], tasks: ['Use pre-trained models'], project: 'Text generator' },
        { focus: 'Reinforcement Learning', topics: ['Q-Learning'], tasks: ['CartPole demo'], project: 'RL agent' },
        { focus: 'Deployment', topics: ['Flask/FastAPI'], tasks: ['Serve ML model'], project: 'API for ML predictions' }
      ];
    case 'DevOps':
      return [
        { focus: 'Linux commands', topics: ['Navigation', 'Permissions', 'Processes'], tasks: ['Learn CLI'], project: 'Linux environment setup' },
        { focus: 'Shell scripting', topics: ['Bash basics'], tasks: ['Automate a daily task'], project: 'Backup script' },
        { focus: 'Git basics', topics: ['Clone', 'Commit', 'Push', 'Pull'], tasks: ['Manage version control'], project: 'Local repo setup' },
        { focus: 'Git branching', topics: ['Merge conflicts', 'Pull requests'], tasks: ['Collaborate via Git'], project: 'Team workflow simulation' },
        { focus: 'CI/CD basics', topics: ['GitHub Actions'], tasks: ['Write a workflow'], project: 'Automated test runner' },
        { focus: 'Docker', topics: ['Containers'], tasks: ['Build and run a container'], project: 'Dockerized app' },
        { focus: 'Docker Compose', topics: ['Multi-container setup'], tasks: ['Link containers'], project: 'App + DB orchestration' },
        { focus: 'Kubernetes basics', topics: ['Pods', 'Services'], tasks: ['Deploy a pod and service'], project: 'Mini K8s cluster' },
        { focus: 'Terraform', topics: ['IaC basics'], tasks: ['Write a simple IaC script'], project: 'Cloud infrastructure provisioning' },
        { focus: 'Monitoring', topics: ['Prometheus', 'Grafana'], tasks: ['Set up dashboard'], project: 'System health monitor' },
        { focus: 'Logging', topics: ['ELK stack basics'], tasks: ['Elasticsearch', 'Kibana'], project: 'Centralized log viewer' },
        { focus: 'Security', topics: ['Secrets management'], tasks: ['Vault', 'K8s secrets'], project: 'Secure deployment' }
      ];
    case 'Data Science':
      return [
        { focus: 'Python essentials', topics: ['NumPy arrays', 'Pandas basics'], tasks: ['Learn data structures'], project: 'Data parsing tool' },
        { focus: 'Data cleaning', topics: ['Missing values', 'Duplicates'], tasks: ['Handle dirty data'], project: 'Data sanitizer' },
        { focus: 'Data visualization', topics: ['Matplotlib', 'Seaborn'], tasks: ['Create plots'], project: 'Visual data report' },
        { focus: 'Exploratory Data Analysis', topics: ['Summary stats', 'Correlations'], tasks: ['Perform EDA'], project: 'Dataset insights dashboard' },
        { focus: 'Regression', topics: ['Linear Regression', 'scikit-learn'], tasks: ['Fit regression lines'], project: 'Trend predictor' },
        { focus: 'Classification', topics: ['Logistic Regression', 'Decision boundaries'], tasks: ['Classify data'], project: 'Binary classifier' },
        { focus: 'Model evaluation', topics: ['Accuracy', 'Precision', 'Recall', 'F1'], tasks: ['Evaluate models'], project: 'Model comparison matrix' },
        { focus: 'Trees & Ensembles', topics: ['Decision Trees', 'Random Forests'], tasks: ['Build ensemble models'], project: 'Robust predictor' },
        { focus: 'Clustering', topics: ['K-Means', 'Hierarchical clustering'], tasks: ['Group unlabeled data'], project: 'Customer segmentation' },
        { focus: 'Dimensionality reduction', topics: ['PCA basics'], tasks: ['Reduce features'], project: 'Data compressor' },
        { focus: 'Neural networks', topics: ['Perceptron', 'Activation functions'], tasks: ['Train basic NN'], project: 'Non-linear model' },
        { focus: 'Deep learning intro', topics: ['Feedforward NN', 'TensorFlow/PyTorch'], tasks: ['Build simple NN'], project: 'Deep learning classifier' }
      ];
    case 'Gen AI Engineer':
      return [
        { focus: 'Python refresher', topics: ['NumPy', 'Pandas', 'Matplotlib'], tasks: ['Review libraries'], project: 'Data prep tool' },
        { focus: 'Machine Learning basics', topics: ['Regression', 'Classification'], tasks: ['scikit-learn basics'], project: 'Basic ML pipeline' },
        { focus: 'Deep Learning basics', topics: ['Perceptron', 'Activation functions'], tasks: ['Feedforward NN'], project: 'Neural network from scratch' },
        { focus: 'PyTorch/TensorFlow setup', topics: ['Framework basics'], tasks: ['Train simple NN on MNIST'], project: 'Image classifier' },
        { focus: 'Autoencoders', topics: ['Compress', 'Reconstruct'], tasks: ['Build autoencoder'], project: 'Image compressor' },
        { focus: 'Variational Autoencoders', topics: ['VAE basics'], tasks: ['Generate new samples'], project: 'Generative model' },
        { focus: 'GAN basics', topics: ['Generator', 'Discriminator'], tasks: ['Train on simple dataset'], project: 'Basic GAN' },
        { focus: 'Conditional GANs', topics: ['Conditioned generation'], tasks: ['Generate images on labels'], project: 'Labeled image generator' },
        { focus: 'Word embeddings', topics: ['Word2Vec', 'GloVe basics'], tasks: ['Train embeddings'], project: 'Text similarity tool' },
        { focus: 'RNNs & LSTMs', topics: ['Sequence modeling'], tasks: ['Text generation demo'], project: 'RNN text generator' },
        { focus: 'Attention mechanism', topics: ['Seq-to-seq models'], tasks: ['Implement attention'], project: 'Machine translation model' },
        { focus: 'Transformers', topics: ['BERT/GPT basics', 'HuggingFace intro'], tasks: ['Use transformers'], project: 'Transformer-based app' }
      ];
    case 'Cybersecurity':
      return [
        { focus: 'Networking basics', topics: ['TCP/IP', 'Ports', 'Protocols'], tasks: ['Understand networks'], project: 'Network scanner' },
        { focus: 'Linux security', topics: ['Permissions', 'Users', 'Firewalls'], tasks: ['Secure an OS'], project: 'Hardened Linux environment' },
        { focus: 'Cryptography basics', topics: ['Hashing', 'Symmetric/Asymmetric keys'], tasks: ['Implement crypto'], project: 'Encryption utility' },
        { focus: 'Web security fundamentals', topics: ['OWASP Top 10'], tasks: ['Identify vulnerabilities'], project: 'Vulnerability scanner' },
        { focus: 'Firewalls & IDS/IPS', topics: ['Network defense'], tasks: ['Configure simple rules'], project: 'Intrusion detection system' },
        { focus: 'Secure authentication', topics: ['MFA', 'OAuth', 'JWT'], tasks: ['Implement secure login'], project: 'Secure auth gateway' },
        { focus: 'Vulnerability scanning', topics: ['Nmap', 'Nessus'], tasks: ['Use scanning tools'], project: 'Network audit report' },
        { focus: 'SIEM basics', topics: ['Log monitoring'], tasks: ['Splunk/ELK setup'], project: 'Centralized log analyzer' },
        { focus: 'Ethical hacking basics', topics: ['Reconnaissance', 'Footprinting'], tasks: ['Gather intelligence'], project: 'OSINT report' },
        { focus: 'Exploitation labs', topics: ['SQL injection', 'XSS demos'], tasks: ['Practice exploits'], project: 'Mock exploit framework' },
        { focus: 'Wireless security', topics: ['WPA2 cracking', 'Securing Wi-Fi'], tasks: ['Audit wireless networks'], project: 'Wi-Fi security analysis' },
        { focus: 'Penetration testing workflow', topics: ['Reporting', 'Remediation'], tasks: ['Conduct full pentest'], project: 'Comprehensive pentest report' }
      ];
    case 'Software Engineer':
    default:
      return [
        { focus: 'Learn a language deeply', topics: ['Syntax', 'Loops', 'Functions'], tasks: ['Java, Python, or C++'], project: 'Console application' },
        { focus: 'Data structures basics', topics: ['Arrays', 'Strings', 'Linked lists'], tasks: ['Implement DS from scratch'], project: 'Custom data structure library' },
        { focus: 'Algorithms basics', topics: ['Sorting', 'Searching', 'Recursion'], tasks: ['Implement algorithms'], project: 'Algorithm visualization' },
        { focus: 'Git & GitHub', topics: ['Commits', 'Branches', 'Pull requests'], tasks: ['Version control'], project: 'Open source contribution mock' },
        { focus: 'Object-Oriented Programming', topics: ['Classes', 'Inheritance', 'Polymorphism'], tasks: ['Apply OOP principles'], project: 'System simulator' },
        { focus: 'Databases', topics: ['SQL queries', 'Schema design', 'Normalization'], tasks: ['Design database'], project: 'Relational DB schema' },
        { focus: 'REST APIs', topics: ['CRUD app', 'Node/Express', 'Django'], tasks: ['Build REST API'], project: 'Web service backend' },
        { focus: 'Testing', topics: ['Unit tests', 'Integration tests', 'CI/CD basics'], tasks: ['Write tests'], project: 'Automated test suite' },
        { focus: 'System design basics', topics: ['Scalability', 'Caching', 'Load balancing'], tasks: ['Learn architecture'], project: 'System architecture diagram' },
        { focus: 'Design patterns', topics: ['Singleton', 'Factory', 'Observer'], tasks: ['Implement patterns'], project: 'Design pattern refactor' },
        { focus: 'Cloud fundamentals', topics: ['AWS/GCP/Azure free tier'], tasks: ['Deploy to cloud'], project: 'Cloud-hosted application' },
        { focus: 'Deployment', topics: ['Netlify', 'Heroku', 'Render'], tasks: ['Host a project'], project: 'Live production release' }
      ];
  }
};

const generateRoadmap = (githubUsername, targetRole, skillData, quizScore) => {
  const { frontend = 100, backend = 100, dsa = 100, python = 100, devops = 100 } = skillData;
  let weeks = [];
  
  // 1. Skill gap injections
  if (python < 50) {
    weeks.push({ focus: 'Python Fundamentals', topics: ['Syntax', 'Data Structures', 'OOP'], tasks: ['Solve 5 algorithmic Python problems'], project: 'CLI task tracker in Python' });
  }
  if (dsa < 50) {
    weeks.push({ focus: 'DSA Core Patterns', topics: ['Arrays', 'Two Pointers', 'Hash Maps'], tasks: ['Solve 10 LeetCode Easy'], project: 'Algorithm visualizer tool' });
  }
  if (frontend < 50) {
    weeks.push({ focus: 'HTML/CSS/JS Basics', topics: ['DOM Manipulation', 'Flexbox', 'Events'], tasks: ['Build a responsive landing page'], project: 'Personal portfolio website' });
  }
  if (backend < 50) {
    weeks.push({ focus: 'Backend & APIs', topics: ['Node.js', 'Express', 'HTTP methods'], tasks: ['Create a simple server'], project: 'REST API with in-memory DB' });
  }
  if (devops < 50) {
    weeks.push({ focus: 'Linux & Docker Basics', topics: ['Terminal commands', 'Containerization'], tasks: ['Write a Dockerfile'], project: 'Dockerize a simple web app' });
  }

  // 2. Role-specific core content
  const roleBase = getRoleBaseRoadmap(targetRole);
  weeks = weeks.concat(roleBase);

  // 3. Padding to exactly 12 weeks
  const genericFillers = [
    { focus: 'Advanced Version Control', topics: ['Git rebase', 'GitHub Actions'], tasks: ['Set up a CI workflow'], project: 'Automated linter pipeline' },
    { focus: 'Testing Strategies', topics: ['Unit testing', 'Jest/PyTest'], tasks: ['Write 10 test cases'], project: 'Test suite for previous projects' },
    { focus: 'Cloud Deployment', topics: ['AWS Basics', 'Vercel/Heroku'], tasks: ['Deploy a serverless function'], project: 'Live application on the cloud' },
    { focus: 'Soft Skills & Agile', topics: ['Scrum', 'Code Reviews'], tasks: ['Do a mock PR review'], project: 'Agile sprint planning document' },
    { focus: 'Capstone Project Phase 1', topics: ['Planning', 'Architecture'], tasks: ['Write a PRD', 'Set up repos'], project: 'Capstone setup' },
    { focus: 'Capstone Project Phase 2', topics: ['Implementation', 'Integration'], tasks: ['Build core features'], project: 'MVP of Capstone' },
    { focus: 'Capstone Project Polish', topics: ['Bug fixing', 'UI/UX Polish'], tasks: ['Conduct user testing'], project: 'Final polished Capstone' },
    { focus: 'Interview Preparation', topics: ['Behavioral', 'Mock Interviews'], tasks: ['Practice STAR method'], project: 'Completed mock interview feedback' }
  ];

  while (weeks.length < 12) {
    weeks.push(genericFillers.shift() || genericFillers[0]);
  }

  weeks = weeks.slice(0, 12);

  const formattedRoadmap = weeks.map((w, index) => ({
    week: index + 1,
    focus: w.focus,
    topics: w.topics,
    tasks: w.tasks,
    project: w.project
  }));

  const weakSkills = Object.entries(skillData).filter(([_, score]) => score < 50).map(([skill]) => skill);
  const reason = `This 90-day roadmap is uniquely tailored for ${githubUsername} to become a ${targetRole}. ` + 
    (weakSkills.length > 0 ? `We prioritized building foundational skills in ${weakSkills.join(', ')} due to your skill analysis gaps, and then transitioned into core ${targetRole} competencies.` :
    `Since you demonstrated strong baseline skills across the board, we fast-tracked you directly into advanced ${targetRole} topics and system architectures.`);

  return { roadmap: formattedRoadmap, reason };
};

// POST /api/roadmap/generate
router.post('/generate', async (req, res) => {
  try {
    const { githubUsername, targetRole, skillData, quizScore } = req.body;
    
    if (!githubUsername || !targetRole || !skillData) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { roadmap, reason } = generateRoadmap(githubUsername, targetRole, skillData, quizScore);

    const newRoadmap = new Roadmap({
      githubUsername,
      targetRole,
      skillsSnapshot: skillData,
      quizScore,
      reason,
      roadmap
    });

    await newRoadmap.save();

    res.status(201).json({
      user: githubUsername,
      role: targetRole,
      roadmap,
      reason
    });
  } catch (error) {
    console.error('Error generating roadmap:', error);
    res.status(500).json({ error: 'Failed to generate roadmap' });
  }
});

// GET /api/roadmap/:githubUsername
router.get('/:githubUsername', async (req, res) => {
  try {
    const roadmaps = await Roadmap.find({ githubUsername: req.params.githubUsername }).sort({ createdAt: -1 });
    if (!roadmaps || roadmaps.length === 0) {
      return res.status(404).json({ message: 'No roadmap found for this user' });
    }
    
    const r = roadmaps[0];
    res.status(200).json({
      user: r.githubUsername,
      role: r.targetRole,
      roadmap: r.roadmap,
      reason: r.reason
    });
  } catch (error) {
    console.error('Error fetching roadmap:', error);
    res.status(500).json({ error: 'Failed to fetch roadmap' });
  }
});

module.exports = router;
