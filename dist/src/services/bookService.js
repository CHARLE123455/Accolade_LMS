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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBookService = exports.updateBookService = exports.createBookService = exports.getBookByIdService = exports.getAllBooksService = void 0;
const bookModel_1 = __importDefault(require("../models/bookModel"));
const studentModel_1 = __importDefault(require("../models/studentModel"));
const getAllBooksService = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield bookModel_1.default.find().populate("student");
});
exports.getAllBooksService = getAllBooksService;
const getBookByIdService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bookModel_1.default.findById(id).populate("student");
});
exports.getBookByIdService = getBookByIdService;
const createBookService = (title, author, subject, isbn, studentId) => __awaiter(void 0, void 0, void 0, function* () {
    const book = new bookModel_1.default({ title, author, subject, isbn, student: studentId || undefined });
    yield book.save();
    if (studentId) {
        yield studentModel_1.default.findByIdAndUpdate(studentId, { $push: { books: book._id } });
    }
    return book;
});
exports.createBookService = createBookService;
const updateBookService = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bookModel_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true }).populate("student");
});
exports.updateBookService = updateBookService;
const deleteBookService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield bookModel_1.default.findById(id);
    if (!book)
        return false;
    if (book.student) {
        yield studentModel_1.default.findByIdAndUpdate(book.student, { $pull: { books: book._id } });
    }
    yield bookModel_1.default.findByIdAndDelete(id);
    return true;
});
exports.deleteBookService = deleteBookService;
