import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './Components/Layout/layout';
import InstructorDashboard from './Pages/Instructor/instructorDashboard';
import CreateCourse from './Pages/Instructor/createCourse';
import EditCourse from './Pages/Instructor/editCourse';

import StudentDashboard from './Pages/Student/studentDashboard';
import CourseDetails from './Pages/Student/courseDetails';
import StudentProfile from './Pages/Student/studentProfile';
import InstructorProfile from './Pages/Instructor/instructorProfile';
import Login from './Pages/login';
import Register from './Pages/register';

import EnrolledCourseDetails from './Pages/Student/enrolledCourseDetail';


function App() {

  return (
    <Router>
      <Layout className="bg-[#f0f8ff]">
        <Routes>

          <Route path="/" element={<InstructorDashboard />} />   {/* make Login page */}

          {/* Login page route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<InstructorDashboard />} />


          {/* Instructor routes */}
          <Route path="/instructor/dashboard" element={<InstructorDashboard />} />
          <Route path="/course/create" element={<CreateCourse />} />
          <Route path="/editcourse/:id" element={<EditCourse />} />
          <Route path="/instructor/profile" element={<InstructorProfile />} />


          {/* Student routes */}
          <Route path="/student/dashboard" element={<StudentDashboard />} />
          <Route path="/course/enrolled/:id" element={<EnrolledCourseDetails />} />
          <Route path="/course/:id" element={<CourseDetails />} />
          <Route path="/student/profile" element={<StudentProfile />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
