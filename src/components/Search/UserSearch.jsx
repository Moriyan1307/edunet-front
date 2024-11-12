import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../utils/axiosInstance";

const UserSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const dropdownRef = useRef(null);

  // Function to handle searching users
  const handleSearch = async () => {
    if (searchTerm.trim() === "") {
      setSearchResults([]); // Clear previous results
      setNoResults(false); // Reset no results message
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

  // Handle opening and closing dropdown
  const handleFocus = () => {
    setIsDropdownOpen(true);
  };

  const handleBlur = (e) => {
    if (!dropdownRef.current.contains(e.relatedTarget)) {
      setIsDropdownOpen(false);
    }
  };

  // Handle input change
  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim() === "") {
      setSearchResults([]);
      setNoResults(false);
    } else {
      handleSearch();
    }
  };

  // Handle starting a conversation
  const startConversation = async (userId) => {
    try {
      await axiosInstance.post("/conversations/start-one-on-one", {
        user_id: userId,
      });
      alert(`Conversation started with user ID: ${userId}`);
    } catch (error) {
      console.error("Error starting conversation:", error);
    }
  };

  return (
    <div className="relative w-3/6" ref={dropdownRef}>
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
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
                    onClick={() => startConversation(user.user_id)}
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
