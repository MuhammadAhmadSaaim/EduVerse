import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    // Backend server base URL
    const backendBaseURL = "http://localhost:5000/"; // Update with your backend's base URL

    // Construct full image URL
    const imageUrl = course.thumbnail?.startsWith("http")
        ? course.thumbnail // Use the full URL if it's already provided
        : `${backendBaseURL}${course.thumbnail?.replace(/\\/g, "/")}`; // Replace backslashes with forward slashes

    return (
        <div className="border p-4 rounded-md shadow-lg bg-gray-100">
            {/* Course Image */}
            <img
                src={imageUrl || "https://via.placeholder.com/150"} // Fallback to a placeholder image
                alt={course.title || "Course Thumbnail"}
                className="w-full h-32 object-cover rounded mb-4"
            />

            {/* Course Title */}
            <h3 className="font-bold text-lg mb-2">{course.title || "Untitled Course"}</h3>

            {/* Description */}
            <p className="text-gray-600 mb-4">
                {course.description || "No description available."}
            </p>

            {/* Number of Students Enrolled */}
            <p className="text-gray-500 text-sm">
                Enrolled Students: {course.studentCount}
            </p>

            {/* View More */}
            <button
                className="bg-gray-800 text-white px-3 py-1 rounded mt-4 justify-center w-full hover:shadow-xl transition duration-200 cursor-pointer"
                onClick={() => navigate(`/editcourse/${course.id}`)} // Navigate to course details page
            >
                View Details
            </button>
        </div>
    );
};

export default CourseCard;

