import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EnrolledCourseDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get course ID from URL parameters
  console.log(id);
  const [course, setCourse] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Track current lesson index

  const token = localStorage.getItem("token");

  const fetchCourseDetails = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/courses/enrolled-course/${id}`, // Backend API endpoint for enrolled course
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const fetchedCourse = response.data;
      setCourse(response.data); // Update state with the fetched course details
      // Backend server base URL
      const backendBaseURL = "http://localhost:5000/"; // Update with your backend's base URL

      // Construct full image URL if needed
      const courseImageUrl = fetchedCourse.thumbnail?.startsWith("http")
        ? fetchedCourse.thumbnail // Use the full URL if it's already provided
        : `${backendBaseURL}${fetchedCourse.thumbnail?.replace(/\\/g, "/")}`; // Replace backslashes with forward slashes

      setImageUrl(courseImageUrl);
    } catch (err) {
      console.error(err);
      alert("Error fetching enrolled course details");
    }
  };

  useEffect(() => {
    fetchCourseDetails(); // Fetch course details on component load
  }, [id]);

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
    }
  };

  const handleNextLesson = () => {
    if (course && currentLessonIndex < course.content.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
    }
  };

  // const handleMarkAsDone = async () => {
  //   try {
  //     await axios.post(
  //       `http://localhost:5000/api/courses/mark-as-done`,
  //       {
  //         courseId: id,
  //         contentId: course.content[currentLessonIndex].id,
  //       },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );
  //     alert(
  //       `Lesson "${course.content[currentLessonIndex].title}" marked as done!`
  //     );
  //   } catch (err) {
  //     console.error(err);
  //     alert("Error marking lesson as done");
  //   }
  // };

  const handleUnenroll = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to unenroll from this course?"
    );
    if (confirmed) {
      try {
        await axios.post(
          `http://localhost:5000/api/courses/drop/${id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        navigate("/student/dashboard");
      } catch (err) {
        console.error(err);
        alert("Error unenrolling from course");
      }
    }
  };

  const handleGenerateCertificate = async () => {
    // navigate("CERTIFICATE PAGE");
  };

  if (!course || !imageUrl) {
    return (
      <div className="p-6 text-center text-red-500 font-semibold">
        Details not found!
      </div>
    );
  }

  const currentLesson = course.content[currentLessonIndex];
  const isLastLesson = currentLessonIndex === course.content.length - 1;

  const getVideoId = (url) => {
    const match = url.match(
      /(?:youtube\.com\/(?:[^\/]+\/[^\/]+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    return match ? match[1] : null;
  };

  return (
    <div className="p-8 bg-blue-50 rounded-lg shadow-xl w-4/5 max-w-4xl mx-auto">
      {/* Combined Card for Course Title, Thumbnail, and Difficulty Level */}
      <div className="p-6 bg-gray-900 text-white shadow-md rounded-lg mb-6">
        <div className="flex items-center mb-6">
          <div className="flex-1">
            <h1 className="text-3xl font-semibold mb-2">{course.title}</h1>
            <p className="text-lg text-gray-300">{course.description}</p>
          </div>
          <div className="flex-shrink-0 ml-6">
            <img
              src={imageUrl}
              alt={course.title}
              className="w-48 h-48 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-sm font-semibold text-gray-300">
              Difficulty Level:
            </p>
            <span
              className={`text-lg font-medium ${getDifficultyColor(
                course.difficultyLevel
              )}`}
            >
              {course.difficultyLevel.charAt(0).toUpperCase() +
                course.difficultyLevel.slice(1)}
            </span>
          </div>
          <button
            onClick={handleUnenroll}
            className="bg-gray-600 hover:bg-gray-700 text-white w-48 px-4 py-2 rounded-md shadow-md font-semibold"
          >
            Unenroll
          </button>
        </div>
      </div>

      {/* Course Content Section */}
<div className="bg-gray-900 p-4 rounded-lg text-white shadow-md">
  <div className="bg-gray-800 text-white text-lg font-bold p-2 rounded-t-md pl-5">
    {currentLesson.title}
  </div>
  <div className="flex justify-center items-center my-1">
    <div className="h-64 sm:h-80 lg:h-96 w-full flex justify-center items-center rounded-lg shadow-lg">
      <iframe
        src={`https://www.youtube.com/embed/${getVideoId(
          currentLesson.videoUrl
        )}?autoplay=0&showinfo=0&controls=1`}
        title={currentLesson.title}
        className="w-[90%] h-5/6 rounded-md"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
  <div className="flex">
    <button
      onClick={handlePreviousLesson}
      disabled={isLastLesson || currentLessonIndex === 0}
      className={`flex-1 py-3 ${
        currentLessonIndex === 0 || isLastLesson
          ? "bg-yellow-300 cursor-not-allowed"
          : "bg-yellow-500 hover:bg-yellow-600 text-white"
      } text-lg font-semibold rounded-bl-md`}
    >
      Previous
    </button>
    <button
      onClick={handleNextLesson}
      disabled={isLastLesson}
      className={`flex-1 py-3 ${
        isLastLesson
          ? "bg-green-300 cursor-not-allowed"
          : "bg-green-500 hover:bg-green-600 text-white"
      } text-lg font-semibold rounded-br-md`}
    >
      Next
    </button>
  </div>
</div>

{/* Generate Certificate Button */}
{isLastLesson && (
  <div className="mt-6">
    <button
      onClick={handleGenerateCertificate}
      className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md w-full"
    >
      Generate Certificate
    </button>
  </div>
)}

    </div>
  );
};

const getDifficultyColor = (difficultyLevel) => {
  switch (difficultyLevel) {
    case "easy":
      return "text-green-600";
    case "medium":
      return "text-yellow-600";
    case "hard":
      return "text-red-600";
    default:
      return "text-gray-500";
  }
};

export default EnrolledCourseDetails;
