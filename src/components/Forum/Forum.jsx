// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import React, { useState } from "react";

const ForumCard = ({ author, title, date, onViewMore }) => (
  <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
    <p className="text-sm text-gray-600">by {author}</p>
    <h3 className="text-lg font-semibold mt-1">{title}</h3>
    <div className="flex justify-between items-center mt-2">
      <span className="text-sm text-gray-500">{date}</span>
      <button
        className="text-blue-600 hover:underline"
        onClick={onViewMore}
      >
        View More
      </button>
    </div>
  </div>
);

const ForumComponent = () => {
  const [selectedForum, setSelectedForum] = useState(null);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState({});

const forumPosts = [
  {
    id: 1,
    author: "Determined-Poitras",
    title: "Create An LMS Website With React",
    date: "Sept 25, 2024",
    content: "Learn how to create a Learning Management System (LMS) using React.",
    comments: [
      {
        id: 1,
        author: "User1",
        content: "This was super helpful! Thanks!",
        date: "Sept 26, 2024",
      },
      {
        id: 2,
        author: "User2",
        content: "I have a question about the API integration.",
        date: "Sept 27, 2024",
      },
    ],
  },
  {
    id: 2,
    author: "Lavern Laboy",
    title: "Get Started With Stack Overflow",
    date: "Sept 25, 2024",
    content: "Learn the basics of navigating and using Stack Overflow effectively.",
    comments: [
      {
        id: 1,
        author: "User3",
        content: "This is great for beginners!",
        date: "Sept 26, 2024",
      },
    ],
  },
  {
    id: 3,
    author: "Determined-Poitras",
    title: "Computer Science - Graduates",
    date: "Sept 25, 2024",
    content: "Discuss the best career options for recent Computer Science graduates.",
    comments: [
      {
        id: 1,
        author: "User4",
        content: "What are the top companies to apply for?",
        date: "Sept 27, 2024",
      },
      {
        id: 2,
        author: "User5",
        content: "I'm considering a career in AI. Any advice?",
        date: "Sept 28, 2024",
      },
    ],
  },
  {
    id: 4,
    author: "Determined-Poitras",
    title: "The Space Race",
    date: "Sept 25, 2024",
    content: "A deep dive into the history and current developments in space exploration.",
    comments: [
      {
        id: 1,
        author: "User6",
        content: "It's amazing how far space tech has come!",
        date: "Sept 29, 2024",
      },
    ],
  },
  {
    id: 5,
    author: "Jane Doe",
    title: "React vs. Angular",
    date: "Sept 25, 2024",
    content: "A comparison of React and Angular for web development.",
    comments: [
      {
        id: 1,
        author: "User7",
        content: "I prefer React for its flexibility.",
        date: "Sept 26, 2024",
      },
    ],
  },
  {
    id: 6,
    author: "John Smith",
    title: "Upcoming Tech Trends in 2025",
    date: "Sept 25, 2024",
    content: "Let's discuss the most exciting tech trends for the coming year.",
    comments: [
      {
        id: 1,
        author: "User8",
        content: "I'm really excited about the advancements in AI.",
        date: "Sept 27, 2024",
      },
      {
        id: 2,
        author: "User9",
        content: "Blockchain is still a game-changer!",
        date: "Sept 28, 2024",
      },
    ],
  },
];

  const handleViewMore = (forum) => {
    setSelectedForum(forum);
    setComments(forum.comments);
  };

  const handleClose = () => {
    setSelectedForum(null);
    setNewComment("");
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObject = {
        id: comments.length + 1,
        author: "Current User", // Replace with dynamic user data if available
        content: newComment,
        date: new Date().toLocaleDateString(),
      };
      const updatedComments = [...comments, newCommentObject];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  return (
    <div className="container mx-auto px-6 py-8 min-h-0 flex-grow overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">All Forums</h1>

      {selectedForum ? (
        // Detailed view of the selected forum with comments
        <div className="border rounded-lg p-6 bg-white shadow-md">
          <button
            className="mb-4 text-blue-600 hover:underline"
            onClick={handleClose}
          >
            Close
          </button>
          <h2 className="text-2xl font-bold mb-2">{selectedForum.title}</h2>
          <p className="text-sm text-gray-600 mb-4">by {selectedForum.author}</p>
          <p className="text-sm text-gray-500 mb-6">{selectedForum.date}</p>
          <p className="text-gray-700 mb-4">{selectedForum.content}</p>

          <h3 className="text-xl font-semibold mb-3">Comments</h3>
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border rounded-md p-3 bg-gray-100">
                <p className="text-sm text-gray-600">by {comment.author}</p>
                <p className="text-gray-700">{comment.content}</p>
                <p className="text-sm text-gray-500">{comment.date}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write a comment..."
              className="w-full border rounded-md p-2"
              rows={4}
            ></textarea>
            <button
              onClick={handleAddComment}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
              Post Comment
            </button>
          </div>
        </div>
      ) : (
        // List of forum posts
        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
          {forumPosts.map((post) => (
            <ForumCard
              key={post.id}
              {...post}
              onViewMore={() => handleViewMore(post)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ForumComponent;
