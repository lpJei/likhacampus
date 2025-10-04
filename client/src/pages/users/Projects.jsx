import { useState } from "react";
import SkillDropdown from "../../components/Shared/SkillDropdown";
import ProjectCards from "../../components/User/ProjectCards";
// import ReportModal from "../../components/Shared/ReportModal"; // ⬅️ Uncomment once you make this

const Projects = () => {
  // Dummy user for now (later replace with auth context)
  const currentUser = "Jane Doe";

  // Dummy data (backend later)
  const [projects, setProjects] = useState([
    {
      id: 1,
      archived: false,
      title: "AI Portfolio Assistant",
      author: "Jane Doe",
      mainSkills: ["React", "Node.js"],
      categories: ["Web", "AI"],
      description:
        "A personal portfolio builder that uses AI to suggest layouts and content.",
      media: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 2,
      archived: false,
      title: "Campus Event Tracker",
      author: "John Smith",
      mainSkills: ["MongoDB", "Express"],
      categories: ["Web", "Productivity"],
      description:
        "A web platform to manage and track campus events and student activities.",
      media: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
    {
      id: 3,
      title: "Meow meow meow",
      author: "Jotaro Doe",
      mainSkills: ["React", "Node.js"],
      categories: ["Web", "AI"],
      description:
        "A personal portfolio builder that uses AI to suggest layouts and content.",
      media: [
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
        "https://via.placeholder.com/150",
      ],
    },
  ]);

  // ⬇️ Later, fetch projects from backend
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/projects")
  //     .then((res) => res.json())
  //     .then((data) => setProjects(data));
  // }, []);

  const onDelete = (projectId) => {
    // Frontend-only for now
    setProjects((prev) => prev.filter((p) => p.id !== projectId));

    // ⬇️ Later call backend
    // fetch(`http://localhost:5000/api/projects/${projectId}`, { method: "DELETE" });
  };

  const handleReport = (projectId) => {
    alert(`Reported project with id: ${projectId}`);

    // ⬇️ Later POST to backend
    // fetch("http://localhost:5000/api/reports", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ projectId, reason: "Inappropriate content" }),
    // });
  };

  return (
    <>
      <div className="max-w-7xl mx-auto px-6 space-y-6">
        <div className="text-4xl font-bold">PROJECTS</div>
        <SkillDropdown />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCards
              key={project.id}
              project={project}
              currentUser={currentUser}
              onDelete={onDelete}
              // ReportModal={ReportModal} // ⬅️ Uncomment once you make the component
              onReport={handleReport} // temporary alert for now
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default Projects;
