import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axiosInstance";

const NotificationSettings = () => {
  const user = useSelector((state) => state.auth.user);
  const [emailPreference, setEmailPreference] = useState(true);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await axiosInstance.get(
          `/users/preferences?user_id=${user.user_id}`
        );
        setEmailPreference(response.data.receive_email_notifications);
      } catch (error) {
        console.error("Error fetching preferences:", error);
      }
    };

    fetchPreference();
  }, []);

  const handleToggle = async () => {
    try {
      const updatedPreference = !emailPreference;
      setEmailPreference(updatedPreference);

      await axiosInstance.put("/users/users/preferences", {
        user_id: user.user_id,
        receive_email_notifications: updatedPreference,
      });

      console.log("Preference updated");
    } catch (error) {
      console.error("Error updating preference:", error);
    }
  };

  return (
    <div className="settings-container">
      <h2>Notification Settings</h2>
      <div className="preference">
        <span>Receive Email Notifications</span>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={emailPreference}
            onChange={handleToggle}
          />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

// InputField Component
const InputField = ({
  label,
  name,
  type = "text",
  value,
  handleChange,
  error,
}) => (
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
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    />
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// SelectField Component
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
      className={`w-full px-3 py-2 border ${
        error ? "border-red-500" : "border-gray-300"
      } rounded-md`}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

// NotificationPreference Component
const NotificationPreference = ({ enabled, onToggle }) => (
  <div className="mt-4 p-4 border border-gray-300 rounded-md">
    <div className="flex items-center justify-between">
      <label htmlFor="notification_toggle" className="text-base font-normal">
        Notification Preference
      </label>
      <button
        id="notification_toggle"
        onClick={onToggle}
        className={`w-14 h-8 rounded-full ${
          enabled ? "bg-green-500" : "bg-gray-400"
        } flex items-center transition duration-300 focus:outline-none`}
      >
        <span
          className={`h-6 w-6 bg-white rounded-full shadow-md transform transition duration-300 ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
    <p className="text-sm text-gray-500 mt-2">
      {enabled
        ? "Notifications enabled. You will receive updates and alerts via email."
        : "Notifications disabled. You will not receive email updates."}
    </p>
  </div>
);

const SettingsForm = () => {
  const user = useSelector((state) => state.auth.user);
  const [formData, setFormData] = useState({
    f_name: "",
    l_name: "",
    email: "",
    phone_number: "",
    role_id: user?.role_id || "",
    interests: "",
    major: "",
    graduation_year: "",
    university: "",
    user_id: user?.user_id,
    notifications_enabled: false, // Added notification preference field
  });
  const [initialData, setInitialData] = useState(null); // To hold fetched initial data for comparison
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axiosInstance.get(`/users/${user.user_id}`);
        const fetchedUser = response.data;

        const mappedData = {
          f_name: fetchedUser.f_name,
          l_name: fetchedUser.l_name,
          email: fetchedUser.email,
          phone_number: fetchedUser.phone_number,
          role_id: fetchedUser.role_id,
          interests: fetchedUser.interests,
          major: fetchedUser.major,
          graduation_year: fetchedUser.graduation_year
            ? fetchedUser.graduation_year.toString()
            : "",
          university: fetchedUser.university || "",
          notifications_enabled: fetchedUser.notifications_enabled,
        };

        setFormData(mappedData);
        setInitialData(mappedData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user?.user_id]);

  const validateField = (name, value) => {
    switch (name) {
      case "f_name":
      case "l_name":
        return value.trim() ? "" : "This field is required";
      case "email":
        return /^\S+@\S+\.\S+$/.test(value) ? "" : "Invalid email format";
      case "phone_number":
        return /^\d{10}$/.test(value) ? "" : "Invalid phone number";
      case "graduation_year":
        return /^\d{4}$/.test(value) &&
          parseInt(value) > 2000 &&
          parseInt(value) < 2100
          ? ""
          : "Invalid year";
      default:
        return "";
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validateField(name, value),
    }));
  };

  const handleNotificationToggle = () => {
    setFormData((prevData) => ({
      ...prevData,
      notifications_enabled: !prevData.notifications_enabled,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = {};
    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) {
        newErrors[key] = error;
      }
    });
    setErrors(newErrors);

    const hasChanges = JSON.stringify(formData) !== JSON.stringify(initialData);

    if (Object.keys(newErrors).length === 0 && hasChanges) {
      try {
        console.log(formData);
        const response = await axiosInstance.put("/users/api/settings", {
          user_id: user.user_id,
          ...formData,
        });
        setMessage(response.data.message || "Settings updated successfully");
        setInitialData(formData); // Update initialData to current formData after successful update
      } catch (error) {
        console.error("Error updating settings:", error);
        setMessage("Failed to update settings. Please try again.");
      }
    } else if (!hasChanges) {
      setMessage("No changes made to update.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-4xl font-normal mb-6">Settings</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="First Name"
            name="f_name"
            value={formData.f_name}
            handleChange={handleChange}
            error={errors.f_name}
          />
          <InputField
            label="Last Name"
            name="l_name"
            value={formData.l_name}
            handleChange={handleChange}
            error={errors.l_name}
          />
        </div>
        <InputField
          label="Email"
          name="email"
          type="email"
          value={formData.email}
          handleChange={handleChange}
          error={errors.email}
        />
        <div className="grid grid-cols-2 gap-4">
          <InputField
            label="Phone Number"
            name="phone_number"
            type="tel"
            value={formData.phone_number}
            handleChange={handleChange}
            error={errors.phone_number}
          />

          {user?.role_id === 1 || user?.role_id === 3 ? (
            <SelectField
              label="Role"
              name="role_id"
              value={formData.role_id}
              options={[
                { label: "Student", value: 1 },
                { label: "Alumni", value: 3 },
              ]}
              handleChange={handleChange}
              error={errors.role_id}
            />
          ) : null}
        </div>
        <div className="grid grid-cols-2 gap-4">
          <SelectField
            label="Interests"
            name="interests"
            value={formData.interests}
            options={[
              { label: "Front End", value: "Front End" },
              { label: "Back End", value: "Back End" },
              { label: "Full Stack", value: "Full Stack" },
              { label: "AI/ML", value: "AI/ML" },
              { label: "Data Science", value: "Data Science" },
            ]}
            handleChange={handleChange}
            error={errors.interests}
          />
          <InputField
            label="Major"
            name="major"
            value={formData.major}
            handleChange={handleChange}
            error={errors.major}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
        <InputField
          label="University Name"
          name="university"
          value={formData.university}
          handleChange={handleChange}
          error={errors.university}
        />

        <InputField
          label="Graduation Year"
          name="graduation_year"
          value={formData.graduation_year}
          handleChange={handleChange}
          error={errors.graduation_year}
        />
       </div>

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="px-4 py-2 bg-black text-white rounded-md"
          >
            Save
          </button>
        </div>
      </form>
      <NotificationSettings />
    </div>
  );
};

export default SettingsForm;
