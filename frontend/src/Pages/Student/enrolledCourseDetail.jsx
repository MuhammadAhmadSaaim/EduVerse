// this page will beS shown to a student for an enrolled course to show details and progress
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const EnrolledCourseDetails = () => {
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
                        videoUrl: "https://sample-videos.com/video1",
                    },
                    {
                        id: "641e9b7e4e8c1e1234567893",
                        title: "Getting Started with JavaScript",
                        videoUrl: "https://sample-videos.com/video2",
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
                        id: "641e9b7e4e8c1e1234567894",
                        name: "Saba Shafique",
                    },
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
        return <div className="p-6 text-center">Details not found!!</div>;
    }

    return (
        <div className="p-6 bg-gray-100 rounded-md shadow-lg">
            {/* Course Title */}
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

            {/* Course Thumbnail */}
            <img src={course.thumbnail} alt={course.title} className="w-full h-64 object-cover rounded mb-4" />

            {/* Description */}
            <p className="text-gray-600 mb-6">{course.description}</p>

            {/* Difficulty Level */}
            <p className="text-sm font-semibold mb-2">
                Difficulty:{" "}
                <span className={getDifficultyColor(course.difficultyLevel)}>
                    {course.difficultyLevel.charAt(0).toUpperCase() + course.difficultyLevel.slice(1)}
                </span>
            </p>
            
            {/* Instructor */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Instructor</h2>
                <p className="text-gray-800">{course.instructor.name}</p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">What You'll Learn</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {course.whatYoullLearn.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                    ))}
                </ul>
            </div>

            {/* Course Content */}
            <div className="mb-6">
                <h2 className="text-xl font-semibold">Course Content</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {course.content.map(lesson => (
                        <li key={lesson.id} className="mb-2">
                            {lesson.title}
                            <a
                                href={lesson.videoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 ml-2 underline"
                            >
                                Watch Video
                            </a>
                        </li>
                    ))}
                </ul>
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

export default EnrolledCourseDetails;
