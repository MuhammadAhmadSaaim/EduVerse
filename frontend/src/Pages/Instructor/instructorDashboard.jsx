import React from 'react';
import CourseCard from '../../Components/Instructor/courseCard'; // Import CourseCard component
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstructorDashboard = () => {
    const navigate = useNavigate();

    // Sample instructor name (you may want to replace this with a dynamic name)
    const instructorName = "Ali Nawaz";

    const courses = [
        {
            id: 1,
            title: 'Course 1',
            description: 'Description for Course 1',
            instructor: 'Instructor A',
            image: 'https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg', // Placeholder image URL
            whatYoullLearn: [
                'Understand the basics of Course 1',
                'Build foundational skills',
                'Advanced techniques in Course 1'
            ],
            difficultyLevel: 'Beginner',
            content: [
                { id: 1, title: 'Introduction', videoUrl: 'https://sample-videos.com/video1' },
                { id: 2, title: 'Lesson 1', videoUrl: 'https://sample-videos.com/video2' },
            ],
            students: ['Student1', 'Student2'],
        },
        {
            id: 2,
            title: 'Course 2',
            description: 'Description for Course 2',
            instructor: 'Instructor B',
            image: 'https://via.placeholder.com/150', // Placeholder image URL
            whatYoullLearn: [
                'Explore intermediate concepts in Course 2',
                'Master advanced techniques'
            ],
            difficultyLevel: 'Intermediate',
            content: [
                { id: 1, title: 'Lesson 1', videoUrl: 'https://sample-videos.com/video3' },
                { id: 2, title: 'Lesson 2', videoUrl: 'https://sample-videos.com/video4' },
            ],
            students: ['Student3', 'Student4', 'Student5'],
        },
        {
            id: 3,
            title: 'Course 3',
            description: 'Description for Course 3',
            instructor: 'Instructor C',
            image: 'https://via.placeholder.com/150', // Placeholder image URL
            whatYoullLearn: [
                'Learn advanced skills in Course 3',
                'Prepare for real-world applications'
            ],
            difficultyLevel: 'Advanced',
            content: [
                { id: 1, title: 'Advanced Intro', videoUrl: 'https://sample-videos.com/video5' },
                { id: 2, title: 'Deep Dive', videoUrl: 'https://sample-videos.com/video6' },
            ],
            students: ['Student6', 'Student7'],
        },
        {
            id: 4,
            title: 'Course 4',
            description: 'Description for Course 4',
            instructor: 'Instructor D',
            image: 'https://via.placeholder.com/150', // Placeholder image URL
            whatYoullLearn: [
                'Master advanced concepts in Course 4',
                'Build real-world projects'
            ],
            difficultyLevel: 'Advanced',
            content: [
                { id: 1, title: 'Project 1', videoUrl: 'https://sample-videos.com/video7' },
                { id: 2, title: 'Project 2', videoUrl: 'https://sample-videos.com/video8' },
            ],
            students: ['Student8', 'Student9', 'Student10'],
        },
    ];

    // Calculate the total number of students across all courses
    const totalStudents = courses.reduce((total, course) => total + course.students.length, 0);
    const courseContentData = courses.map(course => course.content.length); // Number of content items per course

    const data1 = {
        labels: ['Courses', 'Total Students'], // Labels for the graph
        datasets: [
            {
                label: 'Instructor Data',
                data: [courses.length, totalStudents], // Number of courses and total students
                backgroundColor: ['#212f4d', '#1f2937'], // Dark shades for the bars
                borderRadius: 10,
                borderColor: '#FFFFFF',
                hoverBackgroundColor: ['#111827', '#111827'], // Slightly lighter/darker shades on hover
                borderWidth: 2,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            },
        ],
    };

    const data2 = {
        labels: courses.map(course => course.title), // Labels based on course titles
        datasets: [
            {
                label: 'Content per Course',
                data: courseContentData, // Number of content items per course
                backgroundColor: '#1f2937', // Primary dark color for content items
                borderRadius: 10,
                borderColor: '#FFFFFF',
                hoverBackgroundColor: '#111827', // Slightly lighter shade on hover
                borderWidth: 2,
                barPercentage: 0.8,
                categoryPercentage: 0.6,
            },
        ],
    };


    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            tooltip: {
                callbacks: {
                    label: function (context) {
                        return context.raw; // Show the raw data value in tooltip
                    },
                },
            },
        },
        scales: {
            x: {
                grid: {
                    color: '#E0E0E0', // Light gray grid lines
                    borderColor: '#BDBDBD',
                    borderWidth: 2,
                },
                ticks: {
                    font: {
                        size: 14,
                        weight: 'bold',
                    },
                },
            },
            y: {
                grid: {
                    color: '#E0E0E0', // Light gray grid lines
                    borderColor: '#BDBDBD',
                    borderWidth: 2,
                },
                ticks: {
                    font: {
                        size: 14,
                    },
                    beginAtZero: true,
                },
            },
        },
    };

    return (
        <div className="px-20 py-6 text-gray-800">
            {/* Welcome message */}
            <h1 className="text-2xl  font-bold mb-2">Welcome, {instructorName}</h1>
            <hr className="border-gray-300 my-6" />

            <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">My Courses</h2>
                <button
                    className="bg-gray-800 text-white px-4 py-2 rounded-md"
                    onClick={() => navigate('/course/create')}
                >
                    Add Course
                </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {courses.map(course => (
                    <CourseCard key={course.id} course={course} />
                ))}
            </div>
            <hr className="border-gray-300 my-6" />

            {/* Graphs displaying instructor statistics */}
            <div className="mt-12 flex flex-col sm:flex-row space-x-0 sm:space-x-6 mb-10">
                <div className="w-full sm:w-1/2 h-auto mb-6 sm:mb-0">
                    <h3 className="text-xl font-bold mb-4">Instructor Statistics</h3>
                    <Bar data={data1} options={options} />
                </div>
                <div className="w-full sm:w-1/2 h-auto">
                    <h3 className="text-xl font-bold mb-4">Content/Course</h3>
                    <Bar data={data2} options={options} />
                </div>
            </div>

        </div>
    );
};

export default InstructorDashboard;
