import { Request, Response } from "express";
import { Model } from "mongoose";

class BaseController<T> {
  model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  // Create Item
  async create(req: Request, res: Response) {
    const item = req.body;
    try {
      const newItem = await this.model.create(item);
      res.status(201).send(newItem);
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Failed to create item", details: error.message });
    }
  }
  // Get All Items + Get Items by Owner
  async getAll(req: Request, res: Response) {
    const ownerFilter = req.query.owner as string;
    try {
      const query = ownerFilter ? { owner: ownerFilter } : {};
      const items = await this.model.find(query);
      res.status(200).send(items);
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Failed to fetch items", details: error.message });
    }
  }

  // Get Item by ID
  async getById(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const item = await this.model.findById(itemId);
      if (!item) {
        res.status(404).send({ error: "Item not found" });
      } else {
        res.status(200).send(item);
      }
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Failed to fetch item", details: error.message });
    }
  }

  // Update Item
  async update(req: Request, res: Response) {
    const itemId = req.params.id;
    const updatedData = req.body;
    try {
      const item = await this.model.findByIdAndUpdate(itemId, updatedData, {
        new: true,
      });
      if (item) {
        return res.status(200).send(item);
      } else {
        return res.status(404).send("Post not found");
      }
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Failed to update item", details: error.message });
    }
  }

  // Delete Item
  async delete(req: Request, res: Response) {
    const itemId = req.params.id;
    try {
      const deletedItem = await this.model.findByIdAndDelete(itemId);
      if (!deletedItem) {
        res.status(404).send({ error: "Item not found" });
      } else {
        res.status(200).send({ message: "Item deleted successfully" });
      }
    } catch (error: any) {
      res
        .status(400)
        .send({ error: "Failed to delete item", details: error.message });
    }
  }
}

export default BaseController;
