import { Request, Response, NextFunction } from "express";
import { getAllBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService } from "../services/bookService";

export const getAllBooks = async (_: Request, res: Response, next: NextFunction) => {
    try {
        const books = await getAllBooksService();
        res.json(books);
    } catch (error) {
        next(error);
    }
};

export const getBookById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const book = await getBookByIdService(req.params.id);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }
        res.json(book);
    } catch (error) {
        next(error); 
    }
};

export const createBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, author, subject, isbn, studentId } = req.body;
        if (!title || !author || !isbn) {
            res.status(400).json({ message: "Title, author, and ISBN are required" });
            return;
        }

        const book = await createBookService(title, author, subject || "", isbn, studentId);
        res.status(201).json(book);
    } catch (error) {
        next(error);
    }
};

export const updateBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { title, author, subject, isbn } = req.body;
        const updateData: any = {};
        if (title) updateData.title = title;
        if (author) updateData.author = author;
        if (subject !== undefined) updateData.subject = subject;
        if (isbn) updateData.isbn = isbn;

        const book = await updateBookService(req.params.id, updateData);
        if (!book) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.json(book);
    } catch (error) {
        next(error);
    }
};

export const deleteBook = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const success = await deleteBookService(req.params.id);
        if (!success) {
            res.status(404).json({ message: "Book not found" });
            return;
        }

        res.json({ message: "Book deleted successfully" });
    } catch (error) {
        next(error);
    }
};
