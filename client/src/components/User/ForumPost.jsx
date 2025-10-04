{
  /* STATUS: ok */
}

import { MessageCircle, UserStar } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import EllipsisReport from "./EllipsisReport";

const ForumPost = ({
  id,
  author,
  date,
  content,
  upvotes,
  comments,
  ReportModal, // For <ReportModal />
  onDelete, // Delete
  currentUser, // Logged in
}) => {
  const [open, setOpen] = useState(false);
  const [postComments, setPostComments] = useState(comments);
  const [newComment, setNewComment] = useState("");
  const [voteCount, setVoteCount] = useState(upvotes);
  const [hasVoted, setHasVoted] = useState(false);

  // Upvote toggle
  const handleVote = () => {
    if (hasVoted) {
      setVoteCount(voteCount - 1);
    } else {
      setVoteCount(voteCount + 1);
    }
    setHasVoted(!hasVoted);
  };

  // Add comment
  const handleAddComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const newEntry = {
      author: "You", // later replace with logged-in user
      date: new Date().toLocaleDateString(),
      text: newComment,
    };

    setPostComments([...postComments, newEntry]);
    setNewComment("");
  };

  return (
    <>
      <div className="card mb-3 shadow-sm bg-base-100 p-4">
        {/* HEADER: AUTHOR + DATE + ELLIPSIS */}
        <div className="flex justify-between items-start mb-2">
          <div className="text-sm text-muted">
            <strong>
              <Link
                to={`/profile/${author}`}
                className="text-primary hover:underline"
              >
                {author}
              </Link>
            </strong>{" "}
            • {date}
          </div>

          {/* ELLIPSIS DROPDOWN */}
          <EllipsisReport
            type="Forum"
            targetId={post._id}
            isOwner={currentUser?._id === post.authorId}
          />
        </div>

        {/* POST CONTENT */}
        <p className="mb-3 break-words whitespace-pre-wrap">{content}</p>

        {/* UPVOTE + COMMENT */}
        <div className="flex justify-between items-center">
          <button
            onClick={handleVote}
            className={`btn btn-sm ${
              hasVoted
                ? "btn-outline btn-primary"
                : "btn-outline btn-primary opacity-70"
            }`}
          >
            <UserStar /> Upvote ({voteCount})
          </button>

          <button
            onClick={() => setOpen(!open)}
            className="btn btn-sm btn-outline btn-secondary"
            aria-controls="comments-collapse"
            aria-expanded={open}
          >
            <MessageCircle strokeWidth={1.5} /> Comments ({postComments.length})
          </button>
        </div>

        {/* COMMENT SECTION */}
        {open && (
          <div id="comments-collapse" className="mt-3">
            {postComments.length === 0 ? (
              <p className="text-sm text-muted">No comments yet.</p>
            ) : (
              postComments.map((c, i) => (
                <div key={i} className="mb-2 border-l-4 border-base-300 pl-3">
                  <div className="text-xs text-muted flex justify-between">
                    <span>
                      <Link
                        to={`/profile/${c.author}`}
                        className="text-primary hover:underline"
                      >
                        <strong>{c.author}</strong>
                      </Link>
                    </span>
                    <span>{c.date}</span>
                  </div>
                  <p className="mb-0 text-sm">{c.text}</p>
                </div>
              ))
            )}

            {/* WRITE COMMENT */}
            <form onSubmit={handleAddComment} className="mt-3 flex gap-2">
              <input
                type="text"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="input input-bordered flex-1"
              />
              <button type="submit" className="btn btn-primary">
                Post
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ForumPost;
