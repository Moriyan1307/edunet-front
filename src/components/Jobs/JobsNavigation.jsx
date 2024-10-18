// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React from "react";

const Navigation = ({ activeTab, setActiveTab }) => {
  return (
    <nav className="flex space-x-4">
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "fullTime"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("fullTime")}
      >
        Full Time Jobs
      </button>
      <button
        className={`px-4 py-2 rounded-md ${
          activeTab === "internships"
            ? "bg-gray-200 text-gray-800"
            : "text-gray-600"
        }`}
        onClick={() => setActiveTab("internships")}
      >
        Internships
      </button>
    </nav>
  );
};

export default Navigation;
