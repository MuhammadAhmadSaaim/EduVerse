import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdPerson } from "react-icons/io";

const InstructorProfile = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        profilePhoto: "",
    });

    const [selectedFile, setSelectedFile] = useState(null);
    const [password, setPassword] = useState("");
    const [courses, setCourses] = useState([]); // State for courses
    const [profilePhoto,setProfilePhoto] = useState(null);
    const token = localStorage.getItem("token");

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                //console.log(token);
                const response = await axios.get("http://localhost:5000/api/user/getProfile", {
                    headers: {
                        Authorization: `Bearer ${token}`, // Add token to the Authorization header
                    },
                });
                //setProfile(response.data);
                setProfilePhoto(response.profilePhoto);
                setProfile(response.data);
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
                setCourses(response.data.courses);
                 // Assuming response contains an array of courses
                //  console.log(response);
            } catch (error) {
                console.error("Error fetching courses:", error);
            }
        };

        fetchCourses();
    }, []);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    // Handle password change
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handle profile photo file upload
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        console.log("in handle file change");
        console.log(file);
        //setSelectedFile(file);
        if (file) {
          const reader = new FileReader();
          reader.onload = () => {
            setProfilePhoto(reader.result);
          };
          reader.readAsDataURL(file);
        }
    };


    // Handle profile update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("username", profile.username);
            formData.append("email", profile.email);
            formData.append("password", password);
            if (selectedFile) {
                formData.append("profilePhoto", selectedFile);
            }

            await axios.put("http://localhost:5000/api/user/updateProfile", formData, {
                withCredentials: true,
                headers: { "Content-Type": "multipart/form-data", Authorization: `Bearer ${token}` },
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
                <h2 className="text-2xl font-bold mb-6 flex items-center justify-center">Instructor Profile</h2>
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
                                    value={profile.username}
                                    onChange={handleChange}
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
                                    value={profile.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>

                            {/* Change Password */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">Change Password</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    placeholder="Enter new password"
                                    className="w-full px-3 py-2 border rounded-md"
                                />
                            </div>
                        </div>

                        {/* Right Column (My Courses) */}
                        <div className="w-full md:w-1/2 space-y-6">
                            {/* My Courses */}
                            <div>
                                <label className="block text-sm font-bold text-gray-700">My Courses</label>
                                <ul className="list-disc pl-5">
                                    { courses?.length > 0 ? (
                                        courses.map((course, index) => (
                                            <li key={index} className="text-gray-700">
                                                {course}
                                            </li>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No course selected</p>
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
            </div>
        </div>
    );
};

export default InstructorProfile;
