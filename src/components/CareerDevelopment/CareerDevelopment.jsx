// components/CareerDevelopment/CareerDevelopment.jsx

import React, { useState, useEffect } from "react";
import CareerDevelopmentDetail from "../CareerDevelopmentDetail/CareerDevelopmentDetail";
import axiosInstance from "../../utils/axiosInstance";

const CareerDevelopment = () => {
  const placeholderImage = ""; // Replace with actual placeholder image path
  const [articles, setArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);

  // Fetch articles from the backend
  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axiosInstance.get("/articles");
        setArticles(response.data);
        console.log(articles);
      } catch (error) {
        console.error("Error fetching articles:", error);
      }
    };

    fetchArticles();
  }, []);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseDetail = () => {
    setSelectedArticle(null); // Clear selected article to close the detail view
  };

  return (
    <div className="h-full w-full overflow-auto p-6 bg-white">
      <h1 className="text-2xl font-bold mb-6">Career Development</h1>
      <div className="flex flex-col space-y-4">
        {articles.map((article) => (
          <div
            key={article.article_id}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md cursor-pointer"
            onClick={() => handleArticleClick(article)}
          >
            <img
              src={""}
              className="w-24 h-24 object-cover rounded-lg"
              onError={(e) => (e.target.src = placeholderImage)}
              alt={article.title}
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">{article.title}</h3>
              <p className="text-sm text-gray-600">
                {article.content.slice(0, 100)}...
              </p>
              <p className="text-sm text-gray-500">
                {new Date(article.created_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
      {selectedArticle && (
        <CareerDevelopmentDetail
          article={selectedArticle}
          onClose={handleCloseDetail}
        />
      )}
    </div>
  );
};

export default CareerDevelopment;
