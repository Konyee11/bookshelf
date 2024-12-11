import express from "express";
import Book from "../models/books.mjs";

const router = express.Router();

// GET /api/books
router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

export default router;
