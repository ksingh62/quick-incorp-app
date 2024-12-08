const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage
const users = [{ id: 1, username: "TestUser", email: "test@example.com" }];
const posts = [];

// Middleware to mimic user authentication
const mockAuthenticate = (req, res, next) => {
  req.user = users[0]; // Assume the first user is logged in
  next();
};

// Create a new post
app.post("/posts", mockAuthenticate, (req, res) => {
  const newPost = {
    id: posts.length + 1,
    author: req.user.id,
    content: req.body.content,
    comments: [],
    createdAt: new Date(),
  };
  posts.push(newPost);
  res.status(201).json(newPost);
});

// Get all posts
app.get("/posts", (req, res) => {
  const populatedPosts = posts.map((post) => ({
    ...post,
    author: users.find((user) => user.id === post.author),
    comments: post.comments.map((comment) => ({
      ...comment,
      author: users.find((user) => user.id === comment.author),
    })),
  }));
  res.json(populatedPosts);
});

// Add a comment to a post
app.post("/posts/:postId/comments", mockAuthenticate, (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.postId));
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const newComment = {
    author: req.user.id,
    content: req.body.content,
    createdAt: new Date(),
  };
  post.comments.push(newComment);
  res.status(201).json(post);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
