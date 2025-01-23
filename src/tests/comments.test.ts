import request from "supertest";
import initApp from "../server";
import mongoose from "mongoose";
import commentsModel from "../models/comments_model";
import userModel, { IUser } from "../models/user_model";
import { Express } from "express";

let app: Express;
let commentId = "";
type User = IUser & { token?: string };
const testUser: User = {
  email: "test@user.com",
  password: "testpassword",
};

beforeAll(async () => {
  console.log("Setting up test environment...");
  app = await initApp();

  await commentsModel.deleteMany();
  await userModel.deleteMany();

  await request(app).post("/auth/register").send(testUser);

  const loginResponse = await request(app).post("/auth/login").send(testUser);
  testUser.token = loginResponse.body.token;
  testUser._id = loginResponse.body._id;
  expect(testUser.token).toBeDefined();
});

afterAll(async () => {
  console.log("Cleaning up...");
  await mongoose.connection.close();
});

describe("Comments API Tests", () => {
  it("should create a new comment", async () => {
    const response = await request(app)
      .post("/comments")
      .set("authorization", `JWT ${testUser.token}`)
      .send({
        comment: "This is a test comment",
        postId: "123",
        owner: testUser._id,
      });

    expect(response.statusCode).toBe(201);
    expect(response.body.comment).toBe("This is a test comment");
    commentId = response.body._id;
  });

  it("should get all comments", async () => {
    const response = await request(app).get("/comments");
    expect(response.statusCode).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBe(1);
  });

  it("should get a comment by ID", async () => {
    const response = await request(app).get(`/comments/${commentId}`);
    expect(response.statusCode).toBe(200);
    expect(response.body._id).toBe(commentId);
  });

  it("should update a comment", async () => {
    const response = await request(app)
      .put(`/comments/${commentId}`)
      .set("authorization", `JWT ${testUser.token}`)
      .send({
        comment: "This is an updated test comment",
      });

    expect(response.statusCode).toBe(200);
    expect(response.body.comment).toBe("This is an updated test comment");
  });

  it("should delete a comment", async () => {
    const deleteResponse = await request(app)
      .delete(`/comments/${commentId}`)
      .set("authorization", `JWT ${testUser.token}`);
    expect(deleteResponse.statusCode).toBe(200);

    const getResponse = await request(app).get(`/comments/${commentId}`);
    expect(getResponse.statusCode).toBe(404);
  });

  it("should fail to create a comment with missing fields", async () => {
    const response = await request(app)
      .post("/comments")
      .set("authorization", `JWT ${testUser.token}`)
      .send({});
    expect(response.statusCode).toBe(400);
  });
});
