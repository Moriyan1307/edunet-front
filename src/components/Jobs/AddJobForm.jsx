// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";

const AddJobForm = ({ onRegisterJob, onCancel }) => {
  const [newJob, setNewJob] = useState({
    company: "",
    title: "",
    location: "",
    type: "Full Time",
    salary: "",
    experience: "",
    jobLink: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!newJob.company.trim()) newErrors.company = "Company name is required";
    if (!newJob.title.trim()) newErrors.title = "Job title is required";
    if (!newJob.location.trim()) newErrors.location = "Location is required";
    if (!newJob.salary.trim()) newErrors.salary = "Salary is required";
    if (!/^\$\d{1,3}(,\d{3})*(\.\d{2})?$/.test(newJob.salary)) {
      newErrors.salary = "Enter a valid salary (e.g., $50,000)";
    }
    if (!newJob.experience.trim()) {
      newErrors.experience = "Experience is required";
    } else if (isNaN(newJob.experience)) {
      newErrors.experience = "Experience should be a number";
    }
    if (!newJob.jobLink.trim()) {
      newErrors.jobLink = "Job application link is required";
    } else if (
      !/^https?:\/\/(www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+\/?.*$/.test(
        newJob.jobLink
      )
    ) {
      newErrors.jobLink = "Enter a valid URL (e.g., https://example.com)";
    }
    if (!newJob.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (newJob.description.length < 20) {
      newErrors.description = "Description must be at least 20 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = () => {
    if (validateForm()) {
      onRegisterJob(newJob);
      setNewJob({
        company: "",
        title: "",
        location: "",
        type: "Full Time",
        salary: "",
        experience: "",
        jobLink: "",
        description: "",
      });
      setErrors({});
    }
  };

  return (
    <div className="space-y-4 mb-8">
      <h2 className="text-xl font-bold">Post A Job</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.company ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Company Name"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
          />
          {errors.company && (
            <p className="text-red-500 text-sm mt-1">{errors.company}</p>
          )}
        </div>
        <div>
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.title ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Job Title"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <select
            className="w-full px-3 py-2 border rounded-md"
            value={newJob.type}
            onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
          >
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
          </select>
        </div>
        <div>
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.location ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Job Location"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
          />
          {errors.location && (
            <p className="text-red-500 text-sm mt-1">{errors.location}</p>
          )}
        </div>
        <div>
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.salary ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Salary Range"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm mt-1">{errors.salary}</p>
          )}
        </div>
        <div>
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.experience ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Experience (in years)"
            value={newJob.experience}
            onChange={(e) =>
              setNewJob({ ...newJob, experience: e.target.value })
            }
          />
          {errors.experience && (
            <p className="text-red-500 text-sm mt-1">{errors.experience}</p>
          )}
        </div>
        <div className="col-span-2">
          <input
            className={`w-full px-3 py-2 border rounded-md ${
              errors.jobLink ? "border-red-500" : ""
            }`}
            type="text"
            placeholder="Job Application Link"
            value={newJob.jobLink}
            onChange={(e) => setNewJob({ ...newJob, jobLink: e.target.value })}
          />
          {errors.jobLink && (
            <p className="text-red-500 text-sm mt-1">{errors.jobLink}</p>
          )}
        </div>
        <div className="col-span-2">
          <textarea
            className={`w-full px-3 py-2 border rounded-md ${
              errors.description ? "border-red-500" : ""
            }`}
            rows="4"
            placeholder="Description"
            value={newJob.description}
            onChange={(e) =>
              setNewJob({ ...newJob, description: e.target.value })
            }
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">{errors.description}</p>
          )}
        </div>
      </div>
      <div className="flex space-x-4">
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={handleRegister}
        >
          Register
        </button>
        <button
          className="bg-black text-white px-4 py-2 rounded-md"
          onClick={onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AddJobForm;
