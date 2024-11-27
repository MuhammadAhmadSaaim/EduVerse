import React from 'react';
import { useNavigate } from 'react-router-dom';
import SCourseCard from '../../Components/Student/sCourseCard';

const StudentDashboard = () => {
    const navigate = useNavigate();

    // Sample student name
    const studentName = "Saba";

    // Sample courses based on Mongoose schema
    const courses = [
        {
            _id: "641e9b7e4e8c1e1234567890",
            title: "Introduction to Programming",
            description: "Learn the basics of programming using JavaScript.",
            instructor: {
                _id: "641e9b7e4e8c1e1234567891",
                name: "John Doe",
            },
            thumbnail: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
            whatYoullLearn: [
                "Understand basic programming concepts",
                "Write simple JavaScript programs",
                "Debug and test your code"
            ],
            content: [
                {
                    _id: "641e9b7e4e8c1e1234567892",
                    title: "Introduction",
                    videoUrl: "https://sample-videos.com/video1",
                },
                {
                    _id: "641e9b7e4e8c1e1234567893",
                    title: "Getting Started with JavaScript",
                    videoUrl: "https://sample-videos.com/video2",
                },
            ],
            students: [
                {
                    _id: "641e9b7e4e8c1e1234567894",
                    name: "Saba Shafique",
                },
            ],
            progress: [
                {
                    student: {
                        _id: "641e9b7e4e8c1e1234567894",
                        name: "Saba Shafique",
                    },
                    completedContentIds: ["641e9b7e4e8c1e1234567892"],
                    remainingContentIds: ["641e9b7e4e8c1e1234567893"],
                },
            ],
        },
        {
            _id: "641e9b7e4e8c1e1234567895",
            title: "Advanced Web Development",
            description: "Master front-end and back-end web development.",
            instructor: {
                _id: "641e9b7e4e8c1e1234567896",
                name: "Jane Smith",
            },
            thumbnail: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
            whatYoullLearn: [
                "Build full-stack web applications",
                "Learn React, Node.js, and MongoDB",
                "Deploy your projects to production",
            ],
            content: [
                {
                    _id: "641e9b7e4e8c1e1234567897",
                    title: "React Basics",
                    videoUrl: "https://sample-videos.com/video3",
                },
                {
                    _id: "641e9b7e4e8c1e1234567898",
                    title: "Backend with Node.js",
                    videoUrl: "https://sample-videos.com/video4",
                },
            ],
            students: [
                {
                    _id: "641e9b7e4e8c1e1234567894",
                    name: "Saba Shafique",
                },
                {
                    _id: "641e9b7e4e8c1e1234567899",
                    name: "Ali Ahmed",
                },
            ],
            progress: [
                {
                    student: {
                        _id: "641e9b7e4e8c1e1234567894",
                        name: "Saba Shafique",
                    },
                    completedContentIds: ["641e9b7e4e8c1e1234567897"],
                    remainingContentIds: ["641e9b7e4e8c1e1234567898"],
                },
            ],
        },
    ];

    return (
        <div className="px-20 py-6">
            {/* Welcome message */}
            <h1 className="text-2xl font-bold mb-2">Welcome, {studentName}</h1>
            <hr className="border-gray-300 my-6" />

            {/* My Courses Section */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Courses</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {courses.map(course => (
                    <SCourseCard key={course._id} course={course} />
                ))}
            </div>
        </div>
    );
};

export default StudentDashboard;
