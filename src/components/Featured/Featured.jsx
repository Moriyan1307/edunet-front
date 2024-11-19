import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance"; // Adjust the path as needed
import { useRouter } from "next/navigation";

const events = [
  {
    id: 1,
    name: "Create An LMS Website With EduNet",
    date: "Sept 25, 2024",
  },
  {
    id: 2,
    name: "JavaScript Frameworks Webinar",
    date: "Oct 10, 2024",
  },
  {
    id: 3,
    name: "React Native Conference",
    date: "Nov 15, 2024",
  },
];

export default function FeaturedProfile() {
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const router = useRouter();

  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      if (user?.interests) {
        try {
          const response = await axiosInstance.get("/users/api/featured", {
            params: { interests: user.interests },
          });

          const profiles = response.data.filter(
            (profile) => profile.user_id !== user.user_id
          );
          setFeaturedProfiles(profiles);
        } catch (error) {
          console.error("Error fetching featured profiles:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchFeaturedProfiles();
    }
  }, [isLoggedIn, user?.interests, user?.user_id]);

  if (!isLoggedIn) return null;

  return (
    <div className="w-3/12 bg-white p-5 shadow-md h-full">
      <div className="p-2">
        <h2 className="text-xl font-semibold border-b pb-2 text-center">
          Featured Profiles
        </h2>
        <div className="mt-4">
          {featuredProfiles.length > 0 ? (
            featuredProfiles.map((profile) => (
              <div
                key={profile.user_id}
                onClick={() => router.push(`/networking`)}
                className="flex items-center py-3"
              >
                <img
                  src={profile.image_url || "/default_avatar.jpg"}
                  alt={profile.f_name}
                  className="w-10 h-10 rounded-full object-cover mr-3 border-2"
                />
                <div>
                  <p className="text-sm">
                    {profile.f_name} {profile.l_name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {profile.major || profile.title}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No featured profiles available
            </p>
          )}
        </div>
      </div>

      <div className="p-2">
        <h2 className="text-xl font-semibold border-b pb-2 text-center">
          Events
        </h2>
        <div className="mt-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between py-3"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full mr-3">
                  <img
                    src="/calendar-icon.svg"
                    alt="Event Icon"
                    className="w-6 h-6"
                  />
                </div>
                <div>
                  <p className="text-sm">{event.name}</p>
                  <p className="text-xs text-gray-500">{event.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
