"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ForumCard = ({ forum }) => {
  const router = useRouter();

  const handleViewMore = () => {
    router.push(`/forum/${forum.forum_id}`);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm">
      <h3 className="text-lg font-semibold">{forum.title}</h3>
      <p className="text-sm text-gray-600">{forum.description}</p>
      <button
        onClick={handleViewMore}
        className="text-blue-600 hover:underline mt-2"
      >
        View More
      </button>
    </div>
  );
};

export default ForumCard;
