import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

const MentorshipProgram = ({ onEnroll }) => {
  const [availablePrograms, setAvailablePrograms] = useState([]);
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

  return (
    <div className="h-full w-full p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Available Mentorship Programs</h1>
      <div className="flex flex-col space-y-4">
        {availablePrograms.map((program) => (
          <div
            key={program.program_id}
            className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <img
              src={program.imageUrl || placeholderImage}
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
            <button
              onClick={() => onEnroll(program.mentor_id)} // Pass mentor_id here
              className="bg-black text-white px-4 py-2 rounded-lg"
            >
              Enroll
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MentorshipProgram;
