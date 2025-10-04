import EllipsisReport from "./EllipsisReport";

const ProjectCards = ({ project }) => {
  return (
    <>
      <div className="card bg-base-100 shadow-md rounded-lg w-full">
        {/* Header: Author + Date */}
        <div className="flex items-center gap-3 p-4">
          <div className="avatar">
            <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center">
              {project.author?.[0] || "U"}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold">
              {project.author || "Unknown"}
            </p>
            <p className="text-xs text-gray-500">
              {project.date || new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="ml-auto">
            <EllipsisReport
              type="Project"
              targetId={project._id}
              isOwner={currentUser?._id === project.authorId}
            />{" "}
            {/* REPORT */}
          </div>
        </div>

        {/* Body */}
        <div className="px-4 pb-4">
          {/* Title */}
          <h2 className="text-lg font-bold mb-1">{project.title}</h2>

          {/* Description */}
          <p className="text-sm text-gray-700 mb-2">{project.description}</p>

          {/* Skills & Categories */}
          <div className="flex flex-wrap gap-2 mb-2">
            {project.mainSkills?.map((skill, idx) => (
              <span
                key={idx}
                className="badge badge-primary badge-outline text-xs"
              >
                {skill}
              </span>
            ))}
            {project.categories?.map((cat, idx) => (
              <span
                key={idx}
                className="badge badge-secondary badge-outline text-xs"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Media Grid */}
          {project.media?.length > 0 && (
            <div className="grid grid-cols-2 gap-1">
              {project.media?.slice(0, 4).map((url, idx) => (
                <img
                  key={idx}
                  src={url || "https://via.placeholder.com/150"}
                  alt={`media-${idx}`}
                  className="w-full h-32 object-cover rounded"
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ProjectCards;
