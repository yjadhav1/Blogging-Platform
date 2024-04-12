import React, { useState } from "react";
import axios from "axios";
import "./CreatePost.css";
import { useNavigate } from "react-router-dom";

export default function CreatePostForm() {
    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        title: "",
        img: "",
        content: "",
        category: "",
    });

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post("http://localhost:5000/add-post", formData);
            console.log("Post created successfully:", response.data);
            alert("Your post has been created successfully.");
            navigate('/DisplayPost');
        } catch (error) {
            console.error("Error creating post:", error);
            alert("An error occurred while creating the post. Please try again later.");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Image URL:</label>
                    <input
                        type="text"
                        name="img"
                        value={formData.imgUrl}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Content:</label>
                    <textarea
                        name="content"
                        value={formData.content}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>
                <div>
                    <label>Category:</label>
                    <select
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select category</option>
                        <option value="AcademicResources">Academic Resources</option>
                        <option value="CareerServices">Career Services</option>
                        <option value="Campus">Campus</option>
                        <option value="Culture">Culture</option>
                        <option value="Local">Local Community Resources</option>
                        <option value="Social">Social</option>
                        <option value="Sports">Sports</option>
                        <option value="Health">Health and Wellness</option>
                        <option value="Technology">Technology</option>
                        <option value="Travel">Travel</option>
                        <option value="Alumni">Alumni</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}
