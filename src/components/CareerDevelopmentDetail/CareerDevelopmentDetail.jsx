// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

// components/CareerDevelopmentDetail/CareerDevelopmentDetail.jsx

import React from "react";

const CareerDevelopmentDetail = ({ article, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg">
        <button
          onClick={onClose}
          className="text-red-500 text-lg font-semibold float-right"
        >
          Close
        </button>
        <h2 className="text-2xl font-bold mb-4">{article.title}</h2>
        <img
          src={article.image_url}
          alt={article.title}
          className="w-full h-48 object-cover rounded mb-4"
        />
        <p className="text-gray-700 mb-4">{article.content}</p>
        <p className="text-sm text-gray-500">
          Published on: {new Date(article.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default CareerDevelopmentDetail;
