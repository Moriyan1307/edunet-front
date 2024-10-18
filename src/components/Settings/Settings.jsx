// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const InputField = ({ label, name, type = "text", value, handleChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-base font-normal mb-1">
      {label}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

const SelectField = ({ label, name, options, value, handleChange, error }) => (
  <div>
    <label htmlFor={name} className="block text-base font-normal mb-1">
      {label}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={handleChange}
      className={`w-full px-3 py-2 border ${error ? "border-red-500" : "border-gray-300"} rounded-md`}
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// Main SettingsForm Component
const SettingsForm = () => {

  const { userRole, isAuthenticated } = useSelector((state) => state.auth);
  const role = userRole ? userRole.charAt(0).toUpperCase() + userRole.slice(1) : "";

  const initialFormData = {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phoneNumber: "123 456 7890",
    role: role,
    interests: "Front - end Dev",
    major: "",
    graduationYear: "",
    universityName: "",
  };


  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [savedMessage, setSavedMessage] = useState("");

  // Use useEffect to access localStorage only in the browser
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("formData");
      if (savedData) {
        setFormData(JSON.parse(savedData));
      }
    }
  }, []);


  const validateField = (name, value) => {
    switch (name) {
      case "firstName":
      case "lastName":
        return value.trim() ? "" : "This field is required";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case "phoneNumber":
        return /^\d{3} \d{3} \d{4}$/.test(value) ? "" : "Invalid phone number format (e.g., 123 456 7890)";
      case "graduationYear":
        return /^\d{4}$/.test(value) && parseInt(value) > 2000 && parseInt(value) < 2100 ? "" : "Invalid year";
      case "universityName":
        return value.trim() ? "" : "This field is required";
      case "major":
        return value.trim() ? "" : "This field is required";
      default:
        return "";
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      if (typeof window !== "undefined") {
        localStorage.setItem("formData", JSON.stringify(formData));
      }
      setSavedMessage("Settings saved successfully!");

      // Clear the saved message after a delay
      setTimeout(() => {
        setSavedMessage("");
      }, 3000);
    }
  };

  useEffect(() => {
    if (formData.role === "Student" || formData.role === "Alumni") {
      setFormData((prevData) => ({
        ...prevData,
        major: "Computer Science",
        graduationYear: "2025",
        universityName: "UTA",
      }));
    }
  }, [formData.role]);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-normal mb-6">Settings</h1>
      {savedMessage && <div className="bg-green-100 text-green-700 p-4 rounded-md mb-4">{savedMessage}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField label="First Name" name="firstName" value={formData.firstName} handleChange={handleChange} error={errors.firstName} />
          <InputField label="Last Name" name="lastName" value={formData.lastName} handleChange={handleChange} error={errors.lastName} />
        </div>
        <InputField label="Email" name="email" type="email" value={formData.email} handleChange={handleChange} error={errors.email} />
        <div className="grid grid-cols-2 gap-4">
          <InputField label="Phone Number" name="phoneNumber" type="tel" value={formData.phoneNumber} handleChange={handleChange} error={errors.phoneNumber} />
          <SelectField
            label="Role"
            name="role"
            value={formData.role}
            options={["Student", "Alumni", "Mentor"]}
            handleChange={handleChange}
            error={errors.role}
          />
        </div>
        {(formData.role === "Student" || formData.role === "Alumni") && (
          <>
            <InputField label="University Name" name="universityName" value={formData.universityName} handleChange={handleChange} error={errors.universityName} />
            <InputField label="Major" name="major" value={formData.major} handleChange={handleChange} error={errors.major} />
            <InputField label="Graduation Year" name="graduationYear" value={formData.graduationYear} handleChange={handleChange} error={errors.graduationYear} />
          </>
        )}
        <SelectField label="Interests" name="interests" value={formData.interests} options={["Front - end Dev", "Back - end Dev", "Full - stack Dev"]} handleChange={handleChange} error={errors.interests} />
        <div className="flex justify-end mt-6">
          <button type="submit" className="px-4 py-2 bg-black text-white rounded-md">Save</button>
        </div>
      </form>
    </div>
  );
};

export default SettingsForm;
