import { validationResult } from "express-validator";
import Book from "../models/books.mjs";

async function registBook(req, res) {
    const errors = validationResult(req); // バリデーションエラーを取得

    // エラーがある場合はエラーメッセージを返す
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const book = new Book(req.body);
    await book.save();
    res.status(201).json({ message: "Created" });
}

async function updateBook(req, res) {
    const errors = validationResult(req); // バリデーションエラーを取得

    // エラーがある場合はエラーメッセージを返す
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, rating, description, comment } = req.body;
    const _id = req.params.id;
    const book = await Book.findOne({ _id: _id });

    book.title = title || book.title;
    book.rating = rating || book.rating;
    book.description = description || book.description;
    book.comment = comment || book.comment;

    await book.save();

    res.json(book);
}

export { registBook, updateBook };
