import express from "express";
const router = express.Router();
import postsController from "../controllers/posts_controller";
import { authMiddleware } from "../controllers/auth_controller";

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: The Posts API
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *       properties:
 *         _id:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 *         title:
 *           type: string
 *           example: My First Post
 *         content:
 *           type: string
 *           example: This is the content of the post.
 *         author:
 *           type: string
 *           example: 60d0fe4f5311236168a109ca
 */

// Routes

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Create a new post
 *     description: Creates a new post
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       '201':
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '400':
 *         description: Invalid input
 *       '401':
 *         description: Unauthorized
 *       '500':
 *         description: Internal server error
 */
router.post("/", authMiddleware, postsController.create.bind(postsController)); // Create a New Post

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Get all posts
 *     description: Retrieves a list of all posts
 *     tags:
 *       - Posts
 *     responses:
 *       '200':
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       '500':
 *         description: Internal server error
 */
router.get("/", postsController.getAll.bind(postsController)); // Get All Posts + Get Posts by Sender

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Get a post by ID
 *     description: Retrieves a post by its ID
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       '200':
 *         description: A single post
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.get("/:id", postsController.getById.bind(postsController)); // Get a Post by ID

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Update a post
 *     description: Update a post by its ID
 *     security:
 *       - bearerAuth: []
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The ID of the post to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post
 *               content:
 *                 type: string
 *                 description: The content of the post
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                       title:
 *                           type: string
 *                           description: the post title
 *                           example: "UPDATED post"
 *                       content:
 *                           type: string
 *                           description: the post content
 *                           example: "This is my first UPDATED post ....."
 *                       owner:
 *                           type: string
 *                           description: the post owner
 *                           example: "60f3b4b3b3b3b3b3b3b3b3b3"
 *                       _id:
 *                           type: string
 *                           description: the post id
 *                           example: "60f3b4b3b3b3b3b3b3b3b3"
 *       401:
 *         description: Post not found
 *       500:
 *         description: Internal server error
 */
router.put(
  "/:id",
  authMiddleware,
  postsController.update.bind(postsController)
); // Update a Post

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Delete a post by ID
 *     description: Deletes a post by its ID
 *     tags:
 *       - Posts
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The post ID
 *     responses:
 *       '200':
 *         description: Post deleted successfully
 *       '401':
 *         description: Unauthorized
 *       '404':
 *         description: Post not found
 *       '500':
 *         description: Internal server error
 */
router.delete(
  "/:id",
  authMiddleware,
  postsController.delete.bind(postsController)
); // Delete a Post

export default router;
