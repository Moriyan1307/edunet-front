"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const MessageInput = ({ conversationId, onMessageSent }) => {
  const [message, setMessage] = useState("");
  const currentUserId = useSelector((state) => state.auth.user.user_id);

  const sendMessage = async () => {
    if (message.trim() === "" || !conversationId) return;

    try {
      await axiosInstance.post("/messages", {
        conversationId,
        senderId: currentUserId,
        content: message,
      });

      onMessageSent({
        sender_id: currentUserId,
        content: message,
        sent_at: new Date().toISOString(),
      });

      setMessage(""); // Clear input field after sending
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="flex items-center p-4 bg-white border-t">
      <input
        type="text"
        placeholder="Type a message"
        className="flex-grow px-4 py-2 border rounded-full focus:outline-none"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button className="ml-2" onClick={sendMessage}>
        <svg
          className="w-6 h-6 text-gray-500"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M2.293 6.293a1 1 0 011.414 0l9 9a1 1 0 001.414 0l9-9a1 1 0 10-1.414-1.414L12 13.586 3.707 5.293a1 1 0 00-1.414 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
