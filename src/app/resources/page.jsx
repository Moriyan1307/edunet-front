// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import { useState } from "react";
import CareerDevelopment from "../../components/CareerDevelopment/CareerDevelopment";
import MentorshipProgram from "../../components/MentorshipProgram/MentorshipProgram";
import MentorshipForm from "../../components/MentorshipApplicationForm/MentorshipApplicationForm"; // Assuming you have a separate component for the form
import ResourcesTopNavigation from "../../components/ResourcesNavigation/ResourcesNavigation";


const Resources = () => {
  const [activeTab, setActiveTab] = useState("career"); // 'career' or 'mentorship'
  const [showMentorshipForm, setShowMentorshipForm] = useState(false);

   const handleEnrollClick = () => {
     setShowMentorshipForm(true);
   };

   const handleBackToMentorshipProgram = () => {
     setShowMentorshipForm(false);
   };

  return (
    <div className="h-full flex flex-col">
      <ResourcesTopNavigation activeTab={activeTab} onTabChange={(tab) => setActiveTab(tab)} />

      <div className="flex flex-grow mt-4">
        {activeTab === "career" ? (
          <CareerDevelopment />
        ) : showMentorshipForm ? (
          <MentorshipForm onBack={handleBackToMentorshipProgram} />
        ) : (
          <MentorshipProgram onEnroll={handleEnrollClick} />
        )}
      </div>
    </div>
  );
};

export default Resources;