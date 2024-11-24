// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [newPostContent, setNewPostContent] = useState("");

  const user = useSelector((state) => state.auth.user);
  const userId = user?.user_id;

  // Fetch posts
  const fetchPosts = async () => {
    try {
      const response = await axiosInstance.get("/api/posts");
      setPosts(response.data); // Assuming the API response has the posts array in the data property
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // Handle new post submission
  const handlePostSubmit = async () => {
    try {
      const response = await axiosInstance.post("/api/posts", {
        user_id: userId,
        content: newPostContent,
      });

      if (response.status === 201) {
        setNewPostContent(""); // Clear the input
        // Fetch the updated list of posts after adding the new post
        await fetchPosts();
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  // Handle post like
  const handleLikePost = async (postId) => {
    try {
      const response = await axiosInstance.post(`/api/posts/${postId}/like`, {
        user_id: userId,
      });

      if (response.status === 200) {
        // Unlike: decrement like count
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, like_count: post.like_count - 1 }
              : post
          )
        );
      } else if (response.status === 201) {
        // Like: increment like count
        setPosts((prevPosts) =>
          prevPosts.map((post) =>
            post.post_id === postId
              ? { ...post, like_count: post.like_count + 1 }
              : post
          )
        );
      }
    } catch (error) {
      console.error("Error toggling like:", error);
    }
  };

  return (
    <div className="relative overflow-y-auto w-full h-4/5 mx-auto">
      {/* New Post Section */}
      <div className="bg-gray-100 rounded-lg p-6 shadow-md mx-auto">
        <h2 className="text-sm font-bold text-black">NEW POST</h2>
        <hr className="my-4 border-gray-400" />
        <p className="text-xl font-normal text-black">What’s on your mind?</p>
        <div className="flex justify-between mt-6">
          <input
            type="textarea"
            className="flex-1 p-2 mr-4 bg-gray-100"
            placeholder="Type your post..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button
            onClick={handlePostSubmit}
            className="bg-black text-white py-2 px-10 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="mt-6 space-y-6">
        {posts.map((post, ind) => (
          <div key={ind} className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-xl font-bold text-[#181818]">
              {post.user_name}
            </h3>
            <p className="text-base text-[#181818] mt-2">{post.content}</p>
            <div className="flex justify-between items-center mt-4">
              <div className="flex items-center">
                <button
                  onClick={() => handleLikePost(post.post_id)}
                  className="text-black"
                >
                  👍 {post.like_count}
                </button>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(post.created_at).toLocaleString()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
