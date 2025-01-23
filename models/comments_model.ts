import mongoose, { Schema, Document, Model } from "mongoose";

// Interface defining the structure of a comment
export interface IComments extends Document {
  comment: string;
  owner: string;
  postId: string;
  createdAt?: Date;
}

// Mongoose schema for a comment
const commentsSchema: Schema<IComments> = new mongoose.Schema<IComments>({
  comment: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  postId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model from the schema
const commentsModel: Model<IComments> = mongoose.model<IComments>(
  "Comments",
  commentsSchema
);

export default commentsModel;
