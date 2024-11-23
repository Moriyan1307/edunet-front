// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance"; // Adjust the path as needed
import { useRouter } from "next/navigation";

export default function FeaturedProfile() {
  const [featuredProfiles, setFeaturedProfiles] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [userInterests, setUserInterests] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  const currentUserId = useSelector((state) => state.auth.user?.user_id);
  const router = useRouter();

  // Fetch the user data to update interests
  useEffect(() => {
    const fetchUserData = async () => {
      if (!currentUserId) return;

      try {
        const response = await axiosInstance.get(`/users/${currentUserId}`);
        setUserInterests(response.data?.interests || []);
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };

    fetchUserData();
  }, [currentUserId]);

  // Fetch featured profiles based on updated interests
  useEffect(() => {
    const fetchFeaturedProfiles = async () => {
      if (userInterests.length > 0) {
        try {
          const response = await axiosInstance.get("/users/api/featured", {
            params: { interests: userInterests },
          });

          const profiles = response.data.filter(
            (profile) => profile.user_id !== currentUserId
          );
          setFeaturedProfiles(profiles);
        } catch (error) {
          console.error("Error fetching featured profiles:", error);
        }
      }
    };

    fetchFeaturedProfiles();
  }, [userInterests, currentUserId]);

  // Fetch upcoming events
  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      if (currentUserId) {
        try {
          const response = await axiosInstance.get("/events", {
            params: { user_id: currentUserId },
          });

          // Filter out past events based on the current date
          const now = new Date();
          const upcoming = response.data.filter(
            (event) => new Date(event.start_time) > now
          );
          setUpcomingEvents(upcoming);
        } catch (error) {
          console.error("Error fetching upcoming events:", error);
        }
      }
    };

    if (isLoggedIn) {
      fetchUpcomingEvents();
    }
  }, [isLoggedIn, currentUserId]);

  if (!isLoggedIn) return null;

  return (
    <div className="w-3/12 bg-white p-5 shadow-md h-full">
      {/* Featured Profiles Section */}
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

      {/* Upcoming Events Section */}
      <div className="p-2">
        <h2 className="text-xl font-semibold border-b pb-2 text-center">
          Upcoming Events
        </h2>
        <div className="mt-4">
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((event) => (
              <div
                key={event.event_id}
                onClick={() => router.push(`/events`)}
                className="flex items-center justify-between py-3"
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full mr-3">
                    <img
                      src={event.image_url}
                      alt="Event Icon"
                      className="w-6 h-6"
                    />
                  </div>
                  <div>
                    <p className="text-sm">{event.title}</p>
                    <p className="text-xs text-gray-500">
                      {new Date(event.start_time).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center">
              No upcoming events available
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
