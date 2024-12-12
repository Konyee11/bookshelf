import express from "express";
import { body } from "express-validator";
import {
    getAllBooks,
    getBookById,
    registBook,
    updateBook,
    deleteBook,
} from "../controllers/books.mjs";

const router = express.Router();

// GET /api/books
router.get("/", getAllBooks);

// GET /api/books/:id
router.get("/:id", getBookById);

// POST /api/books
router.post(
    "/",
    body("title").notEmpty(), // タイトルが空でないこと
    body("rating").notEmpty().isInt({ min: 1, max: 5 }), // 評価が空でないこと、1〜5の整数であること
    body("description").notEmpty(), // 説明が空でないこと
    body("comment").notEmpty(), // コメントが空でないこと
    registBook
);

// PATCH /api/books/:id
router.patch(
    "/:id",
    body("title").optional().notEmpty(), // タイトルが空でないこと
    body("rating").optional().notEmpty().isInt({ min: 1, max: 5 }), // 評価が空でないこと、1〜5の整数であること
    body("description").optional().notEmpty(), // 説明が空でないこと
    body("comment").optional().notEmpty(), // コメントが空でないこと
    updateBook
);

// DELETE /api/books/:id
router.delete("/:id", deleteBook);

export default router;
