import React from 'react';
import { useNavigate } from 'react-router-dom';

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <div
            className="border p-4 rounded-md shadow-lg bg-gray-100"
        >
            {/* Course Image */}
            <img src={course.image} alt={course.title} className="w-full h-32 object-cover rounded mb-4" />

            {/* Course Title */}
            <h3 className="font-bold text-lg mb-2">{course.title}</h3>

            {/* Description */}
            <p className="text-gray-600 mb-4">{course.description}</p>

            {/* Number of Students Enrolled */}
            <p className="text-gray-500 text-sm">Enrolled Students: {course.students.length}</p>

            {/* View More */}
            <button className="bg-gray-800 text-white px-3 py-1 rounded mt-4 justify-center w-full hover:shadow-xl transition duration-200 cursor-pointer"
                onClick={() => navigate(`/editcourse/${course.id}`)} // Navigate to course details page
            >View Details</button>
        </div>
    );
};

export default CourseCard;
