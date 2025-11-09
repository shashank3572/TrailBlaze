import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    question: "What kind of work excites you the most?",
    options: [
      { text: "Building apps / coding", value: "tech" },
      { text: "Designing visuals or UI", value: "design" },
      { text: "Helping people / communication", value: "management" },
      { text: "Solving logical problems", value: "data" },
    ],
  },
  {
    id: 2,
    question: "Which activity sounds the most enjoyable?",
    options: [
      { text: "Automating tasks", value: "tech" },
      { text: "Creating posters / graphics", value: "design" },
      { text: "Organizing people and tasks", value: "management" },
      { text: "Analyzing patterns", value: "data" },
    ],
  },
  {
    id: 3,
    question: "What is your strongest skill?",
    options: [
      { text: "Logical thinking", value: "data" },
      { text: "Visual creativity", value: "design" },
      { text: "Team communication", value: "management" },
      { text: "Technical problem solving", value: "tech" },
    ],
  },
  {
    id: 4,
    question: "What kind of workplace do you prefer?",
    options: [
      { text: "Coding-focused team", value: "tech" },
      { text: "Creative environment", value: "design" },
      { text: "Leadership & coordination", value: "management" },
      { text: "Research-oriented", value: "data" },
    ],
  },
  {
    id: 5,
    question: "Which task feels the most satisfying?",
    options: [
      { text: "Fixing bugs or errors", value: "tech" },
      { text: "Making a beautiful layout", value: "design" },
      { text: "Guiding a team to finish work", value: "management" },
      { text: "Finding insights in data", value: "data" },
    ],
  },
  {
    id: 6,
    question: "What type of learning do you enjoy?",
    options: [
      { text: "Coding & APIs", value: "tech" },
      { text: "Color theory & design patterns", value: "design" },
      { text: "Communication & leadership", value: "management" },
      { text: "Machine learning & statistics", value: "data" },
    ],
  },
  {
    id: 7,
    question: "Which role sounds the most fun?",
    options: [
      { text: "App/Web Developer", value: "tech" },
      { text: "UI/UX Designer", value: "design" },
      { text: "Project Manager", value: "management" },
      { text: "Data Analyst", value: "data" },
    ],
  },
  {
    id: 8,
    question: "What motivates you the most?",
    options: [
      { text: "Building things that work", value: "tech" },
      { text: "Making things look great", value: "design" },
      { text: "Leading a team to success", value: "management" },
      { text: "Discovering insights", value: "data" },
    ],
  },
  {
    id: 9,
    question: "When faced with a challenge, what do you do?",
    options: [
      { text: "Debug or problem-solve logically", value: "tech" },
      { text: "Think creatively", value: "design" },
      { text: "Discuss with people", value: "management" },
      { text: "Collect and analyze facts", value: "data" },
    ],
  },
  {
    id: 10,
    question: "Which subject do you prefer?",
    options: [
      { text: "Computer Programming", value: "tech" },
      { text: "Arts / Design", value: "design" },
      { text: "Business Studies", value: "management" },
      { text: "Math / Statistics", value: "data" },
    ],
  },
  {
    id: 11,
    question: "Do you enjoy creativity or logic more?",
    options: [
      { text: "100% Logic", value: "tech,data" },
      { text: "Both equally", value: "tech,design" },
      { text: "100% Creativity", value: "design" },
      { text: "Communication & planning", value: "management" },
    ],
  },
  {
    id: 12,
    question: "Pick your ideal future:",
    options: [
      { text: "Building apps, automation, AI tools", value: "tech" },
      { text: "Designing interfaces used by millions", value: "design" },
      { text: "Managing teams & leading projects", value: "management" },
      { text: "Solving data problems with ML", value: "data" },
    ],
  },
];

const careerResults = {
  tech: {
    title: "Software Engineering / Full-Stack Development",
    description:
      "You enjoy coding, problem-solving, and building products. Careers: Full-Stack Developer, Backend Developer, DevOps, AI Engineer.",
  },
  design: {
    title: "UI/UX & Creative Design",
    description:
      "You enjoy visuals, creativity, and user-centered design. Careers: UI/UX Designer, Product Designer, Graphic Illustrator.",
  },
  management: {
    title: "Business & Project Management",
    description:
      "You enjoy leading, communicating, and managing. Careers: Project Manager, HR, Product Manager.",
  },
  data: {
    title: "Data Science & Analytics",
    description:
      "You enjoy logical thinking and patterns. Careers: Data Analyst, Data Scientist, ML Engineer.",
  },
};

export default function CareerAffinityQuiz() {
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const handleAnswer = (qid, value) => {
    setAnswers({ ...answers, [qid]: value });
  };

  const calculateAffinity = () => {
    const scores = { tech: 0, design: 0, management: 0, data: 0 };

    Object.values(answers).forEach((val) => {
      const categories = val.split(",");
      categories.forEach((cat) => (scores[cat] += 1));
    });

    const top = Object.keys(scores).reduce((a, b) =>
      scores[a] > scores[b] ? a : b
    );

    const finalCareer = careerResults[top];
    setResult(finalCareer);

    // ✅ Save for Roadmap auto-select
    localStorage.setItem("recommendedCareer", finalCareer.title);

    // ✅ Auto-redirect after short delay
    setTimeout(() => {
      navigate("/roadmap");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-gray-100 p-8">
      <div className="max-w-3xl mx-auto bg-neutral-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold text-blue-400 text-center mb-6">
          Career Affinity Quiz
        </h1>

        {!result ? (
          <>
            <div className="space-y-6">
              {questions.map((q) => (
                <div key={q.id}>
                  <h3 className="font-semibold text-lg mb-2">{q.question}</h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(q.id, opt.value)}
                        className={`p-3 rounded-lg border text-left ${
                          answers[q.id] === opt.value
                            ? "bg-blue-600 border-blue-400"
                            : "bg-neutral-700 border-neutral-600 hover:bg-neutral-600"
                        }`}
                      >
                        {opt.text}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={calculateAffinity}
              disabled={Object.keys(answers).length !== questions.length}
              className="w-full mt-10 bg-blue-600 hover:bg-blue-700 py-3 rounded-lg font-semibold disabled:bg-gray-700 disabled:text-gray-400"
            >
              See My Career Fit
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-400 mb-3">
              {result.title}
            </h2>
            <p className="text-gray-300 mb-6">{result.description}</p>

            <button
              onClick={() => {
                setResult(null);
                setAnswers({});
              }}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
