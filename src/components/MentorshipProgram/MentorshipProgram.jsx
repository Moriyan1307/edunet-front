import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

const MentorshipProgram = ({ onEnroll }) => {
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState(null); // Track selected program
  const placeholderImage = ""; // Adjust placeholder path if needed

  useEffect(() => {
    const fetchAvailablePrograms = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/mentorship/available"
        );
        setAvailablePrograms(response.data);
      } catch (error) {
        console.error("Error fetching available programs:", error);
      }
    };

    fetchAvailablePrograms();
  }, []);

  // Render the program details view
  if (selectedProgram) {
    return (
      <div className="h-full w-full p-6 bg-white">
        <button
          onClick={() => setSelectedProgram(null)}
          className="mb-4 text-blue-600 underline"
        >
          &larr; Back to Mentorship Programs
        </button>
        <div className="flex flex-col items-center space-y-4 bg-gray-100 p-6 rounded-lg shadow-md">
          <img
            src={selectedProgram.image_url || placeholderImage}
            className="w-48 h-48 object-cover rounded-lg"
            alt="Program Thumbnail"
          />
          <h2 className="text-2xl font-bold">
            Mentorship with {selectedProgram.mentor_first_name}{" "}
            {selectedProgram.mentor_last_name}
          </h2>
          <p className="text-gray-600">
            Duration:{" "}
            {new Date(selectedProgram.start_date).toLocaleDateString()} -{" "}
            {new Date(selectedProgram.end_date).toLocaleDateString()}
          </p>
          <p className="text-gray-500 text-sm text-center">
            {selectedProgram.description || "No description available."}
          </p>
          <button
            onClick={() => onEnroll(selectedProgram.mentor_id)}
            className="bg-black text-white px-4 py-2 rounded-lg"
          >
            Enroll
          </button>
        </div>
      </div>
    );
  }

  // Render the list of programs view
  return (
    <div className="h-full w-full p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Available Mentorship Programs</h1>
      <div className="flex flex-col space-y-4">
        {availablePrograms.map((program) => (
          <div
            key={program.program_id}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md"
            onClick={() => setSelectedProgram(program)} // Select program
            style={{ cursor: "pointer" }}
          >
            <img
              src={program.image_url || placeholderImage}
              className="w-24 h-24 object-cover rounded-lg"
              alt="Program Thumbnail"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-bold">
                Mentorship with {program.mentor_first_name}{" "}
                {program.mentor_last_name}
              </h3>
              <p className="text-sm text-gray-500">
                Duration: {new Date(program.start_date).toLocaleDateString()} -{" "}
                {new Date(program.end_date).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipProgram;
