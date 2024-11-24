// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";
import GroupCreationModal from "./GroupCreationModal";

const ChatList = ({ onConversationChange }) => {
  const [privateConversations, setPrivateConversations] = useState([]);
  const [groupConversations, setGroupConversations] = useState([]);
  const [selectedConversationId, setSelectedConversationId] = useState(null);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const currentUserId = useSelector((state) => state.auth.user?.user_id);

  // Fetch private (one-on-one) conversations
  const fetchPrivateConversations = async () => {
    try {
      const response = await axiosInstance.get(
        `/conversations/user-conversations/one-on-one/${currentUserId}`
      );
      // Process private conversations and set them as private with no participant flag
      const updatedPrivateConversations = response.data.map((conversation) => ({
        ...conversation,
        is_private: true, // Private conversations are marked as `true`
        is_participant: true, // No need to join for private chats
      }));
      setPrivateConversations(updatedPrivateConversations);
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

      // Process group conversations: set `is_private: false`, and `is_participant` based on the response
      const updatedGroupConversations = response.data.map((conversation) => ({
        ...conversation,
        is_private: false, // Group chats are marked as `false`
        is_participant: conversation.is_participant || false, // User participation status
      }));

      setGroupConversations(updatedGroupConversations);
    } catch (error) {
      console.error("Error fetching group conversations:", error);
    }
  };

  useEffect(() => {
    fetchPrivateConversations();
    fetchGroupConversations();
  }, [currentUserId]);

  const handleConversationClick = (conversation) => {
    // For private conversations, no joining required
    if (conversation.is_private) {
      setSelectedConversationId(conversation.conversation_id);
      onConversationChange(conversation.conversation_id, {
        display_name: conversation.display_name,
      });
    }
    // For group conversations, user needs to join first
    else if (!conversation.is_participant) {
      alert("You need to join the group before accessing the chat.");
    } else {
      setSelectedConversationId(conversation.conversation_id);
      onConversationChange(conversation.conversation_id, {
        display_name: conversation.display_name,
      });
    }
  };

  const handleJoinGroup = async (conversationId) => {
    try {
      await axiosInstance.post("conversations/group-conversations/join", {
        userId: currentUserId,
        conversationId,
      });

      // Update `is_participant` locally after joining
      setGroupConversations((prevConversations) =>
        prevConversations.map((conversation) =>
          conversation.conversation_id === conversationId
            ? { ...conversation, is_participant: true }
            : conversation
        )
      );
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
        {privateConversations.map((conversation) => {
          // Ensure is_private is true for private conversations
          const is_private = conversation.is_private === undefined ? true : conversation.is_private;  // Default to true if undefined

          return (
            <div
              key={conversation.conversation_id}
              onClick={() => {
                // Only handle click for private conversations
                if (is_private) {
                  handleConversationClick(conversation);
                }
              }}
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
          );
        })}
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
                src={"https://as1.ftcdn.net/v2/jpg/03/14/44/10/1000_F_314441066_71MAdbGS0XiIr1vxgIyGJEZCIHebslTp.jpg"}
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
