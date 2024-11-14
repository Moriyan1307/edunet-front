// app/forum/[forumId]/page.jsx

import ForumDetails from "../../../components/Forum/ForumDetails";
import axiosInstance from "../../../utils/axiosInstance";

export async function generateStaticParams() {
  try {
    // Fetch forums from your backend
    const response = await axiosInstance.get("/forums");
    const forums = response.data;

    // Map forum IDs to the format required for params
    return forums.map((forum) => ({ forumId: forum.forum_id.toString() }));
  } catch (error) {
    console.error("Error fetching forum IDs:", error);
    return []; // Return empty array if there’s an error
  }
}

const ForumPage = ({ params }) => {
  const { forumId } = params;

  return <ForumDetails forumId={forumId} />;
};

export default ForumPage;
