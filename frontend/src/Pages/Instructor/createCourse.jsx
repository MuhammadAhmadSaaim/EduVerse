import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useHistory for navigation

const CreateCourse = () => {
    const [courseData, setCourseData] = useState({
        title: "",
        description: "",
        image: "",
        imageFile: null,
        whatYoullLearn: [""],
        difficultyLevel: "",
        content: [],
    });

    const [popupVisible, setPopupVisible] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleWhatYouLearnChange = (index, value) => {
        const newPoints = [...courseData.whatYoullLearn];
        newPoints[index] = value;
        setCourseData({ ...courseData, whatYoullLearn: newPoints });
    };

    const addWhatYouLearnPoint = () => {
        setCourseData({ ...courseData, whatYoullLearn: [...courseData.whatYoullLearn, ""] });
    };

    const addContentSection = () => {
        setCourseData({
            ...courseData,
            content: [...courseData.content, { title: "", type: "video", videoUrl: "", thumbnail: "", description: "" }],
        });
    };

    const handleContentChange = (index, type, value) => {
        const newContent = [...courseData.content];
        newContent[index] = { ...newContent[index], [type]: value };
        setCourseData({ ...courseData, content: newContent });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCourseData({ ...courseData, imageFile: file });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("title", courseData.title);
        formData.append("description", courseData.description);
        formData.append("difficultyLevel", courseData.difficultyLevel);
        formData.append("whatYoullLearn", JSON.stringify(courseData.whatYoullLearn));

        // Prepare content data for submission
        const contentData = courseData.content.map((contentItem) => ({
            title: contentItem.title,
            type: contentItem.type,
            videoUrl: contentItem.videoUrl,
            thumbnail: contentItem.thumbnail,
            description: contentItem.description,
        }));

        formData.append("content", JSON.stringify(contentData));

        // Handle the thumbnail image upload
        if (courseData.imageFile) {
            formData.append("thumbnail", courseData.imageFile);
        } else {
            formData.append("thumbnail", courseData.image); // URL fallback
        }

        try {
            const response = await axios.post("http://localhost:5000/api/courses/create", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    "x-auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NzUwYTYzY2Q2NzQ0MDIxZjIwZDdhOGYiLCJpYXQiOjE3MzMzODY5NzMsImV4cCI6MTczMzM5MDU3M30.3rYFLc1s5KLYRjAUjD9PS2eUEEVCAXEpn5pcAeGb8co",
                },
            });
            console.log("Course created:", response.data);

            // Show success popup
            setPopupVisible(true);

            // Navigate to the instructor dashboard after a delay
            setTimeout(() => {
                navigate("/instructor/dashboard");
            }, 2000); // Adjust the delay as needed
        } catch (err) {
            console.error("Error creating course:", err.response?.data || err.message);
        }
    };

    return (
        <div className="w-4/5 my-10 mx-auto p-8 bg-gray-800 rounded-lg">
            <h1 className="text-4xl font-semibold text-white mb-8 text-center">Create New Course</h1>
            <form onSubmit={handleSubmit}>

                {/* Course Info Section */}
                <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Info</h2>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">Course Title:</span>
                        <input
                            type="text"
                            name="title"
                            value={courseData.title}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-lg p-3"
                            placeholder="Enter course title"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">Description:</span>
                        <textarea
                            name="description"
                            value={courseData.description}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-lg p-3"
                            placeholder="Enter course description"
                            required
                        />
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">Course Thumbnail:</span>
                        <div className="items-center space-x-4">
                            <input
                                type="file"
                                onChange={handleImageUpload}
                                className="block"
                            />
                        </div>
                    </label>
                </div>

                {/* Learning Outcomes Section */}
                <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">What You'll Learn & Difficulty</h2>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">Difficulty Level:</span>
                        <select
                            name="difficultyLevel"
                            value={courseData.difficultyLevel}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-lg p-3"
                            required
                        >
                            <option value="">Select Difficulty</option>
                            <option value="easy">Easy</option>
                            <option value="medium">Medium</option>
                            <option value="hard">Hard</option>
                        </select>
                    </label>
                    <label className="block mb-4">
                        <span className="text-gray-700 font-semibold">What You'll Learn:</span>
                        {courseData.whatYoullLearn.map((point, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={point}
                                    onChange={(e) => handleWhatYouLearnChange(index, e.target.value)}
                                    className="block w-full border rounded-lg p-3"
                                    placeholder="Enter learning outcome"
                                    required
                                />
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={addWhatYouLearnPoint}
                            className="text-gray-800 hover:text-black font-semibold mt-2"
                        >
                            + Add Another Point
                        </button>
                    </label>
                </div>

                {/* Content Section */}
                <div className="bg-white p-6 shadow-md rounded-lg mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Content Sections</h2>
                    {courseData.content.map((contentItem, index) => (
                        <div key={index} className="mb-4 border-b pb-4">
                            <label className="block mb-2">
                                <span className="text-gray-700">Title:</span>
                                <input
                                    type="text"
                                    value={contentItem.title}
                                    onChange={(e) => handleContentChange(index, "title", e.target.value)}
                                    className="block w-full border rounded-lg p-3"
                                    placeholder="Enter content title"
                                    required
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-700">Type:</span>
                                <select
                                    value={contentItem.type}
                                    onChange={(e) => handleContentChange(index, "type", e.target.value)}
                                    className="block w-full border rounded-lg p-3"
                                >
                                    <option value="video">Video</option>
                                    <option value="quiz">Quiz</option>
                                    <option value="assignment">Assignment</option>
                                </select>
                            </label>
                            {contentItem.type === "video" && (
                                <>
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Video URL:</span>
                                        <input
                                            type="text"
                                            value={contentItem.videoUrl}
                                            onChange={(e) => handleContentChange(index, "videoUrl", e.target.value)}
                                            className="block w-full border rounded-lg p-3"
                                            placeholder="Enter video URL"
                                            required
                                        />
                                    </label>
                                    <label className="block mb-2">
                                        <span className="text-gray-700">Thumbnail:</span>
                                        <input
                                            type="text"
                                            value={contentItem.thumbnail}
                                            onChange={(e) => handleContentChange(index, "thumbnail", e.target.value)}
                                            className="block w-full border rounded-lg p-3"
                                            placeholder="Enter thumbnail URL"
                                            required
                                        />
                                    </label>
                                </>
                            )}
                            <label className="block mb-2">
                                <span className="text-gray-700">Description:</span>
                                <textarea
                                    value={contentItem.description}
                                    onChange={(e) => handleContentChange(index, "description", e.target.value)}
                                    className="block w-full border rounded-lg p-3"
                                    placeholder="Enter brief description"
                                />
                            </label>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addContentSection}
                        className="text-gray-800 hover:text-black font-semibold mt-2"
                    >
                        + Add Content Section
                    </button>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full text-gray-800 bg-white font-semibold py-3 rounded-lg hover:bg-gray-200 transition duration-200"
                >
                    Create Course
                </button>
            </form>

            {/* Popup */}
            {popupVisible && (
                <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <p className="text-lg font-semibold">Course Created Successfully!</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CreateCourse;
