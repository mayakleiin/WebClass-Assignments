const PostModel = require("../models/posts_model");

// Add a New Post
const createPost = async (req, res) => {
  const postBody = req.body;
  try {
    const post = await PostModel.create(postBody);
    res.status(201).send(post);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get All Posts + Get Posts by Sender
const getAllPosts = async (req, res) => {
  const filter = req.query.owner; // Get Posts by Sender
  try {
    if (filter) {
      const posts = await PostModel.find({ owner: filter });
      res.send(posts);
    } else {
      // Get All Posts
      const posts = await PostModel.find();
      res.send(posts);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Get a Post by ID
const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await PostModel.findById(postId);
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Update a Post
const updatePost = async (req, res) => {
  const postId = req.params.id;
  const updatedData = req.body;
  try {
    const post = await PostModel.findByIdAndUpdate(postId, updatedData, {
      new: true,
    });
    if (post) {
      return res.status(200).send(post);
    } else {
      return res.status(404).send("Post not found");
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

// Delete a post
const deletePost = async (req, res) => {
  try {
    const deletedPost = await PostModel.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ error: "Post not found" });
    }
    res.status(200).json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ error: `Error deleting Post: ${err.message}` });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
};
