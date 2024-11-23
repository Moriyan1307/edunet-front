// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { useSelector } from "react-redux";

const ForumDetails = ({ forumId }) => {
  const [forum, setForum] = useState(null);
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const user = useSelector((state) => state.auth.user);
  const userId = user.user_id;

  useEffect(() => {
    const fetchForumDetails = async () => {
      try {
        const forumResponse = await axiosInstance.get(`/forums/${forumId}`);
        const postsResponse = await axiosInstance.get(
          `/forums/${forumId}/posts`
        );
        setForum(forumResponse.data);
        setPosts(postsResponse.data);
      } catch (error) {
        console.error("Error fetching forum details:", error);
      }
    };

    if (forumId) {
      fetchForumDetails();
    }
  }, [forumId]);

  const handleAddPost = async () => {
    if (newPost.trim() === "") return;

    try {
      await axiosInstance.post(`/forums/${forumId}/posts`, {
        posted_by: userId, // Use dynamic user ID from auth state here
        description: newPost,
      });
      setPosts([
        {
          posted_by: userId,
          description: newPost,
          created_at: new Date().toISOString(),
        },
        ...posts,
      ]);
      setNewPost("");
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <div className="container mx-auto px-6 py-8">
      {forum && (
        <>
          <h2 className="text-3xl font-semibold mb-4">{forum.title}</h2>
          <p className="text-gray-700 mb-6">{forum.description}</p>

          <h3 className="text-2xl font-semibold mb-4">Posts</h3>
          {posts.map((post, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg mb-4">
              <p className="text-sm font-medium">{post.description}</p>
              <span className="text-xs text-gray-500">
                Posted on {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
          ))}

          <div className="flex mt-4">
            <input
              type="text"
              className="flex-grow border px-4 py-2 rounded-l-md"
              placeholder="Add a new post..."
              value={newPost}
              onChange={(e) => setNewPost(e.target.value)}
            />
            <button
              onClick={handleAddPost}
              className="bg-blue-500 text-white px-4 py-2 rounded-r-md"
            >
              Post
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ForumDetails;
