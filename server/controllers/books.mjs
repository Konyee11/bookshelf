import { validationResult } from "express-validator";
import Book from "../models/books.mjs";

async function getAllBooks(req, res) {
    const books = await Book.find().sort({ updatedAt: -1 });
    res.json(books);
}

async function getBookById(req, res) {
    const _id = req.params.id;
    const book = await Book.findById(_id);
    res.json(book);
}

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

async function deleteBook(req, res) {
    const _id = req.params.id;
    await Book.deleteOne({ _id: _id });
    res.json({ message: "Deleted" });
}

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };
