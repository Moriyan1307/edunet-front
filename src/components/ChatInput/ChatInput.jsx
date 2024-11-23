import React, { useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const MessageInput = ({ conversationId, onMessageSent }) => {
  const [message, setMessage] = useState("");
  const currentUserId = useSelector((state) => state.auth.user?.user_id);

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
      <button
        className="ml-2 p-2 rounded-full bg-black text-white hover:bg-gray-600 focus:outline-none"
        onClick={sendMessage}
      >
        <svg
          className="w-5 h-5"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fillRule="evenodd"
            d="M22 12L3 5v4l9 3-9 3v4l19-7z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default MessageInput;
