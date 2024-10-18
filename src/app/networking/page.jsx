// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import { useState } from "react";
import ChatWindow from "../../components/Chat/Chat";
import MessageInput from "../../components/ChatInput/ChatInput";
import ChatList from "../../components/ChatList/ChatList";
import TopNav from "../../components/ChatNavigation/NavigationBar";
import ForumComponent from "../../components/Forum/Forum";

const Networking = () => {
  const [activeTab, setActiveTab] = useState("chat"); // 'chat' or 'forum'

  return (
    <div className="h-full flex">
      {activeTab === "chat" && <ChatList />}
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
            <ChatWindow />
            <MessageInput />
          </>
        ) : (
          <ForumComponent />
        )}
      </div>
    </div>
  );
};

export default Networking;
