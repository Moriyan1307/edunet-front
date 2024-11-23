// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

// Internships component
import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";
import JobCard from "./JobCard";
import Navigation from "./JobsNavigation";

const Internships = () => {
  const [activeTab, setActiveTab] = useState("internships");
  const [internshipListings, setInternshipListings] = useState([]);

  useEffect(() => {
    // Fetch internship listings dynamically
    const fetchInternships = async () => {
      try {
        const response = await axiosInstance.get("/opportunities"); // Adjust endpoint as needed
        // Filter jobs to include only those where is_internship is 1
        const filteredInternships = response.data.filter(
          (job) => job.is_internship === 1
        );
        setInternshipListings(filteredInternships);
      } catch (error) {
        console.error("Error fetching internship listings:", error);
      }
    };

    fetchInternships();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      <div className="space-y-4 mt-8">
        {internshipListings.map((internship) => (
          <JobCard
            key={internship.job_id}
            company={internship.company_name}
            title={internship.title}
            location={internship.job_location}
            type={internship.job_type}
            salary={internship.salary_range}
            description={internship.description}
            url={internship.url}
          />
        ))}
      </div>
    </div>
  );
};

export default Internships;