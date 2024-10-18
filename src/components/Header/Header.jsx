// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import PersonIcon from "@mui/icons-material/Person";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setSignOut } from "../../app/redux/slices/authSlice";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState("");
  const [notifications, setNotifications] = useState([]); // State for notifications
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [timeoutId, setTimeoutId] = useState(null); // Store the timeout ID for clearing

  const router = useRouter();

  const state = useSelector((state) => state.auth);
  const isLoggedIn = state.isAuthenticated;

  useEffect(() => {
    if (state.userRole) {
      setUser(state.userRole);
    }
  }, [state.userRole]);

  const dispatch = useDispatch();

  const handleLogout = () => {
    router.push("/");
    dispatch(setSignOut());
  };

  const handleNotificationClick = () => {
    setShowPopup(!showPopup); // Toggle popup visibility
    if (!showPopup && timeoutId) {
      clearTimeout(timeoutId); // Clear any existing timeout
    }

    // Automatically hide popup after 3 seconds
    const id = setTimeout(() => {
      setShowPopup(false);
    }, 3000);
    setTimeoutId(id);
  };

  const handleNotificationSelect = () => {
    router.push("/networking"); // Navigate to messages tab
    setShowPopup(false); // Close popup on selection
  };

  // Example notifications (this could be fetched from an API)
  useEffect(() => {
    // Simulating fetching notifications
    const mockNotifications = [
      { id: 1, message: "You have a new message from John" },
    ];
    setNotifications(mockNotifications);
  }, []);

  return (
    <header className="text-black h-20 flex items-center px-6">
      <div className="flex items-center space-x-4 w-3/5 ml-auto justify-evenly">
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 text-black px-4 py-2 rounded-md focus:outline-none"
        />

        {isLoggedIn ? (
          <div className="flex justify-around items-center space-x-4 ml-auto">
            <div className="relative">
              <NotificationsIcon
                sx={{ fontSize: 28 }}
                onClick={handleNotificationClick} // Handle click for notifications
              />
              {showPopup && (
                <div className="absolute right-0 top-10 w-64 bg-white shadow-lg rounded-md p-4">
                  <h4 className="font-bold mb-2">Notifications</h4>
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-2 hover:bg-gray-100 cursor-pointer"
                        onClick={handleNotificationSelect} // Go to messages on click
                      >
                        {notification.message}
                      </div>
                    ))
                  ) : (
                    <div>No new notifications</div>
                  )}
                </div>
              )}
            </div>
            <PersonIcon sx={{ fontSize: 28 }} />
            <span className="m-auto">{user}</span>
            <button
              className="bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-900"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
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
          </>
        )}
      </div>
    </header>
  );
}
