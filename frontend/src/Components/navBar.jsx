import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const Navbar = () => {
    const [role, setRole] = useState('');
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");// Retrieve token from localStorage
                // console.log(token);
                const response = await axios.get("http://localhost:5000/api/user/getProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                });
                // console.log(response.data);
                console.log(response.data.role);
                setRole(response.data.role);
                
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    const navigate = useNavigate();

    // State to toggle the dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };
    const handleProfileClick = () => {
        if (role === "instructor") navigate('/instructor/profile');
        if (role === "student") navigate('/student/profile');
        
    };
    const handleSignOut = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="bg-gray-900 text-white py-4 px-8">
            <div className="flex justify-between items-center">
                {/* Centered App Name */}
                <div onClick={() => navigate('/')}
                    className="text-2xl font-bold hover:cursor-pointer
                    ">EduVerse</div>

                {/* Dropdown on the right */}
                <div className="relative">
                    <button
                        className="text-3xl"
                        onClick={toggleDropdown}
                    >
                        &#x22EE; {/* Three vertical dots */}
                    </button>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg w-48">
                            <div className="flex flex-col">
                                <button onClick={handleProfileClick} className="bg-gray-700 px-4 py-2 hover:bg-gray-600">Profile</button>
                                <button onClick={handleSignOut} className="bg-gray-700 px-4 py-2 hover:bg-gray-600">Sign Out</button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
