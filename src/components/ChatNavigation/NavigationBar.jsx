// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React from "react";

const TopNav = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex items-center justify-start py-4 px-6 bg-white border-b">
      <button
        onClick={() => onTabChange("chat")}
        className={`mr-4 px-4 py-2 rounded-md ${
          activeTab === "chat"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Messages
      </button>
      <button
        onClick={() => onTabChange("forum")}
        className={`px-4 py-2 rounded-md ${
          activeTab === "forum"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Forum
      </button>
    </nav>
  );
};

export default TopNav;
