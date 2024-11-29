import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentCourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div className="border p-4 rounded-md shadow-lg bg-gray-100">
            {/* Course Image */}
            <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded mb-4" 
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

            {/* Description */}
            <p className="text-gray-600 mb-4">{course.description}</p>

            {/* Number of Students Enrolled */}
            {/* <p className="text-gray-500 text-sm">Enrolled Students: {course.students.length}</p> */}

            {/* View Details of the course */}
            <button className="bg-gray-800 text-white px-3 py-1 rounded mt-4 justify-center w-full hover:shadow-xl transition duration-200 cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
            >
                View Details
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

export default StudentCourseCard;
