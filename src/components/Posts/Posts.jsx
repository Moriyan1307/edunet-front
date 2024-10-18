// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CommentIcon from '@mui/icons-material/Comment';

export default function Posts() {
  const [postContent, setPostContent] = useState(""); // State to manage input content
  const [message, setMessage] = useState(""); // State for success message

  const handlePost = () => {
    if (postContent.trim()) {
      setMessage("Posted successfully!"); // Set success message

      // Clear input field after posting
      setPostContent("");

      // Hide message after 1 second
      setTimeout(() => {
        setMessage(""); // Clear message after 1 second
      }, 1000);
    } else {
      setMessage("Please enter some content."); // Alert if input is empty
    }
  };

  return (
    <div className="relative w-full h-full mx-auto mt-6">


      <div className="mb-4 text-lg font-bold text-black mt-6">
              Welcome, Usha!
      </div>

      <div className="bg-gray-100 rounded-lg p-6 shadow-md mx-auto mt-6">
        <h2 className="text-sm font-bold text-black">NEW POST</h2>
        <hr className="my-4 border-gray-400" />

        {/* Popup message for success */}
        {message && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
            {message}
          </div>
        )}

        <p className="text-xl font-normal text-black">What’s on your mind?</p>
        <div className="flex justify-between mt-6">
          <input
            type="textarea"
            className="flex-1 p-2 mr-4 bg-gray-100"
            placeholder="Type your post..."
            value={postContent}
            onChange={(e) => setPostContent(e.target.value)} // Update state on input change
          />
          <button
            className="bg-black text-white py-2 px-10 rounded-lg"
            onClick={handlePost} // Handle post action
          >
            Post
          </button>
        </div>
      </div>

      {/* Post Content Section */}
      <div className="absolute w-full h-auto top-[347px] left-0 p-4">
        <div className="bg-gray-100 rounded-[15px] p-6">
          <h3 className="text-3xl font-bold text-[#181818]">Theresa Steward</h3>
          <p className="text-lg text-[#181818]">Mentor</p>
          <p className="text-base text-[#181818] leading-7 mt-4">
            What did the Dursleys care if Harry lost his place on the House
            Quidditch team because he hadn’t practiced all summer? What was it
            to the Dursleys if Harry went back to school without any of his
            homework done? The Dursleys were what wizards called Muggles (not a
            drop of magical blood in their veins).
          </p>

          <div className="flex justify-between mt-6">
            <div className="flex items-center">
              <ThumbUpIcon className="text-[#181818] mr-1" />
              <span className="text-2xl text-[#181818]">15</span>
            </div>
            <div className="flex items-center">
              <CommentIcon className="text-[#181818] mr-1" />
              <span className="text-2xl text-[#181818]">9</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
