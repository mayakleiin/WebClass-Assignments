const express = require("express");
const router = express.Router();
const postsController = require("../controllers/posts_controller");

// Routes
router.post("/", postsController.createPost); // Create a New Post
router.get("/", postsController.getAllPosts); // Get All Posts + Get Posts by Sender
router.get("/:id", postsController.getPostById); // Get a Post by ID
router.put("/:id", postsController.updatePost); // Update a Post
router.delete("/:id", postsController.deletePost); // Update a Post

module.exports = router;
