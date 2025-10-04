import { useState } from "react";
import SkillDropdown from "../../components/Shared/SkillDropdown.jsx";
import ProjectUploader from "../../components/User/ProjectUploader.jsx";

const UploadProjectModal = ({ show, onHide, onSave }) => {
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    mainSkill: "",
    category: "",
    files: [],
  });

  // Update text inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Update uploaded files
  const handleFilesChange = (files) => {
    setFormData((prev) => ({ ...prev, files }));
  };

  // Update skill + category from SkillDropdown
  const handleSkillChange = (skill, category) => {
    setFormData((prev) => ({
      ...prev,
      mainSkill: skill,
      category: category,
    }));
  };

  // Save project
  const handleSave = () => {
    if (!formData.title.trim()) {
      setError("Project title is required");
      return;
    }
    if (!formData.mainSkill) {
      setError("Please select a main skill");
      return;
    }
    if (!formData.category) {
      setError("Please select a category");
      return;
    }

    console.log("📌 Uploading project:", formData);
    onSave(formData); // ✅ send to parent → backend

    // Reset form
    setFormData({
      title: "",
      description: "",
      mainSkill: "",
      category: "",
      files: [],
    });
    setError("");
    onHide(); // ✅ close modal
  };

  if (!show) return null;

  return (
    <div className="modal modal-open" tabIndex={-1}>
      <div className="modal-box max-w-md">
        <h3 className="font-bold text-lg mb-4">Upload Project</h3>

        <form className="space-y-4">
          {/* TITLE */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project Title</span>
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* DESCRIPTION */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project Description</span>
            </label>
            <textarea
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* SKILL + CATEGORY */}
          <SkillDropdown
            selectedSkill={formData.mainSkill}
            selectedCategory={formData.category}
            onSelect={handleSkillChange}
          />

          {/* FILE UPLOAD */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Project Images</span>
            </label>
            <ProjectUploader onFilesChange={handleFilesChange} />
          </div>
        </form>

        {error && (
          <div role="alert" className="alert alert-error mt-2">
            <span>{error}</span>
          </div>
        )}

        <div className="modal-action">
          <button type="button" onClick={onHide} className="btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadProjectModal;
