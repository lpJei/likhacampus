import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import ProfileCard from "../../components/User/ProfileCard";
import UploadProjectModal from "../../components/User/UploadProjectModal";
import { UserContext } from "../../context/UserContext";

const Profile = () => {
  const { username } = useParams();
  const { user: currentUser } = useContext(UserContext);
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals
  const [activeModal, setActiveModal] = useState(null);
  const handleOpenModal = (modalName) => setActiveModal(modalName);
  const handleCloseModal = () => setActiveModal(null);

  // Load profile
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        setLoading(true);

        const endpoint = username
          ? `api/user/profile/${username}`
          : `/api/user/profile`;

        const profileResponse = await axios.get(endpoint);
        setProfile(profileResponse.data.user);

        const projectResponse = await axios.get(
          `api/projects/user/${profileResponse.data.user._id}`
        );
        setProjects(projectsResponse.data.projects || []);

        setError(null);
      } catch (error) {
        console.error("Error fetching profile: ", error);
        setError(error.response?.data?.error || "Failed to load profile.");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [username]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <span>Error: {error}</span>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="alert alert-warning max-w-md">
          <span>Profile not found</span>
        </div>
      </div>
    );
  }

  const handleUploadProject = (projectData) => {
    const newProject = {
      id: Date.now(),
      author: "Current User",
      date: new Date().toLocaleDateString(),
      media: projectData.files?.length
        ? projectData.files
        : ["https://via.placeholder.com/150"],
      ...projectData,
    };
    setProjects((prev) => [newProject, ...prev]);
    handleCloseModal();
  };

  return (
    <>
      <div className="px-4 md:px-8 lg:px-16 py-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-8">My Portfolio</h1>

        <ProfileCard
          name={`${profile.firstName} ${profile.lastName}`}
          bio={profile.bio || "Set your bio"}
          imageUrl={profile.avatar}
          projects={projects}
          onUpload={() => handleOpenModal("uploadProject")}
        />

        {/* UPLOAD PROJECT MODAL */}
        {currentUser?.id === profile._id && (
          <UploadProjectModal
            show={activeModal === "uploadProject"}
            onHide={handleCloseModal}
            onSave={handleUploadProject}
          />
        )}
      </div>
    </>
  );
};

export default Profile;
