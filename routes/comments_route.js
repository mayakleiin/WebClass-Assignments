const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments_controller");

// Routes
router.post("/comment", commentController.createComment); // Create a new comment
router.get("/comments", commentController.getAllComments); // Get all comments
router.get("/comment", commentController.getCommentsByPost); // Get comments by post ID
router.put("/comment/:comment_id", commentController.updateComment); // Update a comment
router.delete("/comment/:comment_id", commentController.deleteComment); // Delete a comment

module.exports = router;
