import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Brain, CheckCircle, Trophy, Clock } from "lucide-react";
import "./InterviewPractice.css";

const InterviewPractice = () => {
  const location = useLocation();
  const { category } = location.state || { category: "DSA" };

  // Static fallback questions
  const questionBank = {
    DSA: [
      {
        id: 1,
        question: "What is the time complexity of Binary Search?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correctAnswer: "O(log n)",
      },
      {
        id: 2,
        question: "Which data structure is used in BFS traversal?",
        options: ["Stack", "Queue", "Heap", "Graph"],
        correctAnswer: "Queue",
      },
    ],

    Aptitude: [
      {
        id: 3,
        question: "What is 25% of 240?",
        options: ["50", "60", "65", "70"],
        correctAnswer: "60",
      },
    ],

    Behavioral: [
      {
        id: 4,
        question: "How do you handle conflict in a team?",
        options: [
          "Ignore it",
          "Escalate to manager immediately",
          "Listen to both sides and resolve calmly",
          "Leave the team",
        ],
        correctAnswer: "Listen to both sides and resolve calmly",
      },
    ],
  };

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [loading, setLoading] = useState(true);

  // Fetch AI questions
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `https://jobportalfinal-0enc.onrender.com/api/questions/${category}?count=5&t=${Date.now()}`
        );

        setQuestions(res.data);
      } catch (err) {
        console.error("Error fetching AI questions:", err);

        // fallback static questions
        setQuestions(questionBank[category] || []);
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
      await axios.post(
        "https://jobportalfinal-0enc.onrender.com/api/scores",
        scoreData
      );
    } catch (err) {
      console.error("Error saving score:", err);
    }
  };

  // Timer
  /* eslint-disable react-hooks/exhaustive-deps */
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

  // Loading UI
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
          <CheckCircle size={18} />
          Submit Answers
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

// export default InterviewPractice;
// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import axios from "axios";
// import { Brain, CheckCircle, Trophy, Clock } from "lucide-react";
// import "./InterviewPractice.css";

// const InterviewPractice = () => {
//   const location = useLocation();
//   const { category } = location.state || { category: "DSA" };

//   const [questions, setQuestions] = useState([]);
//   const [answers, setAnswers] = useState({});
//   const [score, setScore] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(60);
//   const [loading, setLoading] = useState(true);

//   // ✅ Fetch AI-generated questions from Gemini backend
//  /* eslint-disable react-hooks/exhaustive-deps */
// useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         setLoading(true);

//         const res = await axios.get(
//           `https://jobportalfinal-0enc.onrender.com/api/questions/${category}?count=5&t=${Date.now()}`
//         );

//         setQuestions(res.data);
//         setAnswers({});
//         setScore(null);
//         setTimeLeft(60);
//       } catch (err) {
//         console.error("Error fetching AI questions:", err);
//         alert("Failed to generate AI questions. Please try again.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchQuestions();
//   }, [category]);

//   const handleAnswer = (qid, option) => {
//     setAnswers({ ...answers, [qid]: option });
//   };

//   const handleSubmit = async () => {
//     let correct = 0;

//     questions.forEach((q) => {
//       if (answers[q.id] === q.correctAnswer) {
//         correct++;
//       }
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
//       await axios.post("https://jobportalfinal-0enc.onrender.com/api/scores", scoreData);
//     } catch (err) {
//       console.error("Error saving score:", err);
//     }
//   };

//   // ✅ Timer
//   useEffect(() => {
//     if (loading) return;
//     if (score !== null) return;

//     if (timeLeft <= 0) {
//       handleSubmit();
//       return;
//     }

//     const timer = setInterval(() => {
//       setTimeLeft((prev) => prev - 1);
//     }, 1000);

//     return () => clearInterval(timer);
//   }, [timeLeft, score, loading]);

//   const progressPercent = (timeLeft / 60) * 100;

//   if (loading) {
//     return (
//       <div className="practice-container">
//         <div className="header">
//           <Brain className="icon" size={30} />
//           <h2>Generating AI questions for {category}...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="practice-container">
//       <div className="header">
//         <Brain className="icon" size={30} />
//         <h2>{category} Practice</h2>
//       </div>

//       {score === null && (
//         <>
//           <div className="progress-bar">
//             <div
//               className="progress-bar-fill"
//               style={{ width: `${progressPercent}%` }}
//             ></div>
//           </div>

//           <div className="timer">
//             <Clock size={18} />
//             <span>{timeLeft}s left</span>
//           </div>
//         </>
//       )}

//       {questions.map((q, idx) => (
//         <div key={q.id} className="question-card">
//           <p className="question">
//             {idx + 1}. {q.question}
//           </p>

//           {q.options.map((opt, i) => (
//             <label key={i} className="option-label">
//               <input
//                 type="radio"
//                 name={q.id}
//                 value={opt}
//                 checked={answers[q.id] === opt}
//                 onChange={() => handleAnswer(q.id, opt)}
//                 disabled={score !== null}
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
//           <p>
//             You scored <span>{score}</span> out of {questions.length}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default InterviewPractice;