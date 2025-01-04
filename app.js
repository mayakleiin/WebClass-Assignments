const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");

// MongoDB connection
mongoose.connect(process.env.DB_CONNECT);
const db = mongoose.connection;
db.on("error", (error) => console.error("Connection error:", error));
db.once("open", () => console.log("Connected to database"));

// Middleware
app.use(express.json());

// Route imports
const postsRoute = require("./routes/posts_route");
const commentsRoute = require("./routes/comments_route");

// Posts routes
app.use("/posts", postsRoute);

// Comments routes
app.use("/comments", commentsRoute);

// Default root route
app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

// Server start
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
