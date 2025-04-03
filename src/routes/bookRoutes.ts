import express from "express";
import Book from "../models/book.model";

const router = express.Router();

router.get("/", async (_, res) => {
  const books = await Book.find().populate("student");
  res.json(books);
});

router.post("/", async (req, res) => {
  const { title, author, studentId } = req.body;
  const book = new Book({ title, author, student: studentId || null });
  await book.save();
  res.status(201).json(book);
});

export default router;
