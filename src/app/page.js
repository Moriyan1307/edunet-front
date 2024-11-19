"use client";

import LandingPage from "../components/Landing Page/LandingPage";
import Posts from "../components/Posts/Posts";
import { useSelector } from "react-redux";

export default function Home() {
  const { isAuthenticated, userRole, user } = useSelector(
    (state) => state.auth
  );

  if (isAuthenticated) {
    return (
      <div className="p-2 overflow-y-auto scrollbar-none ">
        <p className="text-lg font-semibold mb-4 text-2xl">
          Welcome, <span className="text-black font-bold">{user.f_name}</span>!
        </p>
        <Posts />
      </div>
    );
  } else {
    return <LandingPage />;
  }
}
