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

export { registBook };
