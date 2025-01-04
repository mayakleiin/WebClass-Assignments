const mongoose = require("mongoose");

// Define the schema for a comment
const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // Reference to the Post model
  content: { type: String, required: true }, // The content of the comment
  sender: { type: String, required: true }, // The ID of the sender
  createdAt: { type: Date, default: Date.now }, // Timestamp for when the comment was created
});

// Export the Comment model
module.exports = mongoose.model("Comment", commentSchema);
