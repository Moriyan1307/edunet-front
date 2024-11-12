import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation"; // Import the Next.js router
import axiosInstance from "../../utils/axiosInstance";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const dropdownRef = useRef(null);

  const currentUserId = useSelector((state) => state.auth.user.user_id);
  const router = useRouter(); // Use router for navigation

  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]);
      setNoResults(false);
      return;
    }

    try {
      const response = await axiosInstance.get("/search", {
        params: { searchTerm },
      });

      if (response.data.length > 0) {
        setSearchResults(response.data);
        setNoResults(false);
      } else {
        setSearchResults([]);
        setNoResults(true);
      }
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  // Start a conversation with a user
  const startConversation = async (userId) => {
    try {
      const response = await axiosInstance.post(
        "/conversations/start-one-on-one",
        {
          user_id: userId,
          current_user_id: currentUserId,
        }
      );
      // Clear search term, search results, and close dropdown
      setSearchTerm("");
      setSearchResults([]);
      setIsDropdownOpen(false);

      // Redirect to networking page after starting conversation
      router.push("/networking");
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  return (
    <div className="relative w-3/6" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (e.target.value.trim() === "") {
            // Clear results if input is empty
            setSearchResults([]);
            setNoResults(false);
          } else {
            handleSearch();
          }
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Search..."
        className="w-full px-3 py-2 border border-gray-300 rounded-md"
      />

      {isDropdownOpen && searchResults.length > 0 && (
        <div className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md mt-1 max-h-64 overflow-y-auto shadow-lg z-10">
          {noResults ? (
            <p className="text-gray-500 text-center p-2">No users found.</p>
          ) : (
            <ul>
              {searchResults.map((user) => (
                <li
                  key={user.user_id}
                  className="flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onMouseDown={() => startConversation(user.user_id)}
                >
                  <img
                    src={user.image_url}
                    alt={`${user.f_name} ${user.l_name}`}
                    className="w-8 h-8 rounded-full mr-3"
                  />
                  <div className="flex-1">
                    <p className="font-semibold">
                      {user.f_name} {user.l_name}
                    </p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault(); // Prevent dropdown close on click
                      startConversation(user.user_id);
                    }}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md"
                  >
                    Chat
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
