"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import ForumCard from "./ForumCard";

const ForumComponent = () => {
  const [forums, setForums] = useState([]);

  useEffect(() => {
    const fetchForums = async () => {
      try {
        const response = await axiosInstance.get("/forums");
        setForums(response.data);
      } catch (error) {
        console.error("Error fetching forums:", error);
      }
    };

    fetchForums();
  }, []);

  return (
    <div className="container mx-auto px-6 py-8 min-h-0 flex-grow overflow-y-auto">
      <h1 className="text-3xl font-bold mb-6">Forums</h1>
      <div className="grid md:grid-cols-2 gap-6">
        {forums.map((forum) => (
          <ForumCard key={forum.forum_id} forum={forum} />
        ))}
      </div>
    </div>
  );
};

export default ForumComponent;
