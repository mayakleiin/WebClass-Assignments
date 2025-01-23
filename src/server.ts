import express, { Express } from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import bodyParser from "body-parser";
import postRoutes from "./routes/posts_route";
import commentsRoutes from "./routes/comments_route";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/posts", postRoutes);
app.use("/comments", commentsRoutes);

const initApp = async () => {
  return new Promise<Express>((resolve, reject) => {
    const db = mongoose.connection;
    db.on("error", (error) => {
      console.error(error);
    });
    db.once("open", function () {
      console.log("Connected to Mongoose");
    });
    if (!process.env.DB_CONNECT) {
      reject("No DB_CONNECT");
    } else {
      mongoose.connect(process.env.DB_CONNECT).then(() => {
        resolve(app);
      });
    }
  });
};

export default initApp;
