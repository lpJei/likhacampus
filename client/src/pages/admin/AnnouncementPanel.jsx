import { Megaphone, Pin } from "lucide-react";
import { useState } from "react";

const AnnouncementPanel = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [featuredArtist, setFeaturedArtist] = useState(null);
  const [showAnnouncementModal, setShowAnnouncementModal] = useState(false);
  const [showArtistModal, setShowArtistModal] = useState(false);

  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
    imageFile: null,
  });

  const addAnnouncement = () => {
    if (
      !newAnnouncement.title ||
      !newAnnouncement.content ||
      !newAnnouncement.imageFile
    )
      return;

    const imageUrl = URL.createObjectURL(newAnnouncement.imageFile);

    const newItem = {
      id: Date.now(),
      title: newAnnouncement.title,
      content: newAnnouncement.content,
      imageUrl,
      date: new Date().toLocaleDateString(), // optional: show date
    };

    setAnnouncements([...announcements, newItem]);

    // reset fields
    setNewAnnouncement({
      title: "",
      content: "",
      imageFile: null,
    });

    setShowAnnouncementModal(false);
  };

  const [newArtist, setNewArtist] = useState({
    name: "",
    bio: "",
    imageFile: null,
  });

  const replaceArtist = () => {
    const imageUrl = newArtist.imageFile
      ? URL.createObjectURL(newArtist.imageFile)
      : "";

    setFeaturedArtist({
      name: newArtist.name,
      bio: newArtist.bio,
      imageUrl,
    });

    setNewArtist({ name: "", bio: "", imageFile: null });
    setShowArtistModal(false);
  };

  const deleteAnnouncement = (id) => {
    setAnnouncements(announcements.filter((a) => a.id !== id));
  };

  return (
    <>
      <div className="container mx-auto p-6 space-y-10">
        {/* ANNOUNCEMENT SECTION MANAGEMENT */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Megaphone size={20} /> Announcements
            </h2>
            <button
              className="btn btn-primary"
              onClick={() => setShowAnnouncementModal(true)}
            >
              + Add Announcement
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Content</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {announcements.map((a) => (
                  <tr key={a.id}>
                    <td>
                      <img
                        src={a.imageUrl}
                        alt={a.title}
                        className="w-24 h-16 object-cover rounded"
                      />
                    </td>
                    <td>{a.title}</td>
                    <td>{a.date}</td>
                    <td>{a.content}</td>
                    <td>
                      <button
                        className="btn btn-xs btn-error"
                        onClick={() => deleteAnnouncement(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FEATURED ARTIST MANAGEMENT */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Pin size={20} /> Featured Artist
          </h2>
          {featuredArtist ? (
            <div className="card lg:card-side bg-base-100 shadow-md">
              <figure className="w-28 p-4 flex items-center justify-center">
                <img
                  src={featuredArtist.imageUrl}
                  alt={featuredArtist.name}
                  className="w-20 h-20 object-cover"
                />
              </figure>
              <div className="card-body">
                <h3 className="card-title">{featuredArtist.name}</h3>
                <p>{featuredArtist.bio}</p>
                <div className="card-actions justify-end">
                  <button
                    className="btn btn-secondary"
                    onClick={() => setShowArtistModal(true)}
                  >
                    Replace Artist
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="btn btn-primary"
              onClick={() => setShowArtistModal(true)}
            >
              + Add Featured Artist
            </button>
          )}
        </div>

        {/* ANNOUNCEMENT MODAL */}
        {showAnnouncementModal && (
          <dialog open className="modal">
            <div className="modal-box space-y-3">
              <h3 className="font-bold text-lg">New Announcement</h3>
              <input
                type="text"
                placeholder="Title"
                className="input input-bordered w-full"
                value={newAnnouncement.title}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    title: e.target.value,
                  })
                }
              />
              <textarea
                placeholder="Content"
                className="textarea textarea-bordered w-full"
                value={newAnnouncement.content}
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    content: e.target.value,
                  })
                }
              ></textarea>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="file-input file-input-bordered w-full"
                onChange={(e) =>
                  setNewAnnouncement({
                    ...newAnnouncement,
                    imageFile: e.target.files[0],
                  })
                }
              />
              <div className="modal-action">
                <button className="btn btn-primary" onClick={addAnnouncement}>
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => setShowAnnouncementModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}

        {/* FEATURED ARTIST MODAL */}
        {showArtistModal && (
          <dialog open className="modal">
            <div className="modal-box space-y-3">
              <h3 className="font-bold text-lg">Replace Featured Artist</h3>
              <input
                type="text"
                placeholder="Name"
                className="input input-bordered w-full"
                value={newArtist.name}
                onChange={(e) =>
                  setNewArtist({ ...newArtist, name: e.target.value })
                }
              />
              <textarea
                placeholder="Bio"
                className="textarea textarea-bordered w-full"
                value={newArtist.bio}
                onChange={(e) =>
                  setNewArtist({ ...newArtist, bio: e.target.value })
                }
              ></textarea>
              <input
                type="file"
                accept=".jpg,.jpeg,.png"
                className="file-input file-input-bordered w-full"
                onChange={(e) =>
                  setNewArtist({
                    ...newArtist,
                    imageFile: e.target.files[0],
                  })
                }
              />
              <div className="modal-action">
                <button className="btn btn-primary" onClick={replaceArtist}>
                  Save
                </button>
                <button
                  className="btn"
                  onClick={() => setShowArtistModal(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </dialog>
        )}
      </div>
    </>
  );
};

export default AnnouncementPanel;
