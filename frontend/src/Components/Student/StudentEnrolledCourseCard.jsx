import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentEnrolledCourseCard = ({ course }) => {
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
            <img  src={imageUrl || "https://via.placeholder.com/150"} // Fallback to a placeholder image
                alt={course.title || "Course Thumbnail"}
                 className="w-full h-32 object-cover rounded mb-4" 
            />

            {/* Course Title */}
            <h3 className="font-bold text-lg mb-2">{course.title}</h3>

            {/* Difficulty Level */}
            <p className="text-sm font-semibold mb-2">
                Difficulty:{" "}
                <span className={getDifficultyColor(course.difficultyLevel)}>
                    {course.difficultyLevel.charAt(0).toUpperCase() + course.difficultyLevel.slice(1)}
                </span>
            </p>
            
            {/* View Progress of the course */}
            <button className="bg-gray-800 text-white px-3 py-1 rounded mt-4 justify-center w-full hover:shadow-xl transition duration-200 cursor-pointer"
                onClick={() => navigate(`/course/enrolled/${course.id}`)}
            >
                View Progress
            </button>
        </div>
    );
};

const getDifficultyColor = (difficultyLevel) => {
    switch (difficultyLevel) {
        case 'easy':
            return 'text-green-600';
        case 'medium':
            return 'text-yellow-600';
        case 'hard':
            return 'text-red-600';
        default:
            return 'text-gray-500';
    }
};

export default StudentEnrolledCourseCard;
