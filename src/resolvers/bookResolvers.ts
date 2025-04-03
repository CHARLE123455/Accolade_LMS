import Book from "../models/bookModel";
import Student from "../models/studentModel";

const bookResolvers = {
  Query: {
    books: async () => await Book.find().populate("student"),
    book: async (_: any, { id }: { id: string }) => await Book.findById(id).populate("student"),
  },
  Mutation: {
    addBook: async (
      _: any, 
      { title, author, subject, isbn, studentId }: 
      { title: string; author: string; subject?: string; isbn: string; studentId?: string }
    ) => {
      const book = new Book({ 
        title, 
        author, 
        subject: subject || undefined,
        isbn,
        student: studentId || undefined 
      });
      
      await book.save();

      if (studentId) {
        await Student.findByIdAndUpdate(studentId, { $push: { books: book._id } });
      }

      return book;
    },
    updateBook: async (
      _: any,
      { id, title, author, subject, isbn }: 
      { id: string; title?: string; author?: string; subject?: string; isbn?: string }
    ) => {
      const updateData: any = {};
      if (title) updateData.title = title;
      if (author) updateData.author = author;
      if (subject !== undefined) updateData.subject = subject;
      if (isbn) updateData.isbn = isbn;
      
      const updatedBook = await Book.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true }
      ).populate("student");
      
      return updatedBook;
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      const book = await Book.findById(id);
      
      if (!book) return false;
      
  
      if (book.student) {
        await Student.findByIdAndUpdate(book.student, {
          $pull: { books: book._id }
        });
      }
      
      await Book.findByIdAndDelete(id);
      return true;
    }
  },
  Book: {

    student: async (parent: any) => {
      if (!parent.student) return null;
      return await Student.findById(parent.student);
    }
  }
};

export default bookResolvers;