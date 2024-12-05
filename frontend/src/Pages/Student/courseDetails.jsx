import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CourseDetails = () => {
    const navigate = useNavigate();
    
    const { id } = useParams(); // Get course ID from URL parameters
    const [course, setCourse] = useState(null);

    // Simulated function to fetch course details by ID
    const fetchCourseDetails = () => {
        const allCourses = [
            {
                id: "641e9b7e4e8c1e1234567890",
                title: "Introduction to Programming",
                description: "Learn the basics of programming using JavaScript.",
                instructor: {
                    id: "641e9b7e4e8c1e1234567891",
                    name: "John Doe",
                },
                thumbnail: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
                difficultyLevel: "easy",
                whatYoullLearn: [
                    "Understand basic programming concepts",
                    "Write simple JavaScript programs",
                    "Debug and test your code",
                ],
                content: [
                    {
                        id: "641e9b7e4e8c1e1234567892",
                        title: "Introduction",
                        videoUrl: "https://www.youtube.com/embed/NArVyt8t-z4",
                    },
                    {
                        id: "641e9b7e4e8c1e1234567893",
                        title: "Getting Started with JavaScript",
                        videoUrl: "https://www.youtube.com/watch?v=9MEAQqCHqcc",
                    },
                ],
                students: [
                    {
                        id: "641e9b7e4e8c1e1234567894",
                        name: "Saba Shafique",
                    },
                ],
                progress: [
                    {
                        student: {
                            id: "641e9b7e4e8c1e1234567894",
                            name: "Saba Shafique",
                        },
                        completedContentIds: ["641e9b7e4e8c1e1234567892"],
                        remainingContentIds: ["641e9b7e4e8c1e1234567893"],
                    },
                ],
            },
            {
                id: "641e9b7e4e8c1e1234567895",
                title: "Advanced Web Development",
                description: "Master front-end and back-end web development.",
                instructor: {
                    id: "641e9b7e4e8c1e1234567896",
                    name: "Jane Smith",
                },
                thumbnail: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
                difficultyLevel: "hard",
                whatYoullLearn: [
                    "Build full-stack web applications",
                    "Learn React, Node.js, and MongoDB",
                    "Deploy your projects to production",
                ],
                content: [
                    {
                        id: "641e9b7e4e8c1e1234567897",
                        title: "React Basics",
                        videoUrl: "https://sample-videos.com/video3",
                    },
                    {
                        id: "641e9b7e4e8c1e1234567898",
                        title: "Backend with Node.js",
                        videoUrl: "https://sample-videos.com/video4",
                    },
                ],
                students: [
                    {
                        id: "641e9b7e4e8c1e1234567899",
                        name: "Ali Ahmed",
                    },
                ],
                progress: [
                    {
                        student: {
                            id: "641e9b7e4e8c1e1234567894",
                            name: "Saba Shafique",
                        },
                        completedContentIds: ["641e9b7e4e8c1e1234567897"],
                        remainingContentIds: ["641e9b7e4e8c1e1234567898"],
                    },
                ],
            },
        ];
        

        // Find the course matching the ID (corrected to use `id` instead of `_id`)
        const selectedCourse = allCourses.find(course => course.id === id);
        setCourse(selectedCourse || null);
    };

    useEffect(() => {
        fetchCourseDetails(); // Fetch course when component loads
    }, [id]);

    if (!course) {
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
                        src={course.thumbnail}
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
                    onClick={() => navigate(`/course/enrolled/${course.id}`)}
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
