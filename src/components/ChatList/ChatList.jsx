// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";

const ChatList = () => {
  const users = [
    { name: "Darlene Black", avatar: "/women_profile.svg"},
    { name: "Brandon Wilson", avatar: "/man_profile.svg"},
    { name: "WDM project group", avatar: "/group.svg"},
    { name: "Audrey Alexander", avatar: "/man_profile.svg"},
  ];

  const [selectedUser, setSelectedUser] = useState(users[0].name); // Default selected user

  const handleUserClick = (userName) => {
    setSelectedUser(userName);
  };

  return (
    <div className="w-64 bg-white border-r p-4">
      <h2 className="text-lg font-bold mb-4">CHATS</h2>
      {users.map((user, index) => (
        <div
          key={index}
          className={`flex items-center space-x-3 mb-4 cursor-pointer ${
            selectedUser === user.name ? "bg-gray-200" : ""
          }`}
          onClick={() => handleUserClick(user.name)}
        >
          <img
            src={user.avatar}
            alt={user.name}
            className="w-12 h-12 rounded-full"
          />
          <div>
            <p className="text-gray-900 font-medium">{user.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatList;
