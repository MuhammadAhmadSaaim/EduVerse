import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import CourseCard from '../../Components/Instructor/courseCard'; // Import CourseCard component
import { Bar } from 'react-chartjs-2'; // Import Bar chart from react-chartjs-2
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register the required chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const InstructorDashboard = () => {
    const navigate = useNavigate();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem("token");

    // Fetch courses from the backend
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCourses(response.data);
                console.log(response.data);
            } catch (err) {
                setError("Failed to fetch courses. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    // Calculate total number of students
    const totalStudents = courses.reduce((total, course) => total + course.studentCount, 0);
    const courseContentData = courses.map(course => course.contentCount || 0);

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
            <h1 className="text-2xl font-bold mb-2">Welcome, Instructor</h1>
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
                    <CourseCard key={course._id} course={course} />
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
