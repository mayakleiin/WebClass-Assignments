const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");

// Routes
router.get("/", postsController.getAllPosts); // Get All Posts + Get Posts by Sender
router.get("/:id", postsController.getPostById); // Get a Post by ID
router.post("/", postsController.createPost); // Add a New Post
router.put("/:id", postsController.updatePost); // Update a Post

module.exports = router;

