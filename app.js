const express = require("express");
const app = express();
require("dotenv").config(); // לטעינת משתני סביבה מתוך .env
const mongoose = require("mongoose");

// חיבור ל-MongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on("error", (error) => console.error("Connection error:", error));
db.once("open", () => console.log("Connected to database"));

// Middleware
app.use(express.json()); // כדי לאפשר עבודה עם JSON

// ייבוא הנתיבים (Routes)
const commentsRoute = require("./routes/comments_route");

// חיבור הנתיבים ל-App
app.use("/", commentsRoute); // כל הנתיבים של תגובות יחוברו כאן

// הפעלת השרת
const PORT = process.env.PORT || 3000; // ברירת מחדל ל-3000
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
