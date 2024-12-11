import express from "express";
import Book from "../models/books.mjs";

const router = express.Router();

// GET /api/books
router.get("/", async (req, res) => {
    const books = await Book.find().sort({ updatedAt: -1 });
    res.json(books);
});

// GET /api/books/:id
router.get("/:id", async (req, res) => {
    const _id = req.params.id;
    const books = await Book.findOne({ _id: _id });
    res.json(books);
});

// POST /api/books
router.post("/", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.json({ message: "Created" });
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    await Book.deleteOne({ _id: _id });
    res.json({ message: "Deleted" });
});

export default router;
