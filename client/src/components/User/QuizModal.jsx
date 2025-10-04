{
  /* STATUS: ok */
}

import { useEffect, useState } from "react";

const quizQuestionnaires = [
  {
    question: "What role do you usually take when working on a school project?",
    options: [
      { text: "I lead the group and make a plan.", skill: "Leadership" },
      {
        text: "I proactively find ways to contribute and help the team.",
        skill: "Initiative",
      },
      {
        text: "I wait for the leader to assign me a task.",
        skill: "Flexibility",
      },
    ],
  },
  {
    question:
      "You’re working on a personal goal, but you’re not seeing the results you hoped for. What do you do?",
    options: [
      {
        text: "Reflect on your strategy and figure out what needs to change.",
        skill: "Critical Thinking",
      },
      {
        text: "Try a new method or routine that better fits your schedule.",
        skill: "Flexibility",
      },
      {
        text: "Make a new plan with clear steps and get started immediately.",
        skill: "Initiative",
      },
    ],
  },
  {
    question:
      "What approach do you typically take when preparing a group presentation for your report?",
    options: [
      {
        text: "Share ideas and outline the main points.",
        skill: "Communication",
      },
      {
        text: "Design the visuals and overall look.",
        skill: "Creativity",
      },
      {
        text: "Conduct research and gather accurate information.",
        skill: "Information Literacy",
      },
    ],
  },
  {
    question: "What would you do if your original plan didn’t go as expected?",
    options: [
      {
        text: "Analyze what part of the plan is failing and propose a better solution.",
        skill: "Critical Thinking",
      },
      {
        text: "Adjust your role or tasks to help wherever the team needs support.",
        skill: "Flexibility",
      },
      {
        text: "Take the lead and suggest a new approach to move the project forward.",
        skill: "Initiative",
      },
    ],
  },
  {
    question: "How do you typically use social media or the internet?",
    options: [
      {
        text: "I post my content every weekend because that’s when my followers are most active.",
        skill: "Media Literacy",
      },
      {
        text: "I search for reliable news and trustworthy information.",
        skill: "Information Literacy",
      },
      {
        text: "I communicate with my friends and family to maintain our relationship.",
        skill: "Social Skills",
      },
    ],
  },
  {
    question:
      "Your boss announces that everyone must start using Outlook, but you've never used it before, what will you do?",
    options: [
      {
        text: "Try out the different features to understand how it works.",
        skill: "Technology Literacy",
      },
      {
        text: "Look up and watch tutorial videos online.",
        skill: "Information Literacy",
      },
      {
        text: "Ask a friend to go through it with you so you can learn together.",
        skill: "Collaboration",
      },
    ],
  },
  {
    question:
      "You missed an important lecture and the exam is in 5 days. How do you respond?",
    options: [
      {
        text: "Identify which topics were covered and study them using class resources.",
        skill: "Critical Thinking",
      },
      {
        text: "Join a different study group or watch online lectures to catch up quickly.",
        skill: "Flexibility",
      },
      {
        text: "Message your teacher or classmate to get notes and start reviewing right away.",
        skill: "Initiative",
      },
    ],
  },
  {
    question: "How do you persuade a customer to consider a product?",
    options: [
      {
        text: "I recommend a product that best fits their needs.",
        skill: "Critical Thinking",
      },
      {
        text: "I suggest a product I’ve personally tried and trust.",
        skill: "Initiative",
      },
      {
        text: "I ask questions to understand what they’re looking for before making a suggestion.",
        skill: "Social Skills",
      },
    ],
  },
  {
    question:
      "How do you typically prepare for an exam that’s coming up next week?",
    options: [
      {
        text: "I plan out a study schedule to cover all subjects.",
        skill: "Flexibility",
      },
      {
        text: "I create a summary or reviewer to organize key points.",
        skill: "Productivity",
      },
      {
        text: "I invite a friend to study together and share ideas.",
        skill: "Collaboration",
      },
    ],
  },
  {
    question: "How would you contribute if there’s an upcoming contest?",
    options: [
      {
        text: "I will organize the schedule and ensure all contest needs are prepared on time.",
        skill: "Leadership",
      },
      {
        text: "I will create promotional posters and post updates on social media platforms.",
        skill: "Media Literacy",
      },
      {
        text: "I will manage participant details and responses using Google Forms.",
        skill: "Technology Literacy",
      },
    ],
  },
  {
    question: "What would you do if you heard shocking news from someone?",
    options: [
      {
        text: "Verify the information by checking reliable sources before reacting or sharing it.",
        skill: "Information Literacy",
      },
      {
        text: "Ask thoughtful questions to understand the full context before jumping to conclusions.",
        skill: "Critical Thinking",
      },
      {
        text: "Help gather accurate information and assist in sharing the facts responsibly.",
        skill: "Media Literacy",
      },
    ],
  },
  {
    question:
      "You're planning to buy a new phone for your birthday but you're unsure which brand to choose. What will you do?",
    options: [
      {
        text: "Look up reviews and comparisons online to find the most recommended options.",
        skill: "Information Literacy",
      },
      {
        text: "Talk to a friend and ask for their opinion based on their experience.",
        skill: "Social Skills",
      },
      {
        text: "Compare different phone features and prices to decide which one fits your needs best.",
        skill: "Critical Thinking",
      },
    ],
  },
  {
    question:
      "You need to help complete a group digital newsletter for school. How will you approach it?",
    options: [
      {
        text: "Use design software like Canva to format and finalize the layout.",
        skill: "Technology Literacy",
      },
      {
        text: "Write the articles while a teammate focuses on design and formatting.",
        skill: "Collaboration",
      },
      {
        text: "Browse sample newsletters online to get creative ideas for structure and content.",
        skill: "Creativity",
      },
    ],
  },
  {
    question:
      "You’ve observed that plastic waste is piling up on the school grounds due to the lack of trash bins. How would you help raise awareness about this issue?",
    options: [
      {
        text: "Create and schedule social media posts using platforms like Facebook to spread the message.",
        skill: "Technology Literacy",
      },
      {
        text: "Create a catchy and memorable campaign slogan to grab attention.",
        skill: "Creativity",
      },
      {
        text: "Call a team meeting to assign roles and plan the next steps of the campaign.",
        skill: "Leadership",
      },
    ],
  },
  {
    question:
      "You’re part of a school committee planning a student event. How do you stay updated?",
    options: [
      {
        text: "Regularly message your team and share updates in your group chat.",
        skill: "Communication",
      },
      {
        text: "Use a shared calendar to track progress and deadlines.",
        skill: "Productivity",
      },
      {
        text: "Meet with your group weekly to check on progress together.",
        skill: "Collaboration",
      },
    ],
  },
  {
    question:
      "You’re presenting a project to a large audience for the first time. How do you prepare?",
    options: [
      {
        text: "Practice your delivery and make sure your points are clear.",
        skill: "Communication",
      },
      {
        text: "Watch sample presentations online to learn how others explain similar topics.",
        skill: "Media Literacy",
      },
      {
        text: "Get feedback from a friend after rehearsing.",
        skill: "Social Skills",
      },
    ],
  },
  {
    question:
      "You’ve been given multiple tasks for a group activity with a short deadline. What’s your strategy?",
    options: [
      {
        text: "Make a checklist and manage your time to finish everything efficiently.",
        skill: "Productivity",
      },
      {
        text: "Work closely with a partner to divide tasks based on strengths.",
        skill: "Collaboration",
      },
      {
        text: "Encourage your group with positive messages to keep everyone motivated.",
        skill: "Social Skills",
      },
    ],
  },
  {
    question:
      "Your teacher asks you to create a class vlog for the school event. What’s your approach?",
    options: [
      {
        text: "Write a creative and entertaining script for the vlog.",
        skill: "Creativity",
      },
      {
        text: "Edit the footage using video software to make it engaging.",
        skill: "Technology Literacy",
      },
      {
        text: "Host the vlog by speaking clearly and interacting with the audience.",
        skill: "Communication",
      },
    ],
  },
  {
    question:
      "You’re helping plan a school orientation for new students. What will you do?",
    options: [
      {
        text: "Help new students feel welcome and answer their questions.",
        skill: "Social Skills",
      },
      {
        text: "Design digital materials like brochures or intro slides.",
        skill: "Media Literacy",
      },
      {
        text: "Coordinate tasks with your team to ensure everything is ready on time.",
        skill: "Productivity",
      },
    ],
  },
  {
    question:
      "During a group activity, your team is struggling to agree on a concept. What’s your response?",
    options: [
      {
        text: "Step in to guide the group toward a final decision.",
        skill: "Leadership",
      },
      {
        text: "Encourage open dialogue so everyone can explain their point of view.",
        skill: "Communication",
      },
      {
        text: "Propose a new, creative idea that blends the strengths of everyone’s input.",
        skill: "Creativity",
      },
    ],
  },
];

// Shuffle helper
function shuffleArray(array) {
  return array
    .map((a) => [Math.random(), a])
    .sort((a, b) => a[0] - b[0])
    .map((a) => a[1]);
}

function QuizModal({ show, onHide, setDominantSkill }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [shuffledQuestions, setShuffledQuestions] = useState([]);
  const [error, setError] = useState(false);
  const [result, setResult] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setShuffledQuestions(shuffleArray(quizQuestionnaires));
  }, []);

  const handleAnswerChange = (e) => {
    setSelectedAnswer({
      ...selectedAnswer,
      [currentQuestion]: e.target.value,
    });
    setError(false);
  };

  const nextQuestion = () => {
    if (!selectedAnswer[currentQuestion]) {
      setError(true);
      return;
    }
    setError(false);

    if (currentQuestion < shuffledQuestions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    } else {
      tallyResult();
    }
  };

  const tallyResult = () => {
    const count = {};

    Object.values(selectedAnswer).forEach((skill) => {
      count[skill] = (count[skill] || 0) + 1;
    });

    setResult(count);

    const mainSkill = Object.keys(count).reduce((a, b) =>
      count[a] > count[b] ? a : b
    );

    setDominantSkill(mainSkill);
    setShowResult(true);
    setResult(count);
  };

  if (shuffledQuestions.length === 0) {
    return <span className="loading loading-spinner loading-xl"></span>;
  }

  return (
    <dialog className={`modal ${show ? "modal-open" : ""}`}>
      <div className="modal-box max-w-2xl">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onHide}
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg mb-4">21st Century Skills Quiz</h3>

        <div className="space-y-4">
          {showResult ? (
            <div>
              <h5 className="font-semibold mb-2">Your quiz result:</h5>
              <ul className="list-disc list-inside">
                {Object.entries(result).map(([skill, count]) => (
                  <li key={skill}>
                    <strong>{skill}</strong>: {count} answer(s)
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div>
              <h5 className="font-semibold mb-4">
                {shuffledQuestions[currentQuestion].question}
              </h5>

              <div className="flex flex-col gap-2">
                {shuffledQuestions[currentQuestion].options.map(
                  (option, index) => (
                    <label
                      key={index}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        required
                        name={`question-${currentQuestion}`}
                        className="radio radio-primary"
                        id={`q${currentQuestion}-a${index}`}
                        value={option.skill}
                        checked={
                          selectedAnswer[currentQuestion] === option.skill
                        }
                        onChange={handleAnswerChange}
                      />
                      <span>{option.text}</span>
                    </label>
                  )
                )}
              </div>

              {error && (
                <p className="mt-3 text-red-500 text-sm">
                  Please select an answer.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onHide}>
            Close
          </button>
          {!showResult && (
            <button className="btn btn-primary" onClick={nextQuestion}>
              {currentQuestion === shuffledQuestions.length - 1
                ? "Finish"
                : "Next"}
            </button>
          )}
        </div>
      </div>
    </dialog>
  );
}

export default QuizModal;
