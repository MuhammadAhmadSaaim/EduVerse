import React, { useEffect, useState } from "react";
import StudentEnrolledCourseCard from "../../Components/Student/StudentEnrolledCourseCard";
import StudentCourseCard from "../../Components/Student/studentCourseCard";
import axios from "axios";

const StudentDashboard = () => {
  const token = localStorage.getItem("token");

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentId, setStudentId] = useState("");
  const [username, setUsername] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/user/getProfile", {
                headers: {
                    Authorization: `Bearer ${token}`, 
                },
            });
            setStudentId(response.data._id);
            setUsername(response.data.username);
            console.log("studentId:", response.data._id,response.data.username)
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    fetchProfile();
}, []);


  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/courses", {
          headers: {
            Authorization: `Bearer ${token}`,
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
      <h1 className="text-2xl font-bold mb-2">Welcome, {username}</h1>
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
    </div>
  );
};

export default StudentDashboard;
