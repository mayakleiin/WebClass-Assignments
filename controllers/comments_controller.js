const Comment = require("../models/comments_model");

// Create a new comment
exports.createComment = async (req, res) => {
  try {
    const newComment = new Comment(req.body);
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    res.status(500).json({ error: "Error creating comment" });
  }
};

// Get all comments
exports.getAllComments = async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// Get comments by post ID
exports.getCommentsByPost = async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.query.post });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Error fetching comments" });
  }
};

// Update a comment
exports.updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.comment_id,
      req.body,
      { new: true }
    );
    if (!updatedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json({ error: "Error updating comment" });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(
      req.params.comment_id
    );
    if (!deletedComment)
      return res.status(404).json({ error: "Comment not found" });
    res.status(200).json({ message: "Comment deleted" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting comment" });
  }
};
