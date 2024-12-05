import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentEnrolledCourseCard from "../../Components/Student/StudentEnrolledCourseCard";
import StudentCourseCard from "../../Components/Student/studentCourseCard";
import axios from "axios";

const StudentDashboard = () => {
  const navigate = useNavigate();

  const studentId = "67516d372162be7640476294"; // Sample student ID

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch courses from the backend
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: {
            "x-auth-token":
              "eeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUxNmQzNzIxNjJiZTc2NDA0NzYyOTQiLCJpYXQiOjE3MzM0MTU4MjMsImV4cCI6MTczMzQ0NDYyM30.yAHQ-DKFTCuDE2313QDYycQV-W55MqWOdRr6JJ6yTTQ",
          },
        });
        setCourses(response.data);
        console.log(response.data);
      } catch (err) {
        setError("Failed to fetch courses. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  // Filter courses where the student is enrolled
  const myCourses = courses.filter((course) =>
    course.students.some((student) => student.toString() === studentId)
  );

  // Filter courses that the student is NOT enrolled in (New Courses)
  const newCourses = courses.filter(
    (course) =>
      !course.students.some((student) => student.toString() === studentId)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="px-20 py-6">
      {/* Welcome message */}
      <h1 className="text-2xl font-bold mb-2">Welcome, Saba</h1>
      <hr className="border-gray-300 my-6" />

      {/* My Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {myCourses.map((course) => (
          <StudentEnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* New Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">New Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {newCourses.map((course) => (
          <StudentCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Recommended Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recommended For You</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* You can add logic here to display recommended courses */}
      </div>
    </div>
  );
};

export default StudentDashboard;
