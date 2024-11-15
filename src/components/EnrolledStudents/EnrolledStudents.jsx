// EnrolledStudents.jsx

import React, { useEffect, useState } from "react";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";

const EnrolledStudents = ({ mentorId }) => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchEnrolledStudents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/mentorship/mentor/${mentorId}/students`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setStudents(data);
      } catch (error) {
        console.error("Error fetching enrolled students:", error);
      }
    };

    if (mentorId) fetchEnrolledStudents();
  }, [mentorId]);

  return (
    <div className="h-full w-full p-6 bg-white">
      <h1 className="text-2xl font-bold mb-4">Enrolled Students</h1>
      {students.length === 0 ? (
        <p>No students enrolled yet.</p>
      ) : (
        <div className="flex flex-col space-y-4">
          {students.map((student) => (
            <div
              key={student.application_id}
              className="p-4 bg-gray-100 rounded-lg shadow-md flex items-center"
            >
              <PersonIcon sx={{ fontSize: 28 }} className="mr-2" />
              <div>
                <h3 className="text-lg font-bold">
                  {student.first_name} {student.last_name}
                </h3>
                <p className="text-sm text-gray-500">{student.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EnrolledStudents;
