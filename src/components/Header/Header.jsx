import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import UserSearch from "../Search/UserSearch";
import axiosInstance from "../../utils/axiosInstance";
import { setSignOut } from "../../app/redux/slices/authSlice";

export default function Header() {
  const [user, setUser] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const router = useRouter();
  const state = useSelector((state) => state.auth);
  const isLoggedIn = state.isAuthenticated;
  const currentUser = state.user;
  const userId = currentUser ? currentUser.user_id : null;

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser) {
      setUser(currentUser);
    } else {
      setUser(null);
    }
  }, [currentUser]);

  // Function to fetch notifications and update unread count
  const fetchNotifications = async () => {
    try {
      const response = await axiosInstance.get(`/notifications`);
      const filteredNotifications = response.data.filter(
        (notification) => notification.user_id === userId && notification.is_read === 0
      );
      setNotifications(filteredNotifications);
      setUnreadCount(filteredNotifications.length);
    } catch (error) {
      console.error("Error fetching notifications", error);
    }
  };

  // Periodically fetch notifications every 5 seconds
  useEffect(() => {
    if (userId) {
      fetchNotifications(); // Fetch notifications immediately on load
      const interval = setInterval(fetchNotifications, 5000); // Fetch every 5 seconds

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [userId]);

  // Mark a specific notification as read and redirect
  const handleNotificationClick = async (notification) => {
    try {
      if (userId) {
        // Mark the clicked notification as read in the backend
        await axiosInstance.put(`/mark-as-read`, {
          user_id: userId,
        });

        // Update local state to reflect the change
        setNotifications((prevNotifications) =>
          prevNotifications.filter(
            (notif) => notif.notification_id !== notification.notification_id
          )
        );
        setUnreadCount((prevCount) => prevCount - 1);
      }
    } catch (error) {
      console.error("Error marking notification as read", error);
    }

    // Close the notification popup
    setShowNotifications(false);

    // Redirect to Networking tab
    router.push("/networking");
  };

  const handleLogout = () => {
    router.push("/");
    dispatch(setSignOut());
  };

  return (
    <header className="text-black h-20 flex items-center px-6">
      <div className="flex items-center space-x-4 w-full">
        <div className="flex-1">{isLoggedIn ? <UserSearch /> : null}</div>
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            <div className="relative">
              <NotificationsIcon
                sx={{ fontSize: 28 }}
                onClick={() => setShowNotifications(!showNotifications)}
              />
              {unreadCount > 0 && (
                <span className="absolute top-0 right-0 text-xs bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </div>
            <PersonIcon sx={{ fontSize: 28 }} />
            <span>
              {user ? user.f_name : "Guest"} {user ? user.l_name : ""}
            </span>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Link href="/signup">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Signup
              </button>
            </Link>
            <Link href="/login">
              <button className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900">
                Login
              </button>
            </Link>
          </div>
        )}
      </div>

      {showNotifications && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification) => (
                  <li
                    key={notification.notification_id}
                    className="mb-2 cursor-pointer hover:bg-gray-100 p-2 rounded"
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="text-base">{notification.content}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(notification.created_at).toLocaleString()}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No new notifications</p>
            )}
            <button
              onClick={() => setShowNotifications(false)}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
