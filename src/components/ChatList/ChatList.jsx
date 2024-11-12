import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const ChatList = ({ onConversationChange }) => {
  const [conversations, setConversations] = useState([]);
  const currentUserId = useSelector((state) => state.auth.user.user_id);

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const response = await axiosInstance.get(
          `/conversations/user-conversations/${currentUserId}`
        );
        setConversations(response.data);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };

    fetchConversations();
  }, [currentUserId]);

  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-4">CHATS</h2>
      {conversations.map((user) => (
        <div
          key={user.user_id}
          onClick={() => onConversationChange(user.conversation_id)} // Set active conversation
          className="flex items-center space-x-3 mb-4 cursor-pointer"
        >
          <img
            src={user.image_url || "/path_to_default_avatar.jpg"}
            alt={`${user.f_name} ${user.l_name}`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-900 font-medium">
              {user.f_name} {user.l_name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
