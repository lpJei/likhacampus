import { useState } from "react";

const EllipsisReport = ({ type, targetId, isOwner }) => {
  const [modal, setModal] = useState(null); // "Report" | "Delete"

  const handleReport = () => {
    console.log(`Report ${type} ID: ${targetId}`);
    setModal(null);
  };

  const handleDelete = () => {
    console.log(`Delete ${type} ID: ${targetId}`);
    setModal(null);
  };

  const isProject = type === "Project";
  const isForum = type === "Forum";

  return (
    <>
      {/* ELLIPSIS DROPDOWN */}
      <div className="dropdown dropdown-end">
        <button tabIndex={0} className="btn btn-sm btn-ghost">
          ⋮
        </button>
        <ul
          tabIndex={0}
          className="dropdown-content menu bg-base-100 rounded-box shadow z-[1] w-40"
        >
          {isOwner ? (
            <>
              <li>
                <button>Edit</button>
              </li>
              {isProject && (
                <li>
                  <button>Archive</button>
                </li>
              )}
              <li>
                <button onClick={() => setModal("delete")}>Delete</button>
              </li>
            </>
          ) : (
            <li>
              <button onClick={() => setModal("report")}>Report</button>
            </li>
          )}
        </ul>
      </div>

      {/* REPORT MODAL */}
      {modal === "report" && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold">Report {type}</h3>
            <p className="py-2">Why are you reporting this?</p>
            <select className="select select-bordered w-full">
              <option>Bullying, harassment, or abuse</option>
              <option>Suicide or self-harm</option>
              <option>Violent, hateful, or disturbing content</option>
              <option>Selling or promoting restricted items</option>
              <option>Inappropriate content</option>
              <option>Scam or false information</option>
              <option>Plagiarism</option>
            </select>
            <div className="modal-action">
              <button className="btn" onClick={() => setModal(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleReport}>
                Submit
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModal(null)} />
        </div>
      )}

      {/* DELETE MODAL */}
      {modal === "delete" && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold">Delete {type}?</h3>
            <p className="py-2">This action cannot be undone.</p>
            <div className="modal-action">
              <button className="btn" onClick={() => setModal(null)}>
                Cancel
              </button>
              <button className="btn btn-error" onClick={handleDelete}>
                Confirm
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setModal(null)} />
        </div>
      )}
    </>
  );
};

export default EllipsisReport;
