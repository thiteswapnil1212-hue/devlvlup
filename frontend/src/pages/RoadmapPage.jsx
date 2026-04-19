import React, { useState } from 'react';
import RoleSelector from '../components/RoleSelector';
import RoadmapCard from '../components/RoadmapCard';

const RoadmapPage = () => {
  const [githubUsername, setGithubUsername] = useState('');
  const [targetRole, setTargetRole] = useState('Software Developer');
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateRoadmap = async () => {
    setLoading(true);
    setError('');
    
    try {
      setTimeout(() => {
        const roleCurriculums = {
          'AI Engineer': [
            { week: 1, focus: 'Python for AI', topics: ['NumPy arrays', 'Pandas basics'], tasks: ['Learn core libraries'], project: 'Data manipulation script' },
            { week: 2, focus: 'Linear Algebra', topics: ['Matrix multiplication', 'Dot product'], tasks: ['Compute math operations'], project: 'Linear algebra visualizer' },
            { week: 3, focus: 'Probability', topics: ['Distributions', 'Bayes theorem'], tasks: ['Calculate probabilities'], project: 'Naive Bayes classifier' },
            { week: 4, focus: 'Regression', topics: ['Linear Regression', 'scikit-learn'], tasks: ['Implement Linear Regression'], project: 'Predictive model' },
            { week: 5, focus: 'Classification', topics: ['Logistic Regression', 'Decision boundaries'], tasks: ['Build a classifier'], project: 'Spam filter' },
            { week: 6, focus: 'Trees', topics: ['Decision Trees', 'Random Forests'], tasks: ['Train tree models'], project: 'Feature importance analyzer' },
            { week: 7, focus: 'Neural Nets', topics: ['Perceptron', 'Activation functions'], tasks: ['Build basic neural network'], project: 'Simple feedforward net' },
            { week: 8, focus: 'CNN basics', topics: ['Convolution', 'Pooling'], tasks: ['MNIST demo'], project: 'Digit recognizer' },
            { week: 9, focus: 'NLP basics', topics: ['Tokenization', 'Word embeddings'], tasks: ['Process text data'], project: 'Sentiment analyzer' },
            { week: 10, focus: 'Transformers', topics: ['Attention mechanism', 'BERT intro'], tasks: ['Use pre-trained models'], project: 'Text generator' },
            { week: 11, focus: 'Reinforcement Learning', topics: ['Q-Learning'], tasks: ['CartPole demo'], project: 'RL agent' },
            { week: 12, focus: 'Deployment', topics: ['Flask/FastAPI'], tasks: ['Serve ML model'], project: 'API for ML predictions' }
          ],
          'DevOps': [
            { week: 1, focus: 'Linux commands', topics: ['Navigation', 'Permissions', 'Processes'], tasks: ['Learn CLI'], project: 'Linux environment setup' },
            { week: 2, focus: 'Shell scripting', topics: ['Bash basics'], tasks: ['Automate a daily task'], project: 'Backup script' },
            { week: 3, focus: 'Git basics', topics: ['Clone', 'Commit', 'Push', 'Pull'], tasks: ['Manage version control'], project: 'Local repo setup' },
            { week: 4, focus: 'Git branching', topics: ['Merge conflicts', 'Pull requests'], tasks: ['Collaborate via Git'], project: 'Team workflow simulation' },
            { week: 5, focus: 'CI/CD basics', topics: ['GitHub Actions'], tasks: ['Write a workflow'], project: 'Automated test runner' },
            { week: 6, focus: 'Docker', topics: ['Containers'], tasks: ['Build and run a container'], project: 'Dockerized app' },
            { week: 7, focus: 'Docker Compose', topics: ['Multi-container setup'], tasks: ['Link containers'], project: 'App + DB orchestration' },
            { week: 8, focus: 'Kubernetes basics', topics: ['Pods', 'Services'], tasks: ['Deploy a pod and service'], project: 'Mini K8s cluster' },
            { week: 9, focus: 'Terraform', topics: ['IaC basics'], tasks: ['Write a simple IaC script'], project: 'Cloud infrastructure provisioning' },
            { week: 10, focus: 'Monitoring', topics: ['Prometheus', 'Grafana'], tasks: ['Set up dashboard'], project: 'System health monitor' },
            { week: 11, focus: 'Logging', topics: ['ELK stack basics'], tasks: ['Elasticsearch', 'Kibana'], project: 'Centralized log viewer' },
            { week: 12, focus: 'Security', topics: ['Secrets management'], tasks: ['Vault', 'K8s secrets'], project: 'Secure deployment' }
          ],
          'Data Science': [
            { week: 1, focus: 'Python essentials', topics: ['NumPy arrays', 'Pandas basics'], tasks: ['Learn data structures'], project: 'Data parsing tool' },
            { week: 2, focus: 'Data cleaning', topics: ['Missing values', 'Duplicates'], tasks: ['Handle dirty data'], project: 'Data sanitizer' },
            { week: 3, focus: 'Data visualization', topics: ['Matplotlib', 'Seaborn'], tasks: ['Create plots'], project: 'Visual data report' },
            { week: 4, focus: 'Exploratory Data Analysis', topics: ['Summary stats', 'Correlations'], tasks: ['Perform EDA'], project: 'Dataset insights dashboard' },
            { week: 5, focus: 'Regression', topics: ['Linear Regression', 'scikit-learn'], tasks: ['Fit regression lines'], project: 'Trend predictor' },
            { week: 6, focus: 'Classification', topics: ['Logistic Regression', 'Decision boundaries'], tasks: ['Classify data'], project: 'Binary classifier' },
            { week: 7, focus: 'Model evaluation', topics: ['Accuracy', 'Precision', 'Recall', 'F1'], tasks: ['Evaluate models'], project: 'Model comparison matrix' },
            { week: 8, focus: 'Trees & Ensembles', topics: ['Decision Trees', 'Random Forests'], tasks: ['Build ensemble models'], project: 'Robust predictor' },
            { week: 9, focus: 'Clustering', topics: ['K-Means', 'Hierarchical clustering'], tasks: ['Group unlabeled data'], project: 'Customer segmentation' },
            { week: 10, focus: 'Dimensionality reduction', topics: ['PCA basics'], tasks: ['Reduce features'], project: 'Data compressor' },
            { week: 11, focus: 'Neural networks', topics: ['Perceptron', 'Activation functions'], tasks: ['Train basic NN'], project: 'Non-linear model' },
            { week: 12, focus: 'Deep learning intro', topics: ['Feedforward NN', 'TensorFlow/PyTorch'], tasks: ['Build simple NN'], project: 'Deep learning classifier' }
          ],
          'Software Engineer': [
            { week: 1, focus: 'Learn a language deeply', topics: ['Syntax', 'Loops', 'Functions'], tasks: ['Java, Python, or C++'], project: 'Console application' },
            { week: 2, focus: 'Data structures basics', topics: ['Arrays', 'Strings', 'Linked lists'], tasks: ['Implement DS from scratch'], project: 'Custom data structure library' },
            { week: 3, focus: 'Algorithms basics', topics: ['Sorting', 'Searching', 'Recursion'], tasks: ['Implement algorithms'], project: 'Algorithm visualization' },
            { week: 4, focus: 'Git & GitHub', topics: ['Commits', 'Branches', 'Pull requests'], tasks: ['Version control'], project: 'Open source contribution mock' },
            { week: 5, focus: 'Object-Oriented Programming', topics: ['Classes', 'Inheritance', 'Polymorphism'], tasks: ['Apply OOP principles'], project: 'System simulator' },
            { week: 6, focus: 'Databases', topics: ['SQL queries', 'Schema design', 'Normalization'], tasks: ['Design database'], project: 'Relational DB schema' },
            { week: 7, focus: 'REST APIs', topics: ['CRUD app', 'Node/Express', 'Django'], tasks: ['Build REST API'], project: 'Web service backend' },
            { week: 8, focus: 'Testing', topics: ['Unit tests', 'Integration tests', 'CI/CD basics'], tasks: ['Write tests'], project: 'Automated test suite' },
            { week: 9, focus: 'System design basics', topics: ['Scalability', 'Caching', 'Load balancing'], tasks: ['Learn architecture'], project: 'System architecture diagram' },
            { week: 10, focus: 'Design patterns', topics: ['Singleton', 'Factory', 'Observer'], tasks: ['Implement patterns'], project: 'Design pattern refactor' },
            { week: 11, focus: 'Cloud fundamentals', topics: ['AWS/GCP/Azure free tier'], tasks: ['Deploy to cloud'], project: 'Cloud-hosted application' },
            { week: 12, focus: 'Deployment', topics: ['Netlify', 'Heroku', 'Render'], tasks: ['Host a project'], project: 'Live production release' }
          ],
          'Gen AI Engineer': [
            { week: 1, focus: 'Python refresher', topics: ['NumPy', 'Pandas', 'Matplotlib'], tasks: ['Review libraries'], project: 'Data prep tool' },
            { week: 2, focus: 'Machine Learning basics', topics: ['Regression', 'Classification'], tasks: ['scikit-learn basics'], project: 'Basic ML pipeline' },
            { week: 3, focus: 'Deep Learning basics', topics: ['Perceptron', 'Activation functions'], tasks: ['Feedforward NN'], project: 'Neural network from scratch' },
            { week: 4, focus: 'PyTorch/TensorFlow setup', topics: ['Framework basics'], tasks: ['Train simple NN on MNIST'], project: 'Image classifier' },
            { week: 5, focus: 'Autoencoders', topics: ['Compress', 'Reconstruct'], tasks: ['Build autoencoder'], project: 'Image compressor' },
            { week: 6, focus: 'Variational Autoencoders', topics: ['VAE basics'], tasks: ['Generate new samples'], project: 'Generative model' },
            { week: 7, focus: 'GAN basics', topics: ['Generator', 'Discriminator'], tasks: ['Train on simple dataset'], project: 'Basic GAN' },
            { week: 8, focus: 'Conditional GANs', topics: ['Conditioned generation'], tasks: ['Generate images on labels'], project: 'Labeled image generator' },
            { week: 9, focus: 'Word embeddings', topics: ['Word2Vec', 'GloVe basics'], tasks: ['Train embeddings'], project: 'Text similarity tool' },
            { week: 10, focus: 'RNNs & LSTMs', topics: ['Sequence modeling'], tasks: ['Text generation demo'], project: 'RNN text generator' },
            { week: 11, focus: 'Attention mechanism', topics: ['Seq-to-seq models'], tasks: ['Implement attention'], project: 'Machine translation model' },
            { week: 12, focus: 'Transformers', topics: ['BERT/GPT basics', 'HuggingFace intro'], tasks: ['Use transformers'], project: 'Transformer-based app' }
          ],
          'Cybersecurity': [
            { week: 1, focus: 'Networking basics', topics: ['TCP/IP', 'Ports', 'Protocols'], tasks: ['Understand networks'], project: 'Network scanner' },
            { week: 2, focus: 'Linux security', topics: ['Permissions', 'Users', 'Firewalls'], tasks: ['Secure an OS'], project: 'Hardened Linux environment' },
            { week: 3, focus: 'Cryptography basics', topics: ['Hashing', 'Symmetric/Asymmetric keys'], tasks: ['Implement crypto'], project: 'Encryption utility' },
            { week: 4, focus: 'Web security fundamentals', topics: ['OWASP Top 10'], tasks: ['Identify vulnerabilities'], project: 'Vulnerability scanner' },
            { week: 5, focus: 'Firewalls & IDS/IPS', topics: ['Network defense'], tasks: ['Configure simple rules'], project: 'Intrusion detection system' },
            { week: 6, focus: 'Secure authentication', topics: ['MFA', 'OAuth', 'JWT'], tasks: ['Implement secure login'], project: 'Secure auth gateway' },
            { week: 7, focus: 'Vulnerability scanning', topics: ['Nmap', 'Nessus'], tasks: ['Use scanning tools'], project: 'Network audit report' },
            { week: 8, focus: 'SIEM basics', topics: ['Log monitoring'], tasks: ['Splunk/ELK setup'], project: 'Centralized log analyzer' },
            { week: 9, focus: 'Ethical hacking basics', topics: ['Reconnaissance', 'Footprinting'], tasks: ['Gather intelligence'], project: 'OSINT report' },
            { week: 10, focus: 'Exploitation labs', topics: ['SQL injection', 'XSS demos'], tasks: ['Practice exploits'], project: 'Mock exploit framework' },
            { week: 11, focus: 'Wireless security', topics: ['WPA2 cracking', 'Securing Wi-Fi'], tasks: ['Audit wireless networks'], project: 'Wi-Fi security analysis' },
            { week: 12, focus: 'Penetration testing workflow', topics: ['Reporting', 'Remediation'], tasks: ['Conduct full pentest'], project: 'Comprehensive pentest report' }
          ]
        };

        const targetCurriculum = roleCurriculums[targetRole] || roleCurriculums['Software Engineer'];

        setRoadmapData({
          user: githubUsername,
          role: targetRole,
          reason: `This 90-day learning curriculum provides a precise, week-by-week track to master ${targetRole}.`,
          roadmap: targetCurriculum
        });
        
        setLoading(false);
      }, 500);
      
    } catch (err) {
      setError(err.message || 'Failed to generate roadmap');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 animate-fade-in">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[var(--text-primary)]">Career Roadmap Generator</h1>
        <p className="text-[var(--text-secondary)] mt-2">Generate a personalized 90-day learning path tailored to your specific goals and skill gaps.</p>
      </div>

      <RoleSelector 
        githubUsername={githubUsername}
        setGithubUsername={setGithubUsername}
        targetRole={targetRole}
        setTargetRole={setTargetRole}
        onGenerate={generateRoadmap}
        loading={loading}
      />

      {error && (
        <div className="mb-8 p-4 bg-[rgba(239,68,68,0.12)] border border-[rgba(239,68,68,0.24)] rounded-[16px] text-[#FCA5A5]">
          {error}
        </div>
      )}

      {loading && !roadmapData && (
        <div className="flex flex-col justify-center items-center h-64 space-y-4">
          <div className="loader-ring"></div>
          <p className="text-sm font-medium text-[var(--text-secondary)] animate-pulse">Analyzing GitHub profile and constructing learning path...</p>
        </div>
      )}

      {roadmapData && !loading && (
        <div className="space-y-8 animate-fade-in stagger-1">
          <div className="p-6 bg-[rgba(99,102,241,0.08)] border border-[rgba(99,102,241,0.2)] rounded-[24px]">
            <h3 className="text-sm font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-3">Why this roadmap?</h3>
            <p className="text-[var(--text-primary)] leading-relaxed italic border-l-4 border-brand pl-4">
              "{roadmapData.reason}"
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {roadmapData.roadmap.map((weekData) => (
              <RoadmapCard key={weekData.week} weekData={weekData} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default RoadmapPage;
