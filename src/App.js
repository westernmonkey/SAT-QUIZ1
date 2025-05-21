import { useState, useEffect } from "react";
import { Button } from "./Button";
import { motion } from "framer-motion";
import "./index.css";

const questions = [
  {
    text: "Marta Coll and colleagues’ 2010 Mediterranean Sea biodiversity census reported approximately 17,000 species, nearly double the number reported in Carlo Bianchi and Carla Morri’s 2000 census—a difference only partly attributable to the description of new invertebrate species in the interim...",
    choices: [
      { id: "A", label: "Coll and colleagues reported a much higher number of species..." },
      { id: "B", label: "some differences observed in microorganisms may have been treated..." },
      { id: "C", label: "Bianchi and Morri may have been less sensitive..." },
      { id: "D", label: "the absence of clarity regarding how to differentiate..." },
    ],
    correct: "B"
  },
  {
    text: "A common assumption among art historians is that the invention of photography...",
    choices: [
      { id: "A", label: "Factors other than the rise of photography..." },
      { id: "B", label: "Although portrait miniatures became less common..." },
      { id: "C", label: "The popularity of the portrait miniature likely persisted..." },
      { id: "D", label: "As demand for portrait miniatures decreased..." },
    ],
    correct: "A"
  },
  {
    text: "Believing that living in an impractical space can heighten awareness...",
    choices: [
      { id: "A", label: "Although inhabiting a home surrounded by fanciful features..." },
      { id: "B", label: "Designing disorienting spaces like those..." },
      { id: "C", label: "As a filmmaker, Yamaoka has long supported..." },
      { id: "D", label: "Although impractical, the design of the apartment..." },
    ],
    correct: "D"
  },
  {
    text: "In her 2021 article ‘Throwaway History,’ scholar Anne Garner discusses John Johnson...",
    choices: [
      { id: "A", label: "demonstrate the difficulties faced by contemporary historians..." },
      { id: "B", label: "represent the challenge of incorporating examples of ephemera..." },
      { id: "C", label: "lend support to arguments by historians who continue to assert..." },
      { id: "D", label: "illustrate both the relatively low scholarly regard..." },
    ],
    correct: "D"
  },
  {
    text: "During World War II, some Mexican American women adopted a look called pachuca style...",
    choices: [
      { id: "A", label: "They think that pachuca style was such a popular trend..." },
      { id: "B", label: "They think that pachuca style was a way for some Mexican American women..." },
      { id: "C", label: "They think that pachuca style was celebrated because it enabled..." },
      { id: "D", label: "They think that pachuca style was similar to other fashion trends..." },
    ],
    correct: "B"
  },
  {
    text: "Utah is home to Pando, a colony of about 47,000 quaking aspen trees...",
    choices: [
      { id: "A", label: "It isn’t growing at the same rate it used to." },
      { id: "B", label: "It isn’t producing young trees anymore." },
      { id: "C", label: "It can’t grow into new areas because it is blocked by fences." },
      { id: "D", label: "Its root system can’t support many more new trees." },
    ],
    correct: "A"
  },
  {
    text: "Heidi had come and was looking with wondering eyes at the splendid pictures...",
    choices: [
      { id: "A", label: "Heidi is upset until she sees a serene image..." },
      { id: "B", label: "Heidi is delighted and fascinated by an image..." },
      { id: "C", label: "Heidi is initially frightened by an image but quickly..." },
      { id: "D", label: "Heidi is inspecting an image because she has never seen..." },
    ],
    correct: "B"
  }
];

export default function SATGamifiedQuiz() {
  const [eliminated, setEliminated] = useState([]);
  const [revealCorrect, setRevealCorrect] = useState(false);
  const [points, setPoints] = useState(0);
  const [current, setCurrent] = useState(0);
  const [hideTimer, setHideTimer] = useState(false);
  const [timer, setTimer] = useState(25 * 60);

  const question = questions[current];

  useEffect(() => {
    const interval = setInterval(() => setTimer((prev) => (prev > 0 ? prev - 1 : 0)), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (t) => {
    const m = Math.floor(t / 60).toString().padStart(2, '0');
    const s = (t % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const handleStrike = (id) => {
    if (eliminated.includes(id)) return;
    setEliminated((prev) => [...prev, id]);
    if (id === question.correct) {
      setRevealCorrect(true);
    } else {
      setPoints((prev) => prev + 1);
    }
  };

  const handleUndo = (id) => {
    setEliminated((prev) => prev.filter((x) => x !== id));
    setRevealCorrect(false);
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setEliminated([]);
      setRevealCorrect(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 p-4 text-base animate-fade-in">
      <div className="flex justify-between items-center text-sm border-b border-gray-400 pb-1">
        <div className="font-semibold tracking-wide text-indigo-800 uppercase">Section 1: Reading & Writing</div>
        <div className="flex items-center gap-4 text-sm font-mono">
          {(!hideTimer || timer <= 5 * 60) && (
            <div className="bg-black text-white px-2 py-1 rounded shadow">⏱ {formatTime(timer)}</div>
          )}
          <Button variant="ghost" size="sm" onClick={() => setHideTimer(!hideTimer)}>{hideTimer ? "Show Timer" : "Hide Timer"}</Button>
        </div>
      </div>

      <div className="text-center text-sm mt-2 text-blue-900 font-bold tracking-widest animate-bounce">TEST PREVIEW MODE</div>

      <div className="mt-6 text-gray-800 leading-relaxed px-10 max-w-5xl mx-auto">
        <div className="mb-6 text-base">{question.text}</div>

        <div className="mb-2 text-lg font-bold text-blue-800">Question {current + 1}</div>
        <div className="mb-4 font-medium text-base">Which choice completes the text with the most logical and precise word or phrase?</div>

        <div className="space-y-2">
          {question.choices.map((opt) => (
            <div
              key={opt.id}
              className={`border px-4 py-2 rounded flex justify-between items-center transition-all duration-300 ${
                eliminated.includes(opt.id) ? "line-through text-gray-400 bg-red-100" : "hover:bg-indigo-100"
              } ${
                revealCorrect && opt.id === question.correct ? "bg-green-100 border-green-400 text-green-800 font-semibold" : ""
              }`}
            >
              <span><strong>({opt.id})</strong> {opt.label}</span>
              {eliminated.includes(opt.id) ? (
                <Button variant="link" size="sm" onClick={() => handleUndo(opt.id)}>Undo</Button>
              ) : (
                <Button variant="outline" size="sm" onClick={() => handleStrike(opt.id)}>Strike</Button>
              )}
            </div>
          ))}
        </div>

        {revealCorrect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-4 p-3 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 font-medium shadow"
          >
            Correct answer: <strong>({question.correct}) {question.choices.find(o => o.id === question.correct)?.label}</strong>
          </motion.div>
        )}

        <div className="flex justify-end mt-6">
          <Button className="bg-indigo-600 hover:bg-indigo-700 text-white shadow" onClick={handleNext}>Next →</Button>
        </div>
      </div>

      <div className="flex justify-center mt-10">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          className="bg-purple-100 text-purple-900 px-6 py-3 rounded-full shadow-lg border-2 border-purple-300 font-bold text-lg tracking-wide"
        >
          🎯 Points: {points}
        </motion.div>
      </div>

      <div className="flex justify-between items-center text-xs mt-6 px-1">
        <div className="font-light text-gray-500">Stavan Sagala</div>
        <div className="text-center text-gray-600">Question {current + 1} of {questions.length}</div>
        <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-[10px] font-medium tracking-tight shadow">Battery: 97%</div>
      </div>
    </div>
  );
}