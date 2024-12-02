import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdPerson } from "react-icons/io";

const StudentProfile = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        profilePhoto: "",
        hobbies: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [hobbies, setHobbies] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [courses, setCourses] = useState([]); // State for enrolled courses
    const [recommendations, setRecommendations] = useState([]); // State for recommendations
    const [loadingRecommendations, setLoadingRecommendations] = useState(false); // Loading state

    // Fetch profile data
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
                console.log(response.data);
                setPassword(response.data.password); // Update state with profile data
                setEmail(response.data.email);
                setHobbies(response.data.hobbies);
                setUsername(response.data.username);
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };

        fetchProfile();
    }, []);

    // Fetch courses data
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/courses/", {
                    withCredentials: true,
                });
                setCourses(response.data.courses); // Assuming response contains an array of courses
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    // Handle input changes
    const handleChange = (e) => {  //sabki individually change karni ahi state update karni

        const { name, value } = e.target;
        setProfile((prev) => ({ ...prev, [name]: value }));
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleHobbiesChange = (e) => {
        setHobbies(e.target.value);
    };

    // Handle recommendations fetch
    const handleGetRecommendations = async () => {
        console.log("Hobbies:", hobbies);
        if (!hobbies) {
            alert("Please fill in your hobbies before getting recommendations.");
            return;
        }
        
        console.log("Hobbies before making API call:", hobbies);

        setLoadingRecommendations(true);
        try {
            const token = localStorage.getItem("token");// Retrieve token from localStorage
            // console.log(token);
            const response = await axios.post(
                "http://localhost:5000/api/courses/recommendations",
                { hobbies }, // Send hobbies as part of the request body
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            setRecommendations(response.data); // Update state with recommendations
        } catch (error) {
            console.error("Error fetching recommendations:", error);
            alert("Failed to fetch recommendations. Please try again.");
        } finally {
            setLoadingRecommendations(false);
        }
    };


    // Handle profile photo file upload
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]; // Declare the selected file
        setSelectedFile(selectedFile);

        // Create a FileReader to preview the image
        const reader = new FileReader();
        reader.onload = () => {
            setProfile({ ...profile, profilePhoto: reader.result });
        };
        reader.readAsDataURL(selectedFile); // Use the selected file here
    };


    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // const formData = new FormData();
            // formData.append("username", username);
            // formData.append("email", email);
            // console.log("Password:", password);
            // formData.append("hobbies", hobbies);
            // formData.append("password", password);
            // if (selectedFile) {
            //     formData.append("profilePhoto", selectedFile);
            // }
            // formData.forEach((value, key) => {
            //     console.log(`${key}: ${value}`);
            // });
            const payload = {
                username,
                email,
                hobbies,
                password,
                profilePhoto: selectedFile ? selectedFile : null,
            };
            const token = localStorage.getItem("token");
            await axios.put("http://localhost:5000/api/user/updateProfile", payload, {
                headers: {
                    Authorization: `Bearer ${token}`, // Add token to the Authorization header
                },
            });

            alert("Profile updated successfully!");
        } catch (error) {
            console.error("Error updating profile:", error);
            alert("Failed to update profile.");
        }
    };

    return (
        <div className="min-h-screen flex bg-gray-100">
            {/* Left Column */}
            <div className="w-1/4 bg-gray-100 flex flex-col justify-center items-center p-6">
                {profile.profilePhoto ? (
                    <img
                        src={profile.profilePhoto}
                        alt="Profile"
                        className="w-40 h-40 rounded-full border border-gray-300 mb-4 object-cover"
                    />
                ) : (
                    <IoMdPerson className="w-40 h-40 rounded-full border border-gray-300 mb-4" />
                )}
                <h3 className="text-xl font-bold text-gray-700">{profile.username || "Student Name"}</h3>
            </div>


            {/* Right Column */}
            <div className="w-3/4 p-8 bg-white shadow-md rounded-lg">
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">Student Profile</h2>
                <form onSubmit={handleUpdate} className="space-y-6">
                    {/* Using flexbox for columns */}
                    <div className="flex flex-wrap gap-x-6">
                        {/* Left Column (Username, Email, Password) */}
                        <div className="w-full md:w-1/2 space-y-6">
                            {/* Username */}
                            <div>
                                <label className="block text-sm font-bold  text-gray-700">Username</label>
                                <input
                                    placeholder="Enter username"
                                    type="text"
                                    name="username"
                                    value={username}
                                    onChange={handleEmailChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Email</label>
                                <input
                                    placeholder="Enter email"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Change Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700"> Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                            {/* hobbies */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Hobbies</label>
                                <input
                                    type="text"
                                    name="hobbies"
                                    value={hobbies}
                                    onChange={handleHobbiesChange}
                                    placeholder="Enter your hobbies"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </div>

                        {/* Right Column (Enrolled Courses) */}
                        <div className="w-full md:w-1/2 space-y-6">
                            {/* Enrolled Courses */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Enrolled Courses</label>
                                <ul className="list-disc pl-5">
                                    {courses?.length > 0 ? (
                                        courses.map((course, index) => (
                                            <li key={index} className="text-gray-700">
                                                {course}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No courses enrolled</p>
                                    )}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Profile Photo Upload */}
                    <div>
                        <label className="block text-sm font-bold text-gray-700">Profile Image</label>
                        <input
                            type="file"
                            onChange={handleFileChange}
                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-gray-700 file:bg-gray-100 file:hover:bg-gray-200"
                        />
                    </div>

                    {/* Update Button */}
                    <button
                        type="submit"
                        className="bg-gray-900 text-white cursor-pointer px-4 py-2 rounded-md hover:bg-gray-950 text-semibold hover:shadow-xl transition duration-200 justify-center w-full"
                    >
                        Update Profile
                    </button>
                </form>
                {/* Recommendations */}
                <div className="mt-8">
                    <button
                        onClick={handleGetRecommendations}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200"
                        disabled={loadingRecommendations}
                    >
                        {loadingRecommendations ? "Loading..." : "Get Recommendations"}
                    </button>
                    {recommendations.length > 0 && (
                        <ul className="mt-4 space-y-2">
                            {recommendations.map((rec, index) => (
                                <li key={index} className="text-gray-700">
                                    {rec}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
