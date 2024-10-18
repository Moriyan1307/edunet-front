// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";

const JobCard = ({ company, title, location, type, salary, description }) => {
  const [viewDetails, setViewDetails] = useState(false);

  const handleViewDetails = () => {
    setViewDetails(true);
  };

  const handleGoBack = () => {
    setViewDetails(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border p-6">
      {viewDetails ? (
        <div>
          <h2 className="text-xl font-bold">{title}</h2>
          <h3 className="text-lg font-semibold">{company}</h3>
          <p className="mt-2 text-gray-600">{location}</p>
          <p className="mt-1 text-gray-600">{type}</p>
          <p className="mt-1 text-gray-600">{salary}</p>
          <p className="mt-4">{description}</p>
          <button
            onClick={handleGoBack}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
          >
            Go Back
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-gray-200 rounded-full p-3 mr-4"></div>
            <div>
              <h3 className="text-lg font-semibold">{company}</h3>
              <h2 className="text-xl font-bold">{title}</h2>
              <div className="flex items-center text-gray-600 mt-2">
                <span className="mr-4">{location}</span>
                <span className="mr-4">{type}</span>
                <span>{salary}</span>
              </div>
            </div>
          </div>
          <button
            onClick={handleViewDetails}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          >
            View Details
          </button>
        </div>
      )}
    </div>
  );
};

export default JobCard;
