import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../App.js";
import axios from "axios";
import "./Post.css";

export default function Post({ postData, handleDelete }) {
  const [replies, setReplies] = useState(false);
  const [comment, setComment] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState(postData.comment); // State to store comments
  const [autoReply, setAutoReply] = useState(false);
  const { user, type } = useContext(AppContext);

  useEffect(() => {
    setComments(postData.comment); // Update comments state when postData.comment changes
  }, [postData.comment]);

  function handleComment() {
    setComment(true);
  }

  function handleHide() {
    setComment(false);
  }

  function handleCancel() {
    setReplies(false);
    setNewComment("");
  }

  function handleReply() {
    setReplies(true);
    if (autoReply) {
      // Fetch automatic reply from backend

      axios
        .post("http://localhost:5000/automatic-reply", postData)
        .then((response) => {
          // Set the recommendation state with the fetched reply
          setNewComment(response.data.recommendation);
          console.log(response.data.recommendation);
        })
        .catch((error) => {
          console.error("Error fetching automatic reply:", error);
          // Handle errors or display error messages to the user
        });
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (newComment.trim() !== "") {
      const reply = `${newComment}: ${user}`;
      const updatedComments = [...comments, reply];

      // Update comments state with new comment
      setComments(updatedComments);

      // Update postData.comment with new comment
      const updatedPost = { ...postData, comment: updatedComments };
      console.log(updatedPost);

      // Send updated post data to the backend
      axios
        .post("http://localhost:5000/update-post", updatedPost)
        .then((response) => {
          console.log("Post updated successfully:", response.data);
          // Handle any further actions if needed
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          // Handle errors or display error messages to the user
        });
    }
    setReplies(false);
    setNewComment("");
  }

  return (
    <div className="post">
      <img className="postImg" src={postData.img} alt="" />
      <div className="postInfo">
        <span className="postTitle">
          <Link to={`/DisplayPost/${postData.id}`} className="link">
            {postData.title}
          </Link>
        </span>
        <hr />
        <div className="postInf">
          <span className="postAuthor">{postData.author}</span>
          <span className="postDate">{postData.date}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={autoReply}
              onChange={() => setAutoReply(!autoReply)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
      <p className="postDesc">{postData.content}</p>
      {comment && (
        <ul>
          {/* Render comments from the comments state */}
          {comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))}
        </ul>
      )}
      <div className="postActions">
        {replies ? (
          <form onSubmit={handleSubmit}>
            <textarea
              name="comment"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            ></textarea>
            <div>
              <button type="submit">Submit</button>
              <button
                className="showRepliesButton"
                type="button"
                onClick={handleCancel}
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            {user !== "" && (
              <>
                <button className="replyButton" onClick={handleReply}>
                  Reply to post
                </button>
              </>
            )}
            {comment === false ? (
              <button className="showRepliesButton" onClick={handleComment}>
                Show replies
              </button>
            ) : (
              <button className="showRepliesButton" onClick={handleHide}>
                Hide replies
              </button>
            )}
          </>
        )}
        {type === "moderator" && (
          <button
            className="replyButton"
            onClick={() => handleDelete(postData.id)}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}
