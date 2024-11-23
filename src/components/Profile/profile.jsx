import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance"; // Axios utility for API calls

const ProfileField = ({ label, value }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-1">{label}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

const Profile = () => {
  const currentUserId = useSelector((state) => state.auth.user?.user_id);
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!currentUserId) return;

      try {
        const response = await axiosInstance.get(`/users/${currentUserId}`);
        setProfileData(response.data);
      } catch (err) {
        console.error("Error fetching profile data:", err);
        setError("Failed to load profile data.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [currentUserId]);

  if (loading) {
    return <p>Loading profile...</p>;
  }

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <ProfileField label="First Name" value={profileData?.f_name || "N/A"} />
        <ProfileField label="Last Name" value={profileData?.l_name || "N/A"} />
        <ProfileField label="Email" value={profileData?.email || "N/A"} />
        <ProfileField
          label="Role"
          value={
            profileData?.role_id === 1
              ? "Student"
              : profileData?.role_id === 2
              ? "Mentor"
              : "Alumni"
          }
        />
        <ProfileField
          label="Phone Number"
          value={profileData?.phone_number || "N/A"}
        />
        <ProfileField label="Major" value={profileData?.major || "N/A"} />
        <ProfileField label="Interests" value={profileData?.interests || "N/A"} />
        <ProfileField
          label="Graduation Year"
          value={profileData?.graduation_year || "N/A"}
        />
        <ProfileField
          label="University"
          value={profileData?.university || "N/A"}
        />
      </div>

      <div className="mt-8">
        <Link
          className="bg-gray-200 text-gray-800 px-6 py-2 rounded-md text-lg"
          href="/settings"
        >
          Settings
        </Link>
      </div>
    </div>
  );
};

export default Profile;
