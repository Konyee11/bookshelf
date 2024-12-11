import { Schema, model } from "mongoose";

// スキーマを定義
const bookSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        rating: {
            type: Number,
            required: true,
            enum: [1, 2, 3, 4, 5],
            get: (v) => Math.round(v),
            set: (v) => Math.round(v),
        },
        description: {
            type: String,
            required: true,
        },
        comment: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

// モデルをエクスポート
const Book = model("Book", bookSchema);
export default Book;
