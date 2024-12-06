import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CourseDetails = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get course ID from URL parameters
    const [course, setCourse] = useState(null);
    const [imageUrl, setImageUrl] = useState(null);

    const token = localStorage.getItem("token");

    const fetchCourseDetails = async () => {
        try {
            const response = await axios.get(
                `http://localhost:5000/api/courses/course-detail/${id}`, // Backend API endpoint
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            const fetchedCourse = response.data;
            setCourse(fetchedCourse); // Update state with the fetched course details

            // Backend server base URL
            const backendBaseURL = "http://localhost:5000/"; // Update with your backend's base URL

            // Construct full image URL
            const courseImageUrl = fetchedCourse.thumbnail?.startsWith("http")
                ? fetchedCourse.thumbnail // Use the full URL if it's already provided
                : `${backendBaseURL}${fetchedCourse.thumbnail?.replace(/\\/g, "/")}`; // Replace backslashes with forward slashes
            
            setImageUrl(courseImageUrl); // Update the imageUrl state once constructed
            console.log(fetchedCourse);
        } catch (err) {
            console.error(err);
            alert("Error fetching course details");
        }
    };

    // Enroll function that calls the API to enroll the student
    const enrollInCourse = async () => {

        console.log("Token:", token);

        try {
            const response = await axios.post(
                `http://localhost:5000/api/courses/enroll/${course.id}`,
                {}, // Request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            alert(response.data.msg);
            navigate(`/course/enrolled/${id}`);
        } catch (err) {
            if (err.response?.status === 401) {
                alert("You are not authorized. Please log in again.");
                navigate("/login");
            } else {
                console.error(err);
                alert("Error enrolling in course");
            }
        }
    };
    

    useEffect(() => {
        fetchCourseDetails(); // Fetch course when component loads
    }, [id]);

    // Wait for imageUrl to be constructed before rendering the course
    if (!course || !imageUrl) {
        return <div className="p-6 text-center text-lg text-gray-600">Loading course details...</div>;
    }

    return (
        <div className="p-8 bg-blue-50 rounded-lg shadow-xl my-10 w-4/5 mx-auto">
            {/* Header Section */}
            <div className="flex items-center justify-between mb-6">
                {/* Left Side: Title and Description */}
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                </div>

                {/* Right Side: Thumbnail */}
                <div className="flex-shrink-0 mr-7">
                    <img
                        src={imageUrl} // Use the constructed image URL
                        alt={course.title}
                        className="w-64 h-64 object-cover rounded-lg shadow-md"
                    />
                </div>
            </div>

            {/* Difficulty Level */}
            <div className="mb-6">
                <p className="text-sm font-semibold text-gray-600">Difficulty Level:</p>
                <span className={`text-xl ${getDifficultyColor(course.difficultyLevel)}`}>
                    {course.difficultyLevel.charAt(0).toUpperCase() + course.difficultyLevel.slice(1)}
                </span>
            </div>

            {/* Instructor Section */}
            <div className="flex items-center mb-6">
                <div>
                    <h2 className="text-xl font-semibold text-gray-800">Instructor</h2>
                    <p className="text-lg text-gray-600">{course.instructor.name}</p>
                </div>
            </div>

            {/* What You'll Learn Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">What You'll Learn</h2>
                <ul className="list-disc pl-6 space-y-2 text-lg text-gray-600">
                    {course.whatYoullLearn.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            {/* Students Enrolled Section */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Students Enrolled</h2>
                <p className="text-lg text-gray-600">{course.students.length} students</p>
            </div>

            {/* Enroll Button */}
            <div className="flex justify-center">
                <button
                    className="bg-gray-800 text-white px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => enrollInCourse()}
                >
                    Enroll for Free
                </button>
            </div>
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

export default CourseDetails;
