import React, { useState, useEffect } from "react";
import axios from "axios";

const Posts = ({ token }) => {
  const [posts, setPosts] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("http://localhost:5000/posts");
      setPosts(response.data);
    };
    fetchPosts();
  }, []);

  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/posts",
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts([...posts, response.data]);
      setContent("");
    } catch (err) {
      alert(err.response.data.error);
    }
  };

  const handleComment = async (postId, comment) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/posts/${postId}/comments`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setPosts(
        posts.map((post) => (post._id === postId ? response.data : post))
      );
    } catch (err) {
      alert(err.response.data.error);
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
          <div key={post._id}>
            <h3>{post.author.username}</h3>
            <p>{post.content}</p>
            <div>
              <h4>Comments:</h4>
              {post.comments.map((comment) => (
                <p key={comment._id}>
                  <strong>{comment.author.username}:</strong> {comment.content}
                </p>
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleComment(post._id, e.target.elements.comment.value);
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
