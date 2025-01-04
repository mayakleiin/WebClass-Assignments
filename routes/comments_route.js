const express = require("express");
const router = express.Router();
const commentController = require("../controllers/comments_controller");

// Routes
router.post("/comment", commentController.createComment); // יצירת תגובה חדשה
router.get("/comments", commentController.getAllComments); // שליפת כל התגובות
router.get("/comment", commentController.getCommentsByPost); // שליפת תגובות לפי פוסט
router.put("/comment/:comment_id", commentController.updateComment); // עדכון תגובה
router.delete("/comment/:comment_id", commentController.deleteComment); // מחיקת תגובה

module.exports = router;
