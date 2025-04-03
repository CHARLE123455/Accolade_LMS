import Book from "../models/bookModel";
import Student from "../models/studentModel";

export const getAllBooksService = async () => {
  return await Book.find().populate("student");
};

export const getBookByIdService = async (id: string) => {
  return await Book.findById(id).populate("student");
};

export const createBookService = async (title: string, author: string, subject: string, isbn: string, studentId?: string) => {
  const book = new Book({ title, author, subject, isbn, student: studentId || undefined });
  await book.save();

  if (studentId) {
    await Student.findByIdAndUpdate(studentId, { $push: { books: book._id } });
  }

  return book;
};

export const updateBookService = async (id: string, updateData: any) => {
  return await Book.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("student");
};

export const deleteBookService = async (id: string) => {
  const book = await Book.findById(id);
  if (!book) return false;

  if (book.student) {
    await Student.findByIdAndUpdate(book.student, { $pull: { books: book._id } });
  }

  await Book.findByIdAndDelete(id);
  return true;
};
