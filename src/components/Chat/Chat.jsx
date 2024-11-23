import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const ChatWindow = ({ conversationId, messages, user }) => {
  const [fetchedMessages, setFetchedMessages] = useState([]);
  const currentUserId = useSelector((state) => state.auth.user?.user_id);

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
    <div className="flex flex-col overflow-y-auto  flex-grow bg-white">
      {/* Display conversation name or user's name */}
      {user && (
        <div className="px-4 py-2 border-b bg-gray-100">
          <h3 className="text-lg font-semibold">
            {user.isGroupChat ? user.conversation_name : `${user.display_name}`}
          </h3>
        </div>
      )}

      {/* Display the messages */}
      <div className="flex flex-col flex-grow p-4 overflow-y-auto">
        {[...fetchedMessages, ...messages].map((message, index) => (
          <div key={index} className="mb-4">
            {/* Display sender name above message */}
            <div
              className={`text-sm mb-1 ${
                message.sender_id === currentUserId ? "text-right" : "text-left"
              }`}
            >
              {message.sender_id === currentUserId
                ? "You"
                : message.sender_name}
            </div>
            <div
              className={`flex ${
                message.sender_id === currentUserId
                  ? "justify-end"
                  : "justify-start"
              }`}
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
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatWindow;
