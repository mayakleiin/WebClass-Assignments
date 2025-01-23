import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import postModel from "../models/posts_model";
import userModel, { IUser } from "../models/user_model";
import { Express } from "express";
import userModel from "../models/user_model";

let app: Express;
let postId = "";

type User = IUser & { token?: string };
const testUser: User = {
  email: "test@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  app = await initApp();

  // מחיקת נתונים קיימים
  await postModel.deleteMany();
  await userModel.deleteMany();

  // רישום משתמש בדיקות
  await request(app).post("/auth/register").send(testUser);

  // התחברות וקבלת טוקן
  const loginResponse = await request(app).post("/auth/login").send(testUser);
  testUser.token = loginResponse.body.token;
  testUser._id = loginResponse.body._id;
  expect(testUser.token).toBeDefined();
});

afterAll(async () => {
  console.log("afterAll");
  await mongoose.connection.close();
});

describe("Posts API Tests", () => {
  it("should create a new post", async () => {
    const response = await request(app)
      .post("/posts")
      .set("authorization", `JWT ${testUser.token}`)
      .send({
        title: "Test Post",
        content: "This is a test post content",
        owner: testUser._id,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.title).toBe("Test Post");
    postId = response.body._id;
  });

  it("should get all posts (one post created)", async () => {
    const response = await request(app).get("/posts");
    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should get a post by ID", async () => {
    const response = await request(app).get(`/posts/${postId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(postId);
  });

  it("should update a post", async () => {
    const response = await request(app)
      .put(`/posts/${postId}`)
      .set("authorization", `JWT ${testUser.token}`)
      .send({
        title: "Updated Test Post",
        content: "This is an updated test post content",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.title).toBe("Updated Test Post");
  });

  it("should delete a post", async () => {
    const deleteResponse = await request(app)
      .delete(`/posts/${postId}`)
      .set("authorization", `JWT ${testUser.token}`);
    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(app).get(`/posts/${postId}`);
    expect(getResponse.statusCode).toBe(404);
  });

  it("should fail to create a post with missing fields", async () => {
    const response = await request(app)
      .post("/posts")
      .set("authorization", `JWT ${testUser.token}`)
      .send({ content: "Missing title field" });
    expect(response.statusCode).toBe(400);
  });
});
