const express = require("express");
const router = express.Router();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

router.get("/questions/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const count = Number(req.query.count) || 5;

    const random = Date.now();

    const prompt = `
Generate ${count} NEW and UNIQUE multiple choice interview questions.

Category: ${category}
Random value: ${random}

Return ONLY valid JSON array.

Each object must have:
id, question, options, correctAnswer.

Rules:
- options must contain exactly 4 options
- correctAnswer must exactly match one option from options
- Questions should be beginner to intermediate level
- Generate different questions every time
- Do not repeat common/basic questions
- No explanation
- No markdown
- No code block

Format:
[
  {
    "id": 1,
    "question": "Question text?",
    "options": ["A", "B", "C", "D"],
    "correctAnswer": "A"
  }
]
`;

    const response = await ai.models.generateContent({
     model: "gemini-2.0-flash",
      contents: prompt,
      config: {
        temperature: 0.9,
        topP: 0.95,
      },
    });

    let text = response.text;

    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    const questions = JSON.parse(text);

    res.json(questions);
  } catch (error) {
    console.error("AI question generation error:", error);
    res.status(500).json({
      error: "Failed to generate questions",
      details: error.message,
    });
  }
});

module.exports = router;