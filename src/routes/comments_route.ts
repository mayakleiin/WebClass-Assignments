import express from "express";
const router = express.Router();
import commentsController from "../controllers/comments_controller";
import { authMiddleware } from "../controllers/auth_controller";

// Routes
router.post(
  "/",
  authMiddleware,
  commentsController.create.bind(commentsController)
); // Create a New Comment

router.get("/", commentsController.getAll.bind(commentsController)); // Get All Comments + Get Comments by Sender

router.get("/:id", commentsController.getById.bind(commentsController)); // Get a Comment by ID

router.put(
  "/:id",
  authMiddleware,
  commentsController.update.bind(commentsController)
); // Update a Comment

router.delete(
  "/:id",
  authMiddleware,
  commentsController.delete.bind(commentsController)
); // Delete a Comment

export default router;
