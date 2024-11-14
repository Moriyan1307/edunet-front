"use client";

import React, { useState } from "react";
import ChatWindow from "../../components/Chat/Chat";
import MessageInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import TopNav from "../../components/ChatNavigation/NavigationBar";
import ForumComponent from "../../components/Forum/Forum";

const Networking = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'forum'
  const [activeConversationId, setActiveConversationId] = useState(null); // New state for active conversation
  const [conversationUser, setConversationUser] = useState(null); // State for conversation participant details
  const [messages, setMessages] = useState([]);

  // Update messages when a new message is sent
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Change active conversation and set conversation user details
  const handleConversationChange = (conversationId, user) => {
    setActiveConversationId(conversationId);
    setConversationUser(user); // Set the selected user's details
    setMessages([]); // Clear messages when switching conversations
  };

  console.log(conversationUser);

  return (
    <div className="h-full flex flex-col ">
      <TopNav activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />
      <div className="flex flex-grow ">
        {activeTab === "chat" && (
          <div className="w-2/6 bg-white border-r p-4 overflow-y-auto">
            <ChatList onConversationChange={handleConversationChange} />
          </div>
        )}
        <div
          className={`flex flex-col flex-grow ${
            activeTab === "forum" ? "w-full" : "w-3/4"
          }`}
        >
          {activeTab === "chat" ? (
            <>
              {activeConversationId ? (
                <div className="flex flex-col h-full">
                  {/* Chat window takes up remaining space with overflow-y for scrolling */}
                  <div className="flex-grow overflow-y-auto">
                    <ChatWindow
                      conversationId={activeConversationId}
                      messages={messages}
                      user={conversationUser} // Pass user details to ChatWindow
                    />
                  </div>
                  {/* Message input stays fixed at the bottom */}
                  <div className="border-t">
                    <MessageInput
                      conversationId={activeConversationId}
                      onMessageSent={handleNewMessage}
                    />
                  </div>
                </div>
              ) : (
                <p className="p-4">Select a conversation to start chatting.</p>
              )}
            </>
          ) : (
            <ForumComponent />
          )}
        </div>
      </div>
    </div>
  );
};

export default Networking;
