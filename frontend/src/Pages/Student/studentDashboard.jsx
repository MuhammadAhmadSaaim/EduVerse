// This is student dashboard

import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
    const navigate = useNavigate();

    // Sample instructor name (you may want to replace this with a dynamic name)
    const studentName = "Saba";


    return (
        <div className="px-20 py-6">
            {/* Welcome message */}
            <h1 className="text-2xl font-bold mb-2">Welcome, {studentName}</h1>
            <hr className="border-gray-300 my-6" />
        </div>
    );
};

export default StudentDashboard;
