import commentsModel, { IComments } from "../models/comments_model";
import BaseController from "./base_controller";

// Create a controller instance specifically for comments
const commentsController = new BaseController<IComments>(commentsModel);

export default commentsController;
