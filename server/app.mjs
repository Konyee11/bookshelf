import express from "express";
import env from "dotenv";
env.config();
import apiRoute from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static("public")); // 静的ファイルの提供
app.use(express.json());

// CORS の設定
import cors from "cors";
app.use(
    cors({
        origin: "http://localhost:5173",
    })
);

app.use("/api", apiRoute);

// パスが存在しない場合は 404 エラーを返す
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    res.status(500).json({ message: "Internal Server Error" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
