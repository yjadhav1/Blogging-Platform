import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Post from "./Post";

export default function DisplayPosts({ searchQuery }) {
  const [posts, setPosts] = useState([]);
  const param = useParams();
 

  useEffect(() => {
    if (searchQuery.length > 0) {
      console.log(searchQuery);
      setPosts(searchQuery); // Update posts with searchResults if available
    } else {
      console.log(searchQuery);
      const fetchPosts = async () => {
        try {
          console.log('Hi');
          const response = await axios.get('http://localhost:5000/get-posts');
          setPosts(response.data.hits.hits.map((hit) => hit._source));
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };

      fetchPosts();
    }
  }, [searchQuery]);

  

  const filteredPosts = param.title
    ? posts.filter((p) => p.category.split(" ").join("") === param.title)
    : posts;

  async function handleDelete(postId) {
    try {
      // Send a DELETE request to the backend endpoint to delete the post
      await axios.delete(`http://localhost:5000/delete-post/${postId}`);

      // If the deletion is successful, update the local state by filtering out the deleted post
      const updatedPosts = posts.filter((item) => item.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.error('Error deleting post:', error);
      // Handle error appropriately, such as showing a message to the user
    }
  }

  return (
    <div className="display-posts">
     
      {filteredPosts.map((postData) => (
        <Post
          key={postData.id}
          postData={postData}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}
