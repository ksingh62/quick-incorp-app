"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CommunityPage.css"; // Import CSS file

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:5000/posts");
        setPosts(response.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
        alert("Error fetching posts");
      }
    };
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/posts", {
        content,
      });
      setPosts([...posts, response.data]);
      setContent("");
    } catch (err) {
      console.error("Error creating post:", err);
      alert(err.response?.data?.error || "Error creating post");
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        { content: comment }
      );
      setPosts(
        posts.map((post) => (post.id === postId ? response.data : post))
      );
    } catch (err) {
      console.error("Error adding comment:", err);
      alert(err.response?.data?.error || "Error adding comment");
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      <form onSubmit={handlePost}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          required
        ></textarea>
        <button type="submit">Post</button>
      </form>
      <div>
        {posts.map((post) => (
          <div key={post.id}>
            <h3>{post.author.username}</h3>
            <p>{post.content}</p>
            <div>
              <h4>Comments:</h4>
              {post.comments.map((comment) => (
                <p key={comment.createdAt}>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </p>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleComment(post.id, e.target.elements.comment.value);
                  e.target.reset();
                }}
              >
                <input
                  type="text"
                  name="comment"
                  placeholder="Add a comment"
                  required
                />
                <button type="submit">Comment</button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Posts;
