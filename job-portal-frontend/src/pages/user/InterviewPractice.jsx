// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Timer, Brain, CheckCircle, Trophy, Clock } from "lucide-react";
// import "./InterviewPractice.css";

// const InterviewPractice = () => {
//   const location = useLocation();
//   const { category } = location.state || { category: "DSA" };

//   const questionBank = {
//     DSA: [
//       { id: 1, question: "What is the time complexity of Binary Search?", options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"], correctAnswer: "O(log n)" },
//       { id: 2, question: "Which data structure is used in BFS traversal?", options: ["Stack", "Queue", "Heap", "Graph"], correctAnswer: "Queue" },
//       { id: 3, question: "What is the space complexity of Merge Sort?", options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"], correctAnswer: "O(n)" },
//       { id: 4, question: "Which data structure is ideal for implementing a Priority Queue?", options: ["Array", "Linked List", "Heap", "Stack"], correctAnswer: "Heap" },
//       { id: 5, question: "Which algorithm is used to detect a cycle in a graph?", options: ["DFS", "BFS", "Dijkstra", "Kruskal"], correctAnswer: "DFS" },
//     ],
//     Aptitude: [
//       { id: 6, question: "If a train travels 60 km in 1 hour, what is its speed in m/s?", options: ["16.6 m/s", "60 m/s", "100 m/s", "10 m/s"], correctAnswer: "16.6 m/s" },
//       { id: 7, question: "What is 25% of 240?", options: ["50", "60", "65", "70"], correctAnswer: "60" },
//       { id: 8, question: "A shopkeeper sold an article for ₹1200 with 20% profit. What was the cost price?", options: ["₹1000", "₹950", "₹1100", "₹1050"], correctAnswer: "₹1000" },
//       { id: 9, question: "If a person can type 60 words in a minute, how many words can he type in 5 minutes?", options: ["300", "250", "360", "240"], correctAnswer: "300" },
//       { id: 10, question: "Find the average of 10, 20, 30, 40, 50", options: ["25", "30", "35", "40"], correctAnswer: "30" },
//     ],
//     "System Design": [
//       { id: 11, question: "Which database is best for storing hierarchical data?", options: ["Relational DB", "Graph DB", "Document DB", "Key-Value Store"], correctAnswer: "Graph DB" },
//       { id: 12, question: "What does a Load Balancer do?", options: ["Stores data", "Balances user traffic across servers", "Compiles code", "Provides caching"], correctAnswer: "Balances user traffic across servers" },
//       { id: 13, question: "What is sharding in databases?", options: ["Vertical partitioning", "Horizontal partitioning", "Indexing", "Replication"], correctAnswer: "Horizontal partitioning" },
//       { id: 14, question: "Explain eventual consistency.", options: ["All nodes always have same data", "Nodes may be temporarily inconsistent", "Data is never consistent", "Data is cached only"], correctAnswer: "Nodes may be temporarily inconsistent" },
//       { id: 15, question: "Which system design principle improves scalability?", options: ["Caching", "Single server", "Synchronous requests", "Hard coding values"], correctAnswer: "Caching" },
//     ],
//     Behavioral: [
//       {
//         id: 16,
//         question: "How do you handle conflict in a team?",
//         options: [
//           "Ignore it",
//           "Escalate to manager immediately",
//           "Listen to both sides and resolve calmly",
//           "Leave the team"
//         ],
//         correctAnswer: "Listen to both sides and resolve calmly"
//       },
//       {
//         id: 17,
//         question: "Describe a time when you faced a challenge at work.",
//         options: [
//           "Took initiative to solve the problem",
//           "Avoided the situation",
//           "Blamed others for the challenge",
//           "Ignored it hoping it resolves itself"
//         ],
//         correctAnswer: "Took initiative to solve the problem"
//       },
//       {
//         id: 18,
//         question: "How do you prioritize tasks under pressure?",
//         options: [
//           "Do whatever comes first",
//           "List tasks by urgency and importance",
//           "Ask someone else to decide",
//           "Work on easiest tasks only"
//         ],
//         correctAnswer: "List tasks by urgency and importance"
//       },
//       {
//         id: 19,
//         question: "How do you handle constructive feedback?",
//         options: [
//           "Ignore it",
//           "Accept gracefully and improve",
//           "Complain",
//           "Blame others"
//         ],
//         correctAnswer: "Accept gracefully and improve"
//       },
//       {
//         id: 20,
//         question: "Describe a situation where you worked effectively in a team.",
//         options: [
//           "Collaborated and achieved common goals",
//           "Worked independently ignoring team input",
//           "Let others do all the work",
//           "Avoided team tasks"
//         ],
//         correctAnswer: "Collaborated and achieved common goals"
//       }
//     ]
//   };

//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(60);

//   const questions = questionBank[category] || [];

//   const handleAnswer = (qid, option) => {
//     setAnswers({ ...answers, [qid]: option });
//   };

//   const handleSubmit = async () => {
//     let correct = 0;
//     questions.forEach((q) => {
//       if (answers[q.id] === q.correctAnswer) correct++;
//     });
//     setScore(correct);

//     const user = JSON.parse(localStorage.getItem("user"));
//     const scoreData = {
//       userId: user?._id,
//       name: user?.name,
//       email: user?.email,
//       category,
//       score: correct,
//       total: questions.length,
//     };

//     try {
//       await axios.post("http://localhost:5001/api/scores", scoreData);
//     } catch (err) {
//       console.error("Error saving score:", err);
//     }
//   };

//   useEffect(() => {
//     if (score !== null) return;
//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }

//     const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
//     return () => clearInterval(timer);
//   }, [timeLeft, score]);

//   const progressPercent = (timeLeft / 60) * 100;

//   return (
//     <div className="practice-container">
//       <div className="header">
//         <Brain className="icon" size={30} />
//         <h2>{category} Practice</h2>
//       </div>

//       {score === null && (
//         <>
//           <div className="progress-bar">
//             <div className="progress-bar-fill" style={{ width: `${progressPercent}%` }}></div>
//           </div>
//           <div className="timer">
//             <Clock size={18} /> <span>{timeLeft}s left</span>
//           </div>
//         </>
//       )}

//       {questions.map((q, idx) => (
//         <div key={q.id} className="question-card">
//           <p className="question">{idx + 1}. {q.question}</p>
//           {q.options.map((opt, i) => (
//             <label key={i} className="option-label">
//               <input
//                 type="radio"
//                 name={q.id}
//                 value={opt}
//                 checked={answers[q.id] === opt}
//                 onChange={() => handleAnswer(q.id, opt)}
//               />
//               {opt}
//             </label>
//           ))}
//         </div>
//       ))}

//       {score === null ? (
//         <button className="submit-btn" onClick={handleSubmit}>
//           <CheckCircle size={18} /> Submit Answers
//         </button>
//       ) : (
//         <div className="score-box animate-score">
//           <Trophy size={32} />
//           <h3>Congratulations!</h3>
//           <p>You scored <span>{score}</span> out of {questions.length}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewPractice;
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Timer, Brain, CheckCircle, Trophy, Clock } from "lucide-react";
import "./InterviewPractice.css";

const InterviewPractice = () => {
  const location = useLocation();
  const { category } = location.state || { category: "DSA" };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch AI-generated questions from Gemini backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:5000/api/questions/${category}?count=5&t=${Date.now()}`
        );

        setQuestions(res.data);
        setAnswers({});
        setScore(null);
        setTimeLeft(60);
      } catch (err) {
        console.error("Error fetching AI questions:", err);
        alert("Failed to generate AI questions. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [category]);

  const handleAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const handleSubmit = async () => {
    let correct = 0;

    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });

    setScore(correct);

    const user = JSON.parse(localStorage.getItem("user"));

    const scoreData = {
      userId: user?._id,
      name: user?.name,
      email: user?.email,
      category,
      score: correct,
      total: questions.length,
    };

    try {
      await axios.post("http://localhost:5000/api/scores", scoreData);
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  // ✅ Timer
  useEffect(() => {
    if (loading) return;
    if (score !== null) return;

    if (timeLeft <= 0) {
      handleSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, score, loading]);

  const progressPercent = (timeLeft / 60) * 100;

  if (loading) {
    return (
      <div className="practice-container">
        <div className="header">
          <Brain className="icon" size={30} />
          <h2>Generating AI questions for {category}...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="practice-container">
      <div className="header">
        <Brain className="icon" size={30} />
        <h2>{category} Practice</h2>
      </div>

      {score === null && (
        <>
          <div className="progress-bar">
            <div
              className="progress-bar-fill"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>

          <div className="timer">
            <Clock size={18} />
            <span>{timeLeft}s left</span>
          </div>
        </>
      )}

      {questions.map((q, idx) => (
        <div key={q.id} className="question-card">
          <p className="question">
            {idx + 1}. {q.question}
          </p>

          {q.options.map((opt, i) => (
            <label key={i} className="option-label">
              <input
                type="radio"
                name={q.id}
                value={opt}
                checked={answers[q.id] === opt}
                onChange={() => handleAnswer(q.id, opt)}
                disabled={score !== null}
              />
              {opt}
            </label>
          ))}
        </div>
      ))}

      {score === null ? (
        <button className="submit-btn" onClick={handleSubmit}>
          <CheckCircle size={18} /> Submit Answers
        </button>
      ) : (
        <div className="score-box animate-score">
          <Trophy size={32} />
          <h3>Congratulations!</h3>
          <p>
            You scored <span>{score}</span> out of {questions.length}
          </p>
        </div>
      )}
    </div>
  );
};

export default InterviewPractice;