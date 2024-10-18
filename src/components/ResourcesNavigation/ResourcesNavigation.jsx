// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React from "react";

const ResourcesTopNavigation = ({ activeTab, onTabChange }) => {
  return (
    <nav className="flex items-center justify-start py-4 px-6 bg-white border-b">
      <button
        onClick={() => onTabChange("career")}
        className={`mr-4 px-4 py-2 rounded-md ${
          activeTab === "career"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Career Development
      </button>
      <button
        onClick={() => onTabChange("mentorship")}
        className={`px-4 py-2 rounded-md ${
          activeTab === "mentorship"
            ? "bg-gray-200 text-black"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        Mentorship Program
      </button>
    </nav>
  );
};

export default ResourcesTopNavigation;