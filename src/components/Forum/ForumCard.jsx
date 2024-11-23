// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

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
