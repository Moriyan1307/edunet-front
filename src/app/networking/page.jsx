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
  const [messages, setMessages] = useState([]);

  // Update messages when a new message is sent
  const handleNewMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  // Change active conversation
  const handleConversationChange = (conversationId) => {
    setActiveConversationId(conversationId);
    setMessages([]); // Clear messages when switching conversations
  };

  return (
    <div className="h-full flex">
      {activeTab === "chat" && (
        <ChatList onConversationChange={handleConversationChange} />
      )}
      <div
        className={`flex flex-col ${
          activeTab === "forum" ? "w-full" : "flex-grow"
        }`}
      >
        <TopNav
          activeTab={activeTab}
          onTabChange={(tab) => setActiveTab(tab)}
        />
        {activeTab === "chat" ? (
          <>
            {activeConversationId ? (
              <>
                <ChatWindow
                  conversationId={activeConversationId}
                  messages={messages}
                />
                <MessageInput
                  conversationId={activeConversationId}
                  onMessageSent={handleNewMessage}
                />
              </>
            ) : (
              <p className="p-4">Select a conversation to start chatting.</p>
            )}
          </>
        ) : (
          <ForumComponent />
        )}
      </div>
    </div>
  );
};

export default Networking;
