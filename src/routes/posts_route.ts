import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";

// Routes
router.post("/", postsController.create.bind(postsController)); // Create a New Post
router.get("/", postsController.getAll.bind(postsController)); // Get All Posts + Get Posts by Sender
router.get("/:id", postsController.getById.bind(postsController)); // Get a Post by ID
router.put("/:id", postsController.update.bind(postsController)); // Update a Post
router.delete("/:id", postsController.delete.bind(postsController)); // Delete a Post

export default router;
