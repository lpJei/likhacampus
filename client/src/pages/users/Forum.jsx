{
  /* STATUS: ok */
}

import { useState } from "react";
import ForumPost from "../../components/User/ForumPost";
import ForumSortDropdown from "../../components/User/ForumSortDropdown";

const Forum = () => {
  const currentUser = "You";

  // Objects for posts
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: "JuanDelaCruz",
      date: "Sept 5, 2025",
      content: "This is my first post in the forum!",
      upvotes: 12,
      comments: [
        { author: "Maria", date: "Sept 5", text: "Nice post!" },
        { author: "Pedro", date: "Sept 6", text: "Welcome to the forum!" },
      ],
    },
    {
      id: 2,
      author: "Ana",
      date: "Sept 4, 2025",
      content:
        "What do you guys think about the new project submission system?",
      upvotes: 8,
      comments: [],
    },
  ]);

  const [newPost, setNewPost] = useState("");

  const Report = () => <span className="text-danger">Report</span>;

  // Add new post
  const handleAddPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newEntry = {
      id: Date.now(),
      author: "You", // Replace with logged-in user later
      date: new Date().toLocaleDateString(),
      content: newPost,
      upvotes: 0,
      comments: [],
    };

    setPosts([newEntry, ...posts]); // Prepend new post
    setNewPost("");
  };

  const handleDeletePost = (id) => {
    // Delete posts
    setPosts(posts.filter((post) => post.id !== id));
  };

  const handleReset = () => {
    // Resets text field when tapping "Reset"
    setNewPost("");
  };

  return (
    <>
      <div className="text-4xl font-bold">
        LIKHOW <span className="yellow">FORUM</span>
      </div>
      <div className="container mx-auto mt-4">
        {/* POST FORM */}
        <div className="card mb-4 shadow-sm bg-base-100 p-4">
          <form
            onSubmit={handleAddPost}
            className="flex flex-col sm:flex-row items-center gap-2"
          >
            <textarea
              type="text"
              placeholder="Share something with the forum..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
              rows={3}
              className="textarea textarea-bordered h-auto w-full resize-none overflow-y-auto break-words"
            />

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                type="submit"
                className="btn btn-primary w-full sm:w-auto"
              >
                Post
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="btn btn-outline btn-error w-full sm:w-auto"
              >
                Reset
              </button>
            </div>
          </form>
        </div>

        {/* SORT DROPDOWN COMPONENT */}
        <ForumSortDropdown />

        {/* POSTS */}
        {posts.map((post) => (
          <ForumPost
            key={post.id}
            {...post}
            ReportComponent={Report}
            onDelete={handleDeletePost}
            currentUser={currentUser}
          />
        ))}
      </div>
    </>
  );
};

export default Forum;
