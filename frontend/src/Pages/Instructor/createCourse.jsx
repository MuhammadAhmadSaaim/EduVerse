import React, { useState } from 'react';

const CreateCourse = () => {
    // State to store course details
    const [courseData, setCourseData] = useState({
        title: '',
        description: '',
        image: '',
        imageFile: null, // To handle file upload
        whatYoullLearn: [''],
        difficultyLevel: '',
        content: [],
    });

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
        setCourseData({ ...courseData, whatYoullLearn: [...courseData.whatYoullLearn, ''] });
    };

    const addContentSection = () => {
        setCourseData({ ...courseData, content: [...courseData.content, { videoUrl: '', quizLink: '' }] });
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Course Data:', courseData);
        // Make an API call here to submit the course data
    };

    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-md rounded-md">
            <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Create New Course</h1>
            <form onSubmit={handleSubmit}>

                {/* Course Title */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Course Title:</span>
                    <input
                        type="text"
                        name="title"
                        value={courseData.title}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                        placeholder="Enter course title"
                        required
                    />
                </label>

                {/* Description */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Description:</span>
                    <textarea
                        name="description"
                        value={courseData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                        placeholder="Enter course description"
                        required
                    />
                </label>

                {/* Image Upload or URL */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Course Thumbnail:</span>
                    <div className="flex items-center space-x-4">
                        <input
                            type="text"
                            name="image"
                            value={courseData.image}
                            onChange={handleChange}
                            className="mt-1 block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                            placeholder="Enter image URL"
                        />
                        <input
                            type="file"
                            onChange={handleImageUpload}
                            className="mt-1 block"
                        />
                    </div>
                </label>

                {/* Difficulty Level */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Difficulty Level:</span>
                    <select
                        name="difficultyLevel"
                        value={courseData.difficultyLevel}
                        onChange={handleChange}
                        className="mt-1 block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                        required
                    >
                        <option value="">Select Difficulty</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </label>

                {/* What You'll Learn */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">What You'll Learn:</span>
                    {courseData.whatYoullLearn.map((point, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <input
                                type="text"
                                value={point}
                                onChange={(e) => handleWhatYouLearnChange(index, e.target.value)}
                                className="block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                                placeholder="Enter learning outcome"
                                required
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addWhatYouLearnPoint}
                        className="text-blue-500 hover:text-blue-700 font-semibold mt-2"
                    >
                        + Add Another Point
                    </button>
                </label>

                {/* Content Sections (Video Lectures or Quizzes) */}
                <label className="block mb-4">
                    <span className="text-gray-700 font-semibold">Content (Lectures or Quiz Links):</span>
                    {courseData.content.map((contentItem, index) => (
                        <div key={index} className="mb-4">
                            <div className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={contentItem.videoUrl}
                                    onChange={(e) => handleContentChange(index, 'videoUrl', e.target.value)}
                                    placeholder="Video URL"
                                    className="block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                                />
                            </div>
                            <div className="flex items-center mb-2">
                                <input
                                    type="text"
                                    value={contentItem.quizLink}
                                    onChange={(e) => handleContentChange(index, 'quizLink', e.target.value)}
                                    placeholder="Google Form Quiz Link"
                                    className="block w-full border rounded-md p-3 focus:border-blue-400 focus:ring focus:ring-blue-200 transition duration-200"
                                />
                            </div>
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addContentSection}
                        className="text-blue-500 hover:text-blue-700 font-semibold mt-2"
                    >
                        + Add Content Section
                    </button>
                </label>

                {/* Submit Button */}
                <button type="submit" className="w-full bg-blue-500 text-white font-semibold py-3 rounded-md hover:bg-green-600 transition duration-200">
                    Create Course
                </button>
            </form>
        </div>
    );
};

export default CreateCourse;
