// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";
import JobCard from "./JobCard";
import Navigation from "./JobsNavigation";
import AddJobForm from "./AddJobForm";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("fullTime");

  const [jobListings, setJobListings] = useState([
    {
      company: "Google Inc.",
      title: "Fresher UI/UX Designer (3 Year Exp )",
      location: "Dallas, Texas",
      type: "Full Time",
      salary: "$120,000 - $125,000",
      description: "Join Google as a UI/UX Designer to create seamless user experiences across a range of platforms."
    },
    {
      company: "Facebook Inc.",
      title: "Fresher UI/UX Designer (3 Year Exp )",
      location: "Dallas, Texas",
      type: "Full Time",
      salary: "$120,000 - $125,000",
      description: "This role is ideal for creative problem solvers looking to make an impact."
    }
  ]);

  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleAddJob = () => {
    setIsFormVisible(true);
  };

  const handleCancelForm = () => {
    setIsFormVisible(false);
  };

  const handleRegisterJob = (newJob) => {
    setJobListings((prevJobs) => [...prevJobs, newJob]);
    setIsFormVisible(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md"
          onClick={handleAddJob}
        >
          Add Job
        </button>
      </div>

      {/* Show form if Add Job button is clicked */}
      {isFormVisible ? (
        <AddJobForm
          onRegisterJob={handleRegisterJob}
          onCancel={handleCancelForm}
        />
      ) : (
        /* Job Listings */
        <div className="space-y-4 mt-8">
          {jobListings.map((job, index) => (
            <JobCard key={index} {...job} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
