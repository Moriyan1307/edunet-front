import React, { useState } from "react";
import { Card, CardContent, Typography, TextField, Button } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";

const EventDetails = ({ event }) => {
  const [formData, setFormData] = useState({
    subject: "",
    message: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you could handle sending the form data to a server if needed
    alert("Form submitted successfully!");
  };

  if (!event) return null;

  return (
    <Card
      style={{
        maxWidth: 600,
        margin: "auto",
        padding: "20px",
        borderRadius: "16px",
        boxShadow: "0px 8px 16px rgba(0,0,0,0.1)",
      }}
    >
      {/* Image Section */}
      <img
        src={event.image_url}
        alt={event.title}
        style={{
          width: "100%",
          height: "100%",
          maxHeight: "400px",
          borderRadius: "16px",
        }}
      />

      {/* Title Section */}
      <CardContent>
        <Typography variant="h5" component="h2" style={{ fontWeight: "bold" }}>
          {event.title}
        </Typography>

        {/* Author and Date Section */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginTop: "10px",
            color: "#777",
          }}
        >
          <PersonIcon style={{ marginRight: "5px" }} />
          <Typography variant="body2" component="p">
            {event.speaker || "Unknown Speaker"}
          </Typography>
          <CalendarTodayIcon style={{ margin: "0 5px" }} />
          <Typography variant="body2" component="p">
            {new Date(event.start_time).toLocaleDateString()}
          </Typography>
        </div>

        {/* Event Description */}
        <Typography
          variant="body1"
          color="textSecondary"
          component="p"
          style={{ marginTop: "20px" }}
        >
          {event.description}
        </Typography>

        {/* Contact Us Form */}
        <form onSubmit={handleSubmit} style={{ marginTop: "20px" }}>
          <TextField
            label="Subject"
            name="subject"
            fullWidth
            margin="normal"
            value={formData.subject}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Message"
            name="message"
            fullWidth
            margin="normal"
            multiline
            rows={4}
            value={formData.message}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            fullWidth
            margin="normal"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <TextField
            label="Phone (1234567890)"
            name="phone"
            type="tel"
            fullWidth
            margin="normal"
            value={formData.phone}
            onChange={handleInputChange}
            pattern="\d{10}"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EventDetails;
