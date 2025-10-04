import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectCards from "./ProjectCards";
import UploadProjectModal from "./UploadProjectModal";

const ProfileCard = ({ name, bio, imageUrl, projects = [], onUpload }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* LEFT COLUMN: Profile + Stats + Forum */}
          <div className="space-y-4 md:col-span-1">
            {/* PROFILE */}
            <div className="card shadow-sm p-6 text-center bg-base-100">
              <div className="flex flex-col items-center">
                <img
                  src={imageUrl || "https://via.placehold.co/100"}
                  alt="Profile"
                  className="rounded-full w-24 h-24 object-cover mb-3"
                />
                <h3 className="text-lg font-bold mb-1">
                  {name || "Your Name"}
                </h3>
                <p className="text-sm text-gray-500">
                  {bio || "Add a short bio about yourself"}
                </p>

                <div className="flex flex-col md:flex-row gap-2 mt-3">
                  <button
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={() => {
                      setShowUploadModal(true);
                      if (onUpload) onUpload();
                    }}
                  >
                    Upload
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => navigate("/archives")}
                  >
                    Archives
                  </button>
                </div>
              </div>
            </div>

            {/* STATS */}
            <div className="card shadow-sm p-4 bg-base-100">
              <h5 className="font-bold text-sm mb-2">Profile Statistics</h5>
              <ul className="list-disc list-inside text-sm space-y-1">
                <li>
                  Skills:{" "}
                  {projects?.length > 0
                    ? projects[0].mainSkills.join(", ")
                    : "No skills listed yet."}
                </li>
                <li>Projects published: {projects?.length || 0}</li>
                <li>Forum posts: 0</li>
              </ul>
            </div>

            {/* FORUM POSTS */}
            <div className="card shadow-sm p-4 bg-base-100">
              <h5 className="font-bold text-sm mb-2">Forum Posts</h5>
              <p className="text-gray-500 text-sm">No posts yet.</p>
            </div>
          </div>

          {/* RIGHT COLUMN: Projects */}
          <div className="md:col-span-2">
            <h4 className="text-gray-700 font-bold text-lg mb-4 text-center md:text-start">
              My Projects
            </h4>
            <div className="flex flex-col gap-6">
              {projects && projects.length > 0 ? (
                projects.map((project) => (
                  <div key={project.id}>
                    <ProjectCards project={project} />
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center">
                  No projects uploaded yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD PROJECT MODAL */}
      <UploadProjectModal
        show={showUploadModal}
        onHide={() => setShowUploadModal(false)}
      />
    </>
  );
};

export default ProfileCard;
