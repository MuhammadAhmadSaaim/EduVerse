import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditCourse = () => {
    const { id } = useParams(); // Get course ID from URL

    const navigate = useNavigate();

    const token = localStorage.getItem("token");
    const [course, setcourse] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [imageUrl, setImageUrl] = useState("");


    useEffect(() => {
        // Fetch course data
        const fetchcourse = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/courses/${id}`);
                setcourse(response.data);
                console.log(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.response?.data?.msg || "Error fetching course data");
                console.log(err);
                setLoading(false);
            }
        };
        fetchcourse();
    }, [id]);

    // Update imageUrl when course data changes
    useEffect(() => {
        if (course && course.thumbnail) {
            const backendBaseURL = "http://localhost:5000/"; // Update with your backend's base URL
            const constructedImageUrl = course.thumbnail.startsWith("http")
                ? course.thumbnail
                : `${backendBaseURL}${course.thumbnail.replace(/\\/g, "/")}`;
            setImageUrl(constructedImageUrl);
        }
    }, [course]);

    if (loading) return <div>Loading...</div>;


    const handleChange = (e) => {
        const { name, value } = e.target;
        setcourse({ ...course, [name]: value });
    };

    const handleWhatYouLearnChange = (index, value) => {
        const updatedPoints = [...course.whatYoullLearn];
        updatedPoints[index] = value;
        setcourse({ ...course, whatYoullLearn: updatedPoints });
    };

    const addWhatYouLearnPoint = () => {
        setcourse({ ...course, whatYoullLearn: [...course.whatYoullLearn, ""] });
    };

    const handleContentChange = (index, key, value) => {
        const updatedContent = [...course.content];
        updatedContent[index][key] = value; // Supports "url", "thumbnail", "title"
        setcourse({ ...course, content: updatedContent });
    };


    const addContentSection = (type) => {
        const newContent =
            type === "video"
                ? { type: "video", thumbnail: "", title: "", url: "" } // Added "url" for videos
                : { type: "quiz", link: "", title: "" };
        setcourse({ ...course, content: [...course.content, newContent] });
    };

    const handleDeleteContent = (index) => {
        const updatedContent = course.content.filter((_, i) => i !== index);
        setcourse({ ...course, content: updatedContent });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const deleteCourse = async () => {
        // Confirm before deleting the course
        const isConfirmed = window.confirm("Are you sure you want to delete this course?");

        if (!isConfirmed) {
            return; // If user cancels, do nothing
        }

        try {
            await axios.delete(`http://localhost:5000/api/courses/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            alert("Course deleted successfully");
            navigate("/instructor/dashboard");

        } catch (err) {
            setError(err.response?.data?.msg || "Error deleting course");
        }
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Step 1: Separate new and existing content
            const newContent = course.content.filter((item) => !item._id);
            const existingContent = course.content.filter((item) => item._id);

            // Step 2: Create new content
            const newContentIds = [];
            for (const item of newContent) {
                const { data } = await axios.post(
                    "http://localhost:5000/api/content/create",
                    {
                        title: item.title,
                        videoUrl: item.url,
                        type: item.type,
                        description: item.description,
                        thumbnail: item.thumbnail,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                newContentIds.push(data._id);
            }

            // Step 3: Prepare the updated course data
            const updatedCourse = {
                title: course.title,
                description: course.description,
                whatYoullLearn: course.whatYoullLearn,
                thumbnail: course.thumbnail,
                difficultyLevel: course.difficultyLevel,
                content: [...existingContent.map((item) => item._id), ...newContentIds],
                updatedContent: existingContent.map((item) => ({
                    contentId: item._id,
                    title: item.title,
                    videoUrl: item.url,
                    thumbnail: item.thumbnail,
                    description: item.description,
                    type: item.type,
                })),
            };

            // Step 4: Update the course
            await axios.put(
                `http://localhost:5000/api/courses/${id}`,
                updatedCourse,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Course updated successfully");
            navigate("/instructor/dashboard");
        } catch (err) {
            setError(err.response?.data?.msg || "Error updating course");
        }
    };


    return (
        <div className="p-8 min-h-screen text-[#f0f8ff] w-4/5 mx-auto">
            <div className="max-w-[80%] mx-auto sm:max-w-full sm:px-4">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-900">Course Details</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-6">
                        {/* Basic Info Card */}
                        <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Basic Info</h2>
                            <label className="block mb-2">
                                <span className="text-gray-300">Title:</span>
                                <input
                                    type="text"
                                    name="title"
                                    value={course.title}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-300">Description:</span>
                                <textarea
                                    name="description"
                                    value={course.description}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-300">Difficulty Level:</span>
                                <select
                                    name="difficultyLevel"
                                    value={course.difficultyLevel}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                >
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">Course Image</h2>
                            <img
                                src={imageUrl}
                                alt="Course Preview"
                                className="w-full h-40 object-cover rounded-md"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        {/* What You'll Learn */}
                        <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold mb-4">What You'll Learn</h2>
                            {course.whatYoullLearn.map((point, index) => (
                                <div key={index} className="mb-2">
                                    <input
                                        type="text"
                                        value={point}
                                        onChange={(e) => handleWhatYouLearnChange(index, e.target.value)}
                                        className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addWhatYouLearnPoint}
                                className="text-blue-400 hover:underline"
                            >
                                + Add Another Point
                            </button>
                        </div>

                        {/* Students Enrolled */}
                        <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                            <h2 className="text-xl font-semibold mb-4 text-gray-100">Students Enrolled</h2>
                            <p className="text-gray-300 mb-4">Total Students: {course.students.length}</p>
                            <div
                                className="overflow-y-auto max-h-40 border-t border-gray-700 pt-2"
                                style={{ scrollbarWidth: "thin", scrollbarColor: "#4A5568 #2D3748" }}
                            >
                                {course.students.map((student, index) => (
                                    <div
                                        key={index}
                                        className="bg-gray-700 text-gray-200 p-2 rounded mb-2 shadow-sm"
                                    >
                                        {student.username} - {student.email}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Delete Course Button */}
                        <button
                            type="button"
                            onClick={deleteCourse}
                            className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                        >
                            Delete Course
                        </button>

                    </div>
                </div>

                {/* Course Content Section */}
                <div className="mt-6">
                    <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                        {course.content.map((item, index) => (
                            <div
                                key={index}
                                className="p-4 bg-gray-700 rounded-md mb-4 flex items-center justify-between gap-4"
                            >
                                <div className="flex flex-col gap-2 w-full">
                                    {item.type === "video" ? (
                                        <div>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={item.thumbnail || "https://via.placeholder.com/150"}
                                                    alt="Thumbnail"
                                                    className="w-16 h-16 rounded-md"
                                                />
                                                <span className="text-gray-200">{item.title || "Untitled Video"}</span>
                                            </div>
                                            {editMode && (
                                                <div className="flex flex-col gap-2 mt-2">
                                                    <input
                                                        type="text"
                                                        value={item.title}
                                                        onChange={(e) =>
                                                            handleContentChange(index, "title", e.target.value)
                                                        }
                                                        className="bg-gray-600 border-none rounded-md p-2 text-gray-200"
                                                        placeholder="Edit Title"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.thumbnail}
                                                        onChange={(e) =>
                                                            handleContentChange(index, "thumbnail", e.target.value)
                                                        }
                                                        className="bg-gray-600 border-none rounded-md p-2 text-gray-200"
                                                        placeholder="Edit Thumbnail URL"
                                                    />
                                                    <input
                                                        type="text"
                                                        value={item.videoUrl} // Incorrect property name
                                                        onChange={(e) =>
                                                            handleContentChange(index, "url", e.target.value) // "url" is the correct property
                                                        }
                                                        className="bg-gray-600 border-none rounded-md p-2 text-gray-200"
                                                        placeholder="Edit Video URL"
                                                    />

                                                </div>
                                            )}
                                        </div>
                                    ) : (
                                        <div>
                                            <span className="text-gray-200">{`${item.title}: ` || "Untitled Quiz: "}</span>
                                            <a
                                                href={item.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-400 hover:underline"
                                            >
                                                View Quiz
                                            </a>
                                        </div>
                                    )}
                                </div>
                                {editMode && (
                                    <button
                                        onClick={() => handleDeleteContent(index)}
                                        className="text-red-500 hover:text-red-700"
                                        aria-label="Delete Item"
                                    >
                                        🗑️
                                    </button>
                                )}
                            </div>
                        ))}
                        <div className="flex justify-between mt-4 gap-2">
                            <button
                                type="button"
                                onClick={() => addContentSection("video")}
                                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                            >
                                Add New Video
                            </button>
                            <button
                                type="button"
                                onClick={toggleEditMode}
                                className="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
                            >
                                {editMode ? "Finish Editing" : "Edit Items"}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Save Button */}
                <div className="text-center mt-6">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-6 py-3 bg-gray-900 text-white rounded-md hover:bg-black"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;
