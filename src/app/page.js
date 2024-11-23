// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

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
