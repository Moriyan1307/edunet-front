// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

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
