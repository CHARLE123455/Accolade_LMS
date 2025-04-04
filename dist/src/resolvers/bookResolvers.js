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
const bookService_1 = require("../services/bookService");
const bookResolvers = {
    Query: {
        books: () => __awaiter(void 0, void 0, void 0, function* () { return yield (0, bookService_1.getAllBooksService)(); }),
        book: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) { return yield (0, bookService_1.getBookByIdService)(id); }),
    },
    Mutation: {
        addBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { title, author, subject, isbn, studentId }) {
            return yield (0, bookService_1.createBookService)(title, author, subject || "", isbn, studentId);
        }),
        updateBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id, title, author, subject, isbn }) {
            const updateData = {};
            if (title)
                updateData.title = title;
            if (author)
                updateData.author = author;
            if (subject !== undefined)
                updateData.subject = subject;
            if (isbn)
                updateData.isbn = isbn;
            return yield (0, bookService_1.updateBookService)(id, updateData);
        }),
        deleteBook: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { id }) {
            return yield (0, bookService_1.deleteBookService)(id);
        })
    }
};
exports.default = bookResolvers;
