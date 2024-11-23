// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421


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
