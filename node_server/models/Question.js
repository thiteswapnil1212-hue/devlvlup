// Quiz questions database
const QUIZ_QUESTIONS = {
  'C': [
    {
      question: 'What is the correct way to declare a pointer in C?',
      options: ['int *ptr;', 'pointer int ptr;', 'int ptr*;', 'ptr int*;'],
      answer: 0
    },
    {
      question: 'Which header file is required for printf() function?',
      options: ['<conio.h>', '<stdio.h>', '<stdlib.h>', '<string.h>'],
      answer: 1
    },
    {
      question: 'What does the "static" keyword do in C?',
      options: ['Makes variable global', 'Limits scope to file', 'Allocates memory dynamically', 'Creates constant'],
      answer: 1
    },
    {
      question: 'Which operator is used for pointer dereferencing?',
      options: ['&', '*', '->', '.'],
      answer: 1
    },
    {
      question: 'What is the size of int data type in C (typically)?',
      options: ['1 byte', '2 bytes', '4 bytes', '8 bytes'],
      answer: 2
    },
    {
      question: 'Which loop is guaranteed to execute at least once?',
      options: ['for', 'while', 'do-while', 'none'],
      answer: 2
    },
    {
      question: 'What does malloc() return?',
      options: ['int', 'void*', 'char*', 'float*'],
      answer: 1
    },
    {
      question: 'Which function is used to read string input?',
      options: ['scanf()', 'gets()', 'fgets()', 'cin'],
      answer: 1
    },
    {
      question: 'What is the correct syntax for function declaration?',
      options: ['return_type function_name(parameters);', 'function_name return_type(parameters);', 'parameters return_type function_name;', 'function_name(parameters) return_type;'],
      answer: 0
    },
    {
      question: 'Which preprocessor directive is used to define constants?',
      options: ['#include', '#define', '#ifdef', '#pragma'],
      answer: 1
    }
  ],
  'C++': [
    {
      question: 'Which keyword is used to declare a class in C++?',
      options: ['struct', 'class', 'object', 'type'],
      answer: 1
    },
    {
      question: 'What is the correct way to create an object in C++?',
      options: ['ClassName obj;', 'new ClassName();', 'Both A and B', 'create ClassName obj;'],
      answer: 2
    },
    {
      question: 'Which operator is used for dynamic memory allocation?',
      options: ['malloc', 'new', 'alloc', 'create'],
      answer: 1
    },
    {
      question: 'What is inheritance in C++?',
      options: ['Creating multiple objects', 'Deriving new class from existing', 'Memory management', 'Function overloading'],
      answer: 1
    },
    {
      question: 'Which access specifier makes members accessible only within the class?',
      options: ['public', 'private', 'protected', 'internal'],
      answer: 1
    },
    {
      question: 'What is function overloading?',
      options: ['Multiple functions with same name', 'Functions with different parameters', 'Both A and B', 'None of the above'],
      answer: 2
    },
    {
      question: 'Which header is required for cout and cin?',
      options: ['<iostream>', '<stdio.h>', '<conio.h>', '<string>'],
      answer: 0
    },
    {
      question: 'What is a constructor?',
      options: ['Function to destroy object', 'Function called when object is created', 'Static function', 'Virtual function'],
      answer: 1
    },
    {
      question: 'Which keyword is used for exception handling?',
      options: ['try', 'catch', 'throw', 'All of the above'],
      answer: 3
    },
    {
      question: 'What is STL in C++?',
      options: ['Standard Template Library', 'Simple Template Language', 'Standard Type Library', 'System Template Library'],
      answer: 0
    }
  ],
  'Java': [
    {
      question: 'Which keyword is used to define a class in Java?',
      options: ['class', 'Class', 'define', 'struct'],
      answer: 0
    },
    {
      question: 'What is the main method signature in Java?',
      options: ['public static void main(String[] args)', 'public void main(String args)', 'static public void main(String[] args)', 'void main(String[] args)'],
      answer: 0
    },
    {
      question: 'Which keyword is used to inherit a class?',
      options: ['extends', 'implements', 'inherits', 'derives'],
      answer: 0
    },
    {
      question: 'What is JVM?',
      options: ['Java Virtual Machine', 'Java Variable Memory', 'Java Virtual Method', 'Java Variable Manager'],
      answer: 0
    },
    {
      question: 'Which access modifier allows access within the same package?',
      options: ['public', 'private', 'protected', 'default'],
      answer: 3
    },
    {
      question: 'What is the difference between == and equals()?',
      options: ['No difference', '== compares references, equals() compares content', 'equals() compares references, == compares content', 'Both compare content'],
      answer: 1
    },
    {
      question: 'Which collection class maintains insertion order?',
      options: ['HashSet', 'HashMap', 'ArrayList', 'HashTable'],
      answer: 2
    },
    {
      question: 'What is the purpose of final keyword?',
      options: ['Make variable constant', 'Prevent inheritance', 'Prevent method overriding', 'All of the above'],
      answer: 3
    },
    {
      question: 'Which exception is checked at compile time?',
      options: ['RuntimeException', 'NullPointerException', 'IOException', 'ArithmeticException'],
      answer: 2
    },
    {
      question: 'What is the default value of boolean in Java?',
      options: ['true', 'false', 'null', '0'],
      answer: 1
    }
  ],
  'HTML': [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink and Text Markup Language', 'Home Tool Markup Language'],
      answer: 0
    },
    {
      question: 'Which tag is used for the largest heading?',
      options: ['<h1>', '<h6>', '<head>', '<heading>'],
      answer: 0
    },
    {
      question: 'Which attribute is used to provide a unique identifier?',
      options: ['class', 'id', 'name', 'type'],
      answer: 1
    },
    {
      question: 'What is the correct HTML element for inserting a line break?',
      options: ['<br>', '<lb>', '<break>', '<line>'],
      answer: 0
    },
    {
      question: 'Which tag is used to create a hyperlink?',
      options: ['<link>', '<a>', '<href>', '<url>'],
      answer: 1
    },
    {
      question: 'What is the purpose of the alt attribute in <img> tag?',
      options: ['Alternative text for screen readers', 'Alternative image source', 'Image alignment', 'Image size'],
      answer: 0
    },
    {
      question: 'Which HTML element defines a table row?',
      options: ['<table>', '<tr>', '<td>', '<th>'],
      answer: 1
    },
    {
      question: 'What is the correct way to comment in HTML?',
      options: ['// comment', '/* comment */', '<!-- comment -->', '# comment'],
      answer: 2
    },
    {
      question: 'Which input type creates a checkbox?',
      options: ['text', 'checkbox', 'radio', 'button'],
      answer: 1
    },
    {
      question: 'What does the <meta> tag do?',
      options: ['Creates metadata about the document', 'Creates a menu', 'Creates a table', 'Creates a form'],
      answer: 0
    }
  ],
  'CSS': [
    {
      question: 'What does CSS stand for?',
      options: ['Computer Style Sheets', 'Cascading Style Sheets', 'Creative Style Sheets', 'Colorful Style Sheets'],
      answer: 1
    },
    {
      question: 'Which property is used to change text color?',
      options: ['font-color', 'text-color', 'color', 'foreground-color'],
      answer: 2
    },
    {
      question: 'How do you select an element with id "demo"?',
      options: ['.demo', '#demo', 'demo', '*demo'],
      answer: 1
    },
    {
      question: 'Which property controls the space between elements?',
      options: ['margin', 'padding', 'border', 'spacing'],
      answer: 0
    },
    {
      question: 'What is the correct syntax for external CSS?',
      options: ['<style src="style.css">', '<link rel="stylesheet" href="style.css">', '<css href="style.css">', '<stylesheet>style.css</stylesheet>'],
      answer: 1
    },
    {
      question: 'Which value of display property hides an element?',
      options: ['hidden', 'none', 'invisible', 'hide'],
      answer: 1
    },
    {
      question: 'What does the z-index property control?',
      options: ['Element size', 'Element position', 'Stacking order', 'Element width'],
      answer: 2
    },
    {
      question: 'Which pseudo-class selects the first child?',
      options: [':first', ':first-child', ':child-first', ':initial'],
      answer: 1
    },
    {
      question: 'What is the default position value?',
      options: ['static', 'relative', 'absolute', 'fixed'],
      answer: 0
    },
    {
      question: 'Which property is used for rounded corners?',
      options: ['corner-radius', 'border-radius', 'round-corner', 'corner-round'],
      answer: 1
    }
  ],
  'JavaScript': [
    {
      question: 'Which keyword declares a variable in JavaScript?',
      options: ['var', 'let', 'const', 'All of the above'],
      answer: 3
    },
    {
      question: 'What is the correct way to write an array in JavaScript?',
      options: ['var arr = (1,2,3)', 'var arr = [1,2,3]', 'var arr = {1,2,3}', 'var arr = <1,2,3>'],
      answer: 1
    },
    {
      question: 'Which operator is used for strict equality?',
      options: ['==', '===', '!=', '!=='],
      answer: 1
    },
    {
      question: 'What does DOM stand for?',
      options: ['Document Object Model', 'Data Object Model', 'Document Oriented Model', 'Dynamic Object Model'],
      answer: 0
    },
    {
      question: 'Which method adds an element to the end of an array?',
      options: ['push()', 'pop()', 'shift()', 'unshift()'],
      answer: 0
    },
    {
      question: 'What is a closure in JavaScript?',
      options: ['A way to close browser', 'Function with access to outer scope', 'A type of loop', 'Error handling mechanism'],
      answer: 1
    },
    {
      question: 'Which keyword is used for asynchronous operations?',
      options: ['async', 'await', 'promise', 'All of the above'],
      answer: 3
    },
    {
      question: 'What does JSON.parse() do?',
      options: ['Converts object to string', 'Converts string to object', 'Validates JSON', 'Formats JSON'],
      answer: 1
    },
    {
      question: 'Which method is used to select an element by ID?',
      options: ['getElementById()', 'querySelector()', 'getElementsByClassName()', 'getElementsByTagName()'],
      answer: 0
    },
    {
      question: 'What is the purpose of the "this" keyword?',
      options: ['Refers to current object', 'Refers to global object', 'Creates new object', 'Deletes object'],
      answer: 0
    }
  ],
  'React': [
    {
      question: 'What is JSX?',
      options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'],
      answer: 0
    },
    {
      question: 'Which hook manages component state?',
      options: ['useEffect', 'useState', 'useContext', 'useReducer'],
      answer: 1
    },
    {
      question: 'What is the purpose of useEffect?',
      options: ['Manage state', 'Handle side effects', 'Create components', 'Style components'],
      answer: 1
    },
    {
      question: 'How do you pass data to a child component?',
      options: ['state', 'props', 'context', 'redux'],
      answer: 1
    },
    {
      question: 'What is the virtual DOM?',
      options: ['Copy of real DOM', 'React\'s representation of DOM', 'Browser DOM', 'Component tree'],
      answer: 1
    },
    {
      question: 'Which method is called when component mounts?',
      options: ['componentDidMount', 'componentWillMount', 'useEffect with []', 'All of the above'],
      answer: 3
    },
    {
      question: 'What does useState return?',
      options: ['State value only', 'Setter function only', 'Array with state and setter', 'Object with state and setter'],
      answer: 2
    },
    {
      question: 'How do you conditionally render in JSX?',
      options: ['if-else', 'ternary operator', 'switch', 'All of the above'],
      answer: 3
    },
    {
      question: 'What is a key prop used for?',
      options: ['Styling', 'Unique identification in lists', 'Event handling', 'Data binding'],
      answer: 1
    },
    {
      question: 'Which hook is used for API calls?',
      options: ['useState', 'useEffect', 'useContext', 'useCallback'],
      answer: 1
    }
  ],
  'Node.js': [
    {
      question: 'What is Node.js?',
      options: ['Web browser', 'JavaScript runtime', 'Database', 'CSS framework'],
      answer: 1
    },
    {
      question: 'Which module is used for file operations?',
      options: ['http', 'fs', 'path', 'url'],
      answer: 1
    },
    {
      question: 'What does npm stand for?',
      options: ['Node Package Manager', 'New Package Module', 'Node Program Manager', 'Network Package Manager'],
      answer: 0
    },
    {
      question: 'Which method creates an HTTP server?',
      options: ['http.createServer()', 'server.create()', 'http.server()', 'create.http()'],
      answer: 0
    },
    {
      question: 'What is middleware in Express?',
      options: ['Database', 'Function that processes requests', 'Template engine', 'Authentication system'],
      answer: 1
    },
    {
      question: 'Which module handles URL parsing?',
      options: ['http', 'fs', 'url', 'querystring'],
      answer: 2
    },
    {
      question: 'What is the purpose of package.json?',
      options: ['Project metadata and dependencies', 'Server configuration', 'Database schema', 'API documentation'],
      answer: 0
    },
    {
      question: 'Which method reads environment variables?',
      options: ['process.env', 'env.process', 'getEnv()', 'readEnv()'],
      answer: 0
    },
    {
      question: 'What is asynchronous programming in Node.js?',
      options: ['Sequential execution', 'Non-blocking I/O operations', 'Synchronous operations', 'Database queries'],
      answer: 1
    },
    {
      question: 'Which framework is built on Node.js?',
      options: ['React', 'Angular', 'Express', 'Vue'],
      answer: 2
    }
  ],
  'Python': [
    {
      question: 'What is the correct file extension for Python files?',
      options: ['.py', '.python', '.pt', '.pyt'],
      answer: 0
    },
    {
      question: 'Which keyword is used to define a function?',
      options: ['function', 'def', 'define', 'func'],
      answer: 1
    },
    {
      question: 'What is the output of print(2**3)?',
      options: ['6', '8', '9', '16'],
      answer: 1
    },
    {
      question: 'Which data type is mutable in Python?',
      options: ['tuple', 'string', 'list', 'int'],
      answer: 2
    },
    {
      question: 'What does len() function do?',
      options: ['Returns length of object', 'Returns type of object', 'Returns value of object', 'Returns id of object'],
      answer: 0
    },
    {
      question: 'Which operator is used for floor division?',
      options: ['/', '//', '%', '**'],
      answer: 1
    },
    {
      question: 'What is a lambda function?',
      options: ['Named function', 'Anonymous function', 'Class method', 'Static method'],
      answer: 1
    },
    {
      question: 'Which module is used for regular expressions?',
      options: ['regex', 're', 'regexp', 'regular'],
      answer: 1
    },
    {
      question: 'What does "self" refer to in a class method?',
      options: ['Global object', 'Current instance', 'Parent class', 'Child class'],
      answer: 1
    },
    {
      question: 'Which keyword is used for exception handling?',
      options: ['try', 'catch', 'except', 'error'],
      answer: 2
    }
  ],
  'SQL': [
    {
      question: 'Which command is used to retrieve data from a database?',
      options: ['INSERT', 'UPDATE', 'SELECT', 'DELETE'],
      answer: 2
    },
    {
      question: 'What does SQL stand for?',
      options: ['Structured Query Language', 'Simple Query Language', 'Standard Query Language', 'System Query Language'],
      answer: 0
    },
    {
      question: 'Which clause is used to filter records?',
      options: ['WHERE', 'HAVING', 'GROUP BY', 'ORDER BY'],
      answer: 0
    },
    {
      question: 'What is a primary key?',
      options: ['Unique identifier for each record', 'Foreign key reference', 'Index for faster queries', 'Data type constraint'],
      answer: 0
    },
    {
      question: 'Which join returns all records from both tables?',
      options: ['INNER JOIN', 'LEFT JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'],
      answer: 3
    },
    {
      question: 'What does the COUNT() function do?',
      options: ['Sums values', 'Counts records', 'Finds maximum', 'Finds minimum'],
      answer: 1
    },
    {
      question: 'Which command creates a new table?',
      options: ['CREATE TABLE', 'NEW TABLE', 'MAKE TABLE', 'BUILD TABLE'],
      answer: 0
    },
    {
      question: 'What is normalization?',
      options: ['Process of organizing data', 'Data encryption', 'Data compression', 'Data validation'],
      answer: 0
    },
    {
      question: 'Which constraint ensures unique values?',
      options: ['NOT NULL', 'UNIQUE', 'PRIMARY KEY', 'FOREIGN KEY'],
      answer: 1
    },
    {
      question: 'What does ACID stand for?',
      options: ['Atomicity, Consistency, Isolation, Durability', 'Access, Control, Integrity, Data', 'Automated, Consistent, Independent, Durable', 'All, Complete, Integrated, Dynamic'],
      answer: 0
    }
  ],
  'DSA': [
    {
      question: 'What is the time complexity of binary search?',
      options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'],
      answer: 1
    },
    {
      question: 'Which data structure follows LIFO?',
      options: ['Queue', 'Stack', 'Array', 'Linked List'],
      answer: 1
    },
    {
      question: 'What is the worst case time complexity of quicksort?',
      options: ['O(n log n)', 'O(n²)', 'O(log n)', 'O(n)'],
      answer: 1
    },
    {
      question: 'Which traversal visits left subtree, root, right subtree?',
      options: ['Preorder', 'Inorder', 'Postorder', 'Level order'],
      answer: 1
    },
    {
      question: 'What is a hash table?',
      options: ['Array of arrays', 'Key-value store with fast lookup', 'Sorted data structure', 'Graph representation'],
      answer: 1
    },
    {
      question: 'Which algorithm finds shortest path in weighted graph?',
      options: ['DFS', 'BFS', 'Dijkstra', 'Binary search'],
      answer: 2
    },
    {
      question: 'What is the space complexity of merge sort?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 2
    },
    {
      question: 'Which data structure is used for breadth-first search?',
      options: ['Stack', 'Queue', 'Array', 'Linked List'],
      answer: 1
    },
    {
      question: 'What is dynamic programming?',
      options: ['Object-oriented programming', 'Solving problems by breaking into subproblems', 'Database programming', 'Web programming'],
      answer: 1
    },
    {
      question: 'Which sorting algorithm is stable?',
      options: ['Quick sort', 'Heap sort', 'Merge sort', 'Selection sort'],
      answer: 2
    }
  ],
  'Frontend': [
    {
      question: 'What does HTML stand for?',
      options: ['Hyper Text Markup Language', 'High Tech Modern Language', 'Hyperlink Text Management Language', 'Home Tool Markup Language'],
      answer: 0
    },
    {
      question: 'Which CSS property controls text size?',
      options: ['font-size', 'text-size', 'size', 'font-height'],
      answer: 0
    },
    {
      question: 'What is the box model in CSS?',
      options: ['Container model', 'Layout model with margins, borders, padding', 'Color model', 'Typography model'],
      answer: 1
    },
    {
      question: 'Which JavaScript method selects DOM elements?',
      options: ['getElement()', 'querySelector()', 'findElement()', 'selectDOM()'],
      answer: 1
    },
    {
      question: 'What is responsive design?',
      options: ['Fast loading', 'Adapts to different screen sizes', 'SEO friendly', 'Accessible design'],
      answer: 1
    },
    {
      question: 'Which HTML5 element is used for navigation?',
      options: ['<nav>', '<menu>', '<navigate>', '<navigation>'],
      answer: 0
    },
    {
      question: 'What does CSS Grid do?',
      options: ['Creates tables', 'Two-dimensional layout system', 'One-dimensional layout', 'Image gallery'],
      answer: 1
    },
    {
      question: 'Which React hook manages side effects?',
      options: ['useState', 'useEffect', 'useContext', 'useReducer'],
      answer: 1
    },
    {
      question: 'What is the purpose of media queries?',
      options: ['Play media', 'Apply styles based on device characteristics', 'Query database', 'Handle user input'],
      answer: 1
    },
    {
      question: 'Which browser API handles asynchronous operations?',
      options: ['DOM API', 'Fetch API', 'CSS API', 'HTML API'],
      answer: 1
    }
  ],
  'Backend': [
    {
      question: 'What is REST?',
      options: ['Database system', 'API architectural style', 'Programming language', 'Web framework'],
      answer: 1
    },
    {
      question: 'Which HTTP method retrieves data?',
      options: ['POST', 'PUT', 'GET', 'DELETE'],
      answer: 2
    },
    {
      question: 'What is middleware?',
      options: ['Database', 'Code that processes requests/responses', 'User interface', 'Authentication system'],
      answer: 1
    },
    {
      question: 'Which database is NoSQL?',
      options: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQLite'],
      answer: 2
    },
    {
      question: 'What does API stand for?',
      options: ['Application Programming Interface', 'Advanced Programming Interface', 'Automated Programming Interface', 'Application Process Interface'],
      answer: 0
    },
    {
      question: 'Which authentication method uses tokens?',
      options: ['Basic Auth', 'JWT', 'Session Auth', 'API Key'],
      answer: 1
    },
    {
      question: 'What is caching used for?',
      options: ['Store user data', 'Improve performance by storing frequently accessed data', 'Log user actions', 'Handle errors'],
      answer: 1
    },
    {
      question: 'Which protocol is used for secure communication?',
      options: ['HTTP', 'HTTPS', 'FTP', 'SMTP'],
      answer: 1
    },
    {
      question: 'What is load balancing?',
      options: ['Database optimization', 'Distributing traffic across servers', 'Code minification', 'Image compression'],
      answer: 1
    },
    {
      question: 'Which framework is used for Node.js backend?',
      options: ['React', 'Angular', 'Express', 'Vue'],
      answer: 2
    }
  ],
  'DevOps': [
    {
      question: 'What does CI/CD stand for?',
      options: ['Continuous Integration/Continuous Deployment', 'Code Integration/Code Deployment', 'Continuous Improvement/Continuous Development', 'Cloud Integration/Cloud Deployment'],
      answer: 0
    },
    {
      question: 'Which tool is used for version control?',
      options: ['Docker', 'Git', 'Jenkins', 'Kubernetes'],
      answer: 1
    },
    {
      question: 'What is containerization?',
      options: ['Code packaging', 'Application packaging with dependencies', 'Database optimization', 'Network configuration'],
      answer: 1
    },
    {
      question: 'Which cloud platform is from Amazon?',
      options: ['Azure', 'GCP', 'AWS', 'DigitalOcean'],
      answer: 2
    },
    {
      question: 'What does IaC stand for?',
      options: ['Infrastructure as Code', 'Integration as Code', 'Interface as Code', 'Implementation as Code'],
      answer: 0
    },
    {
      question: 'Which tool automates deployment?',
      options: ['Git', 'Docker', 'Jenkins', 'Terraform'],
      answer: 2
    },
    {
      question: 'What is monitoring in DevOps?',
      options: ['Code review', 'Tracking system performance and health', 'User management', 'Security auditing'],
      answer: 1
    },
    {
      question: 'Which command lists Docker containers?',
      options: ['docker list', 'docker ps', 'docker show', 'docker containers'],
      answer: 1
    },
    {
      question: 'What is a pipeline in CI/CD?',
      options: ['Water pipe', 'Automated workflow for building and deploying', 'Database connection', 'Network cable'],
      answer: 1
    },
    {
      question: 'Which tool manages infrastructure as code?',
      options: ['Jenkins', 'Docker', 'Terraform', 'Git'],
      answer: 2
    }
  ],
  'Data Scientist': [
    {
      question: 'Which library is used for data analysis in Python?',
      options: ['NumPy', 'Pandas', 'Matplotlib', 'All of the above'],
      answer: 3
    },
    {
      question: 'What is machine learning?',
      options: ['Manual programming', 'Learning from data without explicit programming', 'Database management', 'Web development'],
      answer: 1
    },
    {
      question: 'Which algorithm is used for classification?',
      options: ['Linear Regression', 'Decision Tree', 'K-Means', 'PCA'],
      answer: 1
    },
    {
      question: 'What does EDA stand for?',
      options: ['Electronic Data Analysis', 'Exploratory Data Analysis', 'Enhanced Data Analytics', 'Enterprise Data Architecture'],
      answer: 1
    },
    {
      question: 'Which technique reduces dimensionality?',
      options: ['Regression', 'Classification', 'PCA', 'Clustering'],
      answer: 2
    },
    {
      question: 'What is overfitting?',
      options: ['Model performs well on training data but poorly on new data', 'Model performs poorly on training data', 'Model has perfect accuracy', 'Model has no errors'],
      answer: 0
    },
    {
      question: 'Which metric measures classification accuracy?',
      options: ['MSE', 'RMSE', 'Accuracy', 'R²'],
      answer: 2
    },
    {
      question: 'What is cross-validation?',
      options: ['Validating across different datasets', 'Technique to evaluate model performance', 'Data preprocessing', 'Feature selection'],
      answer: 1
    },
    {
      question: 'Which algorithm is unsupervised?',
      options: ['Linear Regression', 'Logistic Regression', 'K-Means', 'Decision Tree'],
      answer: 2
    },
    {
      question: 'What is the purpose of feature engineering?',
      options: ['Create new features from existing data', 'Remove features', 'Scale features', 'Encode features'],
      answer: 0
    }
  ]
};

function getQuestionId(topic, index) {
  return `${topic}-${index}`;
}

function getQuestionsByTopic(topic) {
  return QUIZ_QUESTIONS[topic] || [];
}

function getQuestionsWithIds(topic) {
  return getQuestionsByTopic(topic).map((question, index) => ({
    id: getQuestionId(topic, index),
    ...question,
  }));
}

function getRandomQuestions(topic, count = 10) {
  const questions = getQuestionsWithIds(topic);
  if (questions.length <= count) return questions;

  const shuffled = [...questions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

module.exports = {
  QUIZ_QUESTIONS,
  getQuestionsByTopic,
  getQuestionsWithIds,
  getRandomQuestions
};