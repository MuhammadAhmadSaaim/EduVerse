import React, { useState } from "react";

const EditCourse = () => {
    const initialCourseData = {
        title: "React for Beginners",
        description: "Learn the basics of React.js from scratch.",
        image: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg",
        whatYoullLearn: ["Understand React components", "State management in React"],
        difficultyLevel: "Beginner",
        content: [
            {
                type: "video",
                thumbnail: "https://cdn.shopaccino.com/igmguru/articles/deep-learning-900x506.jpg", // Placeholder for thumbnail
                title: "Introduction to React",
            },
            {
                type: "quiz",
                link: "https://google-form.com/quiz-1",
                title: "React Basics Quiz",
            },
        ],
        students: ["Alice", "Bob", "Charlie", "David", "Eve", "Frank", "Grace", "Hank"],
    };

    const [courseData, setCourseData] = useState(initialCourseData);
    const [editMode, setEditMode] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCourseData({ ...courseData, [name]: value });
    };

    const handleWhatYouLearnChange = (index, value) => {
        const updatedPoints = [...courseData.whatYoullLearn];
        updatedPoints[index] = value;
        setCourseData({ ...courseData, whatYoullLearn: updatedPoints });
    };

    const addWhatYouLearnPoint = () => {
        setCourseData({ ...courseData, whatYoullLearn: [...courseData.whatYoullLearn, ""] });
    };

    const handleContentChange = (index, key, value) => {
        const updatedContent = [...courseData.content];
        updatedContent[index][key] = value; // Supports "url", "thumbnail", "title"
        setCourseData({ ...courseData, content: updatedContent });
    };


    const addContentSection = (type) => {
        const newContent =
            type === "video"
                ? { type: "video", thumbnail: "", title: "", url: "" } // Added "url" for videos
                : { type: "quiz", link: "", title: "" };
        setCourseData({ ...courseData, content: [...courseData.content, newContent] });
    };

    const handleDeleteContent = (index) => {
        const updatedContent = courseData.content.filter((_, i) => i !== index);
        setCourseData({ ...courseData, content: updatedContent });
    };

    const toggleEditMode = () => {
        setEditMode(!editMode);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Updated Course Data:", courseData);
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
                                    value={courseData.title}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-300">Description:</span>
                                <textarea
                                    name="description"
                                    value={courseData.description}
                                    onChange={handleChange}
                                    className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200"
                                />
                            </label>
                            <label className="block mb-2">
                                <span className="text-gray-300">Difficulty Level:</span>
                                <select
                                    name="difficultyLevel"
                                    value={courseData.difficultyLevel}
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
                            <input
                                type="text"
                                name="image"
                                value={courseData.image}
                                onChange={handleChange}
                                className="block w-full bg-gray-700 border-none rounded-md p-2 text-gray-200 mb-2"
                                placeholder="Enter image URL"
                            />
                            <img
                                src={courseData.image}
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
                            {courseData.whatYoullLearn.map((point, index) => (
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
                            <p className="text-gray-300 mb-4">Total Students: {initialCourseData.students.length}</p>
                            <div
                                className="overflow-y-auto max-h-40 border-t border-gray-700 pt-2"
                                style={{ scrollbarWidth: "thin", scrollbarColor: "#4A5568 #2D3748" }}
                            >
                                {initialCourseData.students.map((student, index) => (
                                    <div
                                        key={index}
                                        className={"bg-gray-700 text-gray-200 p-2 rounded mb-2 shadow-sm"}
                                    >
                                        {student}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content Section */}
                <div className="mt-6">
                    <div className="p-4 bg-gray-900 shadow-md rounded-lg">
                        <h2 className="text-xl font-semibold mb-4">Course Content</h2>
                        {courseData.content.map((item, index) => (
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
                                                        value={item.url}
                                                        onChange={(e) =>
                                                            handleContentChange(index, "url", e.target.value)
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
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
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
                        className="px-6 py-3 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EditCourse;
