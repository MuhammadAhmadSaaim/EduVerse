import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        role: "student",
        // profilePhoto: "",
        // hobbies: "",
    });
    const navigate=useNavigate();
   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        //console.log("User Data:", formData);
        try {
            const { email, password, role, username} = formData; // Extract all fields
    
            // Send a POST request to server-side endpoint with all necessary data
            const response = await axios.post(
                "http://localhost:5000/api/auth/register",
                { email, password, role, username },
                { withCredentials: true }
            );
    
            //console.log(response);
    
            if (response.data.success) {
                localStorage.setItem("token", response.data.token);
                console.log("Token stored");
                // Navigate to the desired page
                if (role === "student") {
                    navigate("/student/dashboard");
                } else if (role === "instructor") {
                    navigate("/instructor/dashboard");
                }
            } else {
                console.log("Signup response received but not successful");
            }
        } catch (error) {
            if (error.response && error.response.data.msg) {
                alert(`Signup failed: ${error.response.data.msg}`);
            } else {
                alert("Signup failed. Please try again.");
            }
            console.error("Error signing up:", error);
        }
    };

    return (
        <div
            className="h-screen w-screen bg-cover flex items-center justify-center backdrop-blur-md"
            style={{
                backgroundImage: `url('/bg_image2.jpg')`,
            }}
        >
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
            >
                <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.username}
                    onChange={handleChange}
                    required
                />

                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />

                <select
                    name="role"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.role}
                    onChange={handleChange}
                >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                </select>

                {/* <input
                    type="text"
                    name="profilePhoto"
                    placeholder="Profile Photo URL"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.profilePhoto}
                    onChange={handleChange}
                />

                <input
                    type="text"
                    name="hobbies"
                    placeholder="Hobbies (comma-separated)"
                    className="w-full p-3 mb-4 border rounded"
                    value={formData.hobbies}
                    onChange={handleChange}
                /> */}

                <button
                    type="submit"
                    className="w-full bg-gray-900 text-white py-3 rounded hover:bg-gray-950"
                >
                    Register
                </button>
            </form>
        </div>
    );
}

export default Register;
