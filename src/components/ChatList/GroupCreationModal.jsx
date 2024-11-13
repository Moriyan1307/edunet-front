import React, { useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const GroupCreationModal = ({ currentUserId, onClose, onGroupCreated }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get("/search", {
        params: { searchTerm },
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };

  const handleAddMember = (user) => {
    setSelectedMembers((prev) => [...prev, user]);
  };

  const handleRemoveMember = (userId) => {
    setSelectedMembers((prev) =>
      prev.filter((member) => member.user_id !== userId)
    );
  };

  const handleCreateGroup = async () => {
    try {
      const memberIds = selectedMembers.map((member) => member.user_id);
      await axiosInstance.post("/conversations/group", {
        userId: currentUserId,
        groupName,
        memberIds,
      });
      onGroupCreated(); // Refresh conversations in ChatList
      onClose();
    } catch (error) {
      console.error("Error creating group conversation:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-md w-96">
        <h2 className="text-xl font-semibold mb-4">
          Create Group Conversation
        </h2>
        <input
          type="text"
          placeholder="Group Name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <input
          type="text"
          placeholder="Search Users"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full mb-2 p-2 border rounded-md"
        />
        <button
          onClick={handleSearch}
          className="mb-4 w-full bg-gray-300 py-2 rounded-md"
        >
          Search
        </button>
        <div>
          {searchResults.map((user) => (
            <div
              key={user.user_id}
              className="flex justify-between items-center"
            >
              <span>
                {user.f_name} {user.l_name}
              </span>
              <button
                onClick={() => handleAddMember(user)}
                className="text-blue-500"
              >
                Add
              </button>
            </div>
          ))}
        </div>
        <div className="mt-4">
          <h3 className="font-semibold mb-2">Selected Members:</h3>
          {selectedMembers.map((member) => (
            <div
              key={member.user_id}
              className="flex justify-between items-center"
            >
              <span>
                {member.f_name} {member.l_name}
              </span>
              <button
                onClick={() => handleRemoveMember(member.user_id)}
                className="text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={handleCreateGroup}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-md"
        >
          Create Group
        </button>
        <button
          onClick={onClose}
          className="w-full bg-gray-500 text-white py-2 mt-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default GroupCreationModal;
