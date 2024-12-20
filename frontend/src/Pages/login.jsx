import React, { useEffect, useState } from 'react';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import { Link } from 'react-router-dom';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    const backgroundStyle = {
        backgroundImage: `url("/bg_image2.jpg")`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "100vh",
        width: "100%",
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:5000/api/user/getProfile", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });

                    const { role } = response.data;
                    if (role === "student") {
                        navigate("/student/dashboard");
                    } else if (role === "instructor") {
                        navigate("/instructor/dashboard");
                    }
                } catch (error) {
                    console.error("Error fetching profile:", error);
                }
            }
            setLoading(false); // End loading state
        };

        fetchProfile();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "http://localhost:5000/api/auth/login",
                { email, password },
                { withCredentials: true }
            );
            const { token, role } = response.data.data;
            if (token) {
                localStorage.setItem('token', token);
                if (role === "student") {
                    navigate("/student/dashboard");
                } else if (role === "instructor") {
                    navigate("/instructor/dashboard");
                }
            } else {
                console.log("Token was not returned");
            }
        } catch (error) {
            console.log("Error:", error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="text-center">
                    <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32 mb-4"></div>
                    <p className="text-gray-600 text-lg">Loading...</p>
                </div>
            </div>
        );
    }

    return (

        <div class="min-h-screen flex">
            {/* <!-- Left Panel (Half Page) --> */}
            <div class="flex flex-col items-center justify-center w-1/2 bg-gray-100">
                {/* <!-- Logo --> */}
                {/* <img src="./logo.jpg"  class="mb-4 w-40" /> */}

                {/* <!-- Log-In Section --> */}
                <div class="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
                    <h2 class="text-2xl font-bold text-center text-gray-800 mb-6">Log In</h2>

                    {/* <!-- Form --> */}
                    <form class="space-y-4 " onSubmit={handleSubmit}>
                        {/* <!-- Email --> */}
                        <div className="relative">
                            <label for="roll" class="block font-semi-bold text-sm font-medium text-gray-700">Email</label>
                            <div className="flex items-center border border-gray-300 rounded-md mt-1 shadow-sm">
                                <MdEmail className="ml-3 " />
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    type="text"
                                    id="roll"
                                    placeholder="Email"
                                    class="  w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-gray-900"
                                />
                            </div>
                        </div>

                        <div className="relative">
                            <label for="password" class="block text-sm font-semi-bold font-medium text-gray-700">Password</label>
                            <div className="flex items-center border border-gray-300 rounded-md mt-1 shadow-sm">
                                <FaLock className="ml-3 " />
                                <input
                                    onChange={(e) => setPassword(e.target.value)}

                                    value={password}
                                    type="password"
                                    id="password"
                                    placeholder="Password"
                                    class="w-full px-3 py-2 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md text-gray-900"
                                />
                            </div>
                        </div>

                        {/* <!-- Remember Me & Forget Password --> */}
                        <div class="flex items-center justify-between">
                            
                            <a href="#" class="text-sm text-gray-900 hover:underline">Forgot Password?</a>
                        </div>

                        {/* <!-- Submit Button --> */}
                        <button type="submit" onClick={handleSubmit}
                            className="w-full bg-gray-900 hover:bg-gray-950 text-white font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1">
                            Log In

                        </button>
                    </form>
                    <br />
                    <div>
                        <p className="text-center">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-gray-900 hover:underline font-semibold">
                                Register
                            </Link>
                        </p>
                    </div>
                </div>

            </div>

            <div class="relative w-1/2 bg-blue-950" style={backgroundStyle}>
                {/* <!-- Content --> */}
                <div class="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-4">
                    <h1 class="text-3xl font-bold mb-4 ">Welcome to EduVerse</h1>
                    <p class="text-lg">
                        For queries, contact us at{' '}
                        <a href="mailto:nu.edu.pk" class="underline text-blue-300">eduverse.edu.pk</a>.
                    </p>
                </div>
            </div>

            <div></div>

        </div>
    );
};

export default Login;
