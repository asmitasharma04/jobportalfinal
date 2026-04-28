const express = require("express");
const router = express.Router();

// Example questions per category
const questions = {
  DSA: [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
      correctAnswer: "O(log n)",
    },
    {
      id: 2,
      question: "Which data structure is used in recursion?",
      options: ["Queue", "Stack", "Heap", "Graph"],
      correctAnswer: "Stack",
    },
    {
      id: 3,
      question: "What is the space complexity of merge sort?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correctAnswer: "O(n)",
    },
    {
      id: 4,
      question: "Which data structure is best for implementing a priority queue?",
      options: ["Array", "Linked List", "Heap", "Stack"],
      correctAnswer: "Heap",
    },
    {
      id: 5,
      question: "Which algorithm is used to detect a cycle in a graph?",
      options: ["DFS", "BFS", "Dijkstra", "Kruskal"],
      correctAnswer: "DFS",
    },
  ],
  HR: [
    {
      id: 1,
      question: "Tell me about yourself?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
    },
    {
      id: 2,
      question: "Why do you want to work with us?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option B",
    },
    {
      id: 3,
      question: "What is your biggest strength?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option C",
    },
    {
      id: 4,
      question: "What is your biggest weakness?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option D",
    },
  ],
  "System Design": [
    {
      id: 1,
      question: "What is load balancing?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option B",
    },
    {
      id: 2,
      question: "What is sharding in databases?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
    },
    {
      id: 3,
      question: "Explain CAP theorem.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option C",
    },
    {
      id: 4,
      question: "What is eventual consistency?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option D",
    },
  ],
  Behavioral: [
    {
      id: 1,
      question: "How do you handle conflicts in a team?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option C",
    },
    {
      id: 2,
      question: "Describe a time when you faced a challenge.",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option B",
    },
    {
      id: 3,
      question: "How do you prioritize tasks under pressure?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option A",
    },
    {
      id: 4,
      question: "How do you handle feedback?",
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: "Option D",
    },
  ],
};

// GET questions for a category
router.get("/questions/:category", (req, res) => {
  const category = req.params.category;
  if (!questions[category]) {
    return res.status(404).json({ error: "Category not found" });
  }
  res.json(questions[category]);
});

module.exports = router;
