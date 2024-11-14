import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import GroupCreationModal from "./GroupCreationModal";

const ChatList = ({ onConversationChange }) => {
  const [privateConversations, setPrivateConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.auth.user.user_id);

  // Fetch private (one-on-one) conversations
  const fetchPrivateConversations = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversations/user-conversations/one-on-one/${currentUserId}`
      );
      setPrivateConversations(response.data);
    } catch (error) {
      console.error("Error fetching private conversations:", error);
    }
  };

  // Fetch group conversations
  const fetchGroupConversations = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversations/group-conversations/${currentUserId}`
      );
      setGroupConversations(response.data);
    } catch (error) {
      console.error("Error fetching group conversations:", error);
    }
  };

  useEffect(() => {
    fetchPrivateConversations();
    fetchGroupConversations();
  }, [currentUserId]);

  const handleConversationClick = (conversation) => {
    setSelectedConversationId(conversation.conversation_id);
    onConversationChange(conversation.conversation_id, {
      display_name: conversation.display_name,
    });
  };

  const handleJoinGroup = async (conversationId) => {
    try {
      await axiosInstance.post("conversations/group-conversations/join", {
        userId: currentUserId,
        conversationId,
      });
      fetchGroupConversations(); // Refetch group conversations to update joined groups
    } catch (error) {
      console.error("Error joining group:", error);
    }
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
          onGroupCreated={() => {
            fetchPrivateConversations();
            fetchGroupConversations();
          }} // Refetch conversations on group creation
        />
      )}

      {/* Private Chats Section */}
      <div>
        <h3 className="text-md font-semibold mb-2">Private Chats</h3>
        {privateConversations.map((conversation) => (
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
              alt={`${conversation.display_name}`}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <p className="text-gray-900 font-medium">
                {conversation.display_name}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Group Chats Section */}
      <div>
        <h3 className="text-md font-semibold mt-4 mb-2">Group Chats</h3>
        {groupConversations.map((conversation) => (
          <div
            key={conversation.conversation_id}
            onClick={() => handleConversationClick(conversation)}
            className={`flex items-center justify-between space-x-3 mb-4 cursor-pointer p-2 rounded-lg ${
              conversation.conversation_id === selectedConversationId
                ? "bg-blue-100"
                : "hover:bg-gray-100"
            }`}
          >
            <div className="flex items-center space-x-3">
              <img
                src={conversation.display_name || "/path_to_default_avatar.jpg"}
                alt={conversation.display_name}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <p className="text-gray-900 font-medium">
                  {conversation.display_name}
                </p>
              </div>
            </div>
            {!conversation.is_participant && (
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering onConversationChange
                  handleJoinGroup(conversation.conversation_id);
                }}
                className="bg-green-500 text-white px-2 py-1 rounded"
              >
                Join
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
