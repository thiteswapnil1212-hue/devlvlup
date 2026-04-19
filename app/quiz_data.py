"""
Skill Verification Quiz Database
10 questions per topic across 14 programming topics
"""

QUIZ_QUESTIONS = {
    "C": [
        {
            "id": 1,
            "question": "What is the output of this code?\nint x = 5;\nint y = ++x;\nprintf(\"%d %d\", x, y);",
            "options": ["5 5", "6 6", "6 5", "5 6"],
            "answer": 1,  # 6 6
        },
        {
            "id": 2,
            "question": "Which header file is required for using malloc()?",
            "options": ["<stdio.h>", "<stdlib.h>", "<string.h>", "<math.h>"],
            "answer": 1,  # <stdlib.h>
        },
        {
            "id": 3,
            "question": "What is the size of int data type in a 32-bit system?",
            "options": ["2 bytes", "4 bytes", "8 bytes", "1 byte"],
            "answer": 1,  # 4 bytes
        },
        {
            "id": 4,
            "question": "What does 'extern' keyword do?",
            "options": ["Declares a global variable", "Declares a variable externally", "Defines a function", "Creates a pointer"],
            "answer": 1,  # Declares a variable externally
        },
        {
            "id": 5,
            "question": "What is a segmentation fault?",
            "options": ["Syntax error", "Memory access violation", "Logic error", "Runtime warning"],
            "answer": 1,  # Memory access violation
        },
        {
            "id": 6,
            "question": "How do you read a string with spaces in C?",
            "options": ["scanf(\"%s\")", "scanf(\"%[^\\n]\")", "gets()", "Both B and C"],
            "answer": 3,  # Both B and C
        },
        {
            "id": 7,
            "question": "What is the purpose of the free() function?",
            "options": ["Free up memory", "Free variables", "Clear buffer", "Reset pointers"],
            "answer": 0,  # Free up memory
        },
        {
            "id": 8,
            "question": "What does static variable do in C?",
            "options": ["Prevents modification", "Maintains value between calls", "Creates global scope", "None"],
            "answer": 1,  # Maintains value between calls
        },
        {
            "id": 9,
            "question": "What is NULL pointer?",
            "options": ["Empty pointer", "Pointer with value 0", "Uninitialized pointer", "Wild pointer"],
            "answer": 1,  # Pointer with value 0
        },
        {
            "id": 10,
            "question": "Which is correct array declaration?",
            "options": ["int arr[];", "int [10] arr;", "int arr[10];", "arr[10] int;"],
            "answer": 2,  # int arr[10];
        },
    ],
    "C++": [
        {
            "id": 1,
            "question": "What is the main difference between class and struct in C++?",
            "options": ["No difference", "Default access level", "Struct cannot have methods", "Size differs"],
            "answer": 1,  # Default access level
        },
        {
            "id": 2,
            "question": "Which keyword is used for inheritance in C++?",
            "options": ["extends", "inherit", ":", "->"],
            "answer": 2,  # :
        },
        {
            "id": 3,
            "question": "What is polymorphism?",
            "options": ["Multiple classes", "Many forms of data", "Function overloading", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 4,
            "question": "What is a virtual function?",
            "options": ["Function in derived class", "Overridable function", "Deleted function", "Static function"],
            "answer": 1,  # Overridable function
        },
        {
            "id": 5,
            "question": "How do you use smart pointers in C++11?",
            "options": ["new keyword", "unique_ptr, shared_ptr", "malloc()", "calloc()"],
            "answer": 1,  # unique_ptr, shared_ptr
        },
        {
            "id": 6,
            "question": "What is template in C++?",
            "options": ["Design pattern", "Generic programming", "Copy mechanism", "Memory layout"],
            "answer": 1,  # Generic programming
        },
        {
            "id": 7,
            "question": "Which operator is used for member access via pointer?",
            "options": [".", "->", "::", "&"],
            "answer": 1,  # ->
        },
        {
            "id": 8,
            "question": "What is the difference between const and constexpr?",
            "options": ["No difference", "constexpr is compile-time", "const is safer", "Same in C++"],
            "answer": 1,  # constexpr is compile-time
        },
        {
            "id": 9,
            "question": "What is operator overloading?",
            "options": ["Overloading main()", "Custom operator behavior", "Duplicate operators", "Exception handling"],
            "answer": 1,  # Custom operator behavior
        },
        {
            "id": 10,
            "question": "How to create a copy constructor in C++?",
            "options": ["ClassName(ClassName obj)", "ClassName(const ClassName& obj)", "copy()", "Both A and B"],
            "answer": 1,  # ClassName(const ClassName& obj)
        },
    ],
    "Java": [
        {
            "id": 1,
            "question": "What is Java Virtual Machine (JVM)?",
            "options": ["Compiler", "Abstract computing machine", "Java IDE", "Runtime environment"],
            "answer": 1,  # Abstract computing machine
        },
        {
            "id": 2,
            "question": "Can you make a class abstract without abstract keyword?",
            "options": ["Yes", "No", "Sometimes", "Partially"],
            "answer": 1,  # No
        },
        {
            "id": 3,
            "question": "What is the difference between interface and abstract class?",
            "options": ["No difference", "Interface has no implementation", "Abstract class cannot inherit", "Different syntax only"],
            "answer": 1,  # Interface has no implementation
        },
        {
            "id": 4,
            "question": "What does 'final' keyword do in Java?",
            "options": ["Ends program", "Prevents modification", "Marks as last", "Creates constant"],
            "answer": 1,  # Prevents modification
        },
        {
            "id": 5,
            "question": "What is the superclass of all classes in Java?",
            "options": ["Parent", "Main", "Object", "Class"],
            "answer": 2,  # Object
        },
        {
            "id": 6,
            "question": "What is garbage collection in Java?",
            "options": ["Deleting files", "Automatic memory management", "Compiler optimization", "Data cleanup"],
            "answer": 1,  # Automatic memory management
        },
        {
            "id": 7,
            "question": "How do you create a thread in Java?",
            "options": ["Extend Thread", "Implement Runnable", "Both A and B", "Using executor"],
            "answer": 2,  # Both A and B
        },
        {
            "id": 8,
            "question": "What is the difference between ArrayList and Vector?",
            "options": ["Same", "Vector is synchronized", "ArrayList is larger", "Different syntax"],
            "answer": 1,  # Vector is synchronized
        },
        {
            "id": 9,
            "question": "What is method overriding?",
            "options": ["Duplicate methods", "Same method in subclass", "Change method name", "Delete method"],
            "answer": 1,  # Same method in subclass
        },
        {
            "id": 10,
            "question": "What keyword is used for package definition?",
            "options": ["import", "class", "package", "namespace"],
            "answer": 2,  # package
        },
    ],
    "HTML": [
        {
            "id": 1,
            "question": "What does HTML stand for?",
            "options": ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
            "answer": 0,  # Hyper Text Markup Language
        },
        {
            "id": 2,
            "question": "Which tag is used for the largest heading?",
            "options": ["<h6>", "<heading>", "<h1>", "<head>"],
            "answer": 2,  # <h1>
        },
        {
            "id": 3,
            "question": "What is the correct syntax for creating a hyperlink?",
            "options": ["<a href='url'>Link</a>", "<link href='url'>Link</link>", "<a url='url'>Link</a>", "<hyperlink>Link</hyperlink>"],
            "answer": 0,  # <a href='url'>Link</a>
        },
        {
            "id": 4,
            "question": "Which tag is used to insert an image?",
            "options": ["<image>", "<img>", "<picture>", "<photo>"],
            "answer": 1,  # <img>
        },
        {
            "id": 5,
            "question": "What is the correct HTML for a line break?",
            "options": ["<lb>", "<break>", "<br>", "<newline>"],
            "answer": 2,  # <br>
        },
        {
            "id": 6,
            "question": "Which tag defines the title of a document?",
            "options": ["<title>", "<head>", "<header>", "<name>"],
            "answer": 0,  # <title>
        },
        {
            "id": 7,
            "question": "What is the purpose of <meta> tag?",
            "options": ["Metadata", "Main content", "Menu", "Media"],
            "answer": 0,  # Metadata
        },
        {
            "id": 8,
            "question": "Which attribute specifies alternate text for an image?",
            "options": ["alt", "src", "title", "text"],
            "answer": 0,  # alt
        },
        {
            "id": 9,
            "question": "What tag is used for a list item?",
            "options": ["<li>", "<item>", "<list>", "<i>"],
            "answer": 0,  # <li>
        },
        {
            "id": 10,
            "question": "Which tag is used for form input?",
            "options": ["<form>", "<input>", "<field>", "<data>"],
            "answer": 1,  # <input>
        },
    ],
    "CSS": [
        {
            "id": 1,
            "question": "What does CSS stand for?",
            "options": ["Colorful Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Creative Style Sheets"],
            "answer": 1,  # Cascading Style Sheets
        },
        {
            "id": 2,
            "question": "How do you select an element by class in CSS?",
            "options": ["#classname", ".classname", "classname", "@classname"],
            "answer": 1,  # .classname
        },
        {
            "id": 3,
            "question": "Which property is used to change text color?",
            "options": ["text-color", "color", "font-color", "txt-color"],
            "answer": 1,  # color
        },
        {
            "id": 4,
            "question": "How do you add a background color?",
            "options": ["background-color", "bg-color", "color", "background"],
            "answer": 0,  # background-color
        },
        {
            "id": 5,
            "question": "What is the default display value of a div?",
            "options": ["inline", "block", "flex", "grid"],
            "answer": 1,  # block
        },
        {
            "id": 6,
            "question": "Which property controls the space inside an element?",
            "options": ["padding", "margin", "border", "gap"],
            "answer": 0,  # padding
        },
        {
            "id": 7,
            "question": "What is a CSS selector that targets multiple elements?",
            "options": ["Comma separator", "Space separator", "Pipe separator", "Semicolon"],
            "answer": 0,  # Comma separator
        },
        {
            "id": 8,
            "question": "How do you create a rounded corner?",
            "options": ["border-radius", "border-round", "corner-radius", "round-edge"],
            "answer": 0,  # border-radius
        },
        {
            "id": 9,
            "question": "What property is used for opacity?",
            "options": ["transparent", "opacity", "alpha", "visibility"],
            "answer": 1,  # opacity
        },
        {
            "id": 10,
            "question": "How do you center text in CSS?",
            "options": ["text-center", "text-align: center", "center", "align-center"],
            "answer": 1,  # text-align: center
        },
    ],
    "JavaScript": [
        {
            "id": 1,
            "question": "What is the output of typeof undefined?",
            "options": ["'undefined'", "'object'", "'null'", "undefined"],
            "answer": 0,  # 'undefined'
        },
        {
            "id": 2,
            "question": "What does === check in JavaScript?",
            "options": ["Equality", "Type and value", "Only type", "Assignment"],
            "answer": 1,  # Type and value
        },
        {
            "id": 3,
            "question": "How do you declare a variable that cannot be reassigned?",
            "options": ["let", "const", "var", "final"],
            "answer": 1,  # const
        },
        {
            "id": 4,
            "question": "What is a closure in JavaScript?",
            "options": ["End of function", "Function inside function", "Inner function with access to outer scope", "Loop terminator"],
            "answer": 2,  # Inner function with access to outer scope
        },
        {
            "id": 5,
            "question": "What is the purpose of 'this' keyword?",
            "options": ["Current object", "This file", "This code block", "This function"],
            "answer": 0,  # Current object
        },
        {
            "id": 6,
            "question": "How do you handle errors in JavaScript?",
            "options": ["try-catch", "if-else", "throw", "Both A and C"],
            "answer": 3,  # Both A and C
        },
        {
            "id": 7,
            "question": "What is Promise in JavaScript?",
            "options": ["Guarantee", "Async operation", "Variable", "Function"],
            "answer": 1,  # Async operation
        },
        {
            "id": 8,
            "question": "What is async/await?",
            "options": ["Loop", "Promise handler", "Async function", "Variable type"],
            "answer": 2,  # Async function
        },
        {
            "id": 9,
            "question": "How do you clone an object in JavaScript?",
            "options": ["Object.assign()", "Spread operator", "Both A and B", "clone()"],
            "answer": 2,  # Both A and B
        },
        {
            "id": 10,
            "question": "What is event delegation?",
            "options": ["Event propagation", "Single listener for multiple elements", "Event bubbling", "Stop events"],
            "answer": 1,  # Single listener for multiple elements
        },
    ],
    "React": [
        {
            "id": 1,
            "question": "What is JSX?",
            "options": ["JavaScript XML", "Java Syntax Extension", "JavaScript Extra", "JSON XML"],
            "answer": 0,  # JavaScript XML
        },
        {
            "id": 2,
            "question": "What hook is used for state management?",
            "options": ["useEffect", "useState", "useContext", "useRef"],
            "answer": 1,  # useState
        },
        {
            "id": 3,
            "question": "What does useEffect do?",
            "options": ["Manage state", "Side effects", "Event handling", "Styling"],
            "answer": 1,  # Side effects
        },
        {
            "id": 4,
            "question": "What is prop drilling?",
            "options": ["Debugging", "Passing props deeply", "Component nesting", "Memory leak"],
            "answer": 1,  # Passing props deeply
        },
        {
            "id": 5,
            "question": "How do you prevent re-renders?",
            "options": ["React.memo", "useMemo", "useCallback", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 6,
            "question": "What is the purpose of keys in lists?",
            "options": ["Styling", "Identify elements", "Performance", "Both B and C"],
            "answer": 3,  # Both B and C
        },
        {
            "id": 7,
            "question": "What is a controlled component?",
            "options": ["Component with state", "Form element controlled by React", "Custom component", "Reusable component"],
            "answer": 1,  # Form element controlled by React
        },
        {
            "id": 8,
            "question": "How do you handle forms in React?",
            "options": ["onChange handler", "onSubmit handler", "Both A and B", "useForm"],
            "answer": 2,  # Both A and B
        },
        {
            "id": 9,
            "question": "What is Context API used for?",
            "options": ["Routing", "State management", "Styling", "HTTP requests"],
            "answer": 1,  # State management
        },
        {
            "id": 10,
            "question": "How do you optimize React performance?",
            "options": ["Code splitting", "Lazy loading", "Memoization", "All of above"],
            "answer": 3,  # All of above
        },
    ],
    "Node.js": [
        {
            "id": 1,
            "question": "What is Node.js?",
            "options": ["JavaScript runtime", "Server framework", "Package manager", "Testing tool"],
            "answer": 0,  # JavaScript runtime
        },
        {
            "id": 2,
            "question": "What is npm?",
            "options": ["Node Package Manager", "Network Protocol Manager", "Node Program Manager", "New Package Module"],
            "answer": 0,  # Node Package Manager
        },
        {
            "id": 3,
            "question": "How do you import a module in Node.js?",
            "options": ["import module from 'path'", "require('path')", "Both A and B", "load('path')"],
            "answer": 2,  # Both A and B
        },
        {
            "id": 4,
            "question": "What is Express?",
            "options": ["Web framework", "Package manager", "Database", "Testing framework"],
            "answer": 0,  # Web framework
        },
        {
            "id": 5,
            "question": "How do you create a basic HTTP server in Node.js?",
            "options": ["express()", "http.createServer()", "require('server')", "new Server()"],
            "answer": 1,  # http.createServer()
        },
        {
            "id": 6,
            "question": "What is middleware in Express?",
            "options": ["Database layer", "Function processing requests", "Routing", "Error handling"],
            "answer": 1,  # Function processing requests
        },
        {
            "id": 7,
            "question": "How do you handle errors in Express?",
            "options": ["try-catch", "Error middleware", "Both A and B", "throw error"],
            "answer": 2,  # Both A and B
        },
        {
            "id": 8,
            "question": "What is package.json?",
            "options": ["Metadata file", "Configuration file", "Dependency list", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 9,
            "question": "How do you handle async operations in Node.js?",
            "options": ["Callbacks", "Promises", "async/await", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 10,
            "question": "What is the purpose of process.env?",
            "options": ["Process information", "Environment variables", "System paths", "Config settings"],
            "answer": 1,  # Environment variables
        },
    ],
    "Python": [
        {
            "id": 1,
            "question": "What is Python?",
            "options": ["Snake", "Programming language", "Library", "Framework"],
            "answer": 1,  # Programming language
        },
        {
            "id": 2,
            "question": "What is the correct way to create a comment in Python?",
            "options": ["// comment", "# comment", "/* comment */", "-- comment"],
            "answer": 1,  # # comment
        },
        {
            "id": 3,
            "question": "What is a list in Python?",
            "options": ["String", "Ordered collection", "Dictionary", "Tuple"],
            "answer": 1,  # Ordered collection
        },
        {
            "id": 4,
            "question": "What is the difference between list and tuple?",
            "options": ["No difference", "Tuple is immutable", "List is slower", "Same"],
            "answer": 1,  # Tuple is immutable
        },
        {
            "id": 5,
            "question": "What is a dictionary in Python?",
            "options": ["Ordered list", "Key-value pairs", "Immutable list", "String collection"],
            "answer": 1,  # Key-value pairs
        },
        {
            "id": 6,
            "question": "What is a lambda function?",
            "options": ["Anonymous function", "Named function", "Nested function", "Built-in function"],
            "answer": 0,  # Anonymous function
        },
        {
            "id": 7,
            "question": "How do you create a function in Python?",
            "options": ["function name()", "def name():", "func name()", "define name()"],
            "answer": 1,  # def name():
        },
        {
            "id": 8,
            "question": "What is a decorator in Python?",
            "options": ["Styling", "Function wrapper", "Class modifier", "Variable type"],
            "answer": 1,  # Function wrapper
        },
        {
            "id": 9,
            "question": "What is list comprehension?",
            "options": ["Comment syntax", "Loop syntax", "Concise list creation", "Error handling"],
            "answer": 2,  # Concise list creation
        },
        {
            "id": 10,
            "question": "What is the purpose of __init__?",
            "options": ["Import module", "Initialize class", "Create instance", "Define variable"],
            "answer": 1,  # Initialize class
        },
    ],
    "SQL": [
        {
            "id": 1,
            "question": "What does SQL stand for?",
            "options": ["Structured Query Language", "Simple Query Language", "Standard Query Language", "Secure Query Language"],
            "answer": 0,  # Structured Query Language
        },
        {
            "id": 2,
            "question": "What is the purpose of WHERE clause?",
            "options": ["Ordering results", "Filtering results", "Grouping data", "Joining tables"],
            "answer": 1,  # Filtering results
        },
        {
            "id": 3,
            "question": "What is a primary key?",
            "options": ["Main key", "Unique identifier", "Foreign key", "Access key"],
            "answer": 1,  # Unique identifier
        },
        {
            "id": 4,
            "question": "What is a foreign key?",
            "options": ["External key", "References primary key", "Encrypted key", "Main key"],
            "answer": 1,  # References primary key
        },
        {
            "id": 5,
            "question": "What does JOIN do?",
            "options": ["Merge data", "Connect tables", "Combine rows", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 6,
            "question": "What is GROUP BY used for?",
            "options": ["Sorting", "Grouping rows", "Filtering", "Joining"],
            "answer": 1,  # Grouping rows
        },
        {
            "id": 7,
            "question": "What is an index in SQL?",
            "options": ["Sort order", "Speed up queries", "Table structure", "Column type"],
            "answer": 1,  # Speed up queries
        },
        {
            "id": 8,
            "question": "What does HAVING clause do?",
            "options": ["Filter rows", "Filter groups", "Sort data", "Join tables"],
            "answer": 1,  # Filter groups
        },
        {
            "id": 9,
            "question": "What is normalization?",
            "options": ["Data compression", "Database organization", "Query optimization", "Indexing"],
            "answer": 1,  # Database organization
        },
        {
            "id": 10,
            "question": "What is a transaction in SQL?",
            "options": ["Data transfer", "Unit of work", "Query execution", "Table operation"],
            "answer": 1,  # Unit of work
        },
    ],
    "DSA": [
        {
            "id": 1,
            "question": "What is time complexity?",
            "options": ["Code speed", "Execution time analysis", "Time measurement", "Performance"],
            "answer": 1,  # Execution time analysis
        },
        {
            "id": 2,
            "question": "What is the time complexity of linear search?",
            "options": ["O(1)", "O(n)", "O(log n)", "O(n^2)"],
            "answer": 1,  # O(n)
        },
        {
            "id": 3,
            "question": "What is the time complexity of binary search?",
            "options": ["O(n)", "O(log n)", "O(1)", "O(n^2)"],
            "answer": 1,  # O(log n)
        },
        {
            "id": 4,
            "question": "What data structure uses LIFO?",
            "options": ["Queue", "Stack", "Array", "Linked List"],
            "answer": 1,  # Stack
        },
        {
            "id": 5,
            "question": "What data structure uses FIFO?",
            "options": ["Stack", "Queue", "Tree", "Graph"],
            "answer": 1,  # Queue
        },
        {
            "id": 6,
            "question": "What is the purpose of hash table?",
            "options": ["Fast lookup", "Sorting", "Storing", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 7,
            "question": "What is recursion?",
            "options": ["Loop", "Function calling itself", "Iteration", "Branching"],
            "answer": 1,  # Function calling itself
        },
        {
            "id": 8,
            "question": "What is dynamic programming?",
            "options": ["Object-oriented", "Problem-solving", "Optimization technique", "Design pattern"],
            "answer": 2,  # Optimization technique
        },
        {
            "id": 9,
            "question": "What is space complexity?",
            "options": ["Memory usage", "Code size", "Storage", "All of above"],
            "answer": 0,  # Memory usage
        },
        {
            "id": 10,
            "question": "What is Big O notation?",
            "options": ["Algorithm analysis", "Time measurement", "Performance metric", "Worst case scenario"],
            "answer": 3,  # Worst case scenario
        },
    ],
    "Frontend": [
        {
            "id": 1,
            "question": "What is responsive design?",
            "options": ["Quick loading", "Adapts to devices", "User interaction", "Fast rendering"],
            "answer": 1,  # Adapts to devices
        },
        {
            "id": 2,
            "question": "What is the viewport meta tag for?",
            "options": ["SEO", "Mobile optimization", "Styling", "Scripts"],
            "answer": 1,  # Mobile optimization
        },
        {
            "id": 3,
            "question": "What is accessibility (a11y)?",
            "options": ["Security", "Usability for all", "Performance", "Design"],
            "answer": 1,  # Usability for all
        },
        {
            "id": 4,
            "question": "What is DOM?",
            "options": ["Document Object Model", "Data Object Model", "Dynamic Object Model", "Design Object Model"],
            "answer": 0,  # Document Object Model
        },
        {
            "id": 5,
            "question": "What is event bubbling?",
            "options": ["Event propagation", "Multiple events", "Event triggering", "Event handling"],
            "answer": 0,  # Event propagation
        },
        {
            "id": 6,
            "question": "What is CSS Box Model?",
            "options": ["Styling", "Content, padding, border, margin", "Layout", "Design"],
            "answer": 1,  # Content, padding, border, margin
        },
        {
            "id": 7,
            "question": "What is flexbox?",
            "options": ["Flex layout", "Flexible box layout", "CSS grid", "Responsive design"],
            "answer": 1,  # Flexible box layout
        },
        {
            "id": 8,
            "question": "What is CSS Grid?",
            "options": ["Table layout", "2D layout system", "Responsive", "Flexbox"],
            "answer": 1,  # 2D layout system
        },
        {
            "id": 9,
            "question": "What is web performance optimization?",
            "options": ["Faster loading", "Better rendering", "Efficient code", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 10,
            "question": "What is semantic HTML?",
            "options": ["Meaningful tags", "Styling", "Scripting", "Layout"],
            "answer": 0,  # Meaningful tags
        },
    ],
    "Backend": [
        {
            "id": 1,
            "question": "What is REST API?",
            "options": ["Representational State Transfer", "Resource Extraction", "Request Status Transfer", "Response Service Transfer"],
            "answer": 0,  # Representational State Transfer
        },
        {
            "id": 2,
            "question": "What is the HTTP GET method for?",
            "options": ["Retrieve data", "Create data", "Update data", "Delete data"],
            "answer": 0,  # Retrieve data
        },
        {
            "id": 3,
            "question": "What is the HTTP POST method for?",
            "options": ["Retrieve", "Create data", "Update", "Delete"],
            "answer": 1,  # Create data
        },
        {
            "id": 4,
            "question": "What is authentication?",
            "options": ["Authorization", "Verify identity", "Permission check", "Access control"],
            "answer": 1,  # Verify identity
        },
        {
            "id": 5,
            "question": "What is authorization?",
            "options": ["Identity verification", "Permission checking", "Authentication", "Login"],
            "answer": 1,  # Permission checking
        },
        {
            "id": 6,
            "question": "What is a token?",
            "options": ["Access credential", "Security string", "API key", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 7,
            "question": "What is JWT?",
            "options": ["JSON Web Token", "JavaScript Web Token", "Java Web Token", "JSON Web Test"],
            "answer": 0,  # JSON Web Token
        },
        {
            "id": 8,
            "question": "What is rate limiting?",
            "options": ["Speed control", "Request limits", "Throttling", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 9,
            "question": "What is caching?",
            "options": ["Data storage", "Performance optimization", "Memory management", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 10,
            "question": "What is database migration?",
            "options": ["Data transfer", "Schema changes", "Version control", "Backup"],
            "answer": 1,  # Schema changes
        },
    ],
    "DevOps": [
        {
            "id": 1,
            "question": "What is DevOps?",
            "options": ["Development and Operations", "Developer Operations", "Data Operations", "Development Optimization"],
            "answer": 0,  # Development and Operations
        },
        {
            "id": 2,
            "question": "What is Docker?",
            "options": ["Containerization platform", "Version control", "CI/CD tool", "Monitoring tool"],
            "answer": 0,  # Containerization platform
        },
        {
            "id": 3,
            "question": "What is Kubernetes?",
            "options": ["Container orchestration", "Container runtime", "Monitoring tool", "Deployment tool"],
            "answer": 0,  # Container orchestration
        },
        {
            "id": 4,
            "question": "What is CI/CD?",
            "options": ["Continuous Integration/Continuous Deployment", "Code Integration/Code Development", "Continuous Implementation", "Code Isolation"],
            "answer": 0,  # Continuous Integration/Continuous Deployment
        },
        {
            "id": 5,
            "question": "What is Infrastructure as Code (IaC)?",
            "options": ["Code versioning", "Infrastructure management via code", "Cloud coding", "API coding"],
            "answer": 1,  # Infrastructure management via code
        },
        {
            "id": 6,
            "question": "What is a pipeline?",
            "options": ["Data flow", "Automated workflow", "Process chain", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 7,
            "question": "What is Git?",
            "options": ["Version control", "Package manager", "Deployment tool", "Monitoring"],
            "answer": 0,  # Version control
        },
        {
            "id": 8,
            "question": "What is monitoring in DevOps?",
            "options": ["Watching code", "System health check", "Performance tracking", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 9,
            "question": "What is load balancing?",
            "options": ["Distributing traffic", "Load management", "Traffic control", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 10,
            "question": "What is a reverse proxy?",
            "options": ["Proxy server", "Forward requests", "Handle client requests", "All of above"],
            "answer": 3,  # All of above
        },
    ],
    "Data Scientist": [
        {
            "id": 1,
            "question": "What is machine learning?",
            "options": ["Computer learning", "Algorithm learning from data", "Automatic learning", "Network learning"],
            "answer": 1,  # Algorithm learning from data
        },
        {
            "id": 2,
            "question": "What is supervised learning?",
            "options": ["Labeled data", "Without labels", "Self-learning", "Unsupervised"],
            "answer": 0,  # Labeled data
        },
        {
            "id": 3,
            "question": "What is unsupervised learning?",
            "options": ["Labeled data", "Unlabeled data", "Training data", "Test data"],
            "answer": 1,  # Unlabeled data
        },
        {
            "id": 4,
            "question": "What is a dataset?",
            "options": ["Code collection", "Data collection", "File type", "Variable type"],
            "answer": 1,  # Data collection
        },
        {
            "id": 5,
            "question": "What is model training?",
            "options": ["Teaching model", "Learning from data", "Algorithm optimization", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 6,
            "question": "What is accuracy metric?",
            "options": ["Precision", "Correct predictions ratio", "F1-score", "Recall"],
            "answer": 1,  # Correct predictions ratio
        },
        {
            "id": 7,
            "question": "What is feature engineering?",
            "options": ["Creating features", "Data preparation", "Feature selection", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 8,
            "question": "What is overfitting?",
            "options": ["Training too long", "Fits training data too well", "Data problem", "Model selection"],
            "answer": 1,  # Fits training data too well
        },
        {
            "id": 9,
            "question": "What is cross-validation?",
            "options": ["Model testing", "Data splitting", "Validation technique", "All of above"],
            "answer": 3,  # All of above
        },
        {
            "id": 10,
            "question": "What is a confusion matrix?",
            "options": ["Error matrix", "Classification metrics", "Performance evaluation", "All of above"],
            "answer": 3,  # All of above
        },
    ],
}

def get_topics():
    """Get all available topics."""
    return list(QUIZ_QUESTIONS.keys())


def get_questions_by_topic(topic: str, count: int = 10):
    """Get random questions for a specific topic."""
    import random
    
    if topic not in QUIZ_QUESTIONS:
        return []
    
    questions = QUIZ_QUESTIONS[topic]
    selected = random.sample(questions, min(count, len(questions)))
    
    # Remove answers from frontend (only send options)
    return [
        {
            "id": q["id"],
            "topic": topic,
            "question": q["question"],
            "options": q["options"],
        }
        for q in selected
    ]


def get_correct_answers(topic: str, question_ids: list):
    """Get correct answers for validation (backend only)."""
    if topic not in QUIZ_QUESTIONS:
        return {}
    
    answers = {}
    for q in QUIZ_QUESTIONS[topic]:
        if q["id"] in question_ids:
            answers[q["id"]] = q["answer"]
    
    return answers
