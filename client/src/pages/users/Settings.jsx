import { CircleUserRound, X } from "lucide-react";
import { useState } from "react";

const Settings = () => {
  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    avatar: null, // add avatar to formData
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFormData({
        ...formData,
        avatar: {
          file: selectedFile,
          preview: URL.createObjectURL(selectedFile),
        },
      });
    }
  };

  const removeFile = () => {
    setFormData({ ...formData, avatar: null });
  };

  const openFileDialog = () => {
    document.getElementById("avatarInput").click();
  };

  const handleSave = () => {
    console.log("Updated data:", formData);
    // later: send formData to backend
  };

  return (
    <div className="card bg-base-100 shadow-sm w-full max-w-2xl mx-auto">
      <div className="card-body">
        <h2 className="card-title">Edit profile</h2>
        <p>Update your display settings.</p>

        <form className="space-y-4">
          {/* FULL NAME, CHANGE TO FNAME/ LNAME */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
            />
          </div>

          {/* BIO */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Bio</span>
            </label>
            <textarea
              name="bio"
              rows={3}
              value={formData.bio}
              onChange={handleChange}
              className="textarea textarea-bordered w-full"
            />
          </div>

          {/* AVATAR UPLOADER */}
          <div className="form-control flex flex-col items-center gap-2 my-4">
            <label className="label">
              <span className="label-text">Please select a display photo</span>
            </label>

            <div className="relative inline-flex">
              <button
                type="button"
                onClick={openFileDialog}
                aria-label={
                  formData.avatar?.preview ? "Change image" : "Upload image"
                }
                className="input input-bordered relative size-20 overflow-hidden p-0 rounded-full flex items-center justify-center cursor-pointer"
              >
                {formData.avatar?.preview ? (
                  <img
                    src={formData.avatar.preview}
                    alt="Preview of uploaded image"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <CircleUserRound className="w-6 h-6 opacity-60" />
                )}
              </button>

              {formData.avatar && (
                <button
                  type="button"
                  onClick={removeFile}
                  aria-label="Remove image"
                  className="btn btn-circle btn-xs absolute -top-2 -right-2 border-2 shadow bg-base-100"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}

              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>

            {formData.avatar?.file?.name && (
              <p className="text-xs text-gray-500 mt-2">
                {formData.avatar.file.name}
              </p>
            )}
          </div>
        </form>

        {/* BUTTONS */}
        <div className="justify-end card-actions">
          <button type="button" className="btn">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="btn btn-primary"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Settings;
