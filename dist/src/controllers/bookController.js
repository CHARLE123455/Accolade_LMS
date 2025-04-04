"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getAllBooks = void 0;
const bookService_1 = require("../services/bookService");
const getAllBooks = (_, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const books = yield (0, bookService_1.getAllBooksService)();
        res.json(books);
    }
    catch (error) {
        next(error);
    }
});
exports.getAllBooks = getAllBooks;
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const book = yield (0, bookService_1.getBookByIdService)(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.getBookById = getBookById;
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, subject, isbn, studentId } = req.body;
        if (!title || !author || !isbn) {
            res.status(400).json({ message: "Title, author, and ISBN are required" });
            return;
        }
        const book = yield (0, bookService_1.createBookService)(title, author, subject || "", isbn, studentId);
        res.status(201).json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.createBook = createBook;
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, author, subject, isbn } = req.body;
        const updateData = {};
        if (title)
            updateData.title = title;
        if (author)
            updateData.author = author;
        if (subject !== undefined)
            updateData.subject = subject;
        if (isbn)
            updateData.isbn = isbn;
        const book = yield (0, bookService_1.updateBookService)(req.params.id, updateData);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json(book);
    }
    catch (error) {
        next(error);
    }
});
exports.updateBook = updateBook;
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const success = yield (0, bookService_1.deleteBookService)(req.params.id);
        if (!success) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json({ message: "Book deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteBook = deleteBook;
