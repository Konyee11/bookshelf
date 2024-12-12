import express from "express";
import env from "dotenv";
env.config();
import apiRoute from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", apiRoute);

// パスが存在しない場合は 404 エラーを返す
app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
