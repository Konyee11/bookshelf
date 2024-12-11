import express from "express";

const router = express.Router();

// GET /api/books
router.get("/", (req, res) => {
    res.send("/api/books");
});

export default router;
