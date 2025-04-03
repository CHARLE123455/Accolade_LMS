import { getAllBooksService, getBookByIdService, createBookService, updateBookService, deleteBookService } from "../services/bookService";

const bookResolvers = {
  Query: {
    books: async () => await getAllBooksService(),
    book: async (_: any, { id }: { id: string }) => await getBookByIdService(id),
  },
  Mutation: {
    addBook: async (_: any, { title, author, subject, isbn, studentId }: { title: string; author: string; subject?: string; isbn: string; studentId?: string }) => {
      return await createBookService(title, author, subject || "", isbn, studentId);
    },
    updateBook: async (_: any, { id, title, author, subject, isbn }: { id: string; title?: string; author?: string; subject?: string; isbn?: string }) => {
      const updateData: any = {};
      if (title) updateData.title = title;
      if (author) updateData.author = author;
      if (subject !== undefined) updateData.subject = subject;
      if (isbn) updateData.isbn = isbn;

      return await updateBookService(id, updateData);
    },
    deleteBook: async (_: any, { id }: { id: string }) => {
      return await deleteBookService(id);
    }
  }
};

export default bookResolvers;
