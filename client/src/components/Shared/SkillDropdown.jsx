import { useState } from "react";

const SkillDropdown = ({ onSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubSkill, setSelectedSubSkill] = useState("");

  const skillCategories = {
    "Critical Thinking": ["One"],
    Communication: ["Two"],
    Collaboration: ["Three"],
    Creativity: ["Four"],
    "Information Literacy": ["Five"],
    "Media Literacy": ["Six"],
    "Technology Literacy": ["Seven"],
    Flexibility: ["Eight"],
    Leadership: ["Nine"],
    Initiative: ["Ten"],
    Productivity: ["Eleven"],
    "Social Skills": ["Twelve"],
    Passion: ["Thirteen"],
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedSubSkill(""); // reset sub-skill
    onSelect?.(category, "");
  };

  const handleSubSkillSelect = (subSkill) => {
    setSelectedSubSkill(subSkill);
    onSelect?.(selectedCategory, subSkill);
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-3 mb-3 p-3">
      {/* MAIN SKILL */}
      <details className="dropdown">
        <summary className="btn bg-base-100">
          {selectedCategory || "Select a skill"}
        </summary>
        <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow">
          {Object.keys(skillCategories).map((category) => (
            <li key={category}>
              <button
                type="button"
                onClick={() => handleCategorySelect(category)}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </details>

      {/* SUB CATEGORY */}
      {selectedCategory && (
        <details className="dropdown">
          <summary className="btn bg-base-100">
            {selectedSubSkill || "Select category"}
          </summary>
          <ul className="menu dropdown-content bg-base-100 rounded-box z-10 w-52 p-2 shadow">
            {skillCategories[selectedCategory].map((subSkill) => (
              <li key={subSkill}>
                <button
                  type="button"
                  onClick={() => handleSubSkillSelect(subSkill)}
                >
                  {subSkill}
                </button>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );
};

export default SkillDropdown;
