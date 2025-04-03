import express from "express";
import * as bookController from "../controllers/bookController";

const router = express.Router();

// GET /books - Retrieve all books
router.get("/", bookController.getAllBooks);

// GET /books/:id - Retrieve a single book by ID
router.get("/:id", bookController.getBookById);

// POST /books - Create a new book
router.post("/", bookController.createBook);

// PUT /books/:id - Update a book by ID
router.put("/:id", bookController.updateBook);

// DELETE /books/:id - Delete a book by ID
router.delete("/:id", bookController.deleteBook);

export default router;