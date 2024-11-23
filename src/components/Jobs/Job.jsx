// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

// Jobs component
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import JobCard from "./JobCard";
import Navigation from "./JobsNavigation";
import AddJobForm from "./AddJobForm";
import { useSelector } from "react-redux";

const Jobs = () => {
  const [activeTab, setActiveTab] = useState("fullTime");
  const [jobListings, setJobListings] = useState([]);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const user = useSelector((state) => state.auth.user);
  const userId = user.user_id;

  useEffect(() => {
    // Fetch job listings based on the active tab
    const fetchJobs = async () => {
      try {
        const response = await axiosInstance.get("/opportunities"); // Adjust endpoint as needed
        let filteredJobs = [];

        if (activeTab === "fullTime") {
          filteredJobs = response.data.filter((job) => job.is_internship === 0);
        } else if (activeTab === "internships") {
          filteredJobs = response.data.filter((job) => job.is_internship === 1);
        }

        setJobListings(filteredJobs);
      } catch (error) {
        console.error("Error fetching job listings:", error);
      }
    };

    fetchJobs();
  }, [activeTab,jobListings]); // Re-run when activeTab changes

  const handleAddJob = async (newJob) => {
    try {
      const jobWithUserId = {
        ...newJob,
        posted_by: userId, // Add user ID to the job data
      };
      await axiosInstance.post("/opportunities/post-job", jobWithUserId);
      setIsAddingJob(false);
      setActiveTab("fullTime"); // Refresh job listings after adding a job
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md"
          onClick={() => setIsAddingJob(true)}
        >
          Add Job
        </button>
      </div>

      {isAddingJob ? (
        <AddJobForm
          onRegisterJob={handleAddJob}
          onCancel={() => setIsAddingJob(false)}
        />
      ) : (
        <div className="space-y-4 mt-8">
          {jobListings.map((job) => (
            <JobCard
              key={job.job_id}
              company={job.company_name}
              title={job.title}
              location={job.job_location}
              type={job.job_type}
              salary={job.salary_range}
              description={job.description}
              url={job.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;