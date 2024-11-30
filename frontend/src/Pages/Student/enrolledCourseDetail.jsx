import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const EnrolledCourseDetails = () => {
    const { id } = useParams(); // Get course ID from URL parameters
    const [course, setCourse] = useState(null);
    const [currentLessonIndex, setCurrentLessonIndex] = useState(0); // Track current lesson index

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
        

        const selectedCourse = allCourses.find((course) => course.id === id);
        setCourse(selectedCourse || null);
    };

    useEffect(() => {
        fetchCourseDetails(); // Fetch course when component loads
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

    const handleMarkAsDone = () => {
        console.log(`Lesson "${course.content[currentLessonIndex].title}" marked as done!`);
    };

    if (!course) {
        return <div className="p-6 text-center text-red-500 font-semibold">Details not found!</div>;
    }

    const currentLesson = course.content[currentLessonIndex];

    return (
        <div className="p-8 bg-blue-50 rounded-lg shadow-xl max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                {/* Course Title and Thumbnail */}
                <div className="flex-1">
                    <h1 className="text-4xl font-semibold text-gray-800 mb-4">{course.title}</h1>
                    <p className="text-lg text-gray-600 mb-6">{course.description}</p>
                </div>
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

            {/* Course Content Section */}
            <div className="bg-gray-100 p-4 rounded-lg shadow-md">
                {/* Top Bar */}
                <div className="bg-gray-800 text-white text-lg font-bold p-2 rounded-t-md pl-5">
                    {currentLesson.title}
                </div>

                {/* Video Container */}
                <div className="flex justify-center items-center my-1">
                    <div className="h-64 sm:h-80 lg:h-96 w-full flex justify-center items-center rounded-lg shadow-lg">
                        <iframe
                            src={`${currentLesson.videoUrl}?autoplay=0&showinfo=0&controls=1`}
                            title={currentLesson.title}
                            className="w-[90%] h-5/6 rounded-md"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>

                {/* Navigation Bar */}
                <div className="flex">
                    {/* Previous Button */}
                    <button
                        onClick={handlePreviousLesson}
                        disabled={currentLessonIndex === 0}
                        className={`flex-1 p-4 ${
                            currentLessonIndex === 0
                                ? "bg-yellow-300 cursor-not-allowed"
                                : "bg-yellow-500 hover:bg-yellow-600 text-white"
                        } text-lg font-semibold rounded-bl-md`}
                    >
                        Previous
                    </button>

                    {/* Mark as Done Button */}
                    <button
                        onClick={handleMarkAsDone}
                        className="flex-1 bg-blue-500 hover:bg-blue-600 text-white p-4 text-lg font-semibold"
                    >
                        Mark as Done
                    </button>

                    {/* Next Button */}
                    <button
                        onClick={handleNextLesson}
                        disabled={currentLessonIndex === course.content.length - 1}
                        className={`flex-1 p-4 ${
                            currentLessonIndex === course.content.length - 1
                                ? "bg-green-300 cursor-not-allowed"
                                : "bg-green-500 hover:bg-green-600 text-white"
                        } text-lg font-semibold rounded-br-md`}
                    >
                        Next
                    </button>
                </div>
            </div>


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
