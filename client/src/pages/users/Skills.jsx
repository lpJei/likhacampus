import { useState } from "react";
import QuizModal from "../../components/User/QuizModal";
import "../../styles/custom.css";

const Skills = () => {
  const [modalShow, setModalShow] = useState(false);
  const [dominantSkill, setDominantSkill] = useState(null);

  const skillCards = [
    {
      header: "Critical Thinking",
      title: "Analyze & evaluate",
      text: "The ability to analyze problems, assess evidence, and make logical decisions. It helps students move beyond memorization and apply reasoning to real-world issues.",
    },
    {
      header: "Creativity",
      title: "Think outside the box",
      text: "Using imagination and innovation to generate new ideas, explore alternatives, and find unique solutions to challenges. It drives adaptability in a fast-changing world.",
    },
    {
      header: "Collaboration",
      title: "Work better together",
      text: "Working effectively with others, valuing diverse perspectives, and contributing to shared goals. This skill is essential since most projects today are team-based.",
    },
    {
      header: "Communication",
      title: "Express ideas clearly",
      text: "Clearly expressing ideas through speaking, writing, and digital tools. Strong communication ensures ideas are understood and can create meaningful impact.",
    },
    {
      header: "Leadership",
      title: "Inspire and guide",
      text: "The ability to analyze problems, assess evidence, and make logical decisions. It helps students move beyond memorization and apply reasoning to real-world issues.",
    },
  ];

  return (
    <>
      <div className="container mx-auto py-2">
        {/* INTRO CARD */}
        <div className="card shadow-sm mb-4 bg-base-100">
          <div className="card-body text-center">
            <h1 className="font-bold text-center">
              What are 21st century skills?
            </h1>
            <p>
              These are the set of knowledge, abilities, and learning attitudes
              that students need to succeed in today’s fast-changing,
              technology-driven, and globally connected world. They go beyond
              traditional academics, focusing on skills that prepare learners
              for work, life, and citizenship in the 21st century.
            </p>

            {dominantSkill && (
              <div className="mt-3">
                <p>
                  <strong>
                    Your dominant 21st century skill is:{" "}
                    <span className="text-primary">{dominantSkill}</span>
                  </strong>
                </p>
              </div>
            )}

            {/* QUIZ BUTTON */}
            <div className="flex justify-center">
              <button
                className="btn btn-primary btn-md mt-3 px-4"
                onClick={() => setModalShow(true)}
              >
                Take the quiz
              </button>
            </div>

            <QuizModal
              show={modalShow}
              onHide={() => setModalShow(false)}
              setDominantSkill={setDominantSkill}
            />
          </div>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          {skillCards.map((card, index) => (
            <div
              key={index}
              className="card border border-primary h-full bg-base-100 hover:scale-95 transition duration-200"
            >
              <div className="card-header font-semibold bg-base-200 px-4 py-2">
                {card.header}
              </div>
              <div className="card-body">
                <h3 className="card-title">{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Skills;
