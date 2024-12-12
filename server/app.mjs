import express from "express";
import env from "dotenv";
env.config();
import apiRoute from "./api-routes/index.mjs";
import "./helpers/db.mjs";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.use("/api", apiRoute);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
