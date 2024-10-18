// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import Link from "next/link";
import { useSelector } from "react-redux";

const ProfileField = ({ label, value }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-1">{label}</h3>
    <p className="text-xl">{value}</p>
  </div>
);

const Profile = () => {
  // Get user role and authentication status from Redux
  const { userRole, isAuthenticated } = useSelector((state) => state.auth);

  // If not authenticated, show a message
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        <h1 className="text-3xl font-bold mb-8">Profile</h1>
        <p>You are not logged in or your profile information is unavailable.</p>
        <Link href="/login" className="text-blue-600 underline">
          Login
        </Link>
      </div>
    );
  }

  // Extract user information based on the role
  const firstName = "Usha";
  const lastName = "Sai";
  const email = "usha.sai@email.com";
  const phoneNumber = "123 456 7890";
  const interests = "Front-end Development";
  let universityName, major, graduationYear;

  if (userRole === "student" || userRole === "alumni") {
    universityName = "UTA";
    major = "Computer Science";
    graduationYear = "2025";
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
        <ProfileField label="First Name" value={firstName} />
        <ProfileField label="Last Name" value={lastName} />
        <ProfileField label="Email" value={email} />
        <ProfileField label="Phone Number" value={phoneNumber} />
        <ProfileField label="Role" value={userRole.charAt(0).toUpperCase() + userRole.slice(1)} /> {/* Capitalize the first letter of userRole */}
        <ProfileField label="Interests" value={interests || "N/A"} />

        {/* Conditionally render additional fields for Student or Alumni */}
        {userRole === "student" || userRole === "alumni" ? (
          <>
            <ProfileField label="University Name" value={universityName || "N/A"} />
            <ProfileField label="Major" value={major || "N/A"} />
            <ProfileField label="Graduation Year" value={graduationYear || "N/A"} />
          </>
        ) : null}
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