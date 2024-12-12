import express from "express";
import { body, validationResult } from "express-validator";
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
    const book = await Book.findOne({ _id: _id });
    res.json(book);
});

// POST /api/books
router.post(
    "/",
    body("title").notEmpty().withMessage("エラーメッセージ"), // タイトルが空かどうかをチェック
    async (req, res) => {
        const errors = validationResult(req); // バリデーションエラーを取得

        // エラーがある場合はエラーメッセージを返す
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const book = new Book(req.body);
        await book.save();
        res.json({ message: "Created" });
    }
);

// PATCH /api/books/:id
router.patch("/:id", async (req, res) => {
    const { title, rating, description, comment } = req.body;
    const _id = req.params.id;
    const book = await Book.findOne({ _id: _id });

    book.title = title || book.title;
    book.rating = rating || book.rating;
    book.description = description || book.description;
    book.comment = comment || book.comment;

    await book.save();

    res.json({ message: "Updated" });
});

// DELETE /api/books/:id
router.delete("/:id", async (req, res) => {
    const _id = req.params.id;
    await Book.deleteOne({ _id: _id });
    res.json({ message: "Deleted" });
});

export default router;
