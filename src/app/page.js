// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import LandingPage from "../components/Landing Page/LandingPage";
import Posts from "../components/Posts/Posts";
import Image from "next/image";
import { useSelector } from "react-redux";

export default function Home() {
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);

  if (isLoggedIn) {
    return (
      <div className="p-2 overflow-y-auto scrollbar-none h-full ">
        <Posts />
      </div>
    );
  } else {
    return <LandingPage />;
  }
}
