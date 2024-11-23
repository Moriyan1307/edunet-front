import React, { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosInstance";

const NotificationSettings = () => {
  const [emailPreference, setEmailPreference] = useState(true);

  useEffect(() => {
    const fetchPreference = async () => {
      try {
        const response = await axiosInstance.get("/users/preferences");
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

export default NotificationSettings;
