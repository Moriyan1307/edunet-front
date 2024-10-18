// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="h-full  flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Welcome to EduNet
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        A networking platform designed for university students to connect,
        collaborate, and succeed.
      </p>

      <div className="mt-12">
        <h2 className="text-2xl font-semibold text-gray-800">Why EduNet?</h2>
        <ul className="mt-4 text-left text-gray-700 space-y-3">
          <li>📚 Connect with peers, professors, and alumni</li>
          <li>💬 Collaborate on projects and share resources</li>
          <li>🔗 Build a strong academic and professional network</li>
          <li>🎓 Stay updated with campus events and opportunities</li>
        </ul>
      </div>

      <footer className="mt-12 text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} EduNet. All rights reserved.</p>
      </footer>
    </div>
  );
}
