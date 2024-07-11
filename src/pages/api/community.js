const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
require("dotenv").config(); // Load environment variables

const app = express();
const port = 5000;
const secretKey = process.env.JWT_SECRET;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());

// In-memory storage
const users = [];
const posts = [];

// Configure Passport with Google strategy
const callbackURL =
  process.env.NODE_ENV === "production"
    ? process.env.PROD_CALLBACK_URL
    : process.env.DEV_CALLBACK_URL;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: callbackURL,
    },
    (accessToken, refreshToken, profile, done) => {
      // Check if the user already exists
      let user = users.find((u) => u.googleId === profile.id);
      if (!user) {
        // If not, create a new user
        user = {
          id: users.length + 1,
          googleId: profile.id,
          username: profile.displayName,
          email: profile.emails[0].value,
        };
        users.push(user);
      }
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  const user = users.find((u) => u.id === id);
  done(null, user);
});

// Google authentication routes
app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, issue token
    const token = jwt.sign({ userId: req.user.id }, secretKey, {
      expiresIn: "1h",
    });
    res.redirect(`http://localhost:3000?token=${token}`);
  }
);

// Middleware to authenticate user
const authenticate = (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Access denied" });
  }
  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
};

// Create a new post
app.post("/posts", authenticate, async (req, res) => {
  try {
    const newPost = {
      id: posts.length + 1,
      author: req.user.userId,
      content: req.body.content,
      comments: [],
      createdAt: new Date(),
    };
    posts.push(newPost);
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all posts
app.get("/posts", async (req, res) => {
  try {
    const populatedPosts = posts.map((post) => ({
      ...post,
      author: users.find((user) => user.id === post.author),
      comments: post.comments.map((comment) => ({
        ...comment,
        author: users.find((user) => user.id === comment.author),
      })),
    }));
    res.json(populatedPosts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a comment to a post
app.post("/posts/:postId/comments", authenticate, async (req, res) => {
  try {
    const post = posts.find((p) => p.id === parseInt(req.params.postId));
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = {
      author: req.user.userId,
      content: req.body.content,
      createdAt: new Date(),
    };
    post.comments.push(newComment);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
