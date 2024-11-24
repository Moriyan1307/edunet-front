// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import CareerDevelopment from "../../components/CareerDevelopment/CareerDevelopment";
import MentorshipProgram from "../../components/MentorshipProgram/MentorshipProgram";
import MentorshipForm from "../../components/MentorshipApplicationForm/MentorshipApplicationForm";
import EnrolledStudents from "../../components/EnrolledStudents/EnrolledStudents";
import ResourcesTopNavigation from "../../components/ResourcesNavigation/ResourcesNavigation";

const Resources = () => {
  const [activeTab, setActiveTab] = useState("career");
  const [showMentorshipForm, setShowMentorshipForm] = useState(false);
  const [selectedMentorId, setSelectedMentorId] = useState(null);

  const currentUser = useSelector((state) => state.auth.user); // Adjust based on your state structure

  const handleEnrollClick = (mentorId) => {
    setSelectedMentorId(mentorId);
    setShowMentorshipForm(true);
  };

  const handleBackToMentorshipProgram = () => {
    setShowMentorshipForm(false);
    setSelectedMentorId(null);
  };

  return (
    <div className="h-full flex flex-col">
      <ResourcesTopNavigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      <div className="flex flex-grow mt-4">
        {activeTab === "career" ? (
          <CareerDevelopment />
        ) : currentUser?.role_id === 2 ? (
          <EnrolledStudents mentorId={currentUser.user_id} />
        ) : showMentorshipForm ? (
          <MentorshipForm
            onBack={handleBackToMentorshipProgram}
            mentorId={selectedMentorId}
          />
        ) : (
          <MentorshipProgram onEnroll={handleEnrollClick} />
        )}
      </div>
    </div>
  );
};

export default Resources;
