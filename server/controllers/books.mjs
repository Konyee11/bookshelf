import { validationResult } from "express-validator";
import Book from "../models/books.mjs";

// すべての本を取得
async function getAllBooks(req, res) {
    const books = await Book.find().sort({ updatedAt: -1 });
    res.json(books);
}

// ID で本を取得
async function getBookById(req, res) {
    const _id = req.params.id;
    const book = await Book.findById(_id);
    if (book === null) {
        // 該当する本がない場合は 404 エラーを返す
        return res.status(404).json({ message: "Not Found" });
    }
    res.json(book);
}

// 本を登録
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

// 本を更新
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

// 本を削除
async function deleteBook(req, res) {
    const _id = req.params.id;
    await Book.deleteOne({ _id: _id });
    res.json({ message: "Deleted" });
}

export { getAllBooks, getBookById, registBook, updateBook, deleteBook };
