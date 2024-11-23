// Name - Usha Sai Chintha, UTA ID - 1002155333
// Name - Shiney Chinthamalla, UTA ID - 1002170536
// Name - Sai Charan Challa, UTA ID - 1002147720
// Name - Venkata Satya Kiranmai Challagulla, UTA ID - 1002195499
// Name - Dinesh Reddy Bommana, UTA ID - 1002163421

import React, { useState, useEffect } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PersonIcon from "@mui/icons-material/Person";
import axiosInstance from "../../utils/axiosInstance";
import ContactForm from '../EventContact/EventContact';

// Helper function to generate dates for the calendar
const generateDates = (year, month) => {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const dates = [];

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstDay.getDay(); i++) {
    dates.push(null);
  }

  // Add all days of the month
  for (let i = 1; i <= lastDay.getDate(); i++) {
    dates.push(new Date(year, month, i));
  }

  return dates;
};



const EventDetails = ({ event }) => {
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
        src={event.image_url} // Dynamically set image based on event type
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
      </CardContent>
    </Card>
  );
};

export default function CalendarComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);

   const [showContactForm, setShowContactForm] = useState(false);

 const handleCloseDetails = () => {
     setSelectedEvent(null);
     setShowContactForm(false); // Ensure the contact form is closed
   };



  useEffect(() => {
    // Fetch events from the backend when the component mounts
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get("/events"); // Replace with the actual endpoint for events
        // Map the backend events to include Date objects
        const mappedEvents = response.data.map((event) => ({
          ...event,
          start_time: new Date(event.start_time),
          end_time: new Date(event.end_time),
        }));
        setEvents(mappedEvents); // Store mapped events with Date objects
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []); // Empty dependency array means this will run only once when the component mounts

  const dates = generateDates(currentDate.getFullYear(), currentDate.getMonth());

  const navigateMonth = (direction) => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + direction, 1)
    );
  };

  const getEventsForDate = (date) => {
    // Ensure that date is valid and check if it has a valid value
    if (!date || !(date instanceof Date)) return [];

    return events.filter(
      (event) =>
        event.start_time.getDate() === date.getDate() &&
        event.start_time.getMonth() === date.getMonth() &&
        event.start_time.getFullYear() === date.getFullYear()
    );
  };

  const handleEventClick = (event) => {
    setSelectedEvent(event);
  };

     const handleContactUsClick = () => {
       setShowContactForm(true);
     };

     const handleCloseContactForm = () => {
       setShowContactForm(false);
     };

     if (showContactForm) {
       return (
         <div className="container m-auto p-4">
           <ContactForm />
           <button onClick={handleCloseContactForm} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">
             Back to Event
           </button>
         </div>
       );
     }



  if (selectedEvent) {
    return (
      <div className="container m-auto p-4 ">
        {/* Pass the selected event to the Article component */}
        <EventDetails event={selectedEvent} />

        <div className="mt-4 ml-auto w-full flex justify-between">
          <button
            onClick={handleCloseDetails}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Back to All Events
          </button>
          <button
                              onClick={handleContactUsClick}
                              className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                            >
                               Contact Us
                            </button>
        </div>

           <div className="mt-4 ml-auto">

                </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Events Calendar</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigateMonth(-1)}
            className="px-2 py-1 border rounded"
          >
            Prev
          </button>
          <span className="text-lg font-semibold">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            onClick={() => navigateMonth(1)}
            className="px-2 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-center font-semibold p-2">
            {day}
          </div>
        ))}
        {dates.map((date, index) => (
          <div
            key={index}
            className="border rounded-lg p-2 h-20 overflow-y-auto"
          >
            {date && (
              <>
                <div className="text-right text-sm text-gray-500">
                  {date.getDate()}
                </div>
                {getEventsForDate(date).map((event) => (
                  <div
                    key={event.event_id}
                    className={`w-full text-left mb-1 p-1 text-xs cursor-pointer ${
                      event.event_type === "workshop"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                    onClick={() => handleEventClick(event)}
                  >
                    <strong>{event.title}</strong>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="mt-4 flex space-x-4">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-blue-100 mr-2"></div>
          <span>Workshop</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-green-100 mr-2"></div>
          <span>Seminar</span>
        </div>
      </div>
    </div>
  );
}