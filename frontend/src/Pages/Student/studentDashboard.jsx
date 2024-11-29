import React from "react";
import { useNavigate } from "react-router-dom";
import StudentEnrolledCourseCard from "../../Components/Student/StudentEnrolledCourseCard";
import StudentCourseCard from "../../Components/Student/studentCourseCard";

const StudentDashboard = () => {
  const navigate = useNavigate();

  // Sample student name
  const studentName = "Saba Shafique";

  // Sample courses based on Mongoose schema
  const courses = [
    {
      id: "641e9b7e4e8c1e1234567890",
      title: "Introduction to Programming",
      description: "Learn the basics of programming using JavaScript.",
      instructor: {
        id: "641e9b7e4e8c1e1234567891",
        name: "John Doe",
      },
      thumbnail:
        "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
      difficultyLevel: "easy", // New Attribute
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
      thumbnail:
        "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
      difficultyLevel: "hard", // New Attribute
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

  // Filter courses where the student is enrolled
  const myCourses = courses.filter((course) =>
    course.students.some((student) => student.name === studentName)
  );

  // Filter courses that the student is NOT enrolled in (New Courses)
  const newCourses = courses.filter(
    (course) => !course.students.some((student) => student.name === studentName)
  );

  return (
    <div className="px-20 py-6">
      {/* Welcome message */}
      <h1 className="text-2xl font-bold mb-2">Welcome, {studentName}</h1>
      <hr className="border-gray-300 my-6" />

      {/* My Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">My Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {myCourses.map((course) => (
          <StudentEnrolledCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* New Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">New Courses</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {newCourses.map((course) => (
          <StudentCourseCard key={course.id} course={course} />
        ))}
      </div>

      {/* Recommended Courses Section */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Recommeded For You</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* ADD RECOMMENDED COURSES HERE!! */}
        {/* {newCourses.map((course) => (
          <StudentCourseCard key={course.id} course={course} />
        ))} */}
      </div>

    </div>
  );
};

export default StudentDashboard;
