// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import { useSelector } from "react-redux";
import Link from "next/link";

const profiles = [
  {
    name: "Florencio Dorrance",
    title: "Project Manager",
    image: "/women_profile.svg",
  },
  {
    name: "Benny Spanbauer",
    title: "Sales Manager",
    image: "/man_profile.svg",
  },
  {
    name: "Jamel Eusebio",
    title: "React Dev",
    image: "/women_profile.svg",
  },
  {
    name: "Lavern Laboy",
    title: "Backend Dev",
    image: "/man_profile.svg",
  },
];

const events = [
  {
    id: 1,
    name: "Create An LMS Website With EduNet",
    date: "Oct 17, 2024",
  },
  {
    id: 2,
    name: "Build a Responsive Website",
    date: "Oct 24, 2024",
  },
  {
    id: 3,
    name: "Advanced React Techniques",
    date: "Nov 5, 2024",
  },
];

export default function FeaturedProfile() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <div className="w-3/12 bg-white p-5 shadow-md h-full">
        {/* Featured Profiles Section */}
        <div className="p-2">
          <h2 className="text-xl font-semibold border-b pb-2 text-center">
            Featured Profile
          </h2>
          <div className="mt-4">
            {profiles.map((profile) => (
              <Link href="/networking" key={profile.name}>
                <div className="flex items-center py-3 cursor-pointer hover:bg-gray-100 transition">
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-10 h-10 rounded-full object-cover mr-3 border-2"
                  />
                  <div>
                    <p className="text-sm">{profile.name}</p>
                    <p className="text-xs text-gray-500">{profile.title}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div className="p-2">
          <h2 className="text-xl font-semibold border-b pb-2 text-center">
            Events
          </h2>
          <div className="mt-4">
            {events.map((event) => (
              <Link href="/events" key={event.id}>
                <div className="flex items-center justify-between py-3 cursor-pointer hover:bg-gray-100 transition">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-full mr-3">
                      <img
                        src="/learn_wordpress.svg"
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
              </Link>
            ))}
          </div>
        </div>
      </div>
    );
  } else {
    return null; // Don't render if not logged in
  }
}
