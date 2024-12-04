import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    // State to toggle the dropdown visibility
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Function to toggle the dropdown
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="bg-gray-900 text-white py-4 px-8">
            <div className="flex justify-between items-center">
                {/* Centered App Name */}
                <div onClick={() => navigate('/')}
                    className="text-2xl font-bold">EduVerse</div>

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
                            <ul className="text-white">
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Profile</li>
                                <li className="px-4 py-2 hover:bg-gray-700 cursor-pointer">Sign Out</li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Navbar;
