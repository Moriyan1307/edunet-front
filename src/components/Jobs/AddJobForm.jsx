// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState } from "react";

const AddJobForm = ({ onRegisterJob, onCancel }) => {
  const [title, setTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [salaryRange, setSalaryRange] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [jobType, setJobType] = useState("");
  const [experience, setExperience] = useState("");
  const [isInternship, setIsInternship] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!title) newErrors.title = "Job title is required.";
    if (!companyName) newErrors.companyName = "Company name is required.";
    if (!location) newErrors.location = "Location is required.";
    if (!salaryRange) newErrors.salaryRange = "Salary range is required.";
    if (!description) newErrors.description = "Job description is required.";
    if (!url) newErrors.url = "URL is required.";
    if (!jobType) newErrors.jobType = "Job type is required.";
    if (!experience) {
      newErrors.experience = "Experience level is required.";
    } else if (isNaN(experience)) {
      newErrors.experience = "Experience level must be a digit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      const newJob = {
        title,
        company_name: companyName,
        job_location: location,
        salary_range: salaryRange,
        description,
        url,
        job_type: jobType,
        experience,
        is_internship: isInternship ? 1 : 0,
      };

      onRegisterJob(newJob);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block">Job Title</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="border p-2 w-full" />
        {errors.title && <p className="text-red-500 text-sm">{errors.title}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Company Name</label>
          <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="border p-2 w-full" />
          {errors.companyName && <p className="text-red-500 text-sm">{errors.companyName}</p>}
        </div>
        <div>
          <label className="block">Location</label>
          <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} className="border p-2 w-full" />
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>
      </div>

      <div>
        <label className="block">Salary Range (e.g., $50,000 - $70,000)</label>
        <input type="text" value={salaryRange} onChange={(e) => setSalaryRange(e.target.value)} className="border p-2 w-full" />
        {errors.salaryRange && <p className="text-red-500 text-sm">{errors.salaryRange}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block">Job Type</label>
          <input type="text" value={jobType} onChange={(e) => setJobType(e.target.value)} className="border p-2 w-full" />
          {errors.jobType && <p className="text-red-500 text-sm">{errors.jobType}</p>}
        </div>
        <div>
          <label className="block">Experience Level</label>
          <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} className="border p-2 w-full" />
          {errors.experience && <p className="text-red-500 text-sm">{errors.experience}</p>}
        </div>
      </div>

      <div>
        <label className="block">Job Description</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="border p-2 w-full" />
        {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
      </div>

      <div>
        <label className="block">Job URL</label>
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} className="border p-2 w-full" />
        {errors.url && <p className="text-red-500 text-sm">{errors.url}</p>}
      </div>

      <div className="flex items-center">
        <input type="checkbox" checked={isInternship} onChange={() => setIsInternship(!isInternship)} className="mr-2" />
        <label>Is this an internship?</label>
      </div>

      <div className="flex justify-end mt-4">
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 mr-4">Cancel</button>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2">Submit Job</button>
      </div>
    </form>
  );
};

export default AddJobForm;