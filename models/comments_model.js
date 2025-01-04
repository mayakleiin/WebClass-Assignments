const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true }, // קשר לפוסט
  content: { type: String, required: true }, // תוכן התגובה
  sender: { type: String, required: true }, // מי כתב את התגובה
  createdAt: { type: Date, default: Date.now }, // זמן יצירת התגובה
});

module.exports = mongoose.model("Comment", commentSchema);
