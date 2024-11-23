import Link from "next/link";
import React from "react";
import { useSelector } from "react-redux";

const ProfileField = ({ label, value }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-1">{label}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

const Profile = () => {
  // Retrieve the logged-in user data from Redux
  const userInfo = useSelector((state) => state.auth.user);

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <ProfileField label="First Name" value={userInfo?.f_name || "N/A"} />
        <ProfileField label="Last Name" value={userInfo?.l_name || "N/A"} />
        <ProfileField label="Email" value={userInfo?.email || "N/A"} />
        <ProfileField
          label="Role"
          value={
            userInfo?.role_id === 1
              ? "student"
              : userInfo?.role_id === 2
              ? "mentor"
              : "alumni"
          }
        />
        <ProfileField
          label="Phone Number"
          value={userInfo?.phone_number || "N/A"}
        />
        <ProfileField label="Major" value={userInfo?.major || "N/A"} />
        <ProfileField label="Interests" value={userInfo?.interests || "N/A"} />
        <ProfileField
          label="Graduation Year"
          value={userInfo?.graduation_year || "N/A"}
        />
        <ProfileField
          label="University"
          value={userInfo?.university || "N/A"}
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
