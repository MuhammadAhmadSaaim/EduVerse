import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CourseDetails = () => {
    const { id } = useParams(); // Get the course ID from the URL
    const [course, setCourse] = useState(null);

    // Sample fetch function (replace with actual API call if needed)
    const fetchCourseDetails = async () => {
        // Replace this with an actual API call to get course details by ID
        const mockCourseData = {
            id,
            title: `Course ${id}`,
            description: `This is the detailed description for Course ${id}.`,
            instructor: 'John Doe',
            difficultyLevel: 'Intermediate',
            whatYoullLearn: [
                'Understand basic concepts',
                'Apply advanced techniques',
                'Master real-world applications',
            ],
            lessons: [
                { id: 1, title: 'Introduction to the course', videoUrl: 'https://sample-videos.com/video1' },
                { id: 2, title: 'Lesson 1: Basics', videoUrl: 'https://sample-videos.com/video2' },
                { id: 3, title: 'Lesson 2: Advanced Concepts', videoUrl: 'https://sample-videos.com/video3' },
            ],
            students: ['Student1', 'Student2', 'Student3'],
        };
        setCourse(mockCourseData);
    };

    useEffect(() => {
        fetchCourseDetails();
    }, [id]);

    if (!course) return <div>Loading...</div>;

    return (
        <div className="p-6">
            {/* Course Title and Description */}
            <h1 className="text-3xl font-bold mb-4">{course.title}</h1>
            <p className="text-gray-700 mb-6">{course.description}</p>

            {/* Instructor */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Instructor</h2>
                <p className="text-gray-800">{course.instructor}</p>
            </div>

            {/* Difficulty Level */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Difficulty Level</h2>
                <p className="text-gray-800">{course.difficultyLevel}</p>
            </div>

            {/* What You'll Learn */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">What You'll Learn</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {course.whatYoullLearn.map((item, index) => (
                        <li key={index} className="mb-2">{item}</li>
                    ))}
                </ul>
            </div>

            {/* Lessons/Content */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Course Content</h2>
                <ul className="list-disc pl-5 text-gray-700">
                    {course.lessons.map(lesson => (
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

            {/* Students Enrolled */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">Students Enrolled</h2>
                <p className="text-gray-800">{course.students.join(', ')}</p>
            </div>
        </div>
    );
};

export default CourseDetails;
