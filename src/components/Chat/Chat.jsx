"use client";

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const ChatWindow = ({ conversationId, messages }) => {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const currentUserId = useSelector((state) => state.auth.user.user_id);

  useEffect(() => {
    const fetchMessages = async () => {
      if (!conversationId) return;

      try {
        const response = await axiosInstance.get(`/messages/${conversationId}`);
        setFetchedMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [conversationId]);

  return (
    <div className="h-2/5 flex flex-col flex-grow p-4 bg-white">
      {[...fetchedMessages, ...messages].map((message, index) => (
        <div
          key={index}
          className={`flex ${
            message.sender_id === currentUserId
              ? "justify-end"
              : "justify-start"
          } mb-2`}
        >
          <div
            className={`p-3 rounded-lg max-w-xs ${
              message.sender_id === currentUserId
                ? "bg-black text-white"
                : "bg-gray-200 text-gray-900"
            }`}
          >
            {message.content}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatWindow;
