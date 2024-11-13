import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import GroupCreationModal from "./GroupCreationModal";

const ChatList = ({ onConversationChange }) => {
  const [conversations, setConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.auth.user.user_id);

  // Fetch conversations function
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

  useEffect(() => {
    fetchConversations();
  }, [currentUserId]);

  const handleConversationClick = (conversation) => {
    setSelectedConversationId(conversation.conversation_id);
    onConversationChange(conversation.conversation_id, {
      f_name: conversation.f_name,
      l_name: conversation.l_name,
      isGroupChat: conversation.is_group_chat,
      conversation_name: conversation.conversation_name,
    });
  };

  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-4">CHATS</h2>
      <button
        onClick={() => setIsGroupModalOpen(true)}
        className="w-full mb-4 bg-blue-500 text-white py-2 rounded-md"
      >
        Start Group Conversation
      </button>
      {isGroupModalOpen && (
        <GroupCreationModal
          currentUserId={currentUserId}
          onClose={() => setIsGroupModalOpen(false)}
          onGroupCreated={fetchConversations} // Refetch conversations on group creation
        />
      )}
      {conversations.map((conversation) => (
        <div
          key={conversation.conversation_id}
          onClick={() => handleConversationClick(conversation)}
          className={`flex items-center space-x-3 mb-4 cursor-pointer p-2 rounded-lg ${
            conversation.conversation_id === selectedConversationId
              ? "bg-blue-100"
              : "hover:bg-gray-100"
          }`}
        >
          <img
            src={conversation.image_url || "/path_to_default_avatar.jpg"}
            alt={`${conversation.f_name} ${conversation.l_name}`}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-900 font-medium">
              {conversation.is_group_chat
                ? conversation.conversation_name
                : `${conversation.f_name} ${conversation.l_name}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
